import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-results',
   templateUrl: './results.component.html',
   styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
   @Input() result: { id: string, isCorrect: boolean }[];
   @Output() learnAgain = new EventEmitter();
   isAllCorrect: boolean;

   constructor() { }

   ngOnInit(): void {
      this.isAllCorrect = this.result.every(res => res.isCorrect);
   }

   onClick() {
      this.learnAgain.emit();
   }

}
