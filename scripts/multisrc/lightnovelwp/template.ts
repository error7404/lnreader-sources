import { CheerioAPI, load } from "cheerio";
import { fetchApi, fetchFile } from "@libs/fetch";
import { Plugin } from "@typings/plugin";
import { NovelStatus } from "@libs/novelStatus";
import { defaultCover } from "@libs/defaultCover";
import { Filters } from "@libs/filterInputs";
import dayjs from "dayjs";

interface LightNovelWPOptions {
  reverseChapters?: boolean;
  lang?: string;
}

export interface LightNovelWPMetadata {
  id: string;
  sourceSite: string;
  sourceName: string;
  options?: LightNovelWPOptions;
  filters?: any;
}

class LightNovelWPPlugin implements Plugin.PluginBase {
  id: string;
  name: string;
  icon: string;
  site: string;
  version: string;
  options?: LightNovelWPOptions;
  filters?: Filters;

  constructor(metadata: LightNovelWPMetadata) {
    this.id = metadata.id;
    this.name = metadata.sourceName;
    this.icon = `multisrc/lightnovelwp/${metadata.id}.png`;
    this.site = metadata.sourceSite;
    this.version = "1.0.1";
    this.options = metadata.options;
    this.filters = metadata.filters satisfies Filters;
  }

  getHostname(url: string): string {
    return url.split("/")[2];
  }

  async getCheerio(url: string, search: boolean): Promise<CheerioAPI> {
    const r = await fetchApi(url);
    if (!r.ok && search != true) throw new Error("You got banned ? (check in webview)");
    const body = await r.text();
    const loadedCheerio = load(body);
    if (this.getHostname(url) != this.getHostname(r.url) ||
      loadedCheerio("title").text().trim() == "Bot Verification")
      throw new Error("Captcha error, please open in webview");

    return (loadedCheerio);
  }

  parseNovels($: CheerioAPI): Plugin.NovelItem[] {
    const novels: Plugin.NovelItem[] = [];

    $("div.listupd > article").each(function () {
      const novelName = $(this).find("h2").text();
      const image = $(this).find("img");
      const novelUrl = $(this).find("a").attr("href");

      if (novelUrl) {
        novels.push({
          name: novelName,
          cover: image.attr("data-src") || image.attr("src") || defaultCover,
          url: novelUrl,
        });
      }
    });
    return novels;
  }

  async popularNovels(page: number, { filters, showLatestNovels }: Plugin.PopularNovelsOptions <typeof this.filters>): Promise<Plugin.NovelItem[]> {
    let url = this.site + "/series/?page=" + page;
    if (!filters) filters = {};
    if (showLatestNovels) url += "&order=latest";
    for (const key in filters) {
      if (typeof filters[key].value === "object")
        for (const value of filters[key].value as string[])
          url += `&${key}=${value}`;
      else if (filters[key].value)
        url += `&${key}=${filters[key].value}`;
    }
    const $ = await this.getCheerio(url, false);
    return this.parseNovels($);
  }

  async parseNovelAndChapters(url: string): Promise<Plugin.SourceNovel> {
    const $ = await this.getCheerio(url, false);

    const novel: Plugin.SourceNovel = { url };

    novel.name = $("h1.entry-title").text().trim();
    const image = $("img.wp-post-image");
    novel.cover = image.attr("data-src") || image.attr("src") || defaultCover;
    switch ($("div.sertostat > span").attr("class")?.toLowerCase() || "") {
      case "completed":
        novel.status = NovelStatus.Completed;
        break;
      case "ongoing":
        novel.status = NovelStatus.Ongoing;
        break;
      case "hiatus":
        novel.status = NovelStatus.OnHiatus;
        break;
      default:
        novel.status = NovelStatus.Unknown;
        break;
    }

    let details = $("div.serl > span")
    if (!details.length) details = $("div.spe > span");
    details.each(function () {
      const detailName = $(this).contents().first().text().replace(":", "").trim().toLowerCase();
      const detail = $(this).contents().last().text().trim().toLowerCase();

      switch (detailName) {
        case "الكاتب":
        case "author":
        case "auteur":
          novel.author = detail;
          break;
        case "الحالة":
        case "status":
          switch (detail) {
            case "مكتملة":
            case "completed":
              novel.status = NovelStatus.Completed;
              break;
            case "مستمرة":
            case "ongoing":
              novel.status = NovelStatus.Ongoing;
              break;
            case "متوقفة":
            case "hiatus":
              novel.status = NovelStatus.OnHiatus;
              break;
            default:
              novel.status = NovelStatus.Unknown;
              break;
          }
          break;
        case "الفنان":
        case "artist":
        case "artiste":
          novel.artist = detail;
          break;
      }
    });

    let genres = $(".sertogenre")
    if (!genres.length) genres = $(".genxed")
    novel.genres = genres
      .children("a")
      .map((i, el) => $(el).text())
      .toArray()
      .join(",");

    let summary = $(".sersys > p").map((i, el) => $(el).text().trim()).toArray();
    if (!summary.length) summary = $(".entry-content > p").map((i, el) => $(el).text().trim()).toArray();
    novel.summary = summary.join("\n");

    const chapters: Plugin.ChapterItem[] = [];
    $(".eplister li").each(function () {
      const chapterName = $(this).find(".epl-num").text() + " " + $(this).find(".epl-title").text();
      const chapterUrl = $(this).find("a").attr("href") || "";
      const releaseTime = $(this).find(".epl-date").text().trim();
      let isFreeChapter: boolean;
      switch ($(this).find(".epl-price").text().trim().toLowerCase()) {
        case "free":
        case "gratuit":
        case "مجاني":
        case "":
          isFreeChapter = true;
          break;
        default:
          isFreeChapter = false;
          break;
      }
      if (isFreeChapter)
        chapters.push({
          name: chapterName,
          url: chapterUrl,
          releaseTime: dayjs(releaseTime, "MMMM D, YYYY").toDate().toString(),
        });
    });

    if (this.options?.reverseChapters && chapters.length) chapters.reverse();

    novel.chapters = chapters;
    return novel;
  }

  async parseChapter(chapterUrl: string): Promise<string> {
    const $ = await this.getCheerio(chapterUrl, false);
    const chapterText = $(".epcontent").html() || "";
    return chapterText;
  }

  async searchNovels(searchTerm: string, page: number): Promise<Plugin.NovelItem[]> {
    const url = this.site + "page/" + page + "/?s=" + searchTerm;
    const $ = await this.getCheerio(url, true);
    return this.parseNovels($);
  }

  fetchImage = fetchFile;
}
