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
var novelStatus_1 = require("@libs/novelStatus");
var Shu69 = /** @class */ (function () {
    function Shu69() {
        this.id = "69shu";
        this.name = "69书吧";
        this.icon = "src/cn/69shu/icon.png";
        this.site = "https://www.69shu.xyz";
        this.version = "0.2.0";
        this.fetchImage = fetch_1.fetchFile;
        this.filters = {
            rank: {
                label: "排行榜",
                value: "allvisit",
                options: [
                    { label: "总排行榜", value: "allvisit" },
                    { label: "月排行榜", value: "monthvisit" },
                    { label: "周排行榜", value: "weekvisit" },
                    { label: "日排行榜", value: "dayvisit" },
                    { label: "收藏榜", value: "goodnum" },
                    { label: "字数榜", value: "words" },
                    { label: "推荐榜", value: "allvote" },
                    { label: "新书榜", value: "postdate" },
                    { label: "更新榜", value: "lastupdate" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            sort: {
                label: "分类",
                value: "none",
                options: [
                    { label: "无", value: "none" },
                    { label: "全部", value: "all" },
                    { label: "玄幻", value: "xuanhuan" },
                    { label: "仙侠", value: "xianxia" },
                    { label: "都市", value: "dushi" },
                    { label: "历史", value: "lishi" },
                    { label: "游戏", value: "youxi" },
                    { label: "科幻", value: "kehuan" },
                    { label: "灵异", value: "kongbu" },
                    { label: "言情", value: "nvsheng" },
                    { label: "其它", value: "qita" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            }
        };
    }
    Shu69.prototype.popularNovels = function (pageNo, _a) {
        var showLatestNovels = _a.showLatestNovels, filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var url, body, loadedCheerio, novels;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (showLatestNovels) {
                            url = "".concat(this.site, "/rank/lastupdate/").concat(pageNo, ".html");
                        }
                        else if (filters.sort.value === 'none') {
                            url = "".concat(this.site, "/rank/").concat(filters.rank.value, "/").concat(pageNo, ".html");
                        }
                        else {
                            url = "".concat(this.site, "/sort/").concat(filters.sort.value, "/").concat(pageNo, ".html");
                        }
                        return [4 /*yield*/, (0, fetch_1.fetchText)(url)];
                    case 1:
                        body = _b.sent();
                        if (body === '')
                            throw Error('无法获取小说列表，请检查网络');
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio('div.book-coverlist').each(function (i, el) {
                            var url = loadedCheerio(el).find('a.cover').attr('href');
                            var novelName = loadedCheerio(el).find('h4.name').text().trim();
                            var novelCover = loadedCheerio(el).find('a.cover > img').attr('src');
                            var novelUrl = _this.site + url;
                            if (!url)
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
    Shu69.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, loadedCheerio, novel, bookInfo, chapters, allUrl, chaptersUrl, chaptersBody, chaptersLoadedCheerio_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = novelUrl;
                        return [4 /*yield*/, (0, fetch_1.fetchText)(url)];
                    case 1:
                        body = _a.sent();
                        if (body === '')
                            throw Error('无法获取小说内容，请检查网络');
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            url: url,
                            chapters: [],
                        };
                        novel.name = loadedCheerio('h1').text().trim();
                        novel.cover = loadedCheerio('div.cover > img').attr('src');
                        novel.summary = loadedCheerio('#bookIntro').text().trim();
                        bookInfo = loadedCheerio('div.caption-bookinfo > p');
                        novel.author = bookInfo.find("a").attr('title');
                        novel.artist = undefined;
                        novel.status = bookInfo.text().includes('连载') ? novelStatus_1.NovelStatus.Ongoing : novelStatus_1.NovelStatus.Completed;
                        novel.genres = '';
                        chapters = [];
                        allUrl = loadedCheerio('dd.all > a').attr('href');
                        if (!allUrl) return [3 /*break*/, 3];
                        chaptersUrl = this.site + allUrl;
                        return [4 /*yield*/, (0, fetch_1.fetchText)(chaptersUrl)];
                    case 2:
                        chaptersBody = _a.sent();
                        chaptersLoadedCheerio_1 = (0, cheerio_1.load)(chaptersBody);
                        chaptersLoadedCheerio_1('dd').each(function (i, el) {
                            var chapterUrl = _this.site + chaptersLoadedCheerio_1(el).find('a').attr('href');
                            var chapterName = chaptersLoadedCheerio_1(el).find('a').text().trim();
                            chapters.push({
                                name: chapterName,
                                url: chapterUrl,
                            });
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        loadedCheerio('div.panel.hidden-xs > dl.panel-chapterlist:nth-child(2) > dd').each(function (i, el) {
                            var chapterUrl = _this.site + loadedCheerio(el).find('a').attr('href');
                            var chapterName = loadedCheerio(el).find('a').text().trim();
                            chapters.push({
                                name: chapterName,
                                url: chapterUrl,
                            });
                        });
                        _a.label = 4;
                    case 4:
                        novel.chapters = chapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    Shu69.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchText)(chapterUrl)];
                    case 1:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        chapterText = loadedCheerio('#chaptercontent p')
                            .map(function (i, el) { return loadedCheerio(el).text(); })
                            .get()
                            // remove empty lines and 69shu ads
                            .map(function (line) { return line.trim(); })
                            .filter(function (line) { return line !== '' && !line.includes('69书吧'); })
                            .map(function (line) { return "<p>".concat(line, "</p>"); })
                            .join('\n');
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    ;
    Shu69.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var searchUrl, formData, body, loadedCheerio, novels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (pageNo > 1)
                            return [2 /*return*/, []];
                        searchUrl = "".concat(this.site, "/search");
                        formData = new FormData();
                        formData.append('searchkey', searchTerm);
                        return [4 /*yield*/, (0, fetch_1.fetchText)(searchUrl, {
                                method: 'post',
                                body: formData,
                            })];
                    case 1:
                        body = _a.sent();
                        if (body === '')
                            throw Error('无法获取搜索结果，请检查网络');
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio('div.book-coverlist').each(function (i, el) {
                            var url = loadedCheerio(el).find('a.cover').attr('href');
                            var novelName = loadedCheerio(el).find('h4.name').text().trim();
                            var novelCover = loadedCheerio(el).find('a.cover > img').attr('src');
                            var novelUrl = _this.site + url;
                            if (!url)
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
    return Shu69;
}());
exports.default = new Shu69();
