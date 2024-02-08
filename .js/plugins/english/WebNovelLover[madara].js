"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var cheerio_1 = require("cheerio");
var defaultCover_1 = require("@libs/defaultCover");
var novelStatus_1 = require("@libs/novelStatus");
var dayjs_1 = __importDefault(require("dayjs"));
var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
var includesAny = function (str, keywords) {
    return new RegExp(keywords.join("|")).test(str);
};
var MadaraDefaultPath = {
    genres: "novel-genre",
    novels: "novel",
    novel: "novel",
    chapter: "novel",
};
var MadaraPlugin = /** @class */ (function () {
    function MadaraPlugin(metadata) {
        this.fetchImage = fetch_1.fetchFile;
        this.parseData = function (date) {
            var _a;
            var dayJSDate = (0, dayjs_1.default)(); // today
            var timeAgo = ((_a = date.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
            var timeAgoInt = parseInt(timeAgo, 10);
            if (!timeAgo)
                return date; // there is no number!
            if (includesAny(date, ["detik", "segundo", "second", "วินาที"])) {
                dayJSDate.subtract(timeAgoInt, "second"); // go back N seconds
            }
            else if (includesAny(date, [
                "menit",
                "dakika",
                "min",
                "minute",
                "minuto",
                "นาที",
                "دقائق",
            ])) {
                dayJSDate.subtract(timeAgoInt, "minute"); // go back N minute
            }
            else if (includesAny(date, [
                "jam",
                "saat",
                "heure",
                "hora",
                "hour",
                "ชั่วโมง",
                "giờ",
                "ore",
                "ساعة",
                "小时",
            ])) {
                dayJSDate.subtract(timeAgoInt, "hours"); // go back N hours
            }
            else if (includesAny(date, [
                "hari",
                "gün",
                "jour",
                "día",
                "dia",
                "day",
                "วัน",
                "ngày",
                "giorni",
                "أيام",
                "天",
            ])) {
                dayJSDate.subtract(timeAgoInt, "days"); // go back N days
            }
            else if (includesAny(date, ["week", "semana"])) {
                dayJSDate.subtract(timeAgoInt, "week"); // go back N a week
            }
            else if (includesAny(date, ["month", "mes"])) {
                dayJSDate.subtract(timeAgoInt, "month"); // go back N months
            }
            else if (includesAny(date, ["year", "año"])) {
                dayJSDate.subtract(timeAgoInt, "year"); // go back N years
            }
            else {
                return date;
            }
            return dayJSDate.format("LL");
        };
        this.id = metadata.id;
        this.name = metadata.sourceName;
        var iconFileName = metadata.sourceName.replace(/\s+/g, "").toLowerCase();
        this.icon = "multisrc/madara/icons/".concat(iconFileName, ".png");
        this.site = metadata.sourceSite;
        this.version = "1.0.0";
        this.options = metadata.options;
        this.filters = metadata.filters;
    }
    MadaraPlugin.prototype.popularNovels = function (pageNo, _a) {
        var _b, _c, _d, _e, _f, _g;
        var filters = _a.filters, showLatestNovels = _a.showLatestNovels;
        return __awaiter(this, void 0, void 0, function () {
            var novels, url, body, loadedCheerio;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        novels = [];
                        url = this.site;
                        if ((_b = filters === null || filters === void 0 ? void 0 : filters.genres) === null || _b === void 0 ? void 0 : _b.value) {
                            url +=
                                (((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.path) === null || _d === void 0 ? void 0 : _d.genres) || MadaraDefaultPath.genres) +
                                    "/" + filters.genres.value;
                        }
                        else {
                            url += ((_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.path) === null || _f === void 0 ? void 0 : _f.novels) || MadaraDefaultPath.novels;
                        }
                        url += "/page/" + pageNo + "/?m_orderby=" +
                            (showLatestNovels ? "latest" : ((_g = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _g === void 0 ? void 0 : _g.value) || "rating");
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        body = _h.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        loadedCheerio(".manga-title-badges").remove();
                        loadedCheerio(".page-item-detail").each(function () {
                            var novelName = loadedCheerio(this).find(".post-title").text().trim();
                            var image = loadedCheerio(this).find("img");
                            var novelCover = image.attr("data-src") || image.attr("src");
                            var novelUrl = loadedCheerio(this).find(".post-title").find("a").attr("href") || "";
                            if (!novelName || !novelUrl)
                                return;
                            var novel = {
                                name: novelName,
                                cover: novelCover,
                                url: novelUrl,
                            };
                            novels.push(novel);
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    MadaraPlugin.prototype.parseNovelAndChapters = function (novelUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var novel, body, loadedCheerio, chapters, html, novelId, formData, totalChapters;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        novel = {
                            url: novelUrl,
                        };
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl).then(function (res) { return res.text(); })];
                    case 1:
                        body = _b.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        loadedCheerio(".manga-title-badges, #manga-title span").remove();
                        novel.name =
                            loadedCheerio(".post-title h1").text().trim() ||
                                loadedCheerio("#manga-title h1").text();
                        novel.cover =
                            loadedCheerio(".summary_image > a > img").attr("data-lazy-src") ||
                                loadedCheerio(".summary_image > a > img").attr("data-src") ||
                                loadedCheerio(".summary_image > a > img").attr("src") ||
                                loadedCheerio(".summary_image > a > img").attr("src") ||
                                defaultCover_1.defaultCover;
                        loadedCheerio(".post-content_item, .post-content").each(function () {
                            var detailName = loadedCheerio(this).find("h5").text().trim();
                            var detail = loadedCheerio(this).find(".summary-content").text().trim();
                            switch (detailName) {
                                case "Genre(s)":
                                case "Género(s)":
                                case "التصنيفات":
                                    novel.genres = detail;
                                    break;
                                case "Author(s)":
                                case "Autor(es)":
                                case "المؤلف":
                                case "المؤلف (ين)":
                                    novel.author = detail;
                                    break;
                                case "Status":
                                case "Estado":
                                    novel.status =
                                        detail.includes("OnGoing") || detail.includes("مستمرة")
                                            ? novelStatus_1.NovelStatus.Ongoing
                                            : novelStatus_1.NovelStatus.Completed;
                                    break;
                            }
                        });
                        loadedCheerio("div.summary__content .code-block,script").remove();
                        novel.summary =
                            loadedCheerio("div.summary__content").text().trim() ||
                                loadedCheerio("#tab-manga-about").text().trim() ||
                                loadedCheerio('.post-content_item h5:contains("Summary")')
                                    .next()
                                    .text()
                                    .trim();
                        chapters = [];
                        html = "";
                        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.useNewChapterEndpoint)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl + "ajax/chapters/", {
                                method: "POST",
                            }).then(function (res) { return res.text(); })];
                    case 2:
                        html = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        novelId = loadedCheerio(".rating-post-id").attr("value") ||
                            loadedCheerio("#manga-chapters-holder").attr("data-id") ||
                            "";
                        formData = new FormData();
                        formData.append("action", "manga_get_chapters");
                        formData.append("manga", novelId);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(this.site + "wp-admin/admin-ajax.php", {
                                method: "POST",
                                body: formData,
                            }).then(function (res) { return res.text(); })];
                    case 4:
                        html = _b.sent();
                        _b.label = 5;
                    case 5:
                        if (html !== "0") {
                            loadedCheerio = (0, cheerio_1.load)(html);
                        }
                        totalChapters = loadedCheerio(".wp-manga-chapter").length;
                        loadedCheerio(".wp-manga-chapter").each(function (chapterIndex, element) {
                            var chapterName = loadedCheerio(element).find("a").text().trim();
                            var releaseDate = loadedCheerio(element)
                                .find("span.chapter-release-date")
                                .text()
                                .trim();
                            if (releaseDate) {
                                releaseDate = _this.parseData(releaseDate);
                            }
                            else {
                                releaseDate = (0, dayjs_1.default)().format("LL");
                            }
                            var chapterUrl = loadedCheerio(element).find("a").attr("href") || "";
                            chapters.push({
                                name: chapterName,
                                url: chapterUrl,
                                releaseTime: releaseDate || null,
                                chapterNumber: totalChapters - chapterIndex,
                            });
                        });
                        novel.chapters = chapters.reverse();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    MadaraPlugin.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl).then(function (res) { return res.text(); })];
                    case 1:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterText = loadedCheerio(".text-left").html() ||
                            loadedCheerio(".text-right").html() ||
                            loadedCheerio(".entry-content").html() ||
                            loadedCheerio(".c-blog-post > div > div:nth-child(2)").html() ||
                            "";
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    MadaraPlugin.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var novels, url, body, loadedCheerio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        novels = [];
                        url = this.site + "?s=" + searchTerm + "&post_type=wp-manga";
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        loadedCheerio(".c-tabs-item__content").each(function () {
                            var novelName = loadedCheerio(this).find(".post-title").text().trim();
                            var image = loadedCheerio(this).find("img");
                            var novelCover = image.attr("data-src") || image.attr("src");
                            var novelUrl = loadedCheerio(this).find(".post-title").find("a").attr("href") || "";
                            var novel = {
                                name: novelName,
                                cover: novelCover,
                                url: novelUrl,
                            };
                            novels.push(novel);
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    return MadaraPlugin;
}());
var plugin = new MadaraPlugin({ "id": "webnovelover", "sourceSite": "https://www.webnovelover.com/", "sourceName": "WebNovelLover", "filters": { "sort": { "label": "Order by", "value": "", "options": [{ "label": "Rating", "value": "rating" }, { "label": "A-Z", "value": "alphabet" }, { "label": "Latest", "value": "latest" }, { "label": "Most Views", "value": "views" }, { "label": "New", "value": "new-manga" }, { "label": "Trending", "value": "trending" }], "type": filterInputs_1.FilterTypes.Picker }, "genres": { "label": "GENRES", "value": "", "options": [{ "label": "NONE", "value": "" }, { "label": "Action", "value": "action" }, { "label": "Adapted into drama", "value": "adapted-into-drama" }, { "label": "Adventure", "value": "adventure" }, { "label": "Comedy", "value": "comedy" }, { "label": "Completed", "value": "completed" }, { "label": "Drama", "value": "drama" }, { "label": "English Novel", "value": "english-novel" }, { "label": "Fantasy", "value": "fantasy" }, { "label": "Gender Bender", "value": "gender-bender" }, { "label": "Harem", "value": "harem" }, { "label": "Historical", "value": "historical" }, { "label": "Horror", "value": "horror" }, { "label": "Indo Novel", "value": "indo-novel" }, { "label": "Josei", "value": "josei" }, { "label": "Martial Arts", "value": "martial-arts" }, { "label": "Mature", "value": "mature" }, { "label": "Mystery", "value": "mystery" }, { "label": "Rebirth", "value": "rebirth" }, { "label": "Reincarnation", "value": "reincarnation" }, { "label": "Romance", "value": "romance" }, { "label": "Sci-fi", "value": "sci-fi" }, { "label": "Shoujo", "value": "shoujo" }, { "label": "Shounen", "value": "shounen" }, { "label": "Slice of Life", "value": "slice-of-life" }, { "label": "Spiritual", "value": "spiritual" }, { "label": "Supernatural", "value": "supernatural" }, { "label": "Tragedy", "value": "tragedy" }, { "label": "Transmigration", "value": "transmigration" }, { "label": "University", "value": "university" }, { "label": "Wuxia", "value": "wuxia" }, { "label": "Xianxia", "value": "xianxia" }, { "label": "Xuanhuan", "value": "xuanhuan" }, { "label": "Youth", "value": "youth" }], "type": filterInputs_1.FilterTypes.Picker } } });
exports.default = plugin;
