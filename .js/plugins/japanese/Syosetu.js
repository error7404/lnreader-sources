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
var defaultCover_1 = require("@libs/defaultCover");
var filterInputs_1 = require("@libs/filterInputs");
// const novelStatus = require('@libs/novelStatus');
// const isUrlAbsolute = require('@libs/isAbsoluteUrl');
// const parseDate = require('@libs/parseDate');
var Syosetu = /** @class */ (function () {
    function Syosetu() {
        this.id = "yomou.syosetu";
        this.name = "Syosetu";
        this.icon = "src/jp/syosetu/icon.png";
        this.site = "https://yomou.syosetu.com/";
        this.version = "1.1.0";
        this.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        };
        this.searchUrl = function (pagenum, order) {
            return "https://yomou.syosetu.com/search.php?order=".concat(order || "hyoka").concat(pagenum !== undefined
                ? "&p=".concat(pagenum <= 1 || pagenum > 100 ? "1" : pagenum) // check if pagenum is between 1 and 100
                : "" // if isn't don't set ?p
            );
        };
        this.filters = {
            ranking: {
                type: filterInputs_1.FilterTypes.Picker,
                label: "Ranked by",
                options: [
                    { label: "日間", value: "daily" },
                    { label: "週間", value: "weekly" },
                    { label: "月間", value: "monthly" },
                    { label: "四半期", value: "quarter" },
                    { label: "年間", value: "yearly" },
                    { label: "累計", value: "total" },
                ],
                value: "total",
            },
            genre: {
                type: filterInputs_1.FilterTypes.Picker,
                label: "Ranking Genre",
                options: [
                    { label: "総ジャンル", value: "" },
                    { label: "異世界転生/転移〔恋愛〕〕", value: "1" },
                    { label: "異世界転生/転移〔ファンタジー〕", value: "2" },
                    { label: "異世界転生/転移〔文芸・SF・その他〕", value: "o" },
                    { label: "異世界〔恋愛〕", value: "101" },
                    { label: "現実世界〔恋愛〕", value: "102" },
                    { label: "ハイファンタジー〔ファンタジー〕", value: "201" },
                    { label: "ローファンタジー〔ファンタジー〕", value: "202" },
                    { label: "純文学〔文芸〕", value: "301" },
                    { label: "ヒューマンドラマ〔文芸〕", value: "302" },
                    { label: "歴史〔文芸〕", value: "303" },
                    { label: "推理〔文芸〕", value: "304" },
                    { label: "ホラー〔文芸〕", value: "305" },
                    { label: "アクション〔文芸〕", value: "306" },
                    { label: "コメディー〔文芸〕", value: "307" },
                    { label: "VRゲーム〔SF〕", value: "401" },
                    { label: "宇宙〔SF〕", value: "402" },
                    { label: "空想科学〔SF〕", value: "403" },
                    { label: "パニック〔SF〕", value: "404" },
                    { label: "童話〔その他〕", value: "9901" },
                    { label: "詩〔その他〕", value: "9902" },
                    { label: "エッセイ〔その他〕", value: "9903" },
                    { label: "その他〔その他〕", value: "9999" },
                ],
                value: "",
            },
            modifier: {
                type: filterInputs_1.FilterTypes.Picker,
                label: "Modifier",
                options: [
                    { label: "すべて", value: "total" },
                    { label: "連載中", value: "r" },
                    { label: "完結済", value: "er" },
                    { label: "短編", value: "t" },
                ],
                value: "total",
            },
        };
    }
    Syosetu.prototype.popularNovels = function (pageNo, _a) {
        var filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var getNovelsFromPage, novels;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getNovelsFromPage = function (pagenumber) { return __awaiter(_this, void 0, void 0, function () {
                            var url, html, loadedCheerio, novels;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        url = this.site;
                                        if (!filters.genre.value) {
                                            url += "rank/list/type/".concat(filters.ranking.value, "_").concat(filters.modifier.value, "/?p=").concat(pagenumber);
                                        }
                                        else {
                                            url += "rank/".concat(filters.genre.value.length === 1
                                                ? "isekailist"
                                                : "genrelist", "/type/").concat(filters.ranking.value, "_").concat(filters.genre.value).concat(filters.modifier.value === "total"
                                                ? ""
                                                : "_".concat(filters.modifier.value), "/?p=").concat(pagenumber);
                                        }
                                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                                    case 1: return [4 /*yield*/, (_a.sent()).text()];
                                    case 2:
                                        html = _a.sent();
                                        loadedCheerio = (0, cheerio_1.load)(html, {
                                            decodeEntities: false,
                                        });
                                        if (parseInt(loadedCheerio(".is-current").html() || "1") !==
                                            pagenumber)
                                            return [2 /*return*/, []];
                                        novels = [];
                                        loadedCheerio(".c-card").each(function (_, e) {
                                            var anchor = loadedCheerio(e).find(".p-ranklist-item__title a");
                                            var url = anchor.attr("href");
                                            if (!url)
                                                return;
                                            var name = anchor.text();
                                            var novel = {
                                                url: url,
                                                name: name,
                                                cover: defaultCover_1.defaultCover,
                                            };
                                            novels.push(novel);
                                        });
                                        return [2 /*return*/, novels];
                                }
                            });
                        }); };
                        return [4 /*yield*/, getNovelsFromPage(pageNo)];
                    case 1:
                        novels = _b.sent();
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    Syosetu.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var chapters, result, body, loadedCheerio, novel, cqGetChapters, nameResult, nameBody, summaryQuery, foundText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chapters = [];
                        return [4 /*yield*/, fetch(novelUrl, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body, { decodeEntities: false });
                        novel = {
                            url: novelUrl,
                            name: loadedCheerio(".novel_title").text(),
                            author: loadedCheerio(".novel_writername")
                                .text()
                                .replace("作者：", ""),
                            cover: defaultCover_1.defaultCover,
                        };
                        cqGetChapters = loadedCheerio(".novel_sublist2");
                        if (!(cqGetChapters.length !== 0)) return [3 /*break*/, 3];
                        // has more than 1 chapter
                        novel.summary = loadedCheerio("#novel_ex")
                            .text()
                            .replace(/<\s*br.*?>/g, "\n");
                        cqGetChapters.each(function (i, e) {
                            var chapterA = loadedCheerio(this).find("a");
                            var _a = [
                                // set the variables
                                chapterA.text(),
                                loadedCheerio(this)
                                    .find("dt") // get title
                                    .text() // get text
                                    .replace(/（.）/g, "") // remove "(edited)" mark
                                    .trim(),
                                "https://ncode.syosetu.com" + chapterA.attr("href"),
                            ], chapterName = _a[0], releaseDate = _a[1], chapterUrl = _a[2];
                            chapters.push({
                                name: chapterName,
                                releaseTime: releaseDate,
                                url: chapterUrl,
                            });
                        });
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, fetch(this.searchUrl() + "&word=".concat(novel.name), { headers: this.headers })];
                    case 4:
                        nameResult = _a.sent();
                        return [4 /*yield*/, nameResult.text()];
                    case 5:
                        nameBody = _a.sent();
                        summaryQuery = (0, cheerio_1.load)(nameBody, {
                            decodeEntities: false,
                        });
                        foundText = summaryQuery(".searchkekka_box")
                            .first()
                            .find(".ex")
                            .text()
                            .replace(/\s{2,}/g, "\n");
                        novel.summary = foundText;
                        // add single chapter
                        chapters.push({
                            name: "Oneshot",
                            releaseTime: loadedCheerio("head")
                                .find("meta[name='WWWC']")
                                .attr("content"),
                            url: novelUrl, // set chapterUrl to oneshot so that chapterScraper knows it's a one-shot,
                        });
                        _a.label = 6;
                    case 6:
                        novel.chapters = chapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    Syosetu.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, body, cheerioQuery, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(chapterUrl, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        cheerioQuery = (0, cheerio_1.load)(body, {
                            decodeEntities: false,
                        });
                        chapterText = cheerioQuery("#novel_honbun") // get chapter text
                            .html() || "";
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    Syosetu.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var novels, getNovelsFromPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        novels = [];
                        getNovelsFromPage = function (pagenumber) { return __awaiter(_this, void 0, void 0, function () {
                            var url, result, body, cheerioQuery, pageNovels;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        url = this.searchUrl(pagenumber) + "&word=".concat(searchTerm);
                                        console.log(url);
                                        return [4 /*yield*/, fetch(url, { headers: this.headers })];
                                    case 1:
                                        result = _a.sent();
                                        return [4 /*yield*/, result.text()];
                                    case 2:
                                        body = _a.sent();
                                        cheerioQuery = (0, cheerio_1.load)(body, { decodeEntities: false });
                                        pageNovels = [];
                                        // find class=searchkekka_box
                                        cheerioQuery(".searchkekka_box").each(function (i, e) {
                                            // get div with link and name
                                            var novelDIV = cheerioQuery(this).find(".novel_h");
                                            // get link element
                                            var novelA = novelDIV.children()[0];
                                            // add new novel to array
                                            pageNovels.push({
                                                name: novelDIV.text(),
                                                url: novelA.attribs.href,
                                                cover: defaultCover_1.defaultCover,
                                            });
                                        });
                                        // return all novels from this page
                                        return [2 /*return*/, pageNovels];
                                }
                            });
                        }); };
                        return [4 /*yield*/, getNovelsFromPage(pageNo)];
                    case 1:
                        // counter of loaded pages
                        // let pagesLoaded = 0;
                        // do {
                        //     // always load first one
                        //     novels.push(...(await getNovelsFromPage(pagesLoaded + 1)));
                        //     pagesLoaded++;
                        // } while (pagesLoaded < maxPageLoad && isNext); // check if we should load more
                        novels = _a.sent();
                        /** Use
                         * novels.push(...(await getNovelsFromPage(pageNumber)))
                         * if you want to load more
                         */
                        // respond with novels!
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    Syosetu.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, fetch_1.fetchFile)(url)];
            });
        });
    };
    return Syosetu;
}());
exports.default = new Syosetu();
