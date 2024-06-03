var e=this&&this.__awaiter||function(e,a,l,t){return new(l||(l=Promise))((function(r,n){function s(e){try{o(t.next(e))}catch(e){n(e)}}function i(e){try{o(t.throw(e))}catch(e){n(e)}}function o(e){var a;e.done?r(e.value):(a=e.value,a instanceof l?a:new l((function(e){e(a)}))).then(s,i)}o((t=t.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var l,t,r,n,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return n={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function i(i){return function(o){return function(i){if(l)throw new TypeError("Generator is already executing.");for(;n&&(n=0,i[0]&&(s=0)),s;)try{if(l=1,t&&(r=2&i[0]?t.return:i[0]?t.throw||((r=t.return)&&r.call(t),0):t.next)&&!(r=r.call(t,i[1])).done)return r;switch(t=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:0};case 5:s.label++,t=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(r=s.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=a.call(e,s)}catch(e){i=[6,e],t=0}finally{l=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:1}}([i,o])}}};Object.defineProperty(exports,"__esModule",{value:1});var l=require("cheerio"),t=require("htmlparser2"),r=require("@libs/fetch"),n=require("@libs/novelStatus"),s=require("@libs/defaultCover");function i(e,a){var l=e.match(/(\d+)$/);l&&l[0]&&(a.chapterNumber=parseInt(l[0]))}var o=new(function(){function o(e){var a,l;this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var t=(null===(a=e.options)||void 0===a?void 0:a.versionIncrements)||0;this.version="1.1.".concat(t),this.options=null!==(l=e.options)&&void 0!==l?l:{},this.filters=e.filters}return o.prototype.getHostname=function(e){var a=(e=e.split("/")[2]).split(".");return a.pop(),a.join(".")},o.prototype.safeFecth=function(l,t){var n,s;return e(this,void 0,void 0,(function(){var e,i,o;return a(this,(function(a){switch(a.label){case 0:return[4,(0,r.fetchApi)(l)];case 1:if(!(e=a.sent()).ok&&1!=t)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return[4,e.text()];case 2:if(i=a.sent(),o=null===(s=null===(n=i.match(/<title>(.*?)<\/title>/))||void 0===n?void 0:n[1])||void 0===s?void 0:s.trim(),this.getHostname(l)!=this.getHostname(e.url)||o&&("Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o))throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},o.prototype.parseNovels=function(e){var a=this,l=[];return(e.match(/<article([\s\S]*?)<\/article>/g)||[]).forEach((function(e){var t,r,n=null===(t=e.match(/<a.*title="(.*?)"/))||void 0===t?void 0:t[1],i=null===(r=e.match(/<a href="(.*?)"/))||void 0===r?void 0:r[1];if(n&&i){var o=e.match(/<img.*src="(.*?)"(?:\sdata-src="(.*?)")?.*\/>/)||[];l.push({name:n,cover:o[2]||o[1]||s.defaultCover,path:i.replace(a.site,"")})}})),l},o.prototype.popularNovels=function(l,t){var r,n,s=t.filters,i=t.showLatestNovels;return e(this,void 0,void 0,(function(){var e,t,o,u,c,v,b;return a(this,(function(a){switch(a.label){case 0:for(o in e=null!==(n=null===(r=this.options)||void 0===r?void 0:r.seriesPath)&&void 0!==n?n:"series/",t=this.site+e+"?page="+l,s||(s=this.filters||{}),i&&(t+="&order=latest"),s)if("object"==typeof s[o].value)for(u=0,c=s[o].value;u<c.length;u++)v=c[u],t+="&".concat(o,"=").concat(v);else s[o].value&&(t+="&".concat(o,"=").concat(s[o].value));return[4,this.safeFecth(t,0)];case 1:return b=a.sent(),[2,this.parseNovels(b)]}}))}))},o.prototype.parseNovel=function(l){var r;return e(this,void 0,void 0,(function(){var e,o,u,c,v,b,h,d,p,m,f,g,y,w,k,S,N,x;return a(this,(function(a){switch(a.label){case 0:return e=this.site,[4,this.safeFecth(e+l,0)];case 1:return o=a.sent(),u={path:l,name:"",genres:"",summary:"",author:"",artist:"",status:"",chapters:[]},c=0,v=0,b=0,h=0,d=0,p=0,m=0,f=0,g=0,y=0,w=0,k=0,S=[],N={},x=new t.Parser({onopentag:function(a,l){var t;!u.cover&&(null===(t=l.class)||void 0===t?void 0:t.includes("ts-post-image"))?(u.name=l.title,u.cover=l["data-src"]||l.src||s.defaultCover):"genxed"===l.class||"sertogenre"===l.class?c=1:c&&"a"===a?v=1:"div"!==a||"entry-content"!==l.class&&"description"!==l.itemprop?"spe"===l.class||"serl"===l.class?h=1:h&&"span"===a?d=1:"div"===a&&"sertostat"===l.class?(h=1,d=1,f=1):"eplister eplisterfull"===l.class?g=1:g&&"li"===a?y=1:y&&("a"===a?N.path=l.href.replace(e,"").trim():"epl-num"===l.class?w=1:"epl-title"===l.class?w=2:"epl-date"===l.class?w=3:"epl-price"===l.class&&(w=4)):b=1},ontext:function(e){var a,l;if(c)v&&(u.genres+=e+", ");else if(b)u.summary+=e.trim();else if(h){if(d){var t=e.toLowerCase().replace(":","").trim();if(p)u.author+=e||"Unknown";else if(m)u.artist+=e||"Unknown";else if(f)switch(t){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":u.status=n.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":u.status=n.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":u.status=n.NovelStatus.OnHiatus;break;default:u.status=n.NovelStatus.Unknown}switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":p=1;break;case"الحالة":case"status":case"statut":case"estado":case"durum":f=1;break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":m=1}}}else if(g&&y)if(1===w)i(e,N);else if(2===w)N.name=(null===(l=null===(a=e.match(RegExp("^".concat(u.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"\\s*(.+)"))))||void 0===a?void 0:a[1])||void 0===l?void 0:l.trim())||e.trim(),N.chapterNumber||i(e,N);else if(3===w)N.releaseTime=e;else if(4===w){switch(t=e.toLowerCase().trim()){case"free":case"gratuit":case"مجاني":case"livre":case"":k=0;break;default:k=1}}},onclosetag:function(e){var a,l,t;c?v?v=0:(c=0,u.genres=null===(a=u.genres)||void 0===a?void 0:a.slice(0,-2)):b?"br"===e?u.summary+="\n":"div"===e&&(b=0):h?d?"span"===e&&(d=0,p&&u.author?p=0:m&&u.artist?m=0:f&&""!==u.status&&(f=0)):"div"===e&&(h=0,u.author=null===(l=u.author)||void 0===l?void 0:l.trim(),u.artist=null===(t=u.artist)||void 0===t?void 0:t.trim()):g&&(y?1===w||2===w||3===w||4===w?w=0:"li"===e&&(y=0,N.chapterNumber||(N.chapterNumber=0),k||S.push(N),N={}):"ul"===e&&(g=0))}}),x.write(o),x.end(),S.length&&((null===(r=this.options)||void 0===r?void 0:r.reverseChapters)&&S.reverse(),u.chapters=S),[2,u]}}))}))},o.prototype.parseChapter=function(t){var r,n;return e(this,void 0,void 0,(function(){var e,s;return a(this,(function(a){switch(a.label){case 0:return[4,this.safeFecth(this.site+t,0)];case 1:if(e=a.sent(),s=null===(r=e.match(/<div.*class="epcontent ([\s\S]*?)<div.*class="bottomnav"/g))||void 0===r?void 0:r[0],null===(n=this.options)||void 0===n?void 0:n.customJs)try{return[2,(0,l.load)(s||e).html()]}catch(e){throw console.error("Error executing customJs:",e),e}return[2,s||""]}}))}))},o.prototype.searchNovels=function(l,t){return e(this,void 0,void 0,(function(){var e,r;return a(this,(function(a){switch(a.label){case 0:return e=this.site+"page/"+t+"/?s="+l,[4,this.safeFecth(e,1)];case 1:return r=a.sent(),[2,this.parseNovels(r)]}}))}))},o}())({id:"noblemtl",sourceSite:"https://noblemtl.com/",sourceName:"NobleMTL",options:{lang:"English",reverseChapters:1},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"A.I",value:"a-i"},{label:"Academy",value:"academy"},{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Alternative History",value:"alternative-history"},{label:"Another World",value:"another-world"},{label:"Apocalypse",value:"apocalypse"},{label:"Bromance",value:"bromance"},{label:"Comedy",value:"comedy"},{label:"Cthulhu",value:"cthulhu"},{label:"Dark fantasy",value:"dark-fantasy"},{label:"Demons",value:"demons"},{label:"Drama",value:"drama"},{label:"Dystopia",value:"dystopia"},{label:"Ecchi",value:"ecchi"},{label:"Entertainment",value:"entertainment"},{label:"Exhaustion",value:"exhaustion"},{label:"Fanfiction",value:"fanfiction"},{label:"fantasy",value:"fantasy"},{label:"finance",value:"finance"},{label:"For men",value:"for-men"},{label:"Full color",value:"full-color"},{label:"fusion",value:"fusion"},{label:"gacha",value:"gacha"},{label:"Gallery",value:"gallery"},{label:"Game",value:"game"},{label:"Gender Bender",value:"gender-bender"},{label:"Genius",value:"genius"},{label:"Harem",value:"harem"},{label:"Healing",value:"healing"},{label:"Hero",value:"hero"},{label:"Historical",value:"historical"},{label:"Hunter",value:"hunter"},{label:"korean novel",value:"korean-novel"},{label:"Light Novel",value:"light-novel"},{label:"List Adventure Manga Genres",value:"list-adventure-manga-genres"},{label:"Long Strip",value:"long-strip"},{label:"Love comedy",value:"love-comedy"},{label:"magic",value:"magic"},{label:"Manhua",value:"manhua"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Medieval",value:"medieval"},{label:"Middle Ages",value:"middle-ages"},{label:"Misunderstanding",value:"misunderstanding"},{label:"Modern",value:"modern"},{label:"modern fantasy",value:"modern-fantasy"},{label:"Munchkin",value:"munchkin"},{label:"music",value:"music"},{label:"Mystery",value:"mystery"},{label:"Necromancy",value:"necromancy"},{label:"No Romance",value:"no-romance"},{label:"NTL",value:"ntl"},{label:"o",value:"o"},{label:"Obsession",value:"obsession"},{label:"Politics",value:"politics"},{label:"Possession",value:"possession"},{label:"Programming",value:"programming"},{label:"Psychological",value:"psychological"},{label:"Pure Love",value:"pure-love"},{label:"reasoning",value:"reasoning"},{label:"Redemption",value:"redemption"},{label:"Regression",value:"regression"},{label:"Regret",value:"regret"},{label:"Reincarnation",value:"reincarnation"},{label:"Return",value:"return"},{label:"Revenge",value:"revenge"},{label:"Reversal",value:"reversal"},{label:"Romance",value:"romance"},{label:"Romance Fanrasy",value:"romance-fanrasy"},{label:"Salvation",value:"salvation"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Science fiction",value:"science-fiction"},{label:"Seinen",value:"seinen"},{label:"Shounen",value:"shounen"},{label:"Slice of Life",value:"slice-of-life"},{label:"Soft yandere",value:"soft-yandere"},{label:"Space opera",value:"space-opera"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"system",value:"system"},{label:"Time limit",value:"time-limit"},{label:"Tragedy",value:"tragedy"},{label:"Transmigration",value:"transmigration"},{label:"TRPG",value:"trpg"},{label:"TS",value:"ts"},{label:"Tsundere",value:"tsundere"},{label:"Unique",value:"unique"},{label:"Urban",value:"urban"},{label:"Villain",value:"villain"},{label:"Wholesome",value:"wholesome"},{label:"Wisdom",value:"wisdom"},{label:"Wuxia",value:"wuxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yandere",value:"yandere"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[{label:"Chinese novel",value:"chinese-novel"},{label:"habyeol",value:"habyeol"},{label:"korean novel",value:"korean-novel"},{label:"Web Novel",value:"web-novel"},{label:"삼심",value:"삼심"},{label:"호곡",value:"호곡"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"}]}}});exports.default=o;