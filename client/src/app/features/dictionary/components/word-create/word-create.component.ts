import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject } from 'rxjs';
import { Translation } from '@core/models/translation.model';
import { Word } from '@core/models/word.model';

@Component({
   selector: 'app-word-create',
   templateUrl: './word-create.component.html',
   styleUrls: ['./word-create.component.scss']
})
export class WordCreateComponent implements OnInit {
   @Input() setId: string;
   wordText$ = new Subject<string>();
   translations$: Observable<Translation[]>;

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.translations$ = this.wordService.showTranslations(this.wordText$, this.setId);
   }

   chooseTranslation(translation: Translation) {
      const word: Word = {
         english: translation.origin[0].toUpperCase() + translation.origin.slice(1).toLowerCase(),
         russian: [translation.value],
         pic_url: translation.pic_url,
         setId: this.setId,
         sound_url: translation.sound_url,
         transcription: translation.transcription,
         learn: {
            wordTranslation: true,
            translationWord: true,
            savannah: true,
            wordConstructor: true,
            listening: true,
            wordCards: true
         }
      };

      this.wordService.getWords(this.setId);
      this.wordService.addWord(word);
      this.wordText$.next('');
   }
}
