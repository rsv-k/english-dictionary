import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   form: string;
   constructor(private route: ActivatedRoute, private router: Router) {}

   ngOnInit(): void {
      this.route.url.subscribe(data => {
         this.form = data[0].path;
      });
   }

   onNavigate() {
      const where = this.form === 'signup' ? 'login' : 'signup';

      this.router.navigate([`/auth/${where}`]);
   }
}
