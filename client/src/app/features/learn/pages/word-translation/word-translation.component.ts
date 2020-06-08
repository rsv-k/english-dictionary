import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';

@Component({
   selector: 'app-word-translation',
   templateUrl: './word-translation.component.html',
   styleUrls: ['./word-translation.component.scss']
})
export class WordTranslationComponent implements OnInit {
   words: Word[];

   constructor() { }

   ngOnInit(): void {
   }

}
