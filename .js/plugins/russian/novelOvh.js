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
var filterInputs_1 = require("@libs/filterInputs");
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var dayjs_1 = __importDefault(require("dayjs"));
var novelOvh = /** @class */ (function () {
    function novelOvh() {
        var _this = this;
        this.id = "novelovh";
        this.name = "НовелОВХ";
        this.site = "https://novel.ovh";
        this.version = "1.0.0";
        this.icon = "src/ru/novelOvh/icon.png";
        this.jsonToHtml = function (json, image, html) {
            if (html === void 0) { html = ""; }
            json.forEach(function (element) {
                var _a, _b, _c;
                switch (element.type) {
                    case "image":
                        if ((_b = (_a = element.attrs) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b[0]) {
                            html += "<img src=\"".concat(image[element.attrs.pages[0]], "\"/>");
                        }
                        break;
                    case "hardBreak":
                        html += "<br>";
                        break;
                    case "horizontalRule":
                    case "delimiter":
                        html += '<h2 style="text-align: center">***</h2>';
                        break;
                    case "paragraph":
                        html +=
                            "<p" +
                                (((_c = element === null || element === void 0 ? void 0 : element.attrs) === null || _c === void 0 ? void 0 : _c.textAlign)
                                    ? " style=\"text-align: ".concat(element.attrs.textAlign, "\"")
                                    : "") +
                                ">" +
                                (element.content ? _this.jsonToHtml(element.content, image) : "<br>") +
                                "</p>";
                        break;
                    case "text":
                        html += element.text;
                        break;
                    default:
                        html += JSON.stringify(element, null, "\t"); //maybe I missed something.
                        break;
                }
            });
            return html;
        };
        this.fetchImage = fetch_1.fetchFile;
        this.filters = {
            sort: {
                label: "Сортировка",
                value: "averageRating",
                options: [
                    { label: "Кол-во просмотров", value: "viewsCount" },
                    { label: "Кол-во лайков", value: "likesCount" },
                    { label: "Кол-во глав", value: "chaptersCount" },
                    { label: "Кол-во закладок", value: "bookmarksCount" },
                    { label: "Рейтингу", value: "averageRating" },
                    { label: "Дате создания", value: "createdAt" },
                    { label: "Дате обновления", value: "updatedAt" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    novelOvh.prototype.popularNovels = function (pageNo, _a) {
        var _b;
        var showLatestNovels = _a.showLatestNovels, filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, novels;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.site + "/novel?page=" + (pageNo - 1);
                        url += "&sort=" +
                            (showLatestNovels ? "updatedAt" : ((_b = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _b === void 0 ? void 0 : _b.value) || "averageRating") + ",desc";
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url + "&_data=routes/reader/book/index")];
                    case 1:
                        result = _c.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = (_c.sent());
                        novels = [];
                        body.books.forEach(function (novel) {
                            return novels.push({
                                name: novel.name.ru,
                                cover: novel.poster,
                                url: _this.site + "/novel/" + novel.slug,
                            });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    novelOvh.prototype.parseNovelAndChapters = function (novelUrl) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var result, json, novel, chapters;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl + "?_data=routes/reader/book/$slug/index")];
                    case 1:
                        result = _d.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = (_d.sent());
                        novel = {
                            url: novelUrl,
                            name: json.book.name.ru,
                            cover: json.book.poster,
                            genres: (_b = (_a = json.book.labels) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.call(_a, function (label) { return label.name; }).join(","),
                            summary: json.book.description,
                            status: json.book.status == "ONGOING"
                                ? novelStatus_1.NovelStatus.Ongoing
                                : novelStatus_1.NovelStatus.Completed,
                        };
                        (_c = json.book.relations) === null || _c === void 0 ? void 0 : _c.forEach(function (person) {
                            switch (person.type) {
                                case "AUTHOR":
                                    novel.author = person.publisher.name;
                                case "ARTIST":
                                    novel.artist = person.publisher.name;
                            }
                        });
                        chapters = [];
                        json.chapters.forEach(function (chapter, chapterIndex) {
                            return chapters.push({
                                name: chapter.title ||
                                    "Том " + (chapter.volume || 0) + " " +
                                        (chapter.name || "Глава " +
                                            (chapter.number || json.chapters.length - chapterIndex)),
                                url: novelUrl + "/" + chapter.id + "/0",
                                releaseTime: (0, dayjs_1.default)(chapter.createdAt).format("LLL"),
                                chapterNumber: json.chapters.length - chapterIndex,
                            });
                        });
                        novel.chapters = chapters.reverse();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    novelOvh.prototype.parseChapter = function (chapterUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, book, image, chapterText;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)("https://api.novel.ovh/v2/chapters/" + chapterUrl.split("/")[5])];
                    case 1:
                        result = _b.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        book = (_b.sent());
                        image = Object.fromEntries(((_a = book === null || book === void 0 ? void 0 : book.pages) === null || _a === void 0 ? void 0 : _a.map(function (_a) {
                            var id = _a.id, image = _a.image;
                            return [id, image];
                        })) || []);
                        chapterText = this.jsonToHtml(book.content.content || [], image);
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    novelOvh.prototype.searchNovels = function (searchTerm, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, novels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "/novel?search=").concat(searchTerm, "&page=").concat(page - 1);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url + "&_data=routes/reader/book/index")];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = (_a.sent());
                        novels = [];
                        body.books.forEach(function (novel) {
                            return novels.push({
                                name: novel.name.ru,
                                cover: novel.poster,
                                url: _this.site + "/novel/" + novel.slug,
                            });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    return novelOvh;
}());
exports.default = new novelOvh();
