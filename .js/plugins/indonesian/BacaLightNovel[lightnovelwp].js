var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(l,n){function i(e){try{o(r.next(e))}catch(e){n(e)}}function s(e){try{o(r.throw(e))}catch(e){n(e)}}function o(e){var t;e.done?l(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}o((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,l,n,i={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return n={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function s(s){return function(o){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,s[0]&&(i=0)),i;)try{if(a=1,r&&(l=2&s[0]?r.return:s[0]?r.throw||((l=r.return)&&l.call(r),0):r.next)&&!(l=l.call(r,s[1])).done)return l;switch(r=0,l&&(s=[2&s[0],l.value]),s[0]){case 0:case 1:l=s;break;case 4:return i.label++,{value:s[1],done:0};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(l=i.trys,(l=l.length>0&&l[l.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!l||s[1]>l[0]&&s[1]<l[3])){i.label=s[1];break}if(6===s[0]&&i.label<l[1]){i.label=l[1],l=s;break}if(l&&i.label<l[2]){i.label=l[2],i.ops.push(s);break}l[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{a=l=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:1}}([s,o])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),r=require("@libs/fetch"),l=require("@libs/novelStatus"),n=require("@libs/defaultCover"),i=new(function(){function i(e){var t,a;this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var l=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(5+l),this.options=null!==(a=e.options)&&void 0!==a?a:{},this.filters=e.filters}return i.prototype.getHostname=function(e){var t=(e=e.split("/")[2]).split(".");return t.pop(),t.join(".")},i.prototype.getCheerio=function(l,n){return e(this,void 0,void 0,(function(){var e,i,s,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(l)];case 1:if(!(e=t.sent()).ok&&1!=n)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return s=a.load,[4,e.text()];case 2:if(i=s.apply(void 0,[t.sent()]),o=i("title").text().trim(),this.getHostname(l)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var t=[];return e("div.listupd > article").each((function(a,r){var l=e(r).find("h2").text(),i=e(r).find("img"),s=e(r).find("a").attr("href");s&&t.push({name:l,cover:i.attr("data-src")||i.attr("src")||n.defaultCover,path:s.replace(/https?:\/\/.*?\//,"/")})})),t},i.prototype.popularNovels=function(a,r){var l,n,i=r.filters,s=r.showLatestNovels;return e(this,void 0,void 0,(function(){var e,r,o,u,c,v,h;return t(this,(function(t){switch(t.label){case 0:for(o in e=null!==(n=null===(l=this.options)||void 0===l?void 0:l.seriesPath)&&void 0!==n?n:"series/",r=this.site+e+"?page="+a,i||(i=this.filters||{}),s&&(r+="&order=latest"),i)if("object"==typeof i[o].value)for(u=0,c=i[o].value;u<c.length;u++)v=c[u],r+="&".concat(o,"=").concat(v);else i[o].value&&(r+="&".concat(o,"=").concat(i[o].value));return[4,this.getCheerio(r,0)];case 1:return h=t.sent(),[2,this.parseNovels(h)]}}))}))},i.prototype.parseNovel=function(a){var r,i;return e(this,void 0,void 0,(function(){var e,s,o,u,c,v,h;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(s={path:a.replace(/https?:\/\/.*?\//,"/"),name:"Untitled"}).name=e("h1.entry-title").text().trim(),o=e("img.wp-post-image"),s.cover=o.attr("data-src")||o.attr("src")||n.defaultCover,(null===(r=e("div.sertostat > span").attr("class"))||void 0===r?void 0:r.toLowerCase())||""){case"completed":s.status=l.NovelStatus.Completed;break;case"ongoing":s.status=l.NovelStatus.Ongoing;break;case"hiatus":s.status=l.NovelStatus.OnHiatus;break;default:s.status=l.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":s.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":s.status=l.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":s.status=l.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":s.status=l.NovelStatus.OnHiatus;break;default:s.status=l.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":s.artist=a}})),(c=e(".sertogenre")).length||(c=e(".genxed")),s.genres=c.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(v=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(v=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),s.summary=v.join("\n"),h=[],e(".eplister li").each((function(t,a){var r,l=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),n=e(a).find("a").attr("href")||"",i=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":r=1;break;default:r=0}r&&h.push({name:l,path:n.replace(/https?:\/\/.*?\//,"/"),releaseTime:i})})),(null===(i=this.options)||void 0===i?void 0:i.reverseChapters)&&h.length&&h.reverse(),s.chapters=h,[2,s]}}))}))},i.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return[2,(e=t.sent())(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return l=t.sent(),[2,this.parseNovels(l)]}}))}))},i}())({id:"bacalightnovel",sourceSite:"https://bacalightnovel.co/",sourceName:"Baca Light Novel",options:{lang:"Indonesian",reverseChapters:1},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Tipe",value:[],options:[{label:"",value:""},{label:"Novel",value:"novel"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Urutkan",label:"Order",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Baru diperbarui",value:"update"},{label:"Baru ditambahkan",value:"latest"},{label:"Terpopuler",value:"popular"}]}}});exports.default=i;