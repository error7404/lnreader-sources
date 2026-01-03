import { fetchApi } from '@libs/fetch';
import { Plugin } from '@/types/plugin';

class Test implements Plugin.PluginBase {
  id = 'test';
  name = 'Test';
  site = '';
  icon = '';
  version = '0.0.0';

  async popularNovels(): Promise<Plugin.NovelItem[]> {
    return [
      {
        name: 'test',
        cover: '',
        path: 'test',
      },
    ];
  }

  async parseNovel(): Promise<Plugin.SourceNovel> {
    return {
      path: 'test',
      name: '',
      chapters: [
        {
          name: 'test',
          path: 'test',
        },
      ],
    };
  }

  async parseChapter(): Promise<string> {
    return await run();
  }

  async searchNovels(): Promise<Plugin.NovelItem[]> {
    return [];
  }
}

// Unzipping logic
const END_OF_CENTRAL_DIR_RECORD_SIG = 0x06054b50;
const CENTRAL_DIR_SIG = 0x02014b50;
const LOCAL_FILE_HEADER_SIG = 0x04034b50;

function readU32At(offset: number, buffer: Uint8Array) {
  if (offset + 4 > buffer.byteLength) return 0;
  let intBuff = new Uint32Array(buffer.buffer.slice(offset, offset + 4));
  return intBuff[0];
}

function readU16At(offset: number, buffer: Uint8Array) {
  if (offset + 2 > buffer.byteLength) return 0;
  let intBuff = new Uint16Array(buffer.buffer.slice(offset, offset + 2));
  return intBuff[0];
}

function readStringAt(offset: number, len: number, buffer: Uint8Array) {
  let u8 = buffer.slice(offset, offset + len);
  return new TextDecoder('utf8').decode(u8);
}

function findEOCDStart(buffer: Uint8Array) {
  return buffer.findIndex((v, idx) => {
    let int = readU32At(idx, buffer);
    return int == END_OF_CENTRAL_DIR_RECORD_SIG;
  });
}

type EOCDData = {
  numberOfRecords: number;
  centralDirSize: number;
  centralDirStart: number;
};

function readEOCDData(buffer: Uint8Array): EOCDData {
  let eOCDStart = findEOCDStart(buffer);
  if (eOCDStart == -1)
    throw new DecodeException(
      'Failed to find start of end of central directory record',
    );

  return {
    numberOfRecords: readU16At(eOCDStart + 8, buffer),
    centralDirSize: readU32At(eOCDStart + 12, buffer),
    centralDirStart: readU32At(eOCDStart + 16, buffer),
  };
}

class DecodeException implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = 'DecodeException';
    this.message = message;
  }
}

type CentralFileHeaderData = {
  minExtractVer: number;
  compressionMethod: number;
  fileName: string;
  fileOffset: number;
  headerSize: number;
  compressedSize: number;
  decompressedSize: number;
};

function readCentralFileHeader(
  offset: number,
  buffer: Uint8Array,
): CentralFileHeaderData {
  if (readU32At(offset, buffer) != CENTRAL_DIR_SIG)
    throw new DecodeException('Central directory has invalid signature');

  let fileNameLen = readU16At(offset + 28, buffer);
  let extraFieldLen = readU16At(offset + 30, buffer);
  let fileCommentLen = readU16At(offset + 32, buffer);
  return {
    minExtractVer: readU16At(offset + 6, buffer),
    compressionMethod: readU16At(offset + 10, buffer),
    fileName: readStringAt(offset + 46, fileNameLen, buffer),
    fileOffset: readU32At(offset + 42, buffer),
    headerSize: 46 + fileNameLen + extraFieldLen + fileCommentLen,
    compressedSize: readU32At(offset + 20, buffer),
    decompressedSize: readU32At(offset + 24, buffer),
  };
}

type LocalFileHeaderData = {
  minExtractVer: number;
  compressionMethod: number;
  fileName: string;
  fileOffset: number;
};

function readLocalFileHeader(
  offset: number,
  buffer: Uint8Array,
): LocalFileHeaderData {
  if (readU32At(offset, buffer) != LOCAL_FILE_HEADER_SIG)
    throw new DecodeException('Local file header has invalid signature');

  let fileNameLen = readU16At(offset + 26, buffer);
  let extraFieldLen = readU16At(offset + 28, buffer);
  return {
    minExtractVer: readU16At(offset + 4, buffer),
    compressionMethod: readU16At(offset + 8, buffer),
    fileName: readStringAt(offset + 30, fileNameLen, buffer),
    fileOffset: offset + 30 + fileNameLen + extraFieldLen,
  };
}

async function deflate(rawFileData: Uint8Array) {
  let decompressedStream = new Response(rawFileData).body.pipeThrough(
    new DecompressionStream('deflate-raw'),
  );
  return new Response(decompressedStream);
}

async function decompressFile(
  compressionMethod: number,
  rawFileData: Uint8Array,
) {
  if (compressionMethod === 0) return new Response(rawFileData);
  if (compressionMethod === 8) return await deflate(rawFileData);
  throw new DecodeException('Unknown compression method: ' + compressionMethod);
}

class Zip {
  private centralDirInfo: EOCDData;
  private files: CentralFileHeaderData[];
  private buffer: Uint8Array;

  constructor(
    centralDirInfo: EOCDData,
    files: CentralFileHeaderData[],
    buffer: Uint8Array,
  ) {
    this.centralDirInfo = centralDirInfo;
    this.files = files;
    this.buffer = buffer;
  }

  getFiles() {
    return this.files.map(f => new ZipFile(f, this.buffer));
  }
}

class ZipFile {
  private file: CentralFileHeaderData;
  private buffer: Uint8Array;

  constructor(file: CentralFileHeaderData, buffer: Uint8Array) {
    this.file = file;
    this.buffer = buffer;
  }

  name() {
    return this.file.fileName;
  }

  async getData() {
    let fileHeader = readLocalFileHeader(this.file.fileOffset, this.buffer);
    let rawFileData = this.buffer.slice(
      fileHeader.fileOffset,
      fileHeader.fileOffset + this.file.compressedSize,
    );
    return await decompressFile(this.file.compressionMethod, rawFileData);
  }
}

async function decode(data: ArrayBuffer) {
  let buffer = new Uint8Array(data);
  let centralDirInfo = readEOCDData(buffer);
  let files: CentralFileHeaderData[] = [];
  let offset = centralDirInfo.centralDirStart;
  for (let i = 0; i < centralDirInfo.numberOfRecords; i++) {
    let centralFileHeader = readCentralFileHeader(offset, buffer);
    offset += centralFileHeader.headerSize;
    files.push(centralFileHeader);
  }

  return new Zip(centralDirInfo, files, buffer);
}

// @ts-ignore
async function run() {
  let buffer = await fetch(
    'data:application/octet-stream;base64,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',
  ).then(res => res.arrayBuffer());
  let zip = await decode(buffer);
  for (let file of zip.getFiles()) {
    console.log('------------------------------------------');
    console.log('File ' + file.name());
    console.log(await file.getData().then(d => d.text()));
  }
  return await zip
    .getFiles()[0]
    .getData()
    .then(d => d.text());
}

export default new Test();
