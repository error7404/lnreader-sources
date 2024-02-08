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
var cheerio_1 = require("cheerio");
var dayjs_1 = __importDefault(require("dayjs"));
var statusKey = [
    novelStatus_1.NovelStatus.Ongoing,
    novelStatus_1.NovelStatus.Completed,
    novelStatus_1.NovelStatus.OnHiatus,
    novelStatus_1.NovelStatus.Cancelled,
];
var RLIB = /** @class */ (function () {
    function RLIB() {
        this.id = "RLIB";
        this.name = "RanobeLib";
        this.site = "https://ranobelib.me";
        this.version = "1.0.0";
        this.icon = "src/ru/ranobelib/icon.png";
        this.ui = undefined;
        this.fetchImage = fetch_1.fetchFile;
        this.filters = {
            sort: {
                label: "Сортировка",
                value: "rate",
                options: [
                    { label: "Рейтинг", value: "rate" },
                    { label: "Имя", value: "name" },
                    { label: "Просмотры", value: "views" },
                    { label: "Дате добавления", value: "created_at" },
                    { label: "Дате обновления", value: "last_chapter_at" },
                    { label: "Количество глав", value: "chap_count" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            order: {
                label: "Порядок",
                value: "desc",
                options: [
                    { label: "По убыванию", value: "desc" },
                    { label: "По возрастанию", value: "asc" },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            type: {
                label: "Тип",
                value: [],
                options: [
                    { label: "Авторский", value: "14" },
                    { label: "Английский", value: "13" },
                    { label: "Китай", value: "12" },
                    { label: "Корея", value: "11" },
                    { label: "Фанфик", value: "15" },
                    { label: "Япония", value: "10" },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
            },
            format: {
                label: "Формат выпуска",
                value: { include: [], exclude: [] },
                options: [
                    { label: "4-кома (Ёнкома)", value: "1" },
                    { label: "В цвете", value: "4" },
                    { label: "Веб", value: "6" },
                    { label: "Вебтун", value: "7" },
                    { label: "Додзинси", value: "3" },
                    { label: "Сборник", value: "2" },
                    { label: "Сингл", value: "5" },
                ],
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
            },
            status: {
                label: "Статус перевода",
                value: [],
                options: [
                    { label: "Продолжается", value: "1" },
                    { label: "Завершен", value: "2" },
                    { label: "Заморожен", value: "3" },
                    { label: "Заброшен", value: "4" },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
            },
            manga_status: {
                label: "Статус тайтла",
                value: [],
                options: [
                    { label: "Онгоинг", value: "1" },
                    { label: "Завершён", value: "2" },
                    { label: "Анонс", value: "3" },
                    { label: "Приостановлен", value: "4" },
                    { label: "Выпуск прекращён", value: "5" },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
            },
            genres: {
                label: "Жанры",
                value: { include: [], exclude: [] },
                options: [
                    { label: "Арт", value: "32" },
                    { label: "Безумие", value: "91" },
                    { label: "Боевик", value: "34" },
                    { label: "Боевые искусства", value: "35" },
                    { label: "Вампиры", value: "36" },
                    { label: "Военное", value: "89" },
                    { label: "Гарем", value: "37" },
                    { label: "Гендерная интрига", value: "38" },
                    { label: "Героическое фэнтези", value: "39" },
                    { label: "Демоны", value: "81" },
                    { label: "Детектив", value: "40" },
                    { label: "Детское", value: "88" },
                    { label: "Дзёсэй", value: "41" },
                    { label: "Драма", value: "43" },
                    { label: "Игра", value: "44" },
                    { label: "Исекай", value: "79" },
                    { label: "История", value: "45" },
                    { label: "Киберпанк", value: "46" },
                    { label: "Кодомо", value: "76" },
                    { label: "Комедия", value: "47" },
                    { label: "Космос", value: "83" },
                    { label: "Магия", value: "85" },
                    { label: "Махо-сёдзё", value: "48" },
                    { label: "Машины", value: "90" },
                    { label: "Меха", value: "49" },
                    { label: "Мистика", value: "50" },
                    { label: "Музыка", value: "80" },
                    { label: "Научная фантастика", value: "51" },
                    { label: "Омегаверс", value: "77" },
                    { label: "Пародия", value: "86" },
                    { label: "Повседневность", value: "52" },
                    { label: "Полиция", value: "82" },
                    { label: "Постапокалиптика", value: "53" },
                    { label: "Приключения", value: "54" },
                    { label: "Психология", value: "55" },
                    { label: "Романтика", value: "56" },
                    { label: "Самурайский боевик", value: "57" },
                    { label: "Сверхъестественное", value: "58" },
                    { label: "Сёдзё", value: "59" },
                    { label: "Сёдзё-ай", value: "60" },
                    { label: "Сёнэн", value: "61" },
                    { label: "Сёнэн-ай", value: "62" },
                    { label: "Спорт", value: "63" },
                    { label: "Супер сила", value: "87" },
                    { label: "Сэйнэн", value: "64" },
                    { label: "Трагедия", value: "65" },
                    { label: "Триллер", value: "66" },
                    { label: "Ужасы", value: "67" },
                    { label: "Фантастика", value: "68" },
                    { label: "Фэнтези", value: "69" },
                    { label: "Школа", value: "70" },
                    { label: "Эротика", value: "71" },
                    { label: "Этти", value: "72" },
                    { label: "Юри", value: "73" },
                    { label: "Яой", value: "74" },
                ],
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
            },
            tags: {
                label: "Теги",
                value: { include: [], exclude: [] },
                options: [
                    { label: "Авантюристы", value: "328" },
                    { label: "Антигерой", value: "176" },
                    { label: "Бессмертные", value: "333" },
                    { label: "Боги", value: "218" },
                    { label: "Борьба за власть", value: "309" },
                    { label: "Брат и сестра", value: "360" },
                    { label: "Ведьма", value: "339" },
                    { label: "Видеоигры", value: "204" },
                    { label: "Виртуальная реальность", value: "214" },
                    { label: "Владыка демонов", value: "349" },
                    { label: "Военные", value: "198" },
                    { label: "Воспоминания из другого мира", value: "310" },
                    { label: "Выживание", value: "212" },
                    { label: "ГГ женщина", value: "294" },
                    { label: "ГГ имба", value: "292" },
                    { label: "ГГ мужчина", value: "295" },
                    { label: "ГГ не ояш", value: "325" },
                    { label: "ГГ не человек", value: "331" },
                    { label: "ГГ ояш", value: "326" },
                    { label: "Главный герой бог", value: "324" },
                    { label: "Глупый ГГ", value: "298" },
                    { label: "Горничные", value: "171" },
                    { label: "Гуро", value: "306" },
                    { label: "Гяру", value: "197" },
                    { label: "Демоны", value: "157" },
                    { label: "Драконы", value: "313" },
                    { label: "Древний мир", value: "317" },
                    { label: "Зверолюди", value: "163" },
                    { label: "Зомби", value: "155" },
                    { label: "Исторические фигуры", value: "323" },
                    { label: "Кулинария", value: "158" },
                    { label: "Культивация", value: "161" },
                    { label: "ЛГБТ", value: "344" },
                    { label: "ЛитРПГ", value: "319" },
                    { label: "Лоли", value: "206" },
                    { label: "Магия", value: "170" },
                    { label: "Машинный перевод", value: "345" },
                    { label: "Медицина", value: "159" },
                    { label: "Межгалактическая война", value: "330" },
                    { label: "Монстр Девушки", value: "207" },
                    { label: "Монстры", value: "208" },
                    { label: "Мрачный мир", value: "316" },
                    { label: "Музыка", value: "358" },
                    { label: "Музыка", value: "209" },
                    { label: "Ниндзя", value: "199" },
                    { label: "Обратный Гарем", value: "210" },
                    { label: "Офисные Работники", value: "200" },
                    { label: "Пираты", value: "341" },
                    { label: "Подземелья", value: "314" },
                    { label: "Политика", value: "311" },
                    { label: "Полиция", value: "201" },
                    { label: "Преступники / Криминал", value: "205" },
                    { label: "Призраки / Духи", value: "196" },
                    { label: "Призыватели", value: "329" },
                    { label: "Прыжки между мирами", value: "321" },
                    { label: "Путешествие в другой мир", value: "318" },
                    { label: "Путешествие во времени", value: "213" },
                    { label: "Рабы", value: "355" },
                    { label: "Ранги силы", value: "312" },
                    { label: "Реинкарнация", value: "154" },
                    { label: "Самураи", value: "202" },
                    { label: "Скрытие личности", value: "315" },
                    { label: "Средневековье", value: "174" },
                    { label: "Традиционные игры", value: "203" },
                    { label: "Умный ГГ", value: "303" },
                    { label: "Характерный рост", value: "332" },
                    { label: "Хикикомори", value: "167" },
                    { label: "Эволюция", value: "322" },
                    { label: "Элементы РПГ", value: "327" },
                    { label: "Эльфы", value: "217" },
                    { label: "Якудза", value: "165" },
                ],
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
            },
        };
    }
    RLIB.prototype.popularNovels = function (pageNo, _a) {
        var _b, _c, _d, _e;
        var showLatestNovels = _a.showLatestNovels, filters = _a.filters;
        return __awaiter(this, void 0, void 0, function () {
            var url, result, loadedCheerio, novels;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        url = this.site + "/manga-list?sort=";
                        url += showLatestNovels ? "last_chapter_at" : ((_b = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _b === void 0 ? void 0 : _b.value) || "rate";
                        url += "&dir=" + (((_c = filters === null || filters === void 0 ? void 0 : filters.order) === null || _c === void 0 ? void 0 : _c.value) || "desc");
                        Object.entries(filters || {}).forEach(function (_a) {
                            var type = _a[0], value = _a[1].value;
                            if (value instanceof Array && value.length) {
                                url += "&" + type + "[]=" + value.join("&" + type + "[]=");
                            }
                            if ((value === null || value === void 0 ? void 0 : value.include) instanceof Array && value.include.length) {
                                url += "&" + type + "[include][]=" +
                                    value.include.join("&" + type + "[include][]=");
                            }
                            if ((value === null || value === void 0 ? void 0 : value.exclude) instanceof Array && value.exclude.length) {
                                url += "&" + type + "[exclude][]=" +
                                    value.exclude.join("&" + type + "[exclude][]=");
                            }
                        });
                        url += "&page=" + pageNo;
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url).then(function (res) { return res.text(); })];
                    case 1:
                        result = _f.sent();
                        loadedCheerio = (0, cheerio_1.load)(result);
                        this.ui = (_e = (_d = loadedCheerio("a.header-right-menu__item")
                            .attr("href")) === null || _d === void 0 ? void 0 : _d.replace) === null || _e === void 0 ? void 0 : _e.call(_d, /[^0-9]/g, "");
                        novels = [];
                        loadedCheerio(".media-card-wrap").each(function () {
                            var name = loadedCheerio(this).find(".media-card__title").text();
                            var cover = loadedCheerio(this).find("a.media-card").attr("data-src");
                            var url = loadedCheerio(this).find("a.media-card").attr("href");
                            if (!url)
                                return;
                            novels.push({ name: name, cover: cover, url: url });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    RLIB.prototype.parseNovelAndChapters = function (novelUrl) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var body, loadedCheerio, novel, chapters, chaptersRaw, chaptersJson, totalChapters;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(novelUrl).then(function (res) { return res.text(); })];
                    case 1:
                        body = _j.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            url: novelUrl,
                        };
                        novel.name = loadedCheerio(".media-name__main").text().trim();
                        novel.cover = loadedCheerio(".container_responsive img").attr("src");
                        novel.summary = loadedCheerio(".media-description__text").text().trim();
                        novel.genres = loadedCheerio('div[class="media-tags"]')
                            .text()
                            .trim()
                            .replace(/[\n\r]+/g, ", ")
                            .replace(/  /g, "");
                        loadedCheerio('div[class="media-info-list paper"] > [class="media-info-list__item"]').each(function () {
                            var name = loadedCheerio(this)
                                .find('div[class="media-info-list__title"]')
                                .text();
                            if (name === "Автор") {
                                novel.author = loadedCheerio(this)
                                    .find('div[class="media-info-list__value"]')
                                    .text()
                                    .trim();
                            }
                            else if (name === "Художник") {
                                novel.artist = loadedCheerio(this)
                                    .find('div[class="media-info-list__value"]')
                                    .text()
                                    .trim();
                            }
                        });
                        chapters = [];
                        chaptersRaw = body.match(/window.__DATA__ = [\s\S]*?window._SITE_COLOR_/gm);
                        chaptersRaw = (_d = (_c = (_b = (_a = chaptersRaw === null || chaptersRaw === void 0 ? void 0 : chaptersRaw[0]) === null || _a === void 0 ? void 0 : _a.replace("window.__DATA__ = ", "")) === null || _b === void 0 ? void 0 : _b.replace("window._SITE_COLOR_", "")) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.slice(0, -1);
                        chaptersJson = JSON.parse(chaptersRaw);
                        totalChapters = ((_e = chaptersJson.chapters.list) === null || _e === void 0 ? void 0 : _e.length) || 0;
                        novel.status = statusKey[chaptersJson.manga.status - 1] || novelStatus_1.NovelStatus.Unknown;
                        this.ui = (_f = chaptersJson === null || chaptersJson === void 0 ? void 0 : chaptersJson.user) === null || _f === void 0 ? void 0 : _f.id;
                        (_h = (_g = chaptersJson.chapters) === null || _g === void 0 ? void 0 : _g.list) === null || _h === void 0 ? void 0 : _h.forEach(function (chapter, chapterIndex) {
                            return chapters.push({
                                name: "Том " + chapter.chapter_volume +
                                    " Глава " + chapter.chapter_number +
                                    (chapter.chapter_name ? " " + chapter.chapter_name.trim() : ""),
                                url: _this.site + "/" + chaptersJson.manga.slug +
                                    "/v" + chapter.chapter_volume + "/c" + chapter.chapter_number +
                                    "?bid=" + (chapter.branch_id || ""),
                                releaseTime: (0, dayjs_1.default)(chapter.chapter_created_at).format("LLL"),
                                chapterNumber: totalChapters - chapterIndex,
                            });
                        });
                        novel.chapters = chapters.reverse();
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    RLIB.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, loadedCheerio, chapterText;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(chapterUrl + (this.ui ? "&ui=" + this.ui : "")).then(function (res) { return res.text(); })];
                    case 1:
                        result = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(result);
                        loadedCheerio(".reader-container img").each(function (index, element) {
                            var src = loadedCheerio(element).attr("data-src") ||
                                loadedCheerio(element).attr("src");
                            if (!(src === null || src === void 0 ? void 0 : src.startsWith("http"))) {
                                loadedCheerio(element).attr("src", _this.site + src);
                            }
                            else {
                                loadedCheerio(element).attr("src", src);
                            }
                            loadedCheerio(element).removeAttr("data-src");
                        });
                        chapterText = loadedCheerio(".reader-container").html();
                        return [2 /*return*/, chapterText || ""];
                }
            });
        });
    };
    RLIB.prototype.searchNovels = function (searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var result, body, novels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)("".concat(this.site, "/search?q=").concat(searchTerm, "&type=manga"))];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = (_a.sent());
                        novels = [];
                        body.forEach(function (novel) {
                            return novels.push({
                                name: (novel === null || novel === void 0 ? void 0 : novel.rus_name) || novel.name,
                                cover: novel === null || novel === void 0 ? void 0 : novel.coverImage,
                                url: (novel === null || novel === void 0 ? void 0 : novel.href) || _this.site + "/" + novel.slug,
                            });
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    return RLIB;
}());
exports.default = new RLIB();
