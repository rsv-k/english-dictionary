(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{qnIH:function(t,e,n){"use strict";n.r(e),n.d(e,"DictionaryModule",(function(){return Dt}));var i=n("tyNb"),o=n("lJxs"),c=n("fXoL"),s=n("tk/3"),r=n("vkgz"),l=n("Kj3r"),a=n("/uUt"),d=n("eIep"),u=n("XNiG"),h=n("cp0P"),p=n("LRne"),b=n("OiFK");const f="https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png";let g=(()=>{class t{constructor(t,e){this.http=t,this.utilsService=e,this.wordsUpdateListener=new u.a,this.words=[],this.wordsUpdateListener$=this.wordsUpdateListener.asObservable()}getWords(t){const e={params:new s.d};for(const n in t)t[n]&&(e.params=e.params.set(n,t[n]));this.http.get("/api/word",e).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic)).subscribe(e=>{t.startsWith?this.wordsUpdateListener.next([...e]):((t.isCachingWords||0===this.words.length)&&(this.words=[...this.words,...e]),this.updateWords("GET",this.words))})}emptyWords(){this.words=[]}editWord(t){t.pic_url===f&&(t.pic_url=null),this.http.put("/api/word",{word:t}).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic),Object(r.a)(t=>this.updateWords("EDIT",t))).subscribe()}createWord(t){return t.pic_url===f&&(t.pic_url=null),this.http.post("/api/word",{word:t}).pipe(Object(o.a)(this.utilsService.changeIdField),Object(o.a)(this.utilsService.setDefaultPic),Object(r.a)(t=>this.updateWords("ADD",t))).subscribe()}deleteWord(t){this.http.delete("/api/word/"+t).pipe(Object(o.a)(this.utilsService.changeIdField),Object(r.a)(t=>this.updateWords("DELETE",t))).subscribe()}deleteManyWords(t,e,n){this.http.post("/api/word/deleteMany",{setId:t,ids:e,reverse:n}).subscribe(()=>{const t={};e.forEach(e=>{t[e]=!0}),this.words=this.words.filter(e=>n?t[e.id]:!t[e.id]),this.wordsUpdateListener.next([...this.words]),this.utilsService.showSnackBar("Words deleted")})}showTranslations(t){return t.pipe(Object(l.a)(1e3),Object(a.a)(),Object(d.a)(t=>Object(h.a)({translations:0===t.trim().length?Object(p.a)([]):this.getTranslations(t),word:this.getSpecificWord(t)})))}getSpecificWord(t){return this.http.get("/api/word/"+t).pipe(Object(o.a)(t=>(null===t.result[0]&&(t.result=[]),t)),Object(o.a)(this.utilsService.changeIdField))}getTranslations(t){return this.http.get("/api/word/translations/"+t).pipe(Object(o.a)(t=>t.result.translate.map(e=>({pic_url:e.pic_url||null,value:e.value,sound_url:t.result.sound_url,transcription:t.result.transcription}))))}updateWords(t,e){switch(t){case"ADD":this.words=[e[0],...this.words];break;case"GET":this.words=e;break;case"DELETE":this.words=this.words.filter(t=>t.id!==e[0].id);break;case"EDIT":this.words=this.words.map(t=>t.id===e[0].id?e[0]:t)}if("GET"!==t){let e=t.toLowerCase();e+="e"===e[e.length-1]?"d":"ed",this.utilsService.showSnackBar("Word "+e)}this.wordsUpdateListener.next([...this.words])}}return t.\u0275fac=function(e){return new(e||t)(c.Wb(s.b),c.Wb(b.a))},t.\u0275prov=c.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var w=n("xgIS"),m=n("5+tZ"),S=n("pLZG"),k=n("7o/Q"),_=n("D0XW");class y{constructor(t,e){this.period=t,this.scheduler=e}call(t,e){return e.subscribe(new v(t,this.period,this.scheduler))}}class v extends k.a{constructor(t,e,n){super(t),this.period=e,this.scheduler=n,this.hasValue=!1,this.add(n.schedule(T,e,{subscriber:this,period:e}))}_next(t){this.lastValue=t,this.hasValue=!0}notifyNext(){this.hasValue&&(this.hasValue=!1,this.destination.next(this.lastValue))}}function T(t){let{subscriber:e,period:n}=t;e.notifyNext(),this.schedule(t,n)}function O(t,e,n,i){const o=window&&!!window.document&&window.document.documentElement;let c=o&&e?window:n;if(t&&(c=t&&o&&"string"==typeof t?function(t,e,n){return(n?window.document:e).querySelector(t)}(t,n.nativeElement,i):t,!c))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return c}function I(t){return t&&!t.firstChange}const W={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},x={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class C{constructor(t=!0){this.vertical=t,this.propsMap=t?W:x}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function R(t){return["Window","global"].some(e=>Object.prototype.toString.call(t).includes(e))}function P(t,e){return t?e.document.documentElement:null}function M(t,e){const n=function({container:t,isWindow:e,axis:n}){const{offsetHeightKey:i,clientHeightKey:o}=B(n);return j(t,e,i,o)}(e);return e.isWindow?function(t,e,n){const{axis:i,container:o,isWindow:c}=n,{offsetHeightKey:s,clientHeightKey:r}=B(i),l=t+A(P(c,o),i,c),a=j(e.nativeElement,c,s,r);return{height:t,scrolled:l,totalToScroll:function(t,e,n){const i=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[i]+A(t,e,n)}(e.nativeElement,i,c)+a,isWindow:c}}(n,t,e):function(t,e,n){const{axis:i,container:o}=n;return{height:t,scrolled:o[i.scrollTopKey()],totalToScroll:o[i.scrollHeightKey()],isWindow:!1}}(n,0,e)}function B(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function j(t,e,n,i){if(isNaN(t[n])){const n=P(e,t);return n?n[i]:0}return t[n]}function A(t,e,n){const i=e.pageYOffsetKey(),o=e.scrollTopKey(),c=e.offsetTopKey();return isNaN(window.pageYOffset)?P(n,t)[o]:t.ownerDocument?t.ownerDocument.defaultView[i]:t[c]}function D(t,e,n){let i,o;if(t.totalToScroll<=0)return!1;const c=t.isWindow?t.scrolled:t.height+t.scrolled;return n?(i=(t.totalToScroll-c)/t.totalToScroll,o=e.down/10):(i=t.scrolled/(t.scrolled+(t.totalToScroll-c)),o=e.up/10),i<=o}class E{constructor({totalToScroll:t}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=t}updateScrollPosition(t){return this.lastScrollPosition=t}updateTotalToScroll(t){this.lastTotalToScroll!==t&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=t)}updateScroll(t,e){this.updateScrollPosition(t),this.updateTotalToScroll(e)}updateTriggeredFlag(t,e){e?this.triggered.down=t:this.triggered.up=t}isTriggeredScroll(t,e){return e?this.triggered.down===t:this.triggered.up===t}}function z(t){const{scrollDown:e,stats:{scrolled:n}}=t;return{type:e?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:n}}}let N=(()=>{class t{constructor(t,e){this.element=t,this.zone=e,this.scrolled=new c.n,this.scrolledUp=new c.n,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:t,infiniteScrollDisabled:e,infiniteScrollDistance:n}){const i=I(t),o=I(e),c=I(n),s=!o&&!this.infiniteScrollDisabled||o&&!e.currentValue||c;(i||o||c)&&(this.destroyScroller(),s&&this.setup())}setup(){"undefined"!=typeof window&&this.zone.runOutsideAngular(()=>{this.disposeScroller=function(t){const{scrollContainer:e,scrollWindow:n,element:i,fromRoot:c}=t,s=function({windowElement:t,axis:e}){return function(t,e){const n=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return Object.assign(Object.assign({},t),{container:n})}({axis:e,isWindow:R(t)},t)}({axis:new C(!t.horizontal),windowElement:O(e,n,i,c)}),l=new E({totalToScroll:M(i,s)}),a={up:t.upDistance,down:t.downDistance};return function(t){let e=Object(w.a)(t.container,"scroll");return t.throttle&&(e=e.pipe(function(t,e=_.a){return n=>n.lift(new y(t,e))}(t.throttle))),e}({container:s.container,throttle:t.throttle}).pipe(Object(m.a)(()=>Object(p.a)(M(i,s))),Object(o.a)(t=>function(t,e,n){const{scrollDown:i,fire:o}=function(t,e,n){const i=function(t,e){return t<e.scrolled}(t,e);return{fire:D(e,n,i),scrollDown:i}}(t,e,n);return{scrollDown:i,fire:o,stats:e}}(l.lastScrollPosition,t,a)),Object(r.a)(({stats:t})=>l.updateScroll(t.scrolled,t.totalToScroll)),Object(S.a)(({fire:e,scrollDown:n,stats:{totalToScroll:i}})=>function(t,e,n){return!(!t||!e)||!(n||!e)}(t.alwaysCallback,e,l.isTriggeredScroll(i,n))),Object(r.a)(({scrollDown:t,stats:{totalToScroll:e}})=>{l.updateTriggeredFlag(e,t)}),Object(o.a)(z))}({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(t=>this.zone.run(()=>this.handleOnScroll(t)))})}handleOnScroll({type:t,payload:e}){switch(t){case"[NGX_ISE] DOWN":return this.scrolled.emit(e);case"[NGX_ISE] UP":return this.scrolledUp.emit(e);default:return}}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(c.l),c.Nb(c.z))},t.\u0275dir=c.Ib({type:t,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[c.zb]}),t})(),H=(()=>{class t{}return t.\u0275mod=c.Lb({type:t}),t.\u0275inj=c.Kb({factory:function(e){return new(e||t)},providers:[],imports:[[]]}),t})();var K=n("7dP1"),L=n("kmnG"),F=n("qFsG"),$=n("/1cH"),U=n("ofXK"),V=n("FKr1"),G=n("Qu3c"),Y=n("bTqV");const X=["myTranslation"];function J(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-option",8),c.ac("click",(function(){c.rc(t);const n=e.$implicit;return c.ec(2).chooseTranslation(n)})),c.zc(1),c.Rb()}if(2&t){const t=e.$implicit;c.kc("matTooltip",t.value.length>50?t.value:null)("disabled",t.isPresent),c.Bb(1),c.Bc(" ",t.value," ")}}function Q(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-option",9),c.ac("click",(function(){c.rc(t);const e=c.ec(2),n=c.oc(4);return e.isMyTranslation=!0,n.value=e.inputValue})),c.zc(1,"my translation"),c.Rb()}}function q(t,e){if(1&t&&(c.Qb(0),c.xc(1,J,2,3,"mat-option",6),c.fc(2,"async"),c.xc(3,Q,2,0,"mat-option",7),c.fc(4,"async"),c.Pb()),2&t){const t=c.ec();var n;const e=null==(n=c.gc(4,4,t.translations$))?null:n.length;c.Bb(1),c.kc("ngForOf",c.gc(2,2,t.translations$)),c.Bb(2),c.kc("ngIf",e)}}function Z(t,e){if(1&t){const t=c.Tb();c.Sb(0,"button",14),c.ac("click",(function(){c.rc(t),c.ec();const e=c.oc(5);return c.ec().onMyTranslationAdd(e.value)})),c.zc(1," add "),c.Rb()}}function tt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"div",10),c.Sb(1,"mat-form-field"),c.Sb(2,"mat-label"),c.zc(3,"my translation"),c.Rb(),c.Sb(4,"input",11,12),c.ac("blur",(function(){c.rc(t);const e=c.ec(),n=c.oc(4);return e.onBlur(),n.value=""})),c.Rb(),c.Rb(),c.xc(6,Z,2,0,"button",13),c.Rb()}if(2&t){const t=c.oc(5);c.Bb(6),c.kc("ngIf",t.value.length>0)}}let et=(()=>{class t{constructor(t,e){this.wordService=t,this.authService=e,this.inputValue="",this.wordText$=new u.a,this.isMyTranslation=!1}set customTranslation(t){t&&setTimeout(()=>t.nativeElement.focus(),0)}ngOnInit(){this.translations$=this.wordService.showTranslations(this.wordText$).pipe(Object(r.a)(t=>{this.word=t.word[0],this.translation=t.translations[0],this.wordService.getWords({setId:this.setId,startsWith:this.inputValue})}),Object(o.a)(t=>{const e={};if(this.word)for(const n of this.word.russian)e[n]=!0;return t.translations.map(t=>(t.isPresent=e[t.value],t))}))}onInput(t){if(this.inputValue=t.trim(),!t)return this.wordService.getWords({setId:this.setId});this.inputValue&&this.wordText$.next(this.inputValue)}chooseTranslation(t){this.wordService.getWords({setId:this.setId}),this.word?(this.word.russian.push(t.value),this.wordService.editWord(this.word)):this.wordService.createWord({english:this.inputValue,russian:[t.value],pic_url:t.pic_url,setId:this.setId?[this.setId]:[],sound_url:t.sound_url,transcription:t.transcription,learn:{wordTranslation:!0,translationWord:!0,savannah:!0,wordConstructor:!0,listening:!0,wordCards:!0},ownerId:this.authService.userId}),this.inputValue="",this.wordText$.next(""),this.translation=null}onMyTranslationAdd(t){this.translation.value=t,this.translation.pic_url=null,this.chooseTranslation(this.translation)}onBlur(){setTimeout(()=>this.isMyTranslation=!1,500)}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(g),c.Nb(K.a))},t.\u0275cmp=c.Hb({type:t,selectors:[["app-word-create"]],viewQuery:function(t,e){var n;1&t&&c.Dc(X,!0),2&t&&c.nc(n=c.bc())&&(e.customTranslation=n.first)},inputs:{setId:"setId"},decls:9,vars:3,consts:[[1,"create__group"],["matInput","",3,"matAutocomplete","input"],["wordInput",""],["auto","matAutocomplete"],[4,"ngIf"],["class","custom",4,"ngIf"],["class","create__option",3,"matTooltip","disabled","click",4,"ngFor","ngForOf"],[3,"click",4,"ngIf"],[1,"create__option",3,"matTooltip","disabled","click"],[3,"click"],[1,"custom"],["matInput","",3,"blur"],["myTranslation",""],["class","custom__button","mat-raised-button","",3,"click",4,"ngIf"],["mat-raised-button","",1,"custom__button",3,"click"]],template:function(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-form-field",0),c.Sb(1,"mat-label"),c.zc(2,"Word"),c.Rb(),c.Sb(3,"input",1,2),c.ac("input",(function(){c.rc(t);const n=c.oc(4);return e.onInput(n.value)})),c.Rb(),c.Sb(5,"mat-autocomplete",null,3),c.xc(7,q,5,6,"ng-container",4),c.Rb(),c.Rb(),c.xc(8,tt,7,1,"div",5)}if(2&t){const t=c.oc(4),n=c.oc(6);c.Bb(3),c.kc("matAutocomplete",n),c.Bb(4),c.kc("ngIf",t.value.length>0),c.Bb(1),c.kc("ngIf",e.isMyTranslation)}},directives:[L.c,L.f,F.a,$.c,$.a,U.l,U.k,V.f,G.a,Y.b],pipes:[U.b],styles:[".create__group[_ngcontent-%COMP%]{width:100%}.custom[_ngcontent-%COMP%]{display:flex}.custom__button[_ngcontent-%COMP%]{align-self:center}"]}),t})();var nt=n("Wp6s"),it=n("GOW1"),ot=n("Ii1A"),ct=n("bSwM"),st=n("NFeN"),rt=n("d3UM");function lt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-option",5),c.ac("click",(function(){c.rc(t);const n=e.index;return c.ec().manageSelected(n)})),c.zc(1),c.Rb()}if(2&t){const t=e.$implicit;c.Bb(1),c.Bc(" ",t," ")}}function at(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-option",5),c.ac("click",(function(){c.rc(t);const n=e.$implicit;return c.ec().addToSet(n.id)})),c.zc(1),c.Rb()}if(2&t){const t=e.$implicit;c.Bb(1),c.Bc(" ",t.title," ")}}let dt=(()=>{class t{constructor(t,e,n){this.learnService=t,this.wordService=e,this.setService=n,this.setCheckAll=new c.n,this.uncheckWords=new c.n}ngOnInit(){this.availableGames=["All",...this.learnService.getAvailableGames()],this.sets$=this.setService.setsUpdateListener$,this.setService.getSets()}manageSelected(t){(this.checkAll||this.checkedWords.length)&&(isNaN(t)?this.deleteSelected():this.sendToLearn(t),this.uncheckWords.emit())}addToSet(t){if(!this.checkAll&&!this.checkedWords.length)return;const e=this.getOnlyIds();this.setService.addWordsToSet(t,e,this.checkAll),this.uncheckWords.emit()}setAsLearned(){if(!this.checkAll&&!this.checkedWords.length)return;const t=this.getOnlyIds();this.learnService.toggleLearnings(t,this.checkAll,0,!1),this.uncheckWords.emit()}deleteSelected(){const t=this.getOnlyIds();this.wordService.deleteManyWords(this.setId,t,this.checkAll)}sendToLearn(t){const e=this.getOnlyIds();this.learnService.toggleLearnings(e,this.checkAll,t,!0)}getOnlyIds(){return this.checkedWords.map(t=>t.id)}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(it.a),c.Nb(g),c.Nb(ot.a))},t.\u0275cmp=c.Hb({type:t,selectors:[["app-manage-words"]],inputs:{setId:"setId",checkAll:"checkAll",checkedWords:"checkedWords"},outputs:{setCheckAll:"setCheckAll",uncheckWords:"uncheckWords"},decls:18,vars:7,consts:[["matTooltip","select all","color","primary",1,"dictionary__selectAll",3,"checked","change"],["matTooltip","set as learned selected","mat-icon-button","","color","primary",3,"disabled","click"],["matTooltip","delete selected","mat-icon-button","","color","warn",3,"disabled","click"],[1,"manage-words__sendToGames"],[3,"click",4,"ngFor","ngForOf"],[3,"click"]],template:function(t,e){1&t&&(c.Sb(0,"mat-checkbox",0),c.ac("change",(function(){return e.setCheckAll.emit(!e.checkAll)})),c.Rb(),c.Sb(1,"button",1),c.ac("click",(function(){return e.setAsLearned()})),c.Sb(2,"mat-icon"),c.zc(3,"done"),c.Rb(),c.Rb(),c.Sb(4,"button",2),c.ac("click",(function(){return e.manageSelected()})),c.Sb(5,"mat-icon"),c.zc(6,"delete"),c.Rb(),c.Rb(),c.Sb(7,"mat-form-field",3),c.Sb(8,"mat-label"),c.zc(9,"Send to..."),c.Rb(),c.Sb(10,"mat-select"),c.xc(11,lt,2,1,"mat-option",4),c.Rb(),c.Rb(),c.Sb(12,"mat-form-field"),c.Sb(13,"mat-label"),c.zc(14,"Add to set"),c.Rb(),c.Sb(15,"mat-select"),c.xc(16,at,2,1,"mat-option",4),c.fc(17,"async"),c.Rb(),c.Rb()),2&t&&(c.kc("checked",e.checkAll),c.Bb(1),c.kc("disabled",!e.checkAll&&!e.checkedWords.length),c.Bb(3),c.kc("disabled",!e.checkAll&&!e.checkedWords.length),c.Bb(7),c.kc("ngForOf",e.availableGames),c.Bb(5),c.kc("ngForOf",c.gc(17,5,e.sets$)))},directives:[ct.a,G.a,Y.b,st.a,L.c,L.f,rt.a,U.k,V.f],pipes:[U.b],styles:["[_nghost-%COMP%]{text-align:left;padding:0 16px;margin-bottom:20px}.manage-words__sendToGames[_ngcontent-%COMP%]{margin-right:10px}"]}),t})();var ut=n("7EHt");let ht=(()=>{class t{transform(t,e){return t.length>e?t.slice(0,e)+"...":t}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=c.Mb({name:"cutLength",type:t,pure:!0}),t})();function pt(t,e){if(1&t&&(c.Sb(0,"mat-panel-description"),c.zc(1),c.fc(2,"cutLength"),c.Rb()),2&t){const t=c.ec();c.Bb(1),c.Bc(" ",c.hc(2,1,t.word.russian.join(", "),30)," ")}}function bt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"button",15),c.ac("click",(function(){return c.rc(t),c.ec(2).pronounce()})),c.zc(1),c.Rb()}if(2&t){const t=c.ec(2);c.Bb(1),c.Bc(" ",t.word.transcription," ")}}function ft(t,e){if(1&t&&(c.Sb(0,"div",16),c.zc(1),c.Rb()),2&t){const t=c.ec(2);c.Bb(1),c.Bc(" ",t.word.russian.join(", ")," ")}}function gt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"div",3),c.xc(1,bt,2,1,"button",4),c.Sb(2,"div",5),c.Sb(3,"div",6),c.Ob(4,"img",7),c.Rb(),c.xc(5,ft,2,1,"div",8),c.Rb(),c.Sb(6,"p",9),c.zc(7),c.Rb(),c.Rb(),c.Sb(8,"mat-action-row",10),c.Sb(9,"p",11),c.zc(10),c.fc(11,"date"),c.Rb(),c.Sb(12,"div",12),c.Sb(13,"button",13),c.ac("click",(function(){return c.rc(t),c.ec().onDelete()})),c.zc(14," Delete "),c.Rb(),c.Sb(15,"button",14),c.ac("click",(function(){return c.rc(t),c.ec().onEdit()})),c.zc(16," Edit "),c.Rb(),c.Rb(),c.Rb()}if(2&t){const t=c.ec();c.Bb(1),c.kc("ngIf",t.word.transcription),c.Bb(3),c.kc("src",t.word.pic_url,c.sc)("alt",t.word.english),c.Bb(1),c.kc("ngIf",t.isPanelOpened),c.Bb(2),c.Bc(" ",t.word.text," "),c.Bb(3),c.Bc("Added ",c.hc(11,6,t.date,"d MMMM y"),"")}}let wt=(()=>{class t{constructor(t,e){this.wordService=t,this.utilsService=e,this.showEditing=new c.n,this.isPanelOpened=!1}ngOnInit(){this.date=new Date(this.word.createdAt)}onDelete(){this.wordService.deleteWord(this.word.id)}onEdit(){this.showEditing.emit(this.word)}pronounce(){this.utilsService.onPronounce(this.word.sound_url)}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(g),c.Nb(b.a))},t.\u0275cmp=c.Hb({type:t,selectors:[["app-word"]],inputs:{word:"word"},outputs:{showEditing:"showEditing"},decls:6,vars:2,consts:[[3,"opened","closed"],[4,"ngIf"],["matExpansionPanelContent",""],[1,"content"],["mat-button","","class","content__transcription",3,"click",4,"ngIf"],[1,"content__top"],[1,"picture__container"],[1,"picture",3,"src","alt"],["class","content__translation",4,"ngIf"],[1,"text--plain"],[1,"action"],[1,"date"],[1,"buttons"],["mat-raised-button","","color","warn",3,"click"],["mat-raised-button","","color","primary",3,"click"],["mat-button","",1,"content__transcription",3,"click"],[1,"content__translation"]],template:function(t,e){1&t&&(c.Sb(0,"mat-expansion-panel",0),c.ac("opened",(function(){return e.isPanelOpened=!0}))("closed",(function(){return e.isPanelOpened=!1})),c.Sb(1,"mat-expansion-panel-header"),c.Sb(2,"mat-panel-title"),c.zc(3),c.Rb(),c.xc(4,pt,3,4,"mat-panel-description",1),c.Rb(),c.xc(5,gt,17,9,"ng-template",2),c.Rb()),2&t&&(c.Bb(3),c.Bc(" ",e.word.english," "),c.Bb(1),c.kc("ngIf",!e.isPanelOpened))},directives:[ut.b,ut.f,ut.g,U.l,ut.d,ut.e,ut.c,Y.b],pipes:[ht,U.e],styles:[".text--plain[_ngcontent-%COMP%]{color:grey}.content[_ngcontent-%COMP%]{flex-direction:column}.content[_ngcontent-%COMP%], .content__top[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.content__transcription[_ngcontent-%COMP%]{align-self:flex-start}.picture__container[_ngcontent-%COMP%]{width:300px}.picture[_ngcontent-%COMP%]{max-width:100%;height:auto}.action[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"]}),t})();var mt=n("R0Ic"),St=n("3Pt+");function kt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"button",16),c.ac("click",(function(){return c.rc(t),c.ec().onUpdateWord()})),c.Sb(1,"mat-icon"),c.zc(2,"save"),c.Rb(),c.Rb()}}function _t(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-form-field",14),c.Sb(1,"mat-label"),c.zc(2,"Picture url"),c.Rb(),c.Sb(3,"input",15),c.ac("ngModelChange",(function(e){return c.rc(t),c.ec().currentImage=e})),c.Rb(),c.Rb()}if(2&t){const t=c.ec();c.Bb(3),c.kc("ngModel",t.currentImage)}}function yt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-icon",18),c.ac("click",(function(){c.rc(t);const e=c.ec().$implicit;return c.ec().onDeleteTranslation(e)})),c.zc(1,"delete"),c.Rb()}}function vt(t,e){if(1&t&&(c.Sb(0,"p"),c.zc(1),c.xc(2,yt,2,0,"mat-icon",17),c.Rb()),2&t){const t=e.$implicit,n=c.ec();c.Bb(1),c.Bc(" ",t," "),c.Bb(1),c.kc("ngIf",n.currentTranslations.length>1)}}let Tt=(()=>{class t{constructor(t,e){this.wordService=t,this.utilsService=e,this.state="hidden",this.hide=new c.n,this.showPictureInput=!1,this.currentImage="",this.currentText=""}ngOnInit(){setTimeout(()=>this.state="displayed",0),this.currentImage=this.word.pic_url,this.currentTranslations=[...this.word.russian],this.currentText=this.word.text}onUpdateWord(){this.word.pic_url=this.currentImage,this.word.russian=this.currentTranslations,this.word.text=this.currentText,this.wordService.editWord(this.word),this.closeItself()}onDeleteTranslation(t){this.currentTranslations=this.currentTranslations.filter(e=>e!==t)}onHide(t){t.target===t.currentTarget&&this.closeItself()}onPronounce(){this.utilsService.onPronounce(this.word.sound_url)}hasAnythingChanged(){return!(this.word.pic_url===this.currentImage&&this.word.russian.join("")===this.currentTranslations.join("")&&this.currentText===this.word.text)}closeItself(){this.state="hidden",setTimeout(()=>this.hide.emit(null),500)}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(g),c.Nb(b.a))},t.\u0275cmp=c.Hb({type:t,selectors:[["app-word-edit"]],inputs:{word:"word"},outputs:{hide:"hide"},decls:26,vars:10,consts:[[1,"container",3,"click"],[1,"form"],["mat-icon-button","","color","primary","class","save",3,"click",4,"ngIf"],["mat-button","",1,"form__wordTranscription",3,"click"],[1,"top"],[1,"left","form__image-container"],[1,"form__picture",3,"src","alt"],["mat-icon-button","","color","primary",1,"form__buttonChangePicture",3,"click"],["class","form__group",4,"ngIf"],[1,"middle"],[1,"form__word-translations"],[1,"translations__title"],[4,"ngFor","ngForOf"],[1,"bottom"],[1,"form__group"],["matInput","",3,"ngModel","ngModelChange"],["mat-icon-button","","color","primary",1,"save",3,"click"],["class","form__icon","color","accent",3,"click",4,"ngIf"],["color","accent",1,"form__icon",3,"click"]],template:function(t,e){1&t&&(c.Sb(0,"div",0),c.ac("click",(function(t){return e.onHide(t)})),c.Sb(1,"mat-card",1),c.xc(2,kt,3,0,"button",2),c.Sb(3,"mat-card-header"),c.Sb(4,"mat-card-title"),c.zc(5),c.Rb(),c.Sb(6,"mat-card-subtitle"),c.Sb(7,"button",3),c.ac("click",(function(){return e.onPronounce()})),c.zc(8),c.Rb(),c.Rb(),c.Rb(),c.Sb(9,"div",4),c.Sb(10,"div",5),c.Ob(11,"img",6),c.Sb(12,"button",7),c.ac("click",(function(){return e.showPictureInput=!e.showPictureInput})),c.Sb(13,"mat-icon"),c.zc(14),c.Rb(),c.Rb(),c.xc(15,_t,4,1,"mat-form-field",8),c.Rb(),c.Sb(16,"div",9),c.Sb(17,"div",10),c.Sb(18,"p",11),c.zc(19,"Translations"),c.Rb(),c.xc(20,vt,3,2,"p",12),c.Rb(),c.Rb(),c.Rb(),c.Sb(21,"div",13),c.Sb(22,"mat-form-field",14),c.Sb(23,"mat-label"),c.zc(24,"Context of word"),c.Rb(),c.Sb(25,"textarea",15),c.ac("ngModelChange",(function(t){return e.currentText=t})),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Rb()),2&t&&(c.Bb(1),c.kc("@editState",e.state),c.Bb(1),c.kc("ngIf",e.hasAnythingChanged()),c.Bb(3),c.Ac(e.word.english),c.Bb(3),c.Bc(" [",e.word.transcription,"] "),c.Bb(3),c.kc("src",e.currentImage,c.sc)("alt",e.word.english),c.Bb(3),c.Ac(e.showPictureInput?"save":"edit"),c.Bb(1),c.kc("ngIf",e.showPictureInput),c.Bb(5),c.kc("ngForOf",e.currentTranslations),c.Bb(5),c.kc("ngModel",e.currentText))},directives:[nt.a,U.l,nt.d,nt.g,nt.f,Y.b,st.a,U.k,L.c,L.f,F.a,St.b,St.l,St.o],styles:[".container[_ngcontent-%COMP%]{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center}.form[_ngcontent-%COMP%]{width:600px}.form__image-container[_ngcontent-%COMP%]{width:200px;position:relative}.form__buttonChangePicture[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.form__picture[_ngcontent-%COMP%]{max-width:100%;height:auto}.form__group[_ngcontent-%COMP%]{width:100%}.form__icon[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.top[_ngcontent-%COMP%]{display:flex;justify-content:space-between}mat-card[_ngcontent-%COMP%]{position:relative}.save[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}.translations__title[_ngcontent-%COMP%]{margin-top:0;font-weight:600}"],data:{animation:[Object(mt.n)("editState",[Object(mt.k)("hidden",Object(mt.l)({transform:"translateY(-200%)"})),Object(mt.k)("displayed",Object(mt.l)({transform:"translateY(0)"})),Object(mt.m)("hidden <=> displayed",Object(mt.e)(500))])]}}),t})();function Ot(t,e){if(1&t){const t=c.Tb();c.Sb(0,"app-manage-words",7),c.ac("uncheckWords",(function(){return c.rc(t),c.ec().uncheckWords()}))("setCheckAll",(function(e){return c.rc(t),c.ec().setCheckAll(e)})),c.Rb()}if(2&t){const t=c.ec();c.kc("setId",t.setId)("checkedWords",t.checkedWords)("checkAll",t.checkAll)}}function It(t,e){if(1&t&&(c.Sb(0,"p",10),c.zc(1),c.fc(2,"date"),c.Rb()),2&t){const t=c.ec().$implicit;c.Bb(1),c.Bc(" ",c.hc(2,1,t.title,"d MMMM y")," ")}}function Wt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-checkbox",11),c.ac("change",(function(){c.rc(t);const e=c.ec().$implicit;return c.ec().onCheckBoxChange(e)})),c.Rb(),c.Sb(1,"app-word",12),c.ac("showEditing",(function(e){return c.rc(t),c.ec(2).toggleEditing(e)})),c.Rb()}if(2&t){const t=c.ec().$implicit,e=c.ec();c.kc("checked",e.checkAll||t.isChecked),c.Bb(1),c.kc("word",t)}}function xt(t,e){if(1&t&&(c.Qb(0),c.xc(1,It,3,4,"p",8),c.xc(2,Wt,2,2,"ng-template",null,9,c.yc),c.Pb()),2&t){const t=e.$implicit,n=c.oc(3);c.Bb(1),c.kc("ngIf",t.title)("ngIfElse",n)}}function Ct(t,e){1&t&&(c.Sb(0,"p",13),c.zc(1," Nothing added yet "),c.Rb())}function Rt(t,e){if(1&t){const t=c.Tb();c.Sb(0,"app-word-edit",14),c.ac("hide",(function(e){return c.rc(t),c.ec().toggleEditing(e)})),c.Rb()}if(2&t){const t=c.ec();c.kc("word",t.word)}}let Pt=(()=>{class t{constructor(t,e,n){this.wordService=t,this.route=e,this.utilsService=n,this.showEdit=!1,this.checkedWords=[],this.checkAll=!1,this.currentPage=0}ngOnInit(){this.setId=this.route.snapshot.params.id;const t=this.route.snapshot.params.setName;this.title=t?t.split("_").join(" "):"dictionary",this.route.data.subscribe(t=>{this.words=t.words}),this.subscription=this.wordService.wordsUpdateListener$.pipe(Object(o.a)(this.utilsService.addDateAmongWords)).subscribe(t=>{this.words=t})}toggleEditing(t){this.showEdit=!this.showEdit,this.word=t,document.body.style.overflowY=this.showEdit?"hidden":""}onCheckBoxChange(t){this.checkedWords.find(e=>e.id===t.id)?this.checkedWords=this.checkedWords.filter(e=>e!==t):this.checkedWords.push(t),t.isChecked=!t.isChecked}onScroll(){this.currentPage++,this.wordService.getWords({setId:this.setId,startsFrom:this.currentPage,isCachingWords:!0})}setCheckAll(t){this.checkAll=t}uncheckWords(){this.checkedWords=this.checkedWords.filter(t=>(t.isChecked=!1,!1)),this.checkAll=!1}ngOnDestroy(){this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Nb(g),c.Nb(i.a),c.Nb(b.a))},t.\u0275cmp=c.Hb({type:t,selectors:[["app-dictionary"]],decls:11,vars:8,consts:[["infinite-scroll","",1,"dictionary",3,"scrolled"],[1,"dictionary__header"],[3,"setId"],[3,"setId","checkedWords","checkAll","uncheckWords","setCheckAll",4,"ngIf"],[4,"ngFor","ngForOf"],["class","dictionary__empty",4,"ngIf"],[3,"word","hide",4,"ngIf"],[3,"setId","checkedWords","checkAll","uncheckWords","setCheckAll"],["class","date-title",4,"ngIf","ngIfElse"],["wordAlternative",""],[1,"date-title"],["color","primary",1,"dictionary__checkbox",3,"checked","change"],[1,"dictionary__word",3,"word","showEditing"],[1,"dictionary__empty"],[3,"word","hide"]],template:function(t,e){1&t&&(c.Sb(0,"section",0),c.ac("scrolled",(function(){return e.onScroll()})),c.Sb(1,"header",1),c.Sb(2,"h1"),c.zc(3),c.fc(4,"uppercase"),c.Rb(),c.Ob(5,"app-word-create",2),c.xc(6,Ot,1,3,"app-manage-words",3),c.Rb(),c.Sb(7,"mat-card"),c.xc(8,xt,4,2,"ng-container",4),c.xc(9,Ct,2,0,"p",5),c.Rb(),c.Rb(),c.xc(10,Rt,1,1,"app-word-edit",6)),2&t&&(c.Bb(3),c.Ac(c.gc(4,6,e.title)),c.Bb(2),c.kc("setId",e.setId),c.Bb(1),c.kc("ngIf",null==e.words?null:e.words.length),c.Bb(2),c.kc("ngForOf",e.words),c.Bb(1),c.kc("ngIf",!(null!=e.words&&e.words.length)),c.Bb(1),c.kc("ngIf",e.showEdit))},directives:[N,et,U.l,nt.a,U.k,dt,ct.a,wt,Tt],pipes:[U.r,U.e],styles:[".dictionary[_ngcontent-%COMP%]{margin:0 auto;width:60%}.dictionary__button[_ngcontent-%COMP%]{align-self:center}.dictionary__empty[_ngcontent-%COMP%]{text-align:center;grid-column-end:span 2;justify-self:center}.dictionary__wordholder[_ngcontent-%COMP%]{display:flex;align-items:center}.dictionary__checkbox[_ngcontent-%COMP%]{margin-right:16px}.dictionary__word[_ngcontent-%COMP%]{width:100%}mat-card[_ngcontent-%COMP%]{display:grid;grid-template-columns:35px 1fr;align-items:center;row-gap:5px}.date-title[_ngcontent-%COMP%]{grid-column-start:span 2;font-weight:500;justify-self:center}"]}),t})();var Mt=n("SxV6");const Bt=[{path:"",component:Pt,resolve:{words:(()=>{class t{constructor(t,e){this.wordService=t,this.utilsService=e}resolve(t,e){const n={setId:t.paramMap.get("id")};return this.wordService.emptyWords(),this.wordService.getWords(n),this.wordService.wordsUpdateListener$.pipe(Object(Mt.a)(),Object(o.a)(this.utilsService.addDateAmongWords))}}return t.\u0275fac=function(e){return new(e||t)(c.Wb(g),c.Wb(b.a))},t.\u0275prov=c.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}];let jt=(()=>{class t{}return t.\u0275mod=c.Lb({type:t}),t.\u0275inj=c.Kb({factory:function(e){return new(e||t)},imports:[[i.g.forChild(Bt)],i.g]}),t})();var At=n("PCNd");let Dt=(()=>{class t{}return t.\u0275mod=c.Lb({type:t}),t.\u0275inj=c.Kb({factory:function(e){return new(e||t)},imports:[[jt,At.a,H]]}),t})()}}]);