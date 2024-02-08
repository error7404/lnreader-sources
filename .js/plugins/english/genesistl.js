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
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var Genesis = /** @class */ (function () {
    function Genesis() {
        this.id = "genesistls";
        this.name = "GenesisTLs";
        this.icon = "src/en/genesistls/icon.png";
        this.site = "https://genesistls.com/";
        this.version = "1.0.0";
        this.filters = {
            order: {
                label: "Sort By",
                options: [
                    { label: "Default", value: "" },
                    { label: "A-Z", value: "title" },
                    { label: "Z-A", value: "titlereverse" },
                    { label: "Latest Update", value: "update" },
                    { label: "Latest Added", value: "latest" },
                    { label: "Popular", value: "popular" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
                value: "",
            },
            status: {
                label: "Status",
                options: [
                    { label: "All", value: "" },
                    { label: "Ongoing", value: "ongoing" },
                    { label: "Hiatus", value: "hiatus" },
                    { label: "Completed", value: "completed" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
                value: "",
            },
            type: {
                label: "Type",
                options: [
                    { label: "korean novel", value: "korean-novel" },
                    { label: "Web Novel", value: "web-novel" },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
                value: [],
            },
            genres: {
                label: "Genres",
                options: [
                    { label: "Academy", value: "academy" },
                    { label: "Action", value: "action" },
                    { label: "Adult", value: "adult" },
                    { label: "Adventure", value: "adventure" },
                    { label: "Another World", value: "another-world" },
                    { label: "Comdey", value: "comdey" },
                    { label: "Comedy", value: "comedy" },
                    { label: "Dark Fantasy", value: "dark-fantasy" },
                    { label: "Drama", value: "drama" },
                    { label: "Fantasy", value: "fantasy" },
                    { label: "Fantasy Fusion", value: "fantasy-fusion" },
                    { label: "Harem", value: "harem" },
                    { label: "Historical", value: "historical" },
                    { label: "Horror", value: "horror" },
                    { label: "Hunter", value: "hunter" },
                    { label: "Light Novel", value: "light-novel" },
                    { label: "Martial Arts", value: "martial-arts" },
                    { label: "Mature", value: "mature" },
                    { label: "Misunderstanding", value: "misunderstanding" },
                    { label: "Modern", value: "modern" },
                    { label: "Munchkin", value: "munchkin" },
                    { label: "Murim", value: "murim" },
                    { label: "mystery", value: "mystery" },
                    { label: "No Harem", value: "no-harem" },
                    { label: "NO NTR", value: "no-ntr" },
                    { label: "obsession", value: "obsession" },
                    { label: "Possession", value: "possession" },
                    { label: "Psychological", value: "psychological" },
                    { label: "Regression", value: "regression" },
                    { label: "Regret", value: "regret" },
                    { label: "reincarnation", value: "reincarnation" },
                    { label: "Romance", value: "romance" },
                    { label: "School Life", value: "school-life" },
                    { label: "Seinen", value: "seinen" },
                    { label: "Slice of life", value: "slice-of-life" },
                    { label: "Supernatural", value: "supernatural" },
                    { label: "Tragedy", value: "tragedy" },
                    { label: "Transmigrated to Game", value: "transmigrated-to-game" },
                    { label: "Transmigration", value: "transmigration" },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
                value: [],
            },
        };
    }
    Genesis.prototype.parseNovels = function (loadedCheerio) {
        var novels = [];
        loadedCheerio("article.bs").each(function () {
            var novelName = loadedCheerio(this).find(".ntitle").text().trim();
            var image = loadedCheerio(this).find("img");
            var novelCover = image.attr("data-src") || image.attr("src");
            var novelUrl = loadedCheerio(this).find("a").attr("href");
            if (!novelUrl)
                return;
            var novel = {
                name: novelName,
                cover: novelCover,
                url: novelUrl,
            };
            novels.push(novel);
        });
        return novels;
    };
    Genesis.prototype.popularNovels = function (pageNo, _a) {
        var filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var link, body, loadedCheerio;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        link = "".concat(this.site, "series/?page=").concat(pageNo);
                        if (filters.genres.value.length)
                            link += filters.genres.value.map(function (i) { return "&genre[]=".concat(i); }).join("");
                        if (filters.type.value.length)
                            link += filters.type.value.map(function (i) { return "&type[]=".concat(i); }).join("");
                        link += "&status=" + filters.status.value;
                        link += "&order=" + filters.order.value;
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(link).then(function (result) {
                                return result.text();
                            })];
                    case 1:
                        body = _b.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        return [2 /*return*/, this.parseNovels(loadedCheerio)];
                }
            });
        });
    };
    Genesis.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio, novel, chapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = novelUrl;
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            url: url,
                            chapters: [],
                        };
                        novel.name = loadedCheerio(".entry-title").text();
                        novel.cover =
                            loadedCheerio("img.wp-post-image").attr("data-src") ||
                                loadedCheerio("img.wp-post-image").attr("src");
                        loadedCheerio("div.spe > span").each(function () {
                            var detailName = loadedCheerio(this).find("b").text().trim();
                            var detail = loadedCheerio(this)
                                .find("b")
                                .remove()
                                .end()
                                .text()
                                .trim();
                            switch (detailName) {
                                case "Author:":
                                    novel.author = detail;
                                    break;
                                case "Status:":
                                    novel.status = detail;
                                    break;
                            }
                        });
                        novel.genres = loadedCheerio(".genxed")
                            .text()
                            .trim()
                            .replace(/\s/g, ",");
                        loadedCheerio('div[itemprop="description"]  h3,p.a,strong').remove();
                        novel.summary = loadedCheerio('div[itemprop="description"]')
                            .find("br")
                            .replaceWith("\n")
                            .end()
                            .text();
                        chapter = [];
                        loadedCheerio(".eplister")
                            .find("li")
                            .each(function () {
                            var chapterUrl = loadedCheerio(this).find("a").attr("href");
                            if (!chapterUrl)
                                return;
                            var chapterpaid = loadedCheerio(this).find('.epl-price').text();
                            if (chapterpaid !== "Free")
                                return;
                            var chapterName = loadedCheerio(this).find(".epl-num").text() +
                                " - " +
                                loadedCheerio(this).find(".epl-title").text();
                            var releaseDate = loadedCheerio(this)
                                .find(".epl-date")
                                .text()
                                .trim();
                            if (!releaseDate)
                                return;
                            var months = [
                                "jan",
                                "feb",
                                "mar",
                                "apr",
                                "may",
                                "jun",
                                "jul",
                                "aug",
                                "sep",
                                "oct",
                                "nov",
                                "dec",
                            ];
                            var rx = new RegExp("(".concat(months.join("|"), ").*? (\\d{2}).*?(\\d{4})"), "i").exec(releaseDate);
                            if (!rx)
                                return;
                            var year = +rx[3];
                            var month = months.indexOf(rx[1].toLowerCase());
                            var day = +rx[2];
                            if (month < 0)
                                return;
                            chapter.push({
                                name: chapterName,
                                releaseTime: new Date(year, month, day).toISOString(),
                                url: chapterUrl,
                            });
                        });
                        novel.chapters = chapter.reverse();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    Genesis.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterText = loadedCheerio(".epcontent").html() || "";
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    Genesis.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "page/").concat(pageNo, "/?s=").concat(searchTerm);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        return [2 /*return*/, this.parseNovels(loadedCheerio)];
                }
            });
        });
    };
    Genesis.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchFile)(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Genesis;
}());
exports.default = new Genesis();
