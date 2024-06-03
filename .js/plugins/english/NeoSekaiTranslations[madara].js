var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,i){function o(e){try{s(r.next(e))}catch(e){i(e)}}function l(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(o,l)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,i,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(s){return function(l){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(o=0)),o;)try{if(a=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return o.label++,{value:l[1],done:0};case 5:o.label++,r=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!(n=o.trys,(n=n.length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){o.label=l[1];break}if(6===l[0]&&o.label<n[1]){o.label=n[1],n=l;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(l);break}n[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],r=0}finally{a=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:1}}([l,s])}}},a=this&&this.__spreadArray||function(e,t,a){if(a||2===arguments.length)for(var r,n=0,i=t.length;n<i;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("@libs/fetch"),i=require("cheerio"),o=require("@libs/defaultCover"),l=require("@libs/novelStatus"),s=r(require("dayjs")),u=function(e,t){return new RegExp(t.join("|")).test(e)},c=new(function(){function r(e){var t;this.fetchImage=n.fetchFile,this.parseData=function(e){var t,a=(0,s.default)(),r=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(r,10);if(!r)return e;if(u(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(u(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(u(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(u(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(u(e,["week","semana"]))a.subtract(n,"week");else if(u(e,["month","mes"]))a.subtract(n,"month");else{if(!u(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return r.prototype.translateDragontea=function(e){if("dragontea"===this.id){var t=(0,i.load)(e.html()||""),r=t.html()||"";r=(r=r.replace("\n","")).replace(/<br\s*\/?>/g,"\n"),e.html(r),e.find(":not(:has(*))").each((function(e,r){var n,i=t(r),o="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),l="zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA".split(""),s=i.text().normalize("NFD").split(""),u=a([],s,1).map((function(e){var t=e.normalize("NFC"),a=o.indexOf(t);return-1!==a?l[a]+e.slice(t.length):e})).join("");i.html((null===(n=i.html())||void 0===n?void 0:n.replace(i.text(),u).replace("\n","<br>"))||"")}))}return e},r.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},r.prototype.getCheerio=function(a,r){return e(this,void 0,void 0,(function(){var e,o,l,s;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(a)];case 1:if(!(e=t.sent()).ok&&1!=r)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return l=i.load,[4,e.text()];case 2:if(o=l.apply(void 0,[t.sent()]),s=o("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==s||"You are being redirected..."==s||"Un instant..."==s||"Just a moment..."==s||"Redirecting..."==s)throw new Error("Captcha error, please open in webview");return[2,o]}}))}))},r.prototype.parseNovels=function(e){var t=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(a,r){var n=e(r).find(".post-title").text().trim(),i=e(r).find(".post-title").find("a").attr("href")||"";if(n&&i){var o=e(r).find("img"),l={name:n,cover:o.attr("data-src")||o.attr("src")||o.attr("data-lazy-srcset"),path:i.replace(/https?:\/\/.*?\//,"/")};t.push(l)}})),t},r.prototype.popularNovels=function(a,r){var n=r.filters,i=r.showLatestNovels;return e(this,void 0,void 0,(function(){var e,r,o,l,s,u;return t(this,(function(t){switch(t.label){case 0:for(r in e=this.site+"/page/"+a+"/?s=&post_type=wp-manga",n||(n=this.filters||{}),i&&(e+="&m_orderby=latest"),n)if("object"==typeof n[r].value)for(o=0,l=n[r].value;o<l.length;o++)s=l[o],e+="&".concat(r,"=").concat(s);else n[r].value&&(e+="&".concat(r,"=").concat(n[r].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},r.prototype.parseNovel=function(a){var r;return e(this,void 0,void 0,(function(){var e,u,c,h,p,d,v,f,m=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return(e=t.sent())(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:e(".post-title h1").text().trim()||e("#manga-title h1").text()}).cover=e(".summary_image > a > img").attr("data-lazy-src")||e(".summary_image > a > img").attr("data-src")||e(".summary_image > a > img").attr("src")||o.defaultCover,e(".post-content_item, .post-content").each((function(){var t=e(this).find("h5").text().trim(),a=e(this).find(".summary-content").text().trim();switch(t){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=a;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=a;break;case"Status":case"Estado":u.status=a.includes("OnGoing")||a.includes("مستمرة")?l.NovelStatus.Ongoing:l.NovelStatus.Completed}})),e("div.summary__content .code-block,script").remove(),c=e("div.summary__content")||e("#tab-manga-about")||e('.post-content_item h5:contains("Summary")').next(),u.summary=this.translateDragontea(c).text().trim(),h=[],p="",(null===(r=this.options)||void 0===r?void 0:r.useNewChapterEndpoint)?[4,(0,n.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return p=t.sent(),[3,5];case 3:return d=e(".rating-post-id").attr("value")||e("#manga-chapters-holder").attr("data-id")||"",(v=new FormData).append("action","manga_get_chapters"),v.append("manga",d),[4,(0,n.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:v}).then((function(e){return e.text()}))];case 4:p=t.sent(),t.label=5;case 5:return"0"!==p&&(e=(0,i.load)(p)),f=e(".wp-manga-chapter").length,e(".wp-manga-chapter").each((function(t,a){var r=e(a).find("a").text().trim(),n=e(a).find("span.chapter-release-date").text().trim();n=n?m.parseData(n):(0,s.default)().format("LL");var i=e(a).find("a").attr("href")||"";h.push({name:r,path:i.replace(/https?:\/\/.*?\//,"/"),releaseTime:n||null,chapterNumber:f-t})})),u.chapters=h.reverse(),[2,u]}}))}))},r.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),r=e(".text-left")||e(".text-right")||e(".entry-content")||e(".c-blog-post > div > div:nth-child(2)"),"riwyat"===this.id&&r.find('span[style*="opacity: 0; position: fixed;"]').remove(),r.find("div.text-right").attr("style","text-align: right;"),[2,this.translateDragontea(r).html()||""]}}))}))},r.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"/page/"+r+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e,1)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},r}())({id:"neosekaiTLS",sourceSite:"https://www.neosekaitranslations.com/",sourceName:"NeoSekai Translations",filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Horror",value:"horror"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-Fi",value:"sci-fi"},{label:"Slice of Life",value:"slice-of-life"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"Completed",value:"complete"},{label:"Ongoing",value:"on-going"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=c;