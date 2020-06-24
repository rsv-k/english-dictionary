import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject } from 'rxjs';
import { Translation } from '@core/models/translation.model';
import { Word } from '@core/models/word.model';
import { tap, map } from 'rxjs/operators';
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
   private translation: Translation;
   word: Word;
   isMyTranslation = false;

   @ViewChild('myTranslation', { static: false }) set customTranslation(
      el: ElementRef
   ) {
      if (el) {
         setTimeout(() => (el.nativeElement as HTMLInputElement).focus(), 0);
      }
   }

   constructor(
      private wordService: WordService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.translations$ = this.wordService
         .showTranslations(this.wordText$)
         .pipe(
            tap((result: { word: Word[]; translations: Translation[] }) => {
               this.word = result.word[0];
               this.translation = result.translations[0];
               const options = {
                  setId: this.setId,
                  startsWith: this.inputValue
               };

               this.wordService.getWords(options);
            }),
            map(result => {
               const presentTranslations = {};
               if (this.word) {
                  for (const t of this.word.russian) {
                     presentTranslations[t] = true;
                  }
               }
               return result.translations.map(translation => {
                  translation.isPresent =
                     presentTranslations[translation.value];
                  return translation;
               });
            })
         );
   }

   onInput(wordValue: string) {
      this.inputValue = wordValue.trim();
      if (!wordValue) {
         const options = {
            setId: this.setId
         };

         return this.wordService.getWords(options);
      }

      if (!this.inputValue) {
         return;
      }
      this.wordText$.next(this.inputValue);
   }

   chooseTranslation(translation: Translation) {
      const options = {
         setId: this.setId
      };

      this.wordService.getWords(options);
      if (this.word) {
         this.word.russian.push(translation.value);
         this.wordService.editWord(this.word);
      } else {
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

         this.wordService.createWord(word);
      }
      this.inputValue = '';
      this.wordText$.next('');
      this.translation = null;
   }

   onMyTranslationAdd(translation: string) {
      this.translation.value = translation;
      this.translation.pic_url = null;
      this.chooseTranslation(this.translation);
   }

   onBlur() {
      setTimeout(() => (this.isMyTranslation = false), 500);
   }
}
