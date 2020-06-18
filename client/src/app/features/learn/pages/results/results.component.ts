import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
   selector: 'app-results',
   templateUrl: './results.component.html',
   styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
   constructor(private location: Location, private router: Router) {}

   ngOnInit(): void {
      console.log(window.history.state);
   }

   onClick() {
      this.location.back();
   }
}
