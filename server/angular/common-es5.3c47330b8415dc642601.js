function _createForOfIteratorHelper(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,s=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){s=!0,i=t},f:function(){try{o||null==r.return||r.return()}finally{if(s)throw i}}}}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{GOW1:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r("tk/3"),a=r("pLZG"),i=r("lJxs"),o=r("XNiG"),s=r("fXoL"),u=r("OiFK"),c=function(){var t=function(){function t(e,r){_classCallCheck(this,t),this.http=e,this.utilsService=r,this.words=new o.a,this.wordsUpdateListener$=this.words.asObservable(),this.randomOptions=new o.a,this.randomOptionsUpdateListener$=this.randomOptions.asObservable()}return _createClass(t,[{key:"getAvailableGames",value:function(){return["Word-translation","Translation-word","Savannah","Word constructor","Listening","Word cards","Brainstorm"]}},{key:"toggleLearnings",value:function(t,e,r,n){var a=this;this.http.post("/api/learn",{ids:t,reverse:e,gameNumber:r,option:n}).subscribe((function(){n&&a.utilsService.showSnackBar("Words sent to learn")}))}},{key:"getWordsToLearn",value:function(t,e,r){var o=this,s={params:new n.d};t&&(s.params=s.params.set("all",t+"")),e&&(s.params=s.params.set("fetchFrom",e+"")),r&&(s.params=s.params.set("setId",r)),this.http.get("/api/learn",s).pipe(Object(a.a)((function(t){return null!==t.result[0]})),Object(i.a)(this.utilsService.changeIdField),Object(i.a)(this.utilsService.setDefaultPic)).subscribe((function(t){o.wordsToLearn=t,o.words.next(_toConsumableArray(o.wordsToLearn))}))}},{key:"getRandomOptions",value:function(t,e){var r=this;this.http.post("/api/learn/randomOptions",{except:t,property:e}).pipe(Object(i.a)((function(t){return t.options})),Object(i.a)((function(t){return Array.isArray(t[0])?t.map((function(t){return t.join(",")})):t}))).subscribe((function(t){r.randomOptions.next(t)}))}},{key:"getQuantities",value:function(t){var e="";return t&&(e="?setId="+t),this.http.get("/api/learn/quantity"+e).pipe(Object(i.a)((function(t){return Object.values(t.result)})))}}]),t}();return t.\u0275fac=function(e){return new(e||t)(s.Wb(n.b),s.Wb(u.a))},t.\u0275prov=s.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},Ii1A:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r("XNiG"),a=r("lJxs"),i=r("fXoL"),o=r("tk/3"),s=r("OiFK"),u=function(){var t=function(){function t(e,r){_classCallCheck(this,t),this.http=e,this.utilsService=r,this.sets$=new n.a,this.setsUpdateListener$=this.sets$.asObservable(),this.sets=[]}return _createClass(t,[{key:"getSets",value:function(){var t=this;this.http.get("/api/set").pipe(Object(a.a)(this.utilsService.changeIdField)).subscribe((function(e){return t.updateSets("GET",e)}))}},{key:"addSet",value:function(t){var e=this;this.http.post("/api/set",{set:t}).pipe(Object(a.a)(this.utilsService.changeIdField)).subscribe((function(t){e.updateSets("ADD",t)}))}},{key:"deleteSet",value:function(t){var e=this;this.http.delete("/api/set/"+t).pipe(Object(a.a)(this.utilsService.changeIdField)).subscribe((function(t){e.updateSets("DELETE",t)}))}},{key:"editSet",value:function(t){var e=this;this.http.put("/api/set",{set:t}).pipe(Object(a.a)(this.utilsService.changeIdField)).subscribe((function(t){e.updateSets("EDIT",t)}))}},{key:"addWordsToSet",value:function(t,e,r){this.http.put("/api/set/addToSet",{setId:t,ids:e,reverse:r}).subscribe()}},{key:"updateSets",value:function(t,e){switch(t){case"ADD":this.sets.push(e[0]);break;case"GET":this.sets=e;break;case"DELETE":this.sets=this.sets.filter((function(t){return t.id!==e[0].id}));break;case"EDIT":this.sets=this.sets.map((function(t){return t.id===e[0].id?e[0]:t}))}if("GET"!==t){var r=t.toLowerCase();r+="e"===r[r.length-1]?"d":"ed",this.utilsService.showSnackBar("Set "+r)}this.sets$.next(_toConsumableArray(this.sets))}}]),t}();return t.\u0275fac=function(e){return new(e||t)(i.Wb(o.b),i.Wb(s.a))},t.\u0275prov=i.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},OiFK:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r("fXoL"),a=r("dNgK"),i=function(){var t=function(){function t(e){_classCallCheck(this,t),this.snackBar=e}return _createClass(t,[{key:"showSnackBar",value:function(t){this.snackBar.open(t,null,{duration:1500})}},{key:"changeIdField",value:function(t){return t.result.map((function(t){return t.id=t._id,delete t._id,t}))}},{key:"setDefaultPic",value:function(t){return t.map((function(t){return t.pic_url=t.pic_url?t.pic_url:"https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png",t}))}},{key:"onPronounce",value:function(t){var e=new Audio(t);e.load(),e.play()}},{key:"shuffleArray",value:function(t){for(var e=_toConsumableArray(t),r=0;r<e.length;r++){var n=Math.floor(Math.random()*(r+1)),a=e[n];e[n]=e[r],e[r]=a}return e}},{key:"addDateAmongWords",value:function(t){var e,r=[],n={},a=_createForOfIteratorHelper(t);try{for(a.s();!(e=a.n()).done;){var i=e.value,o=new Date(i.createdAt),s=o.getDate()+"-"+o.getMonth()+"-"+o.getFullYear();n[s]||(r.push({title:new Date(i.createdAt)}),n[s]=!0),r.push(i)}}catch(u){a.e(u)}finally{a.f()}return r}}]),t}();return t.\u0275fac=function(e){return new(e||t)(n.Wb(a.a))},t.\u0275prov=n.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},tXUu:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r("fXoL"),a=["*"],i=function(){var t=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"ngOnInit",value:function(){}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Hb({type:t,selectors:[["app-centered-projection"]],ngContentSelectors:a,decls:2,vars:0,consts:[[1,"center"]],template:function(t,e){1&t&&(n.jc(),n.Sb(0,"section",0),n.ic(1),n.Rb())},styles:[".center[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 64px);display:flex;justify-content:center;align-items:center}"]}),t}()}}]);