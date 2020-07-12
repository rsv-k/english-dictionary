(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{YuuO:function(t,e,r){"use strict";r.r(e),r.d(e,"AuthModule",(function(){return q}));var n=r("tyNb"),i=r("ahC7"),a=r("pLZG"),o=r("eIep"),s=r("fXoL"),c=r("7dP1"),u=r("tXUu"),l=r("Wp6s"),m=r("ofXK"),b=r("bTqV"),h=r("3Pt+"),p=r("Kj3r"),d=r("/uUt"),g=r("lJxs"),f=r("SxV6"),S=r("kmnG"),v=r("qFsG");function y(t,e){1&t&&(s.Sb(0,"mat-error"),s.Ac(1,"Username must be at least 4 characters long"),s.Rb())}function w(t,e){1&t&&(s.Sb(0,"mat-error"),s.Ac(1,"Username already taken"),s.Rb())}function F(t,e){1&t&&(s.Sb(0,"mat-error"),s.Ac(1,"Email already taken"),s.Rb())}function O(t,e){1&t&&(s.Sb(0,"mat-error"),s.Ac(1,"Email must be valid"),s.Rb())}function R(t,e){1&t&&(s.Sb(0,"mat-error"),s.Ac(1,"Password must be at least 8 characters long"),s.Rb())}let I=(()=>{class t{constructor(t,e){this.authService=t,this.router=e}ngOnInit(){this.initializeForm()}onSubmit(){this.authForm.valid&&(this.subscription=this.authService.signup(this.authForm.value).subscribe(()=>{this.router.navigate(["/auth/login"])}))}initializeForm(){this.authForm=new h.e({email:new h.c("",[h.r.required,h.r.email],this.isFieldTaken.bind(this,"email")),password:new h.c("",[h.r.required,h.r.minLength(8)]),username:new h.c("",[h.r.required,h.r.minLength(4)],this.isFieldTaken.bind(this,"username"))})}isFieldTaken(t,e){return e.valueChanges.pipe(Object(p.a)(1e3),Object(d.a)(),Object(o.a)(()=>this.authService.checkIfTaken(t,e.value)),Object(g.a)(t=>t.isPresent?t:null),Object(f.a)())}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(c.a),s.Nb(n.c))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-signup"]],decls:20,vars:7,consts:[[3,"formGroup","ngSubmit"],["required","","matInput","","formControlName","username"],[4,"ngIf"],["type","email","minlength","8","required","","matInput","","formControlName","email"],["minlength","8","required","","matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","",3,"disabled"]],template:function(t,e){1&t&&(s.Sb(0,"form",0),s.ac("ngSubmit",(function(){return e.onSubmit()})),s.Sb(1,"mat-form-field"),s.Sb(2,"mat-label"),s.Ac(3,"Username"),s.Rb(),s.Ob(4,"input",1),s.yc(5,y,2,0,"mat-error",2),s.yc(6,w,2,0,"mat-error",2),s.Rb(),s.Sb(7,"mat-form-field"),s.Sb(8,"mat-label"),s.Ac(9,"Email"),s.Rb(),s.Ob(10,"input",3),s.yc(11,F,2,0,"mat-error",2),s.yc(12,O,2,0,"mat-error",2),s.Rb(),s.Sb(13,"mat-form-field"),s.Sb(14,"mat-label"),s.Ac(15,"Password"),s.Rb(),s.Ob(16,"input",4),s.yc(17,R,2,0,"mat-error",2),s.Rb(),s.Sb(18,"button",5),s.Ac(19," Submit "),s.Rb(),s.Rb()),2&t&&(s.kc("formGroup",e.authForm),s.Bb(5),s.kc("ngIf",e.authForm.get("username").touched&&(null==e.authForm.get("username").errors?null:e.authForm.get("username").errors.minlength)),s.Bb(1),s.kc("ngIf",e.authForm.get("username").touched&&(null==e.authForm.get("username").errors?null:e.authForm.get("username").errors.isPresent)),s.Bb(5),s.kc("ngIf",e.authForm.get("email").touched&&(null==e.authForm.get("email").errors?null:e.authForm.get("email").errors.isPresent)),s.Bb(1),s.kc("ngIf",e.authForm.get("email").touched&&(null==e.authForm.get("email").errors?null:e.authForm.get("email").errors.email)),s.Bb(5),s.kc("ngIf",e.authForm.get("password").touched&&(null==e.authForm.get("password").errors?null:e.authForm.get("password").errors.minlength)),s.Bb(1),s.kc("disabled",!e.authForm.valid))},directives:[h.s,h.m,h.f,S.c,S.f,v.a,h.b,h.q,h.l,h.d,m.l,h.h,b.b,S.b],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}"]}),t})();function k(t,e){1&t&&(s.Sb(0,"span",5),s.Ac(1,"Invalid email or password"),s.Rb())}let A=(()=>{class t{constructor(t,e){this.authService=t,this.router=e,this.isError=!1}ngOnInit(){this.initializeForm()}onSubmit(){this.authForm.valid&&this.authService.login(this.authForm.value).subscribe(t=>{this.authService.initializeAuthState(t),this.router.navigate(["/dictionary"])},t=>{this.isError=404===t.status})}initializeForm(){this.authForm=new h.e({email:new h.c("",[h.r.required,h.r.email]),password:new h.c("",h.r.required)})}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(c.a),s.Nb(n.c))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-login"]],decls:12,vars:3,consts:[[3,"formGroup","ngSubmit"],["class","incorrectCredentials",4,"ngIf"],["type","email","matInput","","formControlName","email"],["matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","",3,"disabled"],[1,"incorrectCredentials"]],template:function(t,e){1&t&&(s.Sb(0,"form",0),s.ac("ngSubmit",(function(){return e.onSubmit()})),s.yc(1,k,2,0,"span",1),s.Sb(2,"mat-form-field"),s.Sb(3,"mat-label"),s.Ac(4,"Email"),s.Rb(),s.Ob(5,"input",2),s.Rb(),s.Sb(6,"mat-form-field"),s.Sb(7,"mat-label"),s.Ac(8,"Password"),s.Rb(),s.Ob(9,"input",3),s.Rb(),s.Sb(10,"button",4),s.Ac(11," Submit "),s.Rb(),s.Rb()),2&t&&(s.kc("formGroup",e.authForm),s.Bb(1),s.kc("ngIf",e.isError),s.Bb(9),s.kc("disabled",!e.authForm.valid))},directives:[h.s,h.m,h.f,m.l,S.c,S.f,v.a,h.b,h.l,h.d,b.b],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.incorrectCredentials[_ngcontent-%COMP%]{color:red;padding:10px 0}"]}),t})();function C(t,e){1&t&&s.Ob(0,"app-signup")}function P(t,e){1&t&&s.Ob(0,"app-login")}let N=(()=>{class t{constructor(t,e,r,n){this.route=t,this.router=e,this.socialAuthService=r,this.authService=n}ngOnInit(){this.route.url.subscribe(t=>{this.form=t[0].path}),this.socialAuthService.authState.pipe(Object(a.a)(t=>!!t),Object(o.a)(t=>this.authService.googleAuth(t))).subscribe(t=>{this.authService.initializeAuthState(t),this.router.navigate(["/dictionary"]),this.socialAuthService.signOut()})}signInWithGoogle(){this.socialAuthService.signIn(i.a.PROVIDER_ID)}onNavigate(){this.router.navigate([`/auth/${"signup"===this.form?"login":"signup"}`])}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(n.a),s.Nb(n.c),s.Nb(i.b),s.Nb(c.a))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-auth"]],decls:14,vars:6,consts:[[4,"ngIf"],[1,"social-medias"],["mat-raised-button","","color","warn",3,"click"],[3,"click"]],template:function(t,e){1&t&&(s.Sb(0,"app-centered-projection"),s.Sb(1,"mat-card"),s.Sb(2,"mat-card-header"),s.Sb(3,"mat-card-title"),s.Ac(4),s.fc(5,"uppercase"),s.Rb(),s.Rb(),s.yc(6,C,1,0,"app-signup",0),s.yc(7,P,1,0,"app-login",0),s.Sb(8,"div",1),s.Sb(9,"button",2),s.ac("click",(function(){return e.signInWithGoogle()})),s.Ac(10," Sign in with google "),s.Rb(),s.Rb(),s.Sb(11,"mat-card-actions"),s.Sb(12,"p",3),s.ac("click",(function(){return e.onNavigate()})),s.Ac(13),s.Rb(),s.Rb(),s.Rb(),s.Rb()),2&t&&(s.Bb(4),s.Bc(s.gc(5,4,e.form)),s.Bb(2),s.kc("ngIf","signup"===e.form),s.Bb(1),s.kc("ngIf","login"===e.form),s.Bb(6),s.Cc(" ","signup"===e.form?"Have an account? Log in":"Don't have an account? Sign up"," "))},directives:[u.a,l.a,l.d,l.g,m.l,b.b,l.b,I,A],pipes:[m.r],styles:["mat-card[_ngcontent-%COMP%]{width:400px}mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:center}mat-card-actions[_ngcontent-%COMP%]{text-align:center}mat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:pointer}.social-medias[_ngcontent-%COMP%]{margin-top:15px;display:flex;justify-content:center}"]}),t})();const j=[{path:"login",component:N},{path:"signup",component:N}];let B=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[n.g.forChild(j)],n.g]}),t})();var x=r("PCNd");let q=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[B,x.a,h.p]]}),t})()}}]);