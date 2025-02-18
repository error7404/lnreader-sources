Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("@libs/fetch"),n=require("htmlparser2"),a=require("@libs/novelStatus"),i=require("@libs/filterInputs");!function(e){e.Unknown="Unknown",e.GetName="GetName",e.GetSummary="GetSummary",e.GetInfos="GetInfos",e.GetGenres="GetGenres",e.GetCover="GetCover",e.GetVolumes="GetVolumes"}(e||(e={}));var l=function(){function l(){this.id="ln.hako",this.name="Hako",this.icon="src/vi/hakolightnovel/icon.png",this.site="https://ln.hako.vn",this.version="1.1.0",this.imageRequestInit={headers:{Referer:this.site}},this.filters={alphabet:{type:i.FilterTypes.Picker,value:"",label:"Chữ cái",options:[{label:"Tất cả",value:""},{label:"Khác",value:"khac"},{label:"A",value:"a"},{label:"B",value:"b"},{label:"C",value:"c"},{label:"D",value:"d"},{label:"E",value:"e"},{label:"F",value:"f"},{label:"G",value:"g"},{label:"H",value:"h"},{label:"I",value:"i"},{label:"J",value:"j"},{label:"K",value:"k"},{label:"L",value:"l"},{label:"M",value:"m"},{label:"N",value:"n"},{label:"O",value:"o"},{label:"P",value:"p"},{label:"Q",value:"q"},{label:"R",value:"r"},{label:"S",value:"s"},{label:"T",value:"t"},{label:"U",value:"u"},{label:"V",value:"v"},{label:"W",value:"w"},{label:"X",value:"x"},{label:"Y",value:"y"},{label:"Z",value:"z"}]},type:{type:i.FilterTypes.CheckboxGroup,label:"Phân loại",value:[],options:[{label:"Truyện dịch",value:"truyendich"},{label:"Truyện sáng tác",value:"sangtac"},{label:"Convert",value:"convert"}]},status:{type:i.FilterTypes.CheckboxGroup,label:"Tình trạng",value:[],options:[{label:"Đang tiến hành",value:"dangtienhanh"},{label:"Tạm ngưng",value:"tamngung"},{label:"Đã hoàn thành",value:"hoanthanh"}]},sort:{type:i.FilterTypes.Picker,label:"Sắp xếp",value:"top",options:[{label:"A-Z",value:"tentruyen"},{label:"Z-A",value:"tentruyenza"},{label:"Mới cập nhật",value:"capnhat"},{label:"Truyện mới",value:"truyenmoi"},{label:"Theo dõi",value:"theodoi"},{label:"Top toàn thời gian",value:"top"},{label:"Top tháng",value:"topthang"},{label:"Số từ",value:"sotu"}]}}}return l.prototype.parseNovels=function(e){return(0,t.fetchApi)(e).then((function(e){return e.text()})).then((function(e){var t=[],a={},i=!1,l=!1,s=new n.Parser({onopentag:function(e,n){var s,o,r;(null===(s=n.class)||void 0===s?void 0:s.includes("thumb-item-flow"))&&(l=!0),l&&((null===(o=n.class)||void 0===o?void 0:o.includes("series-title"))&&(i=!0),(null===(r=n.class)||void 0===r?void 0:r.includes("img-in-ratio"))&&(a.cover=n["data-bg"]),i&&"a"===e&&(a.name=n.title,a.path=n.href,t.push(a),a={},i=!1,l=!1))}});return s.write(e),s.end(),t}))},l.prototype.popularNovels=function(e,t){var n=t.filters,a=this.site+"/danh-sach";if(n){n.alphabet.value&&(a+="/"+n.alphabet.value);for(var i=new URLSearchParams,l=0,s=n.type.value;l<s.length;l++){var o=s[l];i.append(o,"1")}for(var r=0,u=n.status.value;r<u.length;r++){var h=u[r];i.append(h,"1")}i.append("sapxep",n.sort.value),a+="?"+i.toString()+"&page="+e}else a+="?page="+e;return this.parseNovels(a)},l.prototype.parseNovel=function(i){var l,s={path:i,name:"",author:"",artist:"",summary:"",genres:"",status:""},o=[],r={isDone:!1,isStarted:!1,onopentag:function(e){"a"===e&&(this.isStarted=!0)},ontext:function(e){s.name+=e},onclosetag:function(){this.isStarted&&(this.isDone=!0)}},u={newLine:!1,ontext:function(e){this.newLine?(this.newLine=!1,s.summary+="\n"+e):s.summary+=e},onclosetag:function(){this.newLine=!0}},h={ontext:function(e){s.genres+=e}};!function(e){e[e.Author=0]="Author",e[e.Artist=1]="Artist",e[e.Status=2]="Status",e[e.Unknown=3]="Unknown"}(l||(l={}));var c={isStarted:!1,info:l.Unknown,onopentag:function(e,t){if("info-item"===t.class)switch(this.info){case l.Unknown:s.author||(this.info=l.Author);break;case l.Author:this.info=l.Artist;break;case l.Artist:this.info=l.Status;break;case l.Status:this.info=l.Unknown}"a"===e&&(this.isStarted=!0)},ontext:function(e){if(this.isStarted)switch(this.info){case l.Author:s.author+=e;break;case l.Artist:s.artist+=e;break;case l.Status:s.status+=e}},onclosetag:function(e){this.isStarted&&(this.isStarted=!1),"a"===e&&this.info===l.Status&&(this.isDone=!0)}},v={currentVolume:"",num:0,part:1,isStarted:!1,readingTime:!1,tempChapter:{},onopentag:function(e,t){var n;if(this.isStarted)if("a"===e&&null!==t.title){var a=t.title,i=Number(null===(n=a.match(/Chương\s*(\d+)/i))||void 0===n?void 0:n[1]);i?this.num===i?(i=this.num+this.part/10,this.part+=1):(this.num=i,this.part=1):(i=this.num+this.part/10,this.part++),this.tempChapter={path:t.href,name:a,page:this.currentVolume,chapterNumber:i}}else"chapter-time"===t.class&&(this.readingTime=!0)},ontext:function(e){if(this.readingTime){var t=e.split("/").map((function(e){return Number(e)}));this.tempChapter.releaseTime=new Date(t[2],t[1],t[0]).toISOString(),o.push(this.tempChapter),this.readingTime=!1,this.tempChapter={}}},onclosetag:function(){this.readingTime&&(this.readingTime=!1)}},p={handlers:{Unknown:void 0,GetName:r,GetCover:void 0,GetSummary:u,GetGenres:h,GetInfos:c,GetVolumes:{isStarted:!1,isDone:!1,isParsingChapterList:!1,onopentag:function(e,t){var n;"sect-title"===t.class&&(this.isStarted=!0,v.currentVolume=""),"ul"===e&&(v.isStarted=!0,v.num=0,v.part=1),null===(n=v.onopentag)||void 0===n||n.call(v,e,t)},ontext:function(e){var t;this.isStarted&&(v.currentVolume+=e.trim()),null===(t=v.ontext)||void 0===t||t.call(v,e)},onclosetag:function(e,t){var n;null===(n=v.onclosetag)||void 0===n||n.call(v,e,t),this.isStarted=!1,"ul"===e&&(v.isStarted=!1)}}},action:e.Unknown,onopentag:function(t,n){var a,i;if("series-name"===n.class)this.action=e.GetName;else if(!s.cover&&(null===(a=n.class)||void 0===a?void 0:a.includes("img-in-ratio"))){var l=n.style;l&&(s.cover=l.substring(l.indexOf("http"),l.length-2))}else"summary-content"===n.class?this.action=e.GetSummary:"series-gerne-item"===n.class?this.action=e.GetGenres:"info-item"===n.class?this.action=e.GetInfos:(null===(i=n.class)||void 0===i?void 0:i.includes("volume-list"))&&(this.action=e.GetVolumes)},onclosetag:function(t){var n,a,i;switch(this.action){case e.GetName:(null===(n=this.handlers.GetName)||void 0===n?void 0:n.isDone)&&(this.action=e.Unknown);break;case e.GetSummary:"div"===t&&(this.action=e.Unknown);break;case e.GetGenres:this.action=e.Unknown,s.genres+=",";break;case e.GetInfos:(null===(a=this.handlers.GetInfos)||void 0===a?void 0:a.isDone)&&(this.action=e.Unknown);break;case e.GetVolumes:(null===(i=this.handlers.GetVolumes)||void 0===i?void 0:i.isDone)&&(this.action=e.Unknown)}}};return(0,t.fetchApi)(this.site+i).then((function(e){return e.text()})).then((function(e){var t,i,l,r=new n.Parser({onopentag:function(e,t){var n,a,i;null===(n=p.onopentag)||void 0===n||n.call(p,e,t),p.action&&(null===(i=null===(a=p.handlers[p.action])||void 0===a?void 0:a.onopentag)||void 0===i||i.call(a,e,t))},ontext:function(e){var t,n;p.action&&(null===(n=null===(t=p.handlers[p.action])||void 0===t?void 0:t.ontext)||void 0===n||n.call(t,e))},onclosetag:function(e,t){var n,a,i;p.action&&(null===(a=null===(n=p.handlers[p.action])||void 0===n?void 0:n.onclosetag)||void 0===a||a.call(n,e,t)),null===(i=p.onclosetag)||void 0===i||i.call(p,e,t)}});switch(r.write(e),r.end(),s.chapters=o,null===(t=s.status)||void 0===t?void 0:t.trim()){case"Đang tiến hành":s.status=a.NovelStatus.Ongoing;break;case"Tạm ngưng":s.status=a.NovelStatus.OnHiatus;break;case"Completed":s.status=a.NovelStatus.Completed;break;default:s.status=a.NovelStatus.Unknown}return s.genres=null===(i=s.genres)||void 0===i?void 0:i.replace(/,*\s*$/,""),s.name=s.name.trim(),s.summary=null===(l=s.summary)||void 0===l?void 0:l.trim(),s}))},l.prototype.parseChapter=function(e){return(0,t.fetchApi)(this.site+e).then((function(e){return e.text()})).then((function(e){var t;return(null===(t=e.match(/(<div id="chapter-content".+?>[^]+)<div style="text-align: center;/))||void 0===t?void 0:t[1])||"Không tìm thấy nội dung"}))},l.prototype.searchNovels=function(e,t){var n=this.site+"/tim-kiem?keywords="+e+"&page="+t;return this.parseNovels(n)},l}();exports.default=new l;