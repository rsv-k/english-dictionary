import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject } from 'rxjs';
import { Translation } from '@core/models/translation.model';
import { Word } from '@core/models/word.model';
import { tap } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Component({
   selector: 'app-word-create',
   templateUrl: './word-create.component.html',
   styleUrls: ['./word-create.component.scss']
})
export class WordCreateComponent implements OnInit {
   @Input() setId: string;
   inputValue = '';
   wordText$ = new Subject<string>();
   translations$: Observable<Translation[]>;

   constructor(
      private wordService: WordService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.translations$ = this.wordService
         .showTranslations(this.wordText$)
         .pipe(
            tap(translations => {
               this.wordService.getWords(this.setId, this.inputValue);
            })
         );
   }

   onInput(wordValue: string) {
      this.inputValue = wordValue.trim();
      if (!wordValue) {
         return this.wordService.getWords(this.setId);
      }

      if (!this.inputValue) {
         return;
      }
      this.wordText$.next(this.inputValue);
   }

   chooseTranslation(translation: Translation) {
      const word: Word = {
         english: this.inputValue,
         russian: [translation.value],
         pic_url: translation.pic_url,
         setId: this.setId ? [this.setId] : [],
         sound_url: translation.sound_url,
         transcription: translation.transcription,
         learn: {
            wordTranslation: true,
            translationWord: true,
            savannah: true,
            wordConstructor: true,
            listening: true,
            wordCards: true
         },
         ownerId: this.authService.userId
      };

      this.wordService.getWords(this.setId);
      this.wordService.addWord(word);
      this.inputValue = '';
      this.wordText$.next('');
   }
}
