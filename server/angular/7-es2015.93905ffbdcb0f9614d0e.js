(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{YuuO:function(t,e,r){"use strict";r.r(e),r.d(e,"AuthModule",(function(){return G}));var n=r("tyNb"),i=r("ahC7"),a=r("pLZG"),o=r("eIep"),s=r("JIr8"),c=r("LRne"),u=r("fXoL"),l=r("7dP1"),m=r("tXUu"),b=r("Wp6s"),h=r("ofXK"),p=r("bTqV"),d=r("3Pt+"),g=r("Kj3r"),f=r("/uUt"),S=r("lJxs"),v=r("SxV6"),y=r("kmnG"),w=r("qFsG");function O(t,e){1&t&&(u.Sb(0,"mat-error"),u.Ac(1,"Username must be at least 4 characters long"),u.Rb())}function F(t,e){1&t&&(u.Sb(0,"mat-error"),u.Ac(1,"Username already taken"),u.Rb())}function R(t,e){1&t&&(u.Sb(0,"mat-error"),u.Ac(1,"Email already taken"),u.Rb())}function I(t,e){1&t&&(u.Sb(0,"mat-error"),u.Ac(1,"Email must be valid"),u.Rb())}function k(t,e){1&t&&(u.Sb(0,"mat-error"),u.Ac(1,"Password must be at least 8 characters long"),u.Rb())}let A=(()=>{class t{constructor(t,e){this.authService=t,this.router=e}ngOnInit(){this.initializeForm()}onSubmit(){this.authForm.valid&&(this.subscription=this.authService.signup(this.authForm.value).subscribe(()=>{this.router.navigate(["/auth/login"])}))}initializeForm(){this.authForm=new d.e({email:new d.c("",[d.r.required,d.r.email],this.isFieldTaken.bind(this,"email")),password:new d.c("",[d.r.required,d.r.minLength(8)]),username:new d.c("",[d.r.required,d.r.minLength(4)],this.isFieldTaken.bind(this,"username"))})}isFieldTaken(t,e){return e.valueChanges.pipe(Object(g.a)(1e3),Object(f.a)(),Object(o.a)(()=>this.authService.checkIfTaken(t,e.value)),Object(S.a)(t=>t.isPresent?t:null),Object(v.a)())}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(u.Nb(l.a),u.Nb(n.c))},t.\u0275cmp=u.Hb({type:t,selectors:[["app-signup"]],decls:20,vars:7,consts:[[3,"formGroup","ngSubmit"],["required","","matInput","","formControlName","username"],[4,"ngIf"],["type","email","minlength","8","required","","matInput","","formControlName","email"],["minlength","8","required","","matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","",3,"disabled"]],template:function(t,e){1&t&&(u.Sb(0,"form",0),u.ac("ngSubmit",(function(){return e.onSubmit()})),u.Sb(1,"mat-form-field"),u.Sb(2,"mat-label"),u.Ac(3,"Username"),u.Rb(),u.Ob(4,"input",1),u.yc(5,O,2,0,"mat-error",2),u.yc(6,F,2,0,"mat-error",2),u.Rb(),u.Sb(7,"mat-form-field"),u.Sb(8,"mat-label"),u.Ac(9,"Email"),u.Rb(),u.Ob(10,"input",3),u.yc(11,R,2,0,"mat-error",2),u.yc(12,I,2,0,"mat-error",2),u.Rb(),u.Sb(13,"mat-form-field"),u.Sb(14,"mat-label"),u.Ac(15,"Password"),u.Rb(),u.Ob(16,"input",4),u.yc(17,k,2,0,"mat-error",2),u.Rb(),u.Sb(18,"button",5),u.Ac(19," Submit "),u.Rb(),u.Rb()),2&t&&(u.kc("formGroup",e.authForm),u.Bb(5),u.kc("ngIf",e.authForm.get("username").touched&&(null==e.authForm.get("username").errors?null:e.authForm.get("username").errors.minlength)),u.Bb(1),u.kc("ngIf",e.authForm.get("username").touched&&(null==e.authForm.get("username").errors?null:e.authForm.get("username").errors.isPresent)),u.Bb(5),u.kc("ngIf",e.authForm.get("email").touched&&(null==e.authForm.get("email").errors?null:e.authForm.get("email").errors.isPresent)),u.Bb(1),u.kc("ngIf",e.authForm.get("email").touched&&(null==e.authForm.get("email").errors?null:e.authForm.get("email").errors.email)),u.Bb(5),u.kc("ngIf",e.authForm.get("password").touched&&(null==e.authForm.get("password").errors?null:e.authForm.get("password").errors.minlength)),u.Bb(1),u.kc("disabled",!e.authForm.valid))},directives:[d.s,d.m,d.f,y.c,y.f,w.a,d.b,d.q,d.l,d.d,h.l,d.h,p.b,y.b],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}"]}),t})();function C(t,e){1&t&&(u.Sb(0,"span",5),u.Ac(1,"Invalid email or password"),u.Rb())}let P=(()=>{class t{constructor(t,e){this.authService=t,this.router=e,this.isError=!1}ngOnInit(){this.initializeForm()}onSubmit(){this.authForm.valid&&this.authService.login(this.authForm.value).subscribe(t=>{this.authService.initializeAuthState(t),this.router.navigate(["/dictionary"])},t=>{this.isError=404===t.status})}initializeForm(){this.authForm=new d.e({email:new d.c("",[d.r.required,d.r.email]),password:new d.c("",d.r.required)})}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(u.Nb(l.a),u.Nb(n.c))},t.\u0275cmp=u.Hb({type:t,selectors:[["app-login"]],decls:12,vars:3,consts:[[3,"formGroup","ngSubmit"],["class","incorrectCredentials",4,"ngIf"],["type","email","matInput","","formControlName","email"],["matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","",3,"disabled"],[1,"incorrectCredentials"]],template:function(t,e){1&t&&(u.Sb(0,"form",0),u.ac("ngSubmit",(function(){return e.onSubmit()})),u.yc(1,C,2,0,"span",1),u.Sb(2,"mat-form-field"),u.Sb(3,"mat-label"),u.Ac(4,"Email"),u.Rb(),u.Ob(5,"input",2),u.Rb(),u.Sb(6,"mat-form-field"),u.Sb(7,"mat-label"),u.Ac(8,"Password"),u.Rb(),u.Ob(9,"input",3),u.Rb(),u.Sb(10,"button",4),u.Ac(11," Submit "),u.Rb(),u.Rb()),2&t&&(u.kc("formGroup",e.authForm),u.Bb(1),u.kc("ngIf",e.isError),u.Bb(9),u.kc("disabled",!e.authForm.valid))},directives:[d.s,d.m,d.f,h.l,y.c,y.f,w.a,d.b,d.l,d.d,p.b],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.incorrectCredentials[_ngcontent-%COMP%]{color:red;padding:10px 0}"]}),t})();function N(t,e){if(1&t&&(u.Sb(0,"mat-card-subtitle",5),u.Ac(1),u.Rb()),2&t){const t=u.ec();u.Bb(1),u.Bc(t.error)}}function B(t,e){1&t&&u.Ob(0,"app-signup")}function j(t,e){1&t&&u.Ob(0,"app-login")}let M=(()=>{class t{constructor(t,e,r,n){this.route=t,this.router=e,this.socialAuthService=r,this.authService=n}ngOnInit(){this.route.url.subscribe(t=>{this.form=t[0].path}),this.socialAuthService.authState.pipe(Object(a.a)(t=>!!t),Object(o.a)(t=>this.authService.googleAuth(t).pipe(Object(s.a)(t=>(this.error="email"===t.error.error.path?"User with such email already registered":"Random error occured",this.socialAuthService.signOut(),Object(c.a)(null)))))).subscribe(t=>{t&&(this.authService.initializeAuthState(t),this.router.navigate(["/dictionary"]),this.socialAuthService.signOut())})}signInWithGoogle(){this.socialAuthService.signIn(i.a.PROVIDER_ID)}onNavigate(){this.router.navigate([`/auth/${"signup"===this.form?"login":"signup"}`])}}return t.\u0275fac=function(e){return new(e||t)(u.Nb(n.a),u.Nb(n.c),u.Nb(i.b),u.Nb(l.a))},t.\u0275cmp=u.Hb({type:t,selectors:[["app-auth"]],decls:15,vars:7,consts:[["class","error",4,"ngIf"],[4,"ngIf"],[1,"social-medias"],["mat-raised-button","","color","warn",3,"click"],[3,"click"],[1,"error"]],template:function(t,e){1&t&&(u.Sb(0,"app-centered-projection"),u.Sb(1,"mat-card"),u.Sb(2,"mat-card-header"),u.Sb(3,"mat-card-title"),u.Ac(4),u.fc(5,"uppercase"),u.Rb(),u.yc(6,N,2,1,"mat-card-subtitle",0),u.Rb(),u.yc(7,B,1,0,"app-signup",1),u.yc(8,j,1,0,"app-login",1),u.Sb(9,"div",2),u.Sb(10,"button",3),u.ac("click",(function(){return e.signInWithGoogle()})),u.Ac(11," Sign in with google "),u.Rb(),u.Rb(),u.Sb(12,"mat-card-actions"),u.Sb(13,"p",4),u.ac("click",(function(){return e.onNavigate()})),u.Ac(14),u.Rb(),u.Rb(),u.Rb(),u.Rb()),2&t&&(u.Bb(4),u.Bc(u.gc(5,5,e.form)),u.Bb(2),u.kc("ngIf",e.error),u.Bb(1),u.kc("ngIf","signup"===e.form),u.Bb(1),u.kc("ngIf","login"===e.form),u.Bb(6),u.Cc(" ","signup"===e.form?"Have an account? Log in":"Don't have an account? Sign up"," "))},directives:[m.a,b.a,b.d,b.g,h.l,p.b,b.b,b.f,A,P],pipes:[h.r],styles:["mat-card[_ngcontent-%COMP%]{width:400px}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:center}mat-card-actions[_ngcontent-%COMP%]{text-align:center}mat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:pointer}.social-medias[_ngcontent-%COMP%], mat-card-title[_ngcontent-%COMP%]{display:flex;justify-content:center}.social-medias[_ngcontent-%COMP%]{margin-top:15px}.error[_ngcontent-%COMP%]{color:red}"]}),t})();const _=[{path:"login",component:M},{path:"signup",component:M}];let x=(()=>{class t{}return t.\u0275mod=u.Lb({type:t}),t.\u0275inj=u.Kb({factory:function(e){return new(e||t)},imports:[[n.g.forChild(_)],n.g]}),t})();var q=r("PCNd");let G=(()=>{class t{}return t.\u0275mod=u.Lb({type:t}),t.\u0275inj=u.Kb({factory:function(e){return new(e||t)},imports:[[x,q.a,d.p]]}),t})()}}]);