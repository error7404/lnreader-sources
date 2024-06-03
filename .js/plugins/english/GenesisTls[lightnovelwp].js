var e=this&&this.__awaiter||function(e,a,t,l){return new(t||(t=Promise))((function(r,s){function n(e){try{i(l.next(e))}catch(e){s(e)}}function o(e){try{i(l.throw(e))}catch(e){s(e)}}function i(e){var a;e.done?r(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(n,o)}i((l=l.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var t,l,r,s,n={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(n=0)),n;)try{if(t=1,l&&(r=2&o[0]?l.return:o[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,o[1])).done)return r;switch(l=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return n.label++,{value:o[1],done:0};case 5:n.label++,l=o[1],o=[0];continue;case 7:o=n.ops.pop(),n.trys.pop();continue;default:if(!(r=n.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){n=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){n.label=o[1];break}if(6===o[0]&&n.label<r[1]){n.label=r[1],r=o;break}if(r&&n.label<r[2]){n.label=r[2],n.ops.push(o);break}r[2]&&n.ops.pop(),n.trys.pop();continue}o=a.call(e,n)}catch(e){o=[6,e],l=0}finally{t=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,i])}}};Object.defineProperty(exports,"__esModule",{value:1});var t=require("cheerio"),l=require("htmlparser2"),r=require("@libs/fetch"),s=require("@libs/novelStatus"),n=require("@libs/defaultCover");function o(e,a){var t=e.match(/(\d+)$/);t&&t[0]&&(a.chapterNumber=parseInt(t[0]))}var i=new(function(){function i(e){var a,t;this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var l=(null===(a=e.options)||void 0===a?void 0:a.versionIncrements)||0;this.version="1.1.".concat(l),this.options=null!==(t=e.options)&&void 0!==t?t:{},this.filters=e.filters}return i.prototype.getHostname=function(e){var a=(e=e.split("/")[2]).split(".");return a.pop(),a.join(".")},i.prototype.safeFecth=function(t,l){var s,n;return e(this,void 0,void 0,(function(){var e,o,i;return a(this,(function(a){switch(a.label){case 0:return[4,(0,r.fetchApi)(t)];case 1:if(!(e=a.sent()).ok&&1!=l)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return[4,e.text()];case 2:if(o=a.sent(),i=null===(n=null===(s=o.match(/<title>(.*?)<\/title>/))||void 0===s?void 0:s[1])||void 0===n?void 0:n.trim(),this.getHostname(t)!=this.getHostname(e.url)||i&&("Bot Verification"==i||"You are being redirected..."==i||"Un instant..."==i||"Just a moment..."==i||"Redirecting..."==i))throw new Error("Captcha error, please open in webview");return[2,o]}}))}))},i.prototype.parseNovels=function(e){var a=this,t=[];return(e.match(/<article([\s\S]*?)<\/article>/g)||[]).forEach((function(e){var l,r,s=null===(l=e.match(/<a.*title="(.*?)"/))||void 0===l?void 0:l[1],o=null===(r=e.match(/<a href="(.*?)"/))||void 0===r?void 0:r[1];if(s&&o){var i=e.match(/<img.*src="(.*?)"(?:\sdata-src="(.*?)")?.*\/>/)||[];t.push({name:s,cover:i[2]||i[1]||n.defaultCover,path:o.replace(a.site,"")})}})),t},i.prototype.popularNovels=function(t,l){var r,s,n=l.filters,o=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,i,u,c,v,h;return a(this,(function(a){switch(a.label){case 0:for(i in e=null!==(s=null===(r=this.options)||void 0===r?void 0:r.seriesPath)&&void 0!==s?s:"series/",l=this.site+e+"?page="+t,n||(n=this.filters||{}),o&&(l+="&order=latest"),n)if("object"==typeof n[i].value)for(u=0,c=n[i].value;u<c.length;u++)v=c[u],l+="&".concat(i,"=").concat(v);else n[i].value&&(l+="&".concat(i,"=").concat(n[i].value));return[4,this.safeFecth(l,0)];case 1:return h=a.sent(),[2,this.parseNovels(h)]}}))}))},i.prototype.parseNovel=function(t){var r;return e(this,void 0,void 0,(function(){var e,i,u,c,v,h,p,d,f,m,b,g,y,w,k,N,C,S;return a(this,(function(a){switch(a.label){case 0:return e=this.site,[4,this.safeFecth(e+t,0)];case 1:return i=a.sent(),u={path:t,name:"",genres:"",summary:"",author:"",artist:"",status:"",chapters:[]},c=0,v=0,h=0,p=0,d=0,f=0,m=0,b=0,g=0,y=0,w=0,k=0,N=[],C={},S=new l.Parser({onopentag:function(a,t){var l;!u.cover&&(null===(l=t.class)||void 0===l?void 0:l.includes("ts-post-image"))?(u.name=t.title,u.cover=t["data-src"]||t.src||n.defaultCover):"genxed"===t.class||"sertogenre"===t.class?c=1:c&&"a"===a?v=1:"div"!==a||"entry-content"!==t.class&&"description"!==t.itemprop?"spe"===t.class||"serl"===t.class?p=1:p&&"span"===a?d=1:"div"===a&&"sertostat"===t.class?(p=1,d=1,b=1):"eplister eplisterfull"===t.class?g=1:g&&"li"===a?y=1:y&&("a"===a?C.path=t.href.replace(e,"").trim():"epl-num"===t.class?w=1:"epl-title"===t.class?w=2:"epl-date"===t.class?w=3:"epl-price"===t.class&&(w=4)):h=1},ontext:function(e){var a,t;if(c)v&&(u.genres+=e+", ");else if(h)u.summary+=e.trim();else if(p){if(d){var l=e.toLowerCase().replace(":","").trim();if(f)u.author+=e||"Unknown";else if(m)u.artist+=e||"Unknown";else if(b)switch(l){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":u.status=s.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":u.status=s.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":u.status=s.NovelStatus.OnHiatus;break;default:u.status=s.NovelStatus.Unknown}switch(l){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":f=1;break;case"الحالة":case"status":case"statut":case"estado":case"durum":b=1;break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":m=1}}}else if(g&&y)if(1===w)o(e,C);else if(2===w)C.name=(null===(t=null===(a=e.match(RegExp("^".concat(u.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"\\s*(.+)"))))||void 0===a?void 0:a[1])||void 0===t?void 0:t.trim())||e.trim(),C.chapterNumber||o(e,C);else if(3===w)C.releaseTime=e;else if(4===w){switch(l=e.toLowerCase().trim()){case"free":case"gratuit":case"مجاني":case"livre":case"":k=0;break;default:k=1}}},onclosetag:function(e){var a,t,l;c?v?v=0:(c=0,u.genres=null===(a=u.genres)||void 0===a?void 0:a.slice(0,-2)):h?"br"===e?u.summary+="\n":"div"===e&&(h=0):p?d?"span"===e&&(d=0,f&&u.author?f=0:m&&u.artist?m=0:b&&""!==u.status&&(b=0)):"div"===e&&(p=0,u.author=null===(t=u.author)||void 0===t?void 0:t.trim(),u.artist=null===(l=u.artist)||void 0===l?void 0:l.trim()):g&&(y?1===w||2===w||3===w||4===w?w=0:"li"===e&&(y=0,C.chapterNumber||(C.chapterNumber=0),k||N.push(C),C={}):"ul"===e&&(g=0))}}),S.write(i),S.end(),N.length&&((null===(r=this.options)||void 0===r?void 0:r.reverseChapters)&&N.reverse(),u.chapters=N),[2,u]}}))}))},i.prototype.parseChapter=function(l){var r,s;return e(this,void 0,void 0,(function(){var e,n,o;return a(this,(function(a){switch(a.label){case 0:return[4,this.safeFecth(this.site+l,0)];case 1:if(e=a.sent(),n=null===(r=e.match(/<div.*class="epcontent ([\s\S]*?)<div.*class="bottomnav"/g))||void 0===r?void 0:r[0],null===(s=this.options)||void 0===s?void 0:s.customJs)try{return(o=(0,t.load)(n||e))(".genesistls-watermark").remove(),o(".epcontent p").each((function(e,a){"&nbsp;"===o(a).html()&&o(a).remove()})),[2,o.html()]}catch(e){throw console.error("Error executing customJs:",e),e}return[2,n||""]}}))}))},i.prototype.searchNovels=function(t,l){return e(this,void 0,void 0,(function(){var e,r;return a(this,(function(a){switch(a.label){case 0:return e=this.site+"page/"+l+"/?s="+t,[4,this.safeFecth(e,1)];case 1:return r=a.sent(),[2,this.parseNovels(r)]}}))}))},i}())({id:"genesistls",sourceSite:"https://genesistls.com/",sourceName:"GenesisTls",options:{lang:"English",reverseChapters:0,customJs:"$('.genesistls-watermark').remove();$('.epcontent p').each((i, el) => { if ($(el).html() === '&nbsp;') $(el).remove(); });"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Academy",value:"academy"},{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Another World",value:"another-world"},{label:"Comdey",value:"comdey"},{label:"Comedy",value:"comedy"},{label:"Dark Fantasy",value:"dark-fantasy"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Fantasy Fusion",value:"fantasy-fusion"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Hunter",value:"hunter"},{label:"Light Novel",value:"light-novel"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Misunderstanding",value:"misunderstanding"},{label:"Modern",value:"modern"},{label:"Modern Fantasy",value:"modern-fantasy"},{label:"Munchkin",value:"munchkin"},{label:"Murim",value:"murim"},{label:"mystery",value:"mystery"},{label:"No Harem",value:"no-harem"},{label:"NO NTR",value:"no-ntr"},{label:"obsession",value:"obsession"},{label:"Possession",value:"possession"},{label:"Psychological",value:"psychological"},{label:"Regression",value:"regression"},{label:"Regret",value:"regret"},{label:"reincarnation",value:"reincarnation"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Seinen",value:"seinen"},{label:"Slice of life",value:"slice-of-life"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Transmigrated to Game",value:"transmigrated-to-game"},{label:"Transmigration",value:"transmigration"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[{label:"korean novel",value:"korean-novel"},{label:"Web Novel",value:"web-novel"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"}]}}});exports.default=i;