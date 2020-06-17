import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject } from 'rxjs';
import { Translation } from '@core/models/translation.model';
import { Word } from '@core/models/word.model';
import { tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
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
   firstTranslation: Translation;
   isMyTranslation = false;

   constructor(
      private wordService: WordService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.translations$ = this.wordService
         .showTranslations(this.wordText$)
         .pipe(
            tap(translations => {
               this.firstTranslation = translations[0];
               this.wordService.getWords(this.setId, this.inputValue);
            })
         );
   }

   onInput(str: string) {
      this.inputValue = str.trim();
      this.wordText$.next(this.inputValue);
   }

   onMyOwnTranslation(
      e: Event,
      trigger: MatAutocompleteTrigger,
      str: string,
      input: HTMLInputElement
   ) {
      e.stopPropagation();
      if (str.trim().length === 0 && this.isMyTranslation) {
         this.inputValue = '';
         this.isMyTranslation = false;
         trigger.closePanel();
         this.wordText$.next('');
         this.wordService.getWords(this.setId);
         return;
      }

      if (!this.isMyTranslation) {
         trigger.openPanel();
         input.value = this.inputValue;
      } else {
         this.firstTranslation.value = str;
         this.firstTranslation.pic_url = '';
         this.chooseTranslation(this.firstTranslation);
      }

      this.isMyTranslation = !this.isMyTranslation;
   }

   chooseTranslation(translation: Translation) {
      const word: Word = {
         english:
            translation.origin[0].toUpperCase() +
            translation.origin.slice(1).toLowerCase(),
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

   onClosed() {
      if (this.isMyTranslation) {
         this.isMyTranslation = false;
      }
   }
}
