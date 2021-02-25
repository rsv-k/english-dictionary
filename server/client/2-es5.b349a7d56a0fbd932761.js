function _createForOfIteratorHelper(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw o}}}}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var n,i=_getPrototypeOf(t);if(e){var r=_getPrototypeOf(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{qnIH:function(t,e,n){"use strict";n.r(e),n.d(e,"DictionaryModule",(function(){return Yt}));var i,r=n("tyNb"),o=n("lJxs"),c=n("fXoL"),s=n("tk/3"),a=n("vkgz"),l=n("Kj3r"),u=n("/uUt"),d=n("eIep"),f=n("XNiG"),h=n("cp0P"),p=n("LRne"),b=n("OiFK"),g="https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png",v=((i=function(){function t(e,n){_classCallCheck(this,t),this.http=e,this.utilsService=n,this.wordsUpdateListener=new f.a,this.words=[],this.wordsUpdateListener$=this.wordsUpdateListener.asObservable()}return _createClass(t,[{key:"getWords",value:function(t){var e=this,n={params:new s.d};for(var i in t)t[i]&&(n.params=n.params.set(i,t[i]));this.http.get("/api/word",n).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic)).subscribe((function(n){t.startsWith?e.wordsUpdateListener.next(_toConsumableArray(n)):((t.isCachingWords||0===e.words.length)&&(e.words=[].concat(_toConsumableArray(e.words),_toConsumableArray(n))),e.updateWords("GET",e.words))}))}},{key:"emptyWords",value:function(){this.words=[]}},{key:"editWord",value:function(t){var e=this;t.pic_url===g&&(t.pic_url=null),this.http.put("/api/word",{word:t}).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic),Object(a.a)((function(t){return e.updateWords("EDIT",t)}))).subscribe()}},{key:"createWord",value:function(t){var e=this;return t.pic_url===g&&(t.pic_url=null),this.http.post("/api/word",{word:t}).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic),Object(a.a)((function(t){return e.updateWords("ADD",t)}))).subscribe()}},{key:"deleteWord",value:function(t){var e=this;this.http.delete("/api/word/"+t).pipe(Object(o.a)(this.utilsService.changeIdField),Object(a.a)((function(t){return e.updateWords("DELETE",t)}))).subscribe()}},{key:"deleteManyWords",value:function(t,e,n){var i=this;this.http.post("/api/word/deleteMany",{setId:t,ids:e,reverse:n}).subscribe((function(){var t={};e.forEach((function(e){t[e]=!0})),i.words=i.words.filter((function(e){return n?t[e.id]:!t[e.id]})),i.wordsUpdateListener.next(_toConsumableArray(i.words)),i.utilsService.showSnackBar("Words deleted")}))}},{key:"showTranslations",value:function(t){var e=this;return t.pipe(Object(l.a)(1e3),Object(u.a)(),Object(d.a)((function(t){return Object(h.a)({translations:0===t.trim().length?Object(p.a)([]):e.getTranslations(t),word:e.getSpecificWord(t)})})))}},{key:"getSpecificWord",value:function(t){return this.http.get("/api/word/"+t).pipe(Object(o.a)((function(t){return null===t.result[0]&&(t.result=[]),t})),Object(o.a)(this.utilsService.changeIdField))}},{key:"getTranslations",value:function(t){return this.http.get("/api/word/translations/"+t).pipe(Object(o.a)((function(t){return t.result.translate.map((function(e){return{pic_url:e.pic_url||null,value:e.value,sound_url:t.result.sound_url,transcription:t.result.transcription}}))})))}},{key:"updateWords",value:function(t,e){switch(t){case"ADD":this.words=[e[0]].concat(_toConsumableArray(this.words));break;case"GET":this.words=e;break;case"DELETE":this.words=this.words.filter((function(t){return t.id!==e[0].id}));break;case"EDIT":this.words=this.words.map((function(t){return t.id===e[0].id?e[0]:t}))}if("GET"!==t){var n=t.toLowerCase();n+="e"===n[n.length-1]?"d":"ed",this.utilsService.showSnackBar("Word "+n)}this.wordsUpdateListener.next(_toConsumableArray(this.words))}}]),t}()).\u0275fac=function(t){return new(t||i)(c.Wb(s.b),c.Wb(b.a))},i.\u0275prov=c.Jb({token:i,factory:i.\u0275fac,providedIn:"root"}),i),m=n("xgIS"),w=n("5+tZ"),y=n("pLZG"),k=n("7o/Q"),_=n("D0XW"),S=function(){function t(e,n){_classCallCheck(this,t),this.period=e,this.scheduler=n}return _createClass(t,[{key:"call",value:function(t,e){return e.subscribe(new C(t,this.period,this.scheduler))}}]),t}(),C=function(t){_inherits(n,t);var e=_createSuper(n);function n(t,i,r){var o;return _classCallCheck(this,n),(o=e.call(this,t)).period=i,o.scheduler=r,o.hasValue=!1,o.add(r.schedule(T,i,{subscriber:_assertThisInitialized(o),period:i})),o}return _createClass(n,[{key:"_next",value:function(t){this.lastValue=t,this.hasValue=!0}},{key:"notifyNext",value:function(){this.hasValue&&(this.hasValue=!1,this.destination.next(this.lastValue))}}]),n}(k.a);function T(t){var e=t.subscriber,n=t.period;e.notifyNext(),this.schedule(t,n)}function O(t,e,n,i){var r=window&&!!window.document&&window.document.documentElement,o=r&&e?window:n;if(t&&!(o=t&&r&&"string"==typeof t?function(t,e,n){return(n?window.document:e).querySelector(t)}(t,n.nativeElement,i):t))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return o}function I(t){return t&&!t.firstChange}var W={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},x={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"},R=function(){function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];_classCallCheck(this,t),this.vertical=e,this.propsMap=e?W:x}return _createClass(t,[{key:"clientHeightKey",value:function(){return this.propsMap.clientHeight}},{key:"offsetHeightKey",value:function(){return this.propsMap.offsetHeight}},{key:"scrollHeightKey",value:function(){return this.propsMap.scrollHeight}},{key:"pageYOffsetKey",value:function(){return this.propsMap.pageYOffset}},{key:"offsetTopKey",value:function(){return this.propsMap.offsetTop}},{key:"scrollTopKey",value:function(){return this.propsMap.scrollTop}},{key:"topKey",value:function(){return this.propsMap.top}}]),t}();function P(t){return["Window","global"].some((function(e){return Object.prototype.toString.call(t).includes(e)}))}function A(t,e){return t?e.document.documentElement:null}function M(t,e){var n,i,r,o,c=(i=(n=e).container,r=n.isWindow,o=j(n.axis),B(i,r,o.offsetHeightKey,o.clientHeightKey));return e.isWindow?function(t,e,n){var i=n.axis,r=n.container,o=n.isWindow,c=j(i),s=c.offsetHeightKey,a=c.clientHeightKey,l=t+D(A(o,r),i,o),u=B(e.nativeElement,o,s,a);return{height:t,scrolled:l,totalToScroll:function(t,e,n){var i=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[i]+D(t,e,n)}(e.nativeElement,i,o)+u,isWindow:o}}(c,t,e):function(t,e,n){var i=n.axis,r=n.container;return{height:t,scrolled:r[i.scrollTopKey()],totalToScroll:r[i.scrollHeightKey()],isWindow:!1}}(c,0,e)}function j(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function B(t,e,n,i){if(isNaN(t[n])){var r=A(e,t);return r?r[i]:0}return t[n]}function D(t,e,n){var i=e.pageYOffsetKey(),r=e.scrollTopKey(),o=e.offsetTopKey();return isNaN(window.pageYOffset)?A(n,t)[r]:t.ownerDocument?t.ownerDocument.defaultView[i]:t[o]}function E(t,e,n){var i,r;if(t.totalToScroll<=0)return!1;var o=t.isWindow?t.scrolled:t.height+t.scrolled;return n?(i=(t.totalToScroll-o)/t.totalToScroll,r=e.down/10):(i=t.scrolled/(t.scrolled+(t.totalToScroll-o)),r=e.up/10),i<=r}var z=function(){function t(e){var n=e.totalToScroll;_classCallCheck(this,t),this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=n}return _createClass(t,[{key:"updateScrollPosition",value:function(t){return this.lastScrollPosition=t}},{key:"updateTotalToScroll",value:function(t){this.lastTotalToScroll!==t&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=t)}},{key:"updateScroll",value:function(t,e){this.updateScrollPosition(t),this.updateTotalToScroll(e)}},{key:"updateTriggeredFlag",value:function(t,e){e?this.triggered.down=t:this.triggered.up=t}},{key:"isTriggeredScroll",value:function(t,e){return e?this.triggered.down===t:this.triggered.up===t}}]),t}();function H(t){return{type:t.scrollDown?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:t.stats.scrolled}}}var N,L,K=((L=function(){function t(e,n){_classCallCheck(this,t),this.element=e,this.zone=n,this.scrolled=new c.n,this.scrolledUp=new c.n,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}return _createClass(t,[{key:"ngAfterViewInit",value:function(){this.infiniteScrollDisabled||this.setup()}},{key:"ngOnChanges",value:function(t){var e=t.infiniteScrollContainer,n=t.infiniteScrollDisabled,i=t.infiniteScrollDistance,r=I(e),o=I(n),c=I(i),s=!o&&!this.infiniteScrollDisabled||o&&!n.currentValue||c;(r||o||c)&&(this.destroyScroller(),s&&this.setup())}},{key:"setup",value:function(){var t=this;"undefined"!=typeof window&&this.zone.runOutsideAngular((function(){var e,n,i,r,c,s,l,u,d,f,h,b;t.disposeScroller=(e={fromRoot:t.fromRoot,alwaysCallback:t.alwaysCallback,disable:t.infiniteScrollDisabled,downDistance:t.infiniteScrollDistance,element:t.element,horizontal:t.horizontal,scrollContainer:t.infiniteScrollContainer,scrollWindow:t.scrollWindow,throttle:t.infiniteScrollThrottle,upDistance:t.infiniteScrollUpDistance},s=e.scrollContainer,l=e.scrollWindow,u=e.element,d=e.fromRoot,f=function(t,e){var n=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return Object.assign(Object.assign({},t),{container:n})}({axis:(n={axis:new R(!e.horizontal),windowElement:O(s,l,u,d)}).axis,isWindow:P(i=n.windowElement)},i),h=new z({totalToScroll:M(u,f)}),b={up:e.upDistance,down:e.downDistance},(r={container:f.container,throttle:e.throttle},c=Object(m.a)(r.container,"scroll"),r.throttle&&(c=c.pipe(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:_.a;return function(n){return n.lift(new S(t,e))}}(r.throttle))),c).pipe(Object(w.a)((function(){return Object(p.a)(M(u,f))})),Object(o.a)((function(t){return function(t,e,n){var i=function(t,e,n){var i=function(t,e){return t<e.scrolled}(t,e);return{fire:E(e,n,i),scrollDown:i}}(t,e,n);return{scrollDown:i.scrollDown,fire:i.fire,stats:e}}(h.lastScrollPosition,t,b)})),Object(a.a)((function(t){var e=t.stats;return h.updateScroll(e.scrolled,e.totalToScroll)})),Object(y.a)((function(t){var n=t.fire,i=t.scrollDown,r=t.stats.totalToScroll;return function(t,e,n){return!(!t||!e)||!(n||!e)}(e.alwaysCallback,n,h.isTriggeredScroll(r,i))})),Object(a.a)((function(t){var e=t.scrollDown,n=t.stats.totalToScroll;h.updateTriggeredFlag(n,e)})),Object(o.a)(H))).subscribe((function(e){return t.zone.run((function(){return t.handleOnScroll(e)}))}))}))}},{key:"handleOnScroll",value:function(t){var e=t.type,n=t.payload;switch(e){case"[NGX_ISE] DOWN":return this.scrolled.emit(n);case"[NGX_ISE] UP":return this.scrolledUp.emit(n);default:return}}},{key:"ngOnDestroy",value:function(){this.destroyScroller()}},{key:"destroyScroller",value:function(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}]),t}()).\u0275fac=function(t){return new(t||L)(c.Nb(c.l),c.Nb(c.z))},L.\u0275dir=c.Ib({type:L,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[c.zb]}),L),F=((N=function t(){_classCallCheck(this,t)}).\u0275mod=c.Lb({type:N}),N.\u0275inj=c.Kb({factory:function(t){return new(t||N)},providers:[],imports:[[]]}),N),$=n("7dP1"),U=n("kmnG"),V=n("qFsG"),G=n("/1cH"),Y=n("ofXK"),X=n("FKr1"),J=n("Qu3c"),Q=n("bTqV"),q=["myTranslation"];function Z(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-option",8),c.ac("click",(function(){c.rc(n);var t=e.$implicit;return c.ec(2).chooseTranslation(t)})),c.zc(1),c.Rb()}if(2&t){var i=e.$implicit;c.kc("matTooltip",i.value.length>50?i.value:null)("disabled",i.isPresent),c.Bb(1),c.Bc(" ",i.value," ")}}function tt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-option",9),c.ac("click",(function(){c.rc(n);var t=c.ec(2),e=c.oc(4);return t.isMyTranslation=!0,e.value=t.inputValue})),c.zc(1,"my translation"),c.Rb()}}function et(t,e){if(1&t&&(c.Qb(0),c.xc(1,Z,2,3,"mat-option",6),c.fc(2,"async"),c.xc(3,tt,2,0,"mat-option",7),c.fc(4,"async"),c.Pb()),2&t){var n,i=c.ec(),r=null==(n=c.gc(4,4,i.translations$))?null:n.length;c.Bb(1),c.kc("ngForOf",c.gc(2,2,i.translations$)),c.Bb(2),c.kc("ngIf",r)}}function nt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"button",14),c.ac("click",(function(){c.rc(n),c.ec();var t=c.oc(5);return c.ec().onMyTranslationAdd(t.value)})),c.zc(1," add "),c.Rb()}}function it(t,e){if(1&t){var n=c.Tb();c.Sb(0,"div",10),c.Sb(1,"mat-form-field"),c.Sb(2,"mat-label"),c.zc(3,"my translation"),c.Rb(),c.Sb(4,"input",11,12),c.ac("blur",(function(){c.rc(n);var t=c.ec(),e=c.oc(4);return t.onBlur(),e.value=""})),c.Rb(),c.Rb(),c.xc(6,nt,2,0,"button",13),c.Rb()}if(2&t){var i=c.oc(5);c.Bb(6),c.kc("ngIf",i.value.length>0)}}var rt,ot=((rt=function(){function t(e,n){_classCallCheck(this,t),this.wordService=e,this.authService=n,this.inputValue="",this.wordText$=new f.a,this.isMyTranslation=!1}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;this.translations$=this.wordService.showTranslations(this.wordText$).pipe(Object(a.a)((function(e){t.word=e.word[0],t.translation=e.translations[0],t.wordService.getWords({setId:t.setId,startsWith:t.inputValue})})),Object(o.a)((function(e){var n={};if(t.word){var i,r=_createForOfIteratorHelper(t.word.russian);try{for(r.s();!(i=r.n()).done;){var o=i.value;n[o]=!0}}catch(c){r.e(c)}finally{r.f()}}return e.translations.map((function(t){return t.isPresent=n[t.value],t}))})))}},{key:"onInput",value:function(t){if(this.inputValue=t.trim(),!t)return this.wordService.getWords({setId:this.setId});this.inputValue&&this.wordText$.next(this.inputValue)}},{key:"chooseTranslation",value:function(t){this.wordService.getWords({setId:this.setId}),this.word?(this.word.russian.push(t.value),this.wordService.editWord(this.word)):this.wordService.createWord({english:this.inputValue,russian:[t.value],pic_url:t.pic_url,setId:this.setId?[this.setId]:[],sound_url:t.sound_url,transcription:t.transcription,learn:{wordTranslation:!0,translationWord:!0,savannah:!0,wordConstructor:!0,listening:!0,wordCards:!0},ownerId:this.authService.userId}),this.inputValue="",this.wordText$.next(""),this.translation=null}},{key:"onMyTranslationAdd",value:function(t){this.translation.value=t,this.translation.pic_url=null,this.chooseTranslation(this.translation)}},{key:"onBlur",value:function(){var t=this;setTimeout((function(){return t.isMyTranslation=!1}),500)}},{key:"customTranslation",set:function(t){t&&setTimeout((function(){return t.nativeElement.focus()}),0)}}]),t}()).\u0275fac=function(t){return new(t||rt)(c.Nb(v),c.Nb($.a))},rt.\u0275cmp=c.Hb({type:rt,selectors:[["app-word-create"]],viewQuery:function(t,e){var n;1&t&&c.Dc(q,!0),2&t&&c.nc(n=c.bc())&&(e.customTranslation=n.first)},inputs:{setId:"setId"},decls:9,vars:3,consts:[[1,"create__group"],["matInput","",3,"matAutocomplete","input"],["wordInput",""],["auto","matAutocomplete"],[4,"ngIf"],["class","custom",4,"ngIf"],["class","create__option",3,"matTooltip","disabled","click",4,"ngFor","ngForOf"],[3,"click",4,"ngIf"],[1,"create__option",3,"matTooltip","disabled","click"],[3,"click"],[1,"custom"],["matInput","",3,"blur"],["myTranslation",""],["class","custom__button","mat-raised-button","",3,"click",4,"ngIf"],["mat-raised-button","",1,"custom__button",3,"click"]],template:function(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-form-field",0),c.Sb(1,"mat-label"),c.zc(2,"Word"),c.Rb(),c.Sb(3,"input",1,2),c.ac("input",(function(){c.rc(n);var t=c.oc(4);return e.onInput(t.value)})),c.Rb(),c.Sb(5,"mat-autocomplete",null,3),c.xc(7,et,5,6,"ng-container",4),c.Rb(),c.Rb(),c.xc(8,it,7,1,"div",5)}if(2&t){var i=c.oc(4),r=c.oc(6);c.Bb(3),c.kc("matAutocomplete",r),c.Bb(4),c.kc("ngIf",i.value.length>0),c.Bb(1),c.kc("ngIf",e.isMyTranslation)}},directives:[U.c,U.f,V.a,G.c,G.a,Y.l,Y.k,X.f,J.a,Q.b],pipes:[Y.b],styles:[".create__group[_ngcontent-%COMP%]{width:100%}.custom[_ngcontent-%COMP%]{display:flex}.custom__button[_ngcontent-%COMP%]{align-self:center}"]}),rt),ct=n("Wp6s"),st=n("GOW1"),at=n("Ii1A"),lt=n("bSwM"),ut=n("NFeN"),dt=n("d3UM");function ft(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-option",5),c.ac("click",(function(){c.rc(n);var t=e.index;return c.ec().manageSelected(t)})),c.zc(1),c.Rb()}if(2&t){var i=e.$implicit;c.Bb(1),c.Bc(" ",i," ")}}function ht(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-option",5),c.ac("click",(function(){c.rc(n);var t=e.$implicit;return c.ec().addToSet(t.id)})),c.zc(1),c.Rb()}if(2&t){var i=e.$implicit;c.Bb(1),c.Bc(" ",i.title," ")}}var pt,bt,gt=((pt=function(){function t(e,n,i){_classCallCheck(this,t),this.learnService=e,this.wordService=n,this.setService=i,this.setCheckAll=new c.n,this.uncheckWords=new c.n}return _createClass(t,[{key:"ngOnInit",value:function(){this.availableGames=["All"].concat(_toConsumableArray(this.learnService.getAvailableGames())),this.sets$=this.setService.setsUpdateListener$,this.setService.getSets()}},{key:"manageSelected",value:function(t){(this.checkAll||this.checkedWords.length)&&(isNaN(t)?this.deleteSelected():this.sendToLearn(t),this.uncheckWords.emit())}},{key:"addToSet",value:function(t){if(this.checkAll||this.checkedWords.length){var e=this.getOnlyIds();this.setService.addWordsToSet(t,e,this.checkAll),this.uncheckWords.emit()}}},{key:"setAsLearned",value:function(){if(this.checkAll||this.checkedWords.length){var t=this.getOnlyIds();this.learnService.toggleLearnings(t,this.checkAll,0,!1),this.uncheckWords.emit()}}},{key:"deleteSelected",value:function(){var t=this.getOnlyIds();this.wordService.deleteManyWords(this.setId,t,this.checkAll)}},{key:"sendToLearn",value:function(t){var e=this.getOnlyIds();this.learnService.toggleLearnings(e,this.checkAll,t,!0)}},{key:"getOnlyIds",value:function(){return this.checkedWords.map((function(t){return t.id}))}}]),t}()).\u0275fac=function(t){return new(t||pt)(c.Nb(st.a),c.Nb(v),c.Nb(at.a))},pt.\u0275cmp=c.Hb({type:pt,selectors:[["app-manage-words"]],inputs:{setId:"setId",checkAll:"checkAll",checkedWords:"checkedWords"},outputs:{setCheckAll:"setCheckAll",uncheckWords:"uncheckWords"},decls:18,vars:7,consts:[["matTooltip","select all","color","primary",1,"dictionary__selectAll",3,"checked","change"],["matTooltip","set as learned selected","mat-icon-button","","color","primary",3,"disabled","click"],["matTooltip","delete selected","mat-icon-button","","color","warn",3,"disabled","click"],[1,"manage-words__sendToGames"],[3,"click",4,"ngFor","ngForOf"],[3,"click"]],template:function(t,e){1&t&&(c.Sb(0,"mat-checkbox",0),c.ac("change",(function(){return e.setCheckAll.emit(!e.checkAll)})),c.Rb(),c.Sb(1,"button",1),c.ac("click",(function(){return e.setAsLearned()})),c.Sb(2,"mat-icon"),c.zc(3,"done"),c.Rb(),c.Rb(),c.Sb(4,"button",2),c.ac("click",(function(){return e.manageSelected()})),c.Sb(5,"mat-icon"),c.zc(6,"delete"),c.Rb(),c.Rb(),c.Sb(7,"mat-form-field",3),c.Sb(8,"mat-label"),c.zc(9,"Send to..."),c.Rb(),c.Sb(10,"mat-select"),c.xc(11,ft,2,1,"mat-option",4),c.Rb(),c.Rb(),c.Sb(12,"mat-form-field"),c.Sb(13,"mat-label"),c.zc(14,"Add to set"),c.Rb(),c.Sb(15,"mat-select"),c.xc(16,ht,2,1,"mat-option",4),c.fc(17,"async"),c.Rb(),c.Rb()),2&t&&(c.kc("checked",e.checkAll),c.Bb(1),c.kc("disabled",!e.checkAll&&!e.checkedWords.length),c.Bb(3),c.kc("disabled",!e.checkAll&&!e.checkedWords.length),c.Bb(7),c.kc("ngForOf",e.availableGames),c.Bb(5),c.kc("ngForOf",c.gc(17,5,e.sets$)))},directives:[lt.a,J.a,Q.b,ut.a,U.c,U.f,dt.a,Y.k,X.f],pipes:[Y.b],styles:["[_nghost-%COMP%]{text-align:left;padding:0 16px;margin-bottom:20px}.manage-words__sendToGames[_ngcontent-%COMP%]{margin-right:10px}"]}),pt),vt=n("7EHt"),mt=((bt=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"transform",value:function(t,e){return t.length>e?t.slice(0,e)+"...":t}}]),t}()).\u0275fac=function(t){return new(t||bt)},bt.\u0275pipe=c.Mb({name:"cutLength",type:bt,pure:!0}),bt);function wt(t,e){if(1&t&&(c.Sb(0,"mat-panel-description"),c.zc(1),c.fc(2,"cutLength"),c.Rb()),2&t){var n=c.ec();c.Bb(1),c.Bc(" ",c.hc(2,1,n.word.russian.join(", "),30)," ")}}function yt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"button",15),c.ac("click",(function(){return c.rc(n),c.ec(2).pronounce()})),c.zc(1),c.Rb()}if(2&t){var i=c.ec(2);c.Bb(1),c.Bc(" ",i.word.transcription," ")}}function kt(t,e){if(1&t&&(c.Sb(0,"div",16),c.zc(1),c.Rb()),2&t){var n=c.ec(2);c.Bb(1),c.Bc(" ",n.word.russian.join(", ")," ")}}function _t(t,e){if(1&t){var n=c.Tb();c.Sb(0,"div",3),c.xc(1,yt,2,1,"button",4),c.Sb(2,"div",5),c.Sb(3,"div",6),c.Ob(4,"img",7),c.Rb(),c.xc(5,kt,2,1,"div",8),c.Rb(),c.Sb(6,"p",9),c.zc(7),c.Rb(),c.Rb(),c.Sb(8,"mat-action-row",10),c.Sb(9,"p",11),c.zc(10),c.fc(11,"date"),c.Rb(),c.Sb(12,"div",12),c.Sb(13,"button",13),c.ac("click",(function(){return c.rc(n),c.ec().onDelete()})),c.zc(14," Delete "),c.Rb(),c.Sb(15,"button",14),c.ac("click",(function(){return c.rc(n),c.ec().onEdit()})),c.zc(16," Edit "),c.Rb(),c.Rb(),c.Rb()}if(2&t){var i=c.ec();c.Bb(1),c.kc("ngIf",i.word.transcription),c.Bb(3),c.kc("src",i.word.pic_url,c.sc)("alt",i.word.english),c.Bb(1),c.kc("ngIf",i.isPanelOpened),c.Bb(2),c.Bc(" ",i.word.text," "),c.Bb(3),c.Bc("Added ",c.hc(11,6,i.date,"d MMMM y"),"")}}var St,Ct=((St=function(){function t(e,n){_classCallCheck(this,t),this.wordService=e,this.utilsService=n,this.showEditing=new c.n,this.isPanelOpened=!1}return _createClass(t,[{key:"ngOnInit",value:function(){this.date=new Date(this.word.createdAt)}},{key:"onDelete",value:function(){this.wordService.deleteWord(this.word.id)}},{key:"onEdit",value:function(){this.showEditing.emit(this.word)}},{key:"pronounce",value:function(){this.utilsService.onPronounce(this.word.sound_url)}}]),t}()).\u0275fac=function(t){return new(t||St)(c.Nb(v),c.Nb(b.a))},St.\u0275cmp=c.Hb({type:St,selectors:[["app-word"]],inputs:{word:"word"},outputs:{showEditing:"showEditing"},decls:6,vars:2,consts:[[3,"opened","closed"],[4,"ngIf"],["matExpansionPanelContent",""],[1,"content"],["mat-button","","class","content__transcription",3,"click",4,"ngIf"],[1,"content__top"],[1,"picture__container"],[1,"picture",3,"src","alt"],["class","content__translation",4,"ngIf"],[1,"text--plain"],[1,"action"],[1,"date"],[1,"buttons"],["mat-raised-button","","color","warn",3,"click"],["mat-raised-button","","color","primary",3,"click"],["mat-button","",1,"content__transcription",3,"click"],[1,"content__translation"]],template:function(t,e){1&t&&(c.Sb(0,"mat-expansion-panel",0),c.ac("opened",(function(){return e.isPanelOpened=!0}))("closed",(function(){return e.isPanelOpened=!1})),c.Sb(1,"mat-expansion-panel-header"),c.Sb(2,"mat-panel-title"),c.zc(3),c.Rb(),c.xc(4,wt,3,4,"mat-panel-description",1),c.Rb(),c.xc(5,_t,17,9,"ng-template",2),c.Rb()),2&t&&(c.Bb(3),c.Bc(" ",e.word.english," "),c.Bb(1),c.kc("ngIf",!e.isPanelOpened))},directives:[vt.b,vt.f,vt.g,Y.l,vt.d,vt.e,vt.c,Q.b],pipes:[mt,Y.e],styles:[".text--plain[_ngcontent-%COMP%]{color:grey}.content[_ngcontent-%COMP%]{flex-direction:column}.content[_ngcontent-%COMP%], .content__top[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.content__transcription[_ngcontent-%COMP%]{align-self:flex-start}.picture__container[_ngcontent-%COMP%]{width:300px}.picture[_ngcontent-%COMP%]{max-width:100%;height:auto}.action[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"]}),St),Tt=n("R0Ic"),Ot=n("3Pt+");function It(t,e){if(1&t){var n=c.Tb();c.Sb(0,"button",16),c.ac("click",(function(){return c.rc(n),c.ec().onUpdateWord()})),c.Sb(1,"mat-icon"),c.zc(2,"save"),c.Rb(),c.Rb()}}function Wt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-form-field",14),c.Sb(1,"mat-label"),c.zc(2,"Picture url"),c.Rb(),c.Sb(3,"input",15),c.ac("ngModelChange",(function(t){return c.rc(n),c.ec().currentImage=t})),c.Rb(),c.Rb()}if(2&t){var i=c.ec();c.Bb(3),c.kc("ngModel",i.currentImage)}}function xt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-icon",18),c.ac("click",(function(){c.rc(n);var t=c.ec().$implicit;return c.ec().onDeleteTranslation(t)})),c.zc(1,"delete"),c.Rb()}}function Rt(t,e){if(1&t&&(c.Sb(0,"p"),c.zc(1),c.xc(2,xt,2,0,"mat-icon",17),c.Rb()),2&t){var n=e.$implicit,i=c.ec();c.Bb(1),c.Bc(" ",n," "),c.Bb(1),c.kc("ngIf",i.currentTranslations.length>1)}}var Pt,At=((Pt=function(){function t(e,n){_classCallCheck(this,t),this.wordService=e,this.utilsService=n,this.state="hidden",this.hide=new c.n,this.showPictureInput=!1,this.currentImage="",this.currentText=""}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;setTimeout((function(){return t.state="displayed"}),0),this.currentImage=this.word.pic_url,this.currentTranslations=_toConsumableArray(this.word.russian),this.currentText=this.word.text}},{key:"onUpdateWord",value:function(){this.word.pic_url=this.currentImage,this.word.russian=this.currentTranslations,this.word.text=this.currentText,this.wordService.editWord(this.word),this.closeItself()}},{key:"onDeleteTranslation",value:function(t){this.currentTranslations=this.currentTranslations.filter((function(e){return e!==t}))}},{key:"onHide",value:function(t){t.target===t.currentTarget&&this.closeItself()}},{key:"onPronounce",value:function(){this.utilsService.onPronounce(this.word.sound_url)}},{key:"hasAnythingChanged",value:function(){return!(this.word.pic_url===this.currentImage&&this.word.russian.join("")===this.currentTranslations.join("")&&this.currentText===this.word.text)}},{key:"closeItself",value:function(){var t=this;this.state="hidden",setTimeout((function(){return t.hide.emit(null)}),500)}}]),t}()).\u0275fac=function(t){return new(t||Pt)(c.Nb(v),c.Nb(b.a))},Pt.\u0275cmp=c.Hb({type:Pt,selectors:[["app-word-edit"]],inputs:{word:"word"},outputs:{hide:"hide"},decls:26,vars:10,consts:[[1,"container",3,"click"],[1,"form"],["mat-icon-button","","color","primary","class","save",3,"click",4,"ngIf"],["mat-button","",1,"form__wordTranscription",3,"click"],[1,"top"],[1,"left","form__image-container"],[1,"form__picture",3,"src","alt"],["mat-icon-button","","color","primary",1,"form__buttonChangePicture",3,"click"],["class","form__group",4,"ngIf"],[1,"middle"],[1,"form__word-translations"],[1,"translations__title"],[4,"ngFor","ngForOf"],[1,"bottom"],[1,"form__group"],["matInput","",3,"ngModel","ngModelChange"],["mat-icon-button","","color","primary",1,"save",3,"click"],["class","form__icon","color","accent",3,"click",4,"ngIf"],["color","accent",1,"form__icon",3,"click"]],template:function(t,e){1&t&&(c.Sb(0,"div",0),c.ac("click",(function(t){return e.onHide(t)})),c.Sb(1,"mat-card",1),c.xc(2,It,3,0,"button",2),c.Sb(3,"mat-card-header"),c.Sb(4,"mat-card-title"),c.zc(5),c.Rb(),c.Sb(6,"mat-card-subtitle"),c.Sb(7,"button",3),c.ac("click",(function(){return e.onPronounce()})),c.zc(8),c.Rb(),c.Rb(),c.Rb(),c.Sb(9,"div",4),c.Sb(10,"div",5),c.Ob(11,"img",6),c.Sb(12,"button",7),c.ac("click",(function(){return e.showPictureInput=!e.showPictureInput})),c.Sb(13,"mat-icon"),c.zc(14),c.Rb(),c.Rb(),c.xc(15,Wt,4,1,"mat-form-field",8),c.Rb(),c.Sb(16,"div",9),c.Sb(17,"div",10),c.Sb(18,"p",11),c.zc(19,"Translations"),c.Rb(),c.xc(20,Rt,3,2,"p",12),c.Rb(),c.Rb(),c.Rb(),c.Sb(21,"div",13),c.Sb(22,"mat-form-field",14),c.Sb(23,"mat-label"),c.zc(24,"Context of word"),c.Rb(),c.Sb(25,"textarea",15),c.ac("ngModelChange",(function(t){return e.currentText=t})),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Rb()),2&t&&(c.Bb(1),c.kc("@editState",e.state),c.Bb(1),c.kc("ngIf",e.hasAnythingChanged()),c.Bb(3),c.Ac(e.word.english),c.Bb(3),c.Bc(" [",e.word.transcription,"] "),c.Bb(3),c.kc("src",e.currentImage,c.sc)("alt",e.word.english),c.Bb(3),c.Ac(e.showPictureInput?"save":"edit"),c.Bb(1),c.kc("ngIf",e.showPictureInput),c.Bb(5),c.kc("ngForOf",e.currentTranslations),c.Bb(5),c.kc("ngModel",e.currentText))},directives:[ct.a,Y.l,ct.d,ct.g,ct.f,Q.b,ut.a,Y.k,U.c,U.f,V.a,Ot.b,Ot.l,Ot.o],styles:[".container[_ngcontent-%COMP%]{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center}.form[_ngcontent-%COMP%]{width:600px}.form__image-container[_ngcontent-%COMP%]{width:200px;position:relative}.form__buttonChangePicture[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.form__picture[_ngcontent-%COMP%]{max-width:100%;height:auto}.form__group[_ngcontent-%COMP%]{width:100%}.form__icon[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.top[_ngcontent-%COMP%]{display:flex;justify-content:space-between}mat-card[_ngcontent-%COMP%]{position:relative}.save[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}.translations__title[_ngcontent-%COMP%]{margin-top:0;font-weight:600}"],data:{animation:[Object(Tt.n)("editState",[Object(Tt.k)("hidden",Object(Tt.l)({transform:"translateY(-200%)"})),Object(Tt.k)("displayed",Object(Tt.l)({transform:"translateY(0)"})),Object(Tt.m)("hidden <=> displayed",Object(Tt.e)(500))])]}}),Pt);function Mt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"app-manage-words",7),c.ac("uncheckWords",(function(){return c.rc(n),c.ec().uncheckWords()}))("setCheckAll",(function(t){return c.rc(n),c.ec().setCheckAll(t)})),c.Rb()}if(2&t){var i=c.ec();c.kc("setId",i.setId)("checkedWords",i.checkedWords)("checkAll",i.checkAll)}}function jt(t,e){if(1&t&&(c.Sb(0,"p",10),c.zc(1),c.fc(2,"date"),c.Rb()),2&t){var n=c.ec().$implicit;c.Bb(1),c.Bc(" ",c.hc(2,1,n.title,"d MMMM y")," ")}}function Bt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"mat-checkbox",11),c.ac("change",(function(){c.rc(n);var t=c.ec().$implicit;return c.ec().onCheckBoxChange(t)})),c.Rb(),c.Sb(1,"app-word",12),c.ac("showEditing",(function(t){return c.rc(n),c.ec(2).toggleEditing(t)})),c.Rb()}if(2&t){var i=c.ec().$implicit,r=c.ec();c.kc("checked",r.checkAll||i.isChecked),c.Bb(1),c.kc("word",i)}}function Dt(t,e){if(1&t&&(c.Qb(0),c.xc(1,jt,3,4,"p",8),c.xc(2,Bt,2,2,"ng-template",null,9,c.yc),c.Pb()),2&t){var n=e.$implicit,i=c.oc(3);c.Bb(1),c.kc("ngIf",n.title)("ngIfElse",i)}}function Et(t,e){1&t&&(c.Sb(0,"p",13),c.zc(1," Nothing added yet "),c.Rb())}function zt(t,e){if(1&t){var n=c.Tb();c.Sb(0,"app-word-edit",14),c.ac("hide",(function(t){return c.rc(n),c.ec().toggleEditing(t)})),c.Rb()}if(2&t){var i=c.ec();c.kc("word",i.word)}}var Ht,Nt,Lt,Kt,Ft=((Ht=function(){function t(e,n,i){_classCallCheck(this,t),this.wordService=e,this.route=n,this.utilsService=i,this.showEdit=!1,this.checkedWords=[],this.checkAll=!1,this.currentPage=0}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;this.setId=this.route.snapshot.params.id;var e=this.route.snapshot.params.setName;this.title=e?e.split("_").join(" "):"dictionary",this.route.data.subscribe((function(e){t.words=e.words})),this.subscription=this.wordService.wordsUpdateListener$.pipe(Object(o.a)(this.utilsService.addDateAmongWords)).subscribe((function(e){t.words=e}))}},{key:"toggleEditing",value:function(t){this.showEdit=!this.showEdit,this.word=t,document.body.style.overflowY=this.showEdit?"hidden":""}},{key:"onCheckBoxChange",value:function(t){this.checkedWords.find((function(e){return e.id===t.id}))?this.checkedWords=this.checkedWords.filter((function(e){return e!==t})):this.checkedWords.push(t),t.isChecked=!t.isChecked}},{key:"onScroll",value:function(){this.currentPage++,this.wordService.getWords({setId:this.setId,startsFrom:this.currentPage,isCachingWords:!0})}},{key:"setCheckAll",value:function(t){this.checkAll=t}},{key:"uncheckWords",value:function(){this.checkedWords=this.checkedWords.filter((function(t){return t.isChecked=!1,!1})),this.checkAll=!1}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}}]),t}()).\u0275fac=function(t){return new(t||Ht)(c.Nb(v),c.Nb(r.a),c.Nb(b.a))},Ht.\u0275cmp=c.Hb({type:Ht,selectors:[["app-dictionary"]],decls:11,vars:8,consts:[["infinite-scroll","",1,"dictionary",3,"scrolled"],[1,"dictionary__header"],[3,"setId"],[3,"setId","checkedWords","checkAll","uncheckWords","setCheckAll",4,"ngIf"],[4,"ngFor","ngForOf"],["class","dictionary__empty",4,"ngIf"],[3,"word","hide",4,"ngIf"],[3,"setId","checkedWords","checkAll","uncheckWords","setCheckAll"],["class","date-title",4,"ngIf","ngIfElse"],["wordAlternative",""],[1,"date-title"],["color","primary",1,"dictionary__checkbox",3,"checked","change"],[1,"dictionary__word",3,"word","showEditing"],[1,"dictionary__empty"],[3,"word","hide"]],template:function(t,e){1&t&&(c.Sb(0,"section",0),c.ac("scrolled",(function(){return e.onScroll()})),c.Sb(1,"header",1),c.Sb(2,"h1"),c.zc(3),c.fc(4,"uppercase"),c.Rb(),c.Ob(5,"app-word-create",2),c.xc(6,Mt,1,3,"app-manage-words",3),c.Rb(),c.Sb(7,"mat-card"),c.xc(8,Dt,4,2,"ng-container",4),c.xc(9,Et,2,0,"p",5),c.Rb(),c.Rb(),c.xc(10,zt,1,1,"app-word-edit",6)),2&t&&(c.Bb(3),c.Ac(c.gc(4,6,e.title)),c.Bb(2),c.kc("setId",e.setId),c.Bb(1),c.kc("ngIf",null==e.words?null:e.words.length),c.Bb(2),c.kc("ngForOf",e.words),c.Bb(1),c.kc("ngIf",!(null!=e.words&&e.words.length)),c.Bb(1),c.kc("ngIf",e.showEdit))},directives:[K,ot,Y.l,ct.a,Y.k,gt,lt.a,Ct,At],pipes:[Y.r,Y.e],styles:[".dictionary[_ngcontent-%COMP%]{margin:0 auto;width:60%}.dictionary__button[_ngcontent-%COMP%]{align-self:center}.dictionary__empty[_ngcontent-%COMP%]{text-align:center;grid-column-end:span 2;justify-self:center}.dictionary__wordholder[_ngcontent-%COMP%]{display:flex;align-items:center}.dictionary__checkbox[_ngcontent-%COMP%]{margin-right:16px}.dictionary__word[_ngcontent-%COMP%]{width:100%}mat-card[_ngcontent-%COMP%]{display:grid;grid-template-columns:35px 1fr;align-items:center;row-gap:5px}.date-title[_ngcontent-%COMP%]{grid-column-start:span 2;font-weight:500;justify-self:center}"]}),Ht),$t=n("SxV6"),Ut=[{path:"",component:Ft,resolve:{words:(Nt=function(){function t(e,n){_classCallCheck(this,t),this.wordService=e,this.utilsService=n}return _createClass(t,[{key:"resolve",value:function(t){var e={setId:t.paramMap.get("id")};return this.wordService.emptyWords(),this.wordService.getWords(e),this.wordService.wordsUpdateListener$.pipe(Object($t.a)(),Object(o.a)(this.utilsService.addDateAmongWords))}}]),t}(),Nt.\u0275fac=function(t){return new(t||Nt)(c.Wb(v),c.Wb(b.a))},Nt.\u0275prov=c.Jb({token:Nt,factory:Nt.\u0275fac,providedIn:"root"}),Nt)}}],Vt=((Lt=function t(){_classCallCheck(this,t)}).\u0275mod=c.Lb({type:Lt}),Lt.\u0275inj=c.Kb({factory:function(t){return new(t||Lt)},imports:[[r.g.forChild(Ut)],r.g]}),Lt),Gt=n("PCNd"),Yt=((Kt=function t(){_classCallCheck(this,t)}).\u0275mod=c.Lb({type:Kt}),Kt.\u0275inj=c.Kb({factory:function(t){return new(t||Kt)},imports:[[Vt,Gt.a,F]]}),Kt)}}]);