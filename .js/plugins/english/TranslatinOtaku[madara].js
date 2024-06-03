var e=this&&this.__awaiter||function(e,t,a,n){return new(a||(a=Promise))((function(r,i){function l(e){try{s(n.next(e))}catch(e){i(e)}}function o(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,o)}s((n=n.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,n,r,i,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(l=0)),l;)try{if(a=1,n&&(r=2&o[0]?n.return:o[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,o[1])).done)return r;switch(n=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return l.label++,{value:o[1],done:0};case 5:l.label++,n=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(r=l.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){l.label=o[1];break}if(6===o[0]&&l.label<r[1]){l.label=r[1],r=o;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(o);break}r[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],n=0}finally{a=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__spreadArray||function(e,t,a){if(a||2===arguments.length)for(var n,r=0,i=t.length;r<i;r++)!n&&r in t||(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),i=require("cheerio"),l=require("@libs/defaultCover"),o=require("@libs/novelStatus"),s=n(require("dayjs")),u=function(e,t){return new RegExp(t.join("|")).test(e)},c=new(function(){function n(e){var t;this.fetchImage=r.fetchFile,this.parseData=function(e){var t,a=(0,s.default)(),n=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",r=parseInt(n,10);if(!n)return e;if(u(e,["detik","segundo","second","วินาที"]))a.subtract(r,"second");else if(u(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(r,"minute");else if(u(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(r,"hours");else if(u(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(r,"days");else if(u(e,["week","semana"]))a.subtract(r,"week");else if(u(e,["month","mes"]))a.subtract(r,"month");else{if(!u(e,["year","año"]))return e;a.subtract(r,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return n.prototype.translateDragontea=function(e){if("dragontea"===this.id){var t=(0,i.load)(e.html()||""),n=t.html()||"";n=(n=n.replace("\n","")).replace(/<br\s*\/?>/g,"\n"),e.html(n),e.find(":not(:has(*))").each((function(e,n){var r,i=t(n),l="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),o="zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA".split(""),s=i.text().normalize("NFD").split(""),u=a([],s,1).map((function(e){var t=e.normalize("NFC"),a=l.indexOf(t);return-1!==a?o[a]+e.slice(t.length):e})).join("");i.html((null===(r=i.html())||void 0===r?void 0:r.replace(i.text(),u).replace("\n","<br>"))||"")}))}return e},n.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},n.prototype.getCheerio=function(a,n){return e(this,void 0,void 0,(function(){var e,l,o,s;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=n)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=i.load,[4,e.text()];case 2:if(l=o.apply(void 0,[t.sent()]),s=l("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==s||"You are being redirected..."==s||"Un instant..."==s||"Just a moment..."==s||"Redirecting..."==s)throw new Error("Captcha error, please open in webview");return[2,l]}}))}))},n.prototype.parseNovels=function(e){var t=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(a,n){var r=e(n).find(".post-title").text().trim(),i=e(n).find(".post-title").find("a").attr("href")||"";if(r&&i){var l=e(n).find("img"),o={name:r,cover:l.attr("data-src")||l.attr("src")||l.attr("data-lazy-srcset"),path:i.replace(/https?:\/\/.*?\//,"/")};t.push(o)}})),t},n.prototype.popularNovels=function(a,n){var r=n.filters,i=n.showLatestNovels;return e(this,void 0,void 0,(function(){var e,n,l,o,s,u;return t(this,(function(t){switch(t.label){case 0:for(n in e=this.site+"/page/"+a+"/?s=&post_type=wp-manga",r||(r=this.filters||{}),i&&(e+="&m_orderby=latest"),r)if("object"==typeof r[n].value)for(l=0,o=r[n].value;l<o.length;l++)s=o[l],e+="&".concat(n,"=").concat(s);else r[n].value&&(e+="&".concat(n,"=").concat(r[n].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},n.prototype.parseNovel=function(a){var n;return e(this,void 0,void 0,(function(){var e,u,c,h,p,v,d,f,m=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return(e=t.sent())(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:e(".post-title h1").text().trim()||e("#manga-title h1").text()}).cover=e(".summary_image > a > img").attr("data-lazy-src")||e(".summary_image > a > img").attr("data-src")||e(".summary_image > a > img").attr("src")||l.defaultCover,e(".post-content_item, .post-content").each((function(){var t=e(this).find("h5").text().trim(),a=e(this).find(".summary-content").text().trim();switch(t){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=a;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=a;break;case"Status":case"Estado":u.status=a.includes("OnGoing")||a.includes("مستمرة")?o.NovelStatus.Ongoing:o.NovelStatus.Completed}})),e("div.summary__content .code-block,script").remove(),c=e("div.summary__content")||e("#tab-manga-about")||e('.post-content_item h5:contains("Summary")').next(),u.summary=this.translateDragontea(c).text().trim(),h=[],p="",(null===(n=this.options)||void 0===n?void 0:n.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return p=t.sent(),[3,5];case 3:return v=e(".rating-post-id").attr("value")||e("#manga-chapters-holder").attr("data-id")||"",(d=new FormData).append("action","manga_get_chapters"),d.append("manga",v),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:d}).then((function(e){return e.text()}))];case 4:p=t.sent(),t.label=5;case 5:return"0"!==p&&(e=(0,i.load)(p)),f=e(".wp-manga-chapter").length,e(".wp-manga-chapter").each((function(t,a){var n=e(a).find("a").text().trim(),r=e(a).find("span.chapter-release-date").text().trim();r=r?m.parseData(r):(0,s.default)().format("LL");var i=e(a).find("a").attr("href")||"";h.push({name:n,path:i.replace(/https?:\/\/.*?\//,"/"),releaseTime:r||null,chapterNumber:f-t})})),u.chapters=h.reverse(),[2,u]}}))}))},n.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),n=e(".text-left")||e(".text-right")||e(".entry-content")||e(".c-blog-post > div > div:nth-child(2)"),"riwyat"===this.id&&n.find('span[style*="opacity: 0; position: fixed;"]').remove(),n.find("div.text-right").attr("style","text-align: right;"),[2,this.translateDragontea(n).html()||""]}}))}))},n.prototype.searchNovels=function(a,n){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"/page/"+n+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e,1)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},n}())({id:"translatinotaku",sourceSite:"https://translatinotaku.net/",sourceName:"TranslatinOtaku",options:{useNewChapterEndpoint:1,lang:"English"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Antihero Protagonist",value:"antihero-protagonist"},{label:"Chinese",value:"chinese"},{label:"Comedy",value:"comedy"},{label:"Daily Life",value:"daily-life"},{label:"Dark-Comedy",value:"dark-comedy"},{label:"Devil fruit",value:"devil-fruit"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fanfiction",value:"fanfiction"},{label:"Fantasy",value:"fantasy"},{label:"Game",value:"game"},{label:"Harem",value:"harem"},{label:"Korean",value:"korean"},{label:"Martial Arts",value:"martial-arts"},{label:"Mystery",value:"mystery"},{label:"Original",value:"original"},{label:"Revolutionary",value:"revolutionary"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shounen",value:"shounen"},{label:"Supernat",value:"supernat"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"swordsmanship",value:"swordsmanship"},{label:"Tragedy",value:"tragedy"},{label:"War",value:"war"},{label:"Weak to Strong",value:"weak-to-strong"},{label:"Xuanhuan",value:"xuanhuan"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"OnGoing",value:"on-going"},{label:"Completed",value:"end"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"},{label:"Upcoming",value:"upcoming"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=c;