var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{u(l.next(e))}catch(e){r(e)}}function o(e){try{u(l.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var l=require("cheerio"),n=require("@libs/fetch"),r=require("@libs/filterInputs"),i=a(require("dayjs")),o=new(function(){function a(e){var t;this.headers={Accept:"application/json","Content-Type":"application/json"},this.filters={order:{value:"popular",label:"Order by",options:[{label:"New",value:"new"},{label:"Popular",value:"popular"},{label:"Updates",value:"updated"}],type:r.FilterTypes.Picker},status:{value:"all",label:"Status",options:[{label:"All",value:"all"},{label:"Completed",value:"completed"},{label:"Ongoing",value:"ongoing"}],type:r.FilterTypes.Picker},genres:{value:"all",label:"Genre",options:[{label:"All",value:"all"},{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Romance",value:"romance"},{label:"Tragedy",value:"tragedy"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Ecchi",value:"ecchi"},{label:"Comedy",value:"comedy"},{label:"Slice of Life",value:"slice-of-life"},{label:"Mystery",value:"mystery"},{label:"Supernatural",value:"supernatural"},{label:"Psychological",value:"psychological"},{label:"Sci-fi",value:"sci-fi"},{label:"Xianxia",value:"xianxia"},{label:"School Life",value:"school-life"},{label:"Josei",value:"josei"},{label:"Wuxia",value:"wuxia"},{label:"Shounen",value:"shounen"},{label:"Horror",value:"horror"},{label:"Mecha",value:"mecha"},{label:"Historical",value:"historical"},{label:"Shoujo",value:"shoujo"},{label:"Adult",value:"adult"},{label:"Seinen",value:"seinen"},{label:"Sports",value:"sports"},{label:"Lolicon",value:"lolicon"},{label:"Gender Bender",value:"gender-bender"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Yaoi",value:"yaoi"},{label:"Video Games",value:"video-games"},{label:"Smut",value:"smut"},{label:"Magical Realism",value:"magical-realism"},{label:"Eastern Fantasy",value:"eastern-fantasy"},{label:"Contemporary Romance",value:"contemporary-romance"},{label:"Fantasy Romance",value:"fantasy-romance"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Yuri",value:"yuri"}],type:r.FilterTypes.Picker}},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelworld/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options}return a.prototype.popularNovels=function(a,r){var i=r.filters;return e(this,void 0,void 0,(function(){var e,r,o,u;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"browse/"),e+="".concat(i.genres.value,"/"),e+="".concat(i.order.value,"/"),e+="".concat(i.status.value,"/"),e+=a,[4,(0,n.fetchApi)(e).then((function(e){return e.text()}))];case 1:return r=t.sent(),o=(0,l.load)(r),u=[],o(".novel-item.ads").remove(),o(".novel-item").each((function(e,t){var a,l=o(t).find(".novel-title").text().trim(),n=o(t).find("img").attr("data-src"),r=null===(a=o(t).find(".novel-title > a").attr("href"))||void 0===a?void 0:a.substring(1);if(r){var i={name:l,cover:n,path:r};u.push(i)}})),[2,u]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r=(0,l.load)(e),i=parseInt(r(".header-stats span:first strong").text(),10),(o={path:a,name:r("h1.novel-title").text().trim()||"Untitled",cover:r("figure.cover > img").attr("data-src"),author:r(".author > a > span").text(),summary:r(".summary > .content").text().trim(),status:r(".header-stats span:last strong").text(),totalPages:Math.ceil(i/100),chapters:[]}).genres=r(".categories ul li").map((function(e,t){return r(t).text().trim()})).toArray().join(","),[2,o]}}))}))},a.prototype.parsePage=function(a,r){return e(this,void 0,void 0,(function(){var e,o,u,s;return t(this,(function(t){switch(t.label){case 0:return e=this.site+a+"/chapters/page-"+r,[4,(0,n.fetchApi)(e).then((function(e){return e.text()}))];case 1:return o=t.sent(),u=(0,l.load)(o),s=[],u(".chapter-list li").each((function(){var e,t="Chapter "+u(this).find(".chapter-no").text().trim()+" - "+u(this).find(".chapter-title").text().trim(),a=u(this).find(".chapter-update").attr("datetime"),l=null===(e=u(this).find("a").attr("href"))||void 0===e?void 0:e.substring(1);l&&s.push({name:t,path:l,releaseTime:(0,i.default)(a).toISOString()})})),[2,{chapters:s}]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r=(0,l.load)(e),[2,r("#chapter-container").html()||""]}}))}))},a.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,r,i,o,u,s,c,h,v;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"lnsearchlive"),r="".concat(this.site,"search"),[4,(0,n.fetchApi)(r).then((function(e){return e.text()}))];case 1:return i=t.sent(),o=(0,l.load)(i),u=o("#novelSearchForm > input").attr("value"),(s=new FormData).append("inputContent",a),[4,(0,n.fetchApi)(e,{method:"POST",headers:{LNRequestVerifyToken:u},body:s}).then((function(e){return e.json()}))];case 2:return c=t.sent(),h=[],(v=(0,l.load)(c.resultview))(".novel-item").each((function(e,t){var a,l=v(t).find("h4.novel-title").text().trim(),n=v(t).find("img").attr("src"),r=null===(a=v(t).find("a").attr("href"))||void 0===a?void 0:a.substring(1);r&&h.push({name:l,path:r,cover:n})})),[2,h]}}))}))},a.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,(0,n.fetchFile)(a,{headers:this.headers})]}))}))},a}())({id:"lightnovelcave",sourceName:"LightNovelCave",sourceSite:"https://www.lightnovelcave.com/"});exports.default=o;