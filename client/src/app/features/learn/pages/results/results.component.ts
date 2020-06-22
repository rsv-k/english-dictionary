import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AnswerResult } from '@core/models/answerResult.model';

@Component({
   selector: 'app-results',
   templateUrl: './results.component.html',
   styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
   results: AnswerResult[];
   constructor(private location: Location, private router: Router) {}

   ngOnInit(): void {
      this.results = window.history.state.result;
   }

   onClick() {
      this.location.back();
   }
}
