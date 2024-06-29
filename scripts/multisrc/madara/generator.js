import list from './sources.json' with { type: 'json' };
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateAll = function () {
  list.sort((a, b) => a.id.length - b.id.length);
  return list.map(metadata => {
    try {
      const filters = JSON.parse(
        readFileSync(`${__dirname}/filters/${metadata.id}.json`, 'utf-8'),
      );
      metadata.filters = filters;
    } catch (e) {}
    console.log(
      `[madara] Generating: ${metadata.id}`.padEnd(40),
      metadata.filters ? '🔎with filters🔍' : '🚫 no filters 🚫',
    );
    return generator(metadata);
  });
};

const generator = function generator(metadata) {
  const madaraTemplate = readFileSync('./scripts/multisrc/madara/template.ts', {
    encoding: 'utf-8',
  });

  const pluginScript = `
${madaraTemplate}
const plugin = new MadaraPlugin(${JSON.stringify(metadata)});
export default plugin;
    `.trim();
  return {
    lang: metadata.options?.lang || 'English',
    filename: metadata.sourceName,
    pluginScript,
  };
};
