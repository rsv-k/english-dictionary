import { Component, OnInit } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Word } from '@core/models/word.model';

@Component({
   selector: 'app-word-translation',
   templateUrl: './word-translation.component.html',
   styleUrls: ['./word-translation.component.scss']
})
export class WordTranslationComponent implements OnInit {
   words: Word[];

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.wordService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
         });
   }

}
