import { Component, OnInit, HostListener } from '@angular/core';
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
   correct: number;
   incorrect: number;
   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (e.key !== 'Enter') {
         return;
      }

      if (this.results.length === 12) {
         this.onClick();
      } else {
         this.router.navigate(['/learn']);
      }
   }

   constructor(private location: Location, private router: Router) {}

   ngOnInit(): void {
      this.results = window.history.state.result;
      [this.correct, this.incorrect] = this.calculateCorrectAndIncorrect(
         this.results
      );
   }

   onClick() {
      this.location.back();
   }

   private calculateCorrectAndIncorrect(results: AnswerResult[]) {
      let correct = 0;
      let incorrect = 0;

      for (const res of this.results) {
         if (res.isCorrect) {
            correct++;
         } else {
            incorrect++;
         }
      }

      return [correct, incorrect];
   }
}
