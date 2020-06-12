import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
   selector: 'app-word-edit',
   templateUrl: './word-edit.component.html',
   styleUrls: ['./word-edit.component.scss'],
   animations: [
      trigger('editState', [
         state('hidden', style({
            transform: 'translateY(-200%)'
         })),
         state('displayed', style({
            transform: 'translateY(0)'
         })),
         transition('hidden <=> displayed', animate(500)),
      ])
   ]
})
export class WordEditComponent implements OnInit, OnDestroy {
   state = 'hidden';
   @Input() word: Word;
   @Output() hide = new EventEmitter();

   subscription: Subscription;
   showPictureInput = false;

   currentImage = '';
   currentTranslations: string[];
   currentText = '';

   constructor(
      private wordService: WordService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      setTimeout(() => this.state = 'displayed', 0);
      this.currentImage = this.word.pic_url;
      this.currentTranslations = [...this.word.russian];
      this.currentText = this.word.text;
   }

   onUpdateWord() {
      if (this.word.pic_url === this.currentImage &&
         this.word.russian.join('') === this.currentTranslations.join('') &&
         this.currentText.trim() === this.word.text
         ) {
         return;
      }

      this.word.pic_url = this.currentImage;
      this.word.russian = this.currentTranslations;
      this.word.text = this.currentText;

      this.subscription = this.wordService.editWord(this.word).subscribe(() => {
         this.hide.emit();
      });
   }

   onDeleteTranslation(translation: string) {
      this.currentTranslations = this.currentTranslations.filter(t => t !== translation);
   }

   onHide(e: Event) {
      if (e.target === e.currentTarget) {
         this.state = 'hidden';
         setTimeout(() => this.hide.emit(), 500);
      }
   }

   onPronounce() {
      this.utilsService.onPronounce(this.word.sound_url);
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }

}
