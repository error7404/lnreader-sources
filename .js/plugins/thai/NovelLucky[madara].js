var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{s(l.next(e))}catch(e){r(e)}}function o(e){try{s(l.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}s((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__spreadArray||function(e,t,a){if(a||2===arguments.length)for(var l,n=0,r=t.length;n<r;n++)!l&&n in t||(l||(l=Array.prototype.slice.call(t,0,n)),l[n]=t[n]);return e.concat(l||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("@libs/fetch"),r=require("cheerio"),i=require("@libs/defaultCover"),o=require("@libs/novelStatus"),s=l(require("dayjs")),u=function(e,t){return new RegExp(t.join("|")).test(e)},c=new(function(){function l(e){var t;this.fetchImage=n.fetchFile,this.parseData=function(e){var t,a=(0,s.default)(),l=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(l,10);if(!l)return e;if(u(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(u(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(u(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(u(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(u(e,["week","semana"]))a.subtract(n,"week");else if(u(e,["month","mes"]))a.subtract(n,"month");else{if(!u(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return l.prototype.translateDragontea=function(e){if("dragontea"===this.id){var t=(0,r.load)(e.html()||""),l=t.html()||"";l=(l=l.replace("\n","")).replace(/<br\s*\/?>/g,"\n"),e.html(l),e.find(":not(:has(*))").each((function(e,l){var n,r=t(l),i="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),o="zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA".split(""),s=r.text().normalize("NFD").split(""),u=a([],s,1).map((function(e){var t=e.normalize("NFC"),a=i.indexOf(t);return-1!==a?o[a]+e.slice(t.length):e})).join("");r.html((null===(n=r.html())||void 0===n?void 0:n.replace(r.text(),u).replace("\n","<br>"))||"")}))}return e},l.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},l.prototype.getCheerio=function(a,l){return e(this,void 0,void 0,(function(){var e,i,o,s;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=l)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=r.load,[4,e.text()];case 2:if(i=o.apply(void 0,[t.sent()]),s=i("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==s||"You are being redirected..."==s||"Un instant..."==s||"Just a moment..."==s||"Redirecting..."==s)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},l.prototype.parseNovels=function(e){var t=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(a,l){var n=e(l).find(".post-title").text().trim(),r=e(l).find(".post-title").find("a").attr("href")||"";if(n&&r){var i=e(l).find("img"),o={name:n,cover:i.attr("data-src")||i.attr("src")||i.attr("data-lazy-srcset"),path:r.replace(/https?:\/\/.*?\//,"/")};t.push(o)}})),t},l.prototype.popularNovels=function(a,l){var n=l.filters,r=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,i,o,s,u;return t(this,(function(t){switch(t.label){case 0:for(l in e=this.site+"/page/"+a+"/?s=&post_type=wp-manga",n||(n=this.filters||{}),r&&(e+="&m_orderby=latest"),n)if("object"==typeof n[l].value)for(i=0,o=n[l].value;i<o.length;i++)s=o[i],e+="&".concat(l,"=").concat(s);else n[l].value&&(e+="&".concat(l,"=").concat(n[l].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},l.prototype.parseNovel=function(a){var l;return e(this,void 0,void 0,(function(){var e,u,c,h,v,p,d,b,f=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return(e=t.sent())(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:e(".post-title h1").text().trim()||e("#manga-title h1").text()}).cover=e(".summary_image > a > img").attr("data-lazy-src")||e(".summary_image > a > img").attr("data-src")||e(".summary_image > a > img").attr("src")||i.defaultCover,e(".post-content_item, .post-content").each((function(){var t=e(this).find("h5").text().trim(),a=e(this).find(".summary-content").text().trim();switch(t){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=a;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=a;break;case"Status":case"Estado":u.status=a.includes("OnGoing")||a.includes("مستمرة")?o.NovelStatus.Ongoing:o.NovelStatus.Completed}})),e("div.summary__content .code-block,script").remove(),c=e("div.summary__content")||e("#tab-manga-about")||e('.post-content_item h5:contains("Summary")').next(),u.summary=this.translateDragontea(c).text().trim(),h=[],v="",(null===(l=this.options)||void 0===l?void 0:l.useNewChapterEndpoint)?[4,(0,n.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return v=t.sent(),[3,5];case 3:return p=e(".rating-post-id").attr("value")||e("#manga-chapters-holder").attr("data-id")||"",(d=new FormData).append("action","manga_get_chapters"),d.append("manga",p),[4,(0,n.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:d}).then((function(e){return e.text()}))];case 4:v=t.sent(),t.label=5;case 5:return"0"!==v&&(e=(0,r.load)(v)),b=e(".wp-manga-chapter").length,e(".wp-manga-chapter").each((function(t,a){var l=e(a).find("a").text().trim(),n=e(a).find("span.chapter-release-date").text().trim();n=n?f.parseData(n):(0,s.default)().format("LL");var r=e(a).find("a").attr("href")||"";h.push({name:l,path:r.replace(/https?:\/\/.*?\//,"/"),releaseTime:n||null,chapterNumber:b-t})})),u.chapters=h.reverse(),[2,u]}}))}))},l.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),l=e(".text-left")||e(".text-right")||e(".entry-content")||e(".c-blog-post > div > div:nth-child(2)"),"riwyat"===this.id&&l.find('span[style*="opacity: 0; position: fixed;"]').remove(),l.find("div.text-right").attr("style","text-align: right;"),[2,this.translateDragontea(l).html()||""]}}))}))},l.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"/page/"+l+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e,1)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},l}())({id:"novel-lucky",sourceSite:"https://novel-lucky.com/",sourceName:"Novel Lucky",options:{useNewChapterEndpoint:1,lang:"Thai"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Anime",value:"anime"},{label:"Cartoon",value:"cartoon"},{label:"Comedy",value:"comedy"},{label:"Comic",value:"comic"},{label:"Cooking",value:"cooking"},{label:"Detective",value:"detective"},{label:"Doujinshi",value:"doujinshi"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Live action",value:"live-action"},{label:"Manga",value:"manga"},{label:"Manhua",value:"manhua"},{label:"Manhwa",value:"manhwa"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"One shot",value:"one-shot"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Soft Yaoi",value:"soft-yaoi"},{label:"Soft Yuri",value:"soft-yuri"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Webtoon",value:"webtoon"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"},{label:"จบแล้ว",value:"end"},{label:"จันทร์",value:"monday"},{label:"ทุกวัน",value:"everyday"},{label:"นิยาย PDF",value:"นิยาย-pdf"},{label:"นิยายจีน",value:"นิยายจีน"},{label:"นิยายญี่ปุ่น",value:"นิยายญี่ปุ่น"},{label:"นิยายดราม่า",value:"นิยายดราม่า"},{label:"นิยายตลก",value:"นิยายตลก"},{label:"นิยายทะลุมิติ",value:"นิยายทะลุมิติ"},{label:"นิยายผจญภัย",value:"นิยายผจญภัย"},{label:"นิยายผู้ใหญ่",value:"นิยายผู้ใหญ่"},{label:"นิยายยูริ",value:"นิยายยูริ"},{label:"นิยายรักโรแมนติก",value:"นิยายรักโรแมนติก"},{label:"นิยายสยองขวัญ",value:"นิยายสยองขวัญ"},{label:"นิยายเกาหลี",value:"นิยายเกาหลี"},{label:"นิยายแฟนตาซี",value:"นิยายแฟนตาซี"},{label:"นิยายไซไฟ",value:"นิยายไซไฟ"},{label:"พฤหัสบดี",value:"thursday"},{label:"พุธ",value:"wednesday"},{label:"ศุกร์",value:"friday"},{label:"อังคาร",value:"tuesday"},{label:"อาทิตย์",value:"sunday"},{label:"เสาร์",value:"saturday"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"Completed",value:"complete"},{label:"Ongoing",value:"on-going"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=c;