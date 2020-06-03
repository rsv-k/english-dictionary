import { Component, OnInit } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject, of } from 'rxjs';
import { Translation } from '@core/models/translation.model';
import { Word } from '@core/models/word.model';

@Component({
   selector: 'app-word-create',
   templateUrl: './word-create.component.html',
   styleUrls: ['./word-create.component.scss']
})
export class WordCreateComponent implements OnInit {
   wordText$ = new Subject<string>();
   translations$: Observable<Translation[]>;

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.translations$ = this.wordService.showTranslations(this.wordText$);
   }

   chooseTranslation(translation: Translation) {
      const word: Word = {
         english: translation.origin,
         russian: [translation.value],
         pic_url: translation.pic_url
      };

      this.wordService.addWord(word);
   }
}
