import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { UtilsService } from '@core/services/utils.service';
import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/animations';

@Component({
   selector: 'app-word-edit',
   templateUrl: './word-edit.component.html',
   styleUrls: ['./word-edit.component.scss'],
   animations: [
      trigger('editState', [
         state(
            'hidden',
            style({
               transform: 'translateY(-200%)'
            })
         ),
         state(
            'displayed',
            style({
               transform: 'translateY(0)'
            })
         ),
         transition('hidden <=> displayed', animate(500))
      ])
   ]
})
export class WordEditComponent implements OnInit {
   state = 'hidden';
   @Input() word: Word;
   @Output() hide = new EventEmitter();

   showPictureInput = false;

   currentImage = '';
   currentTranslations: string[];
   currentText = '';

   constructor(
      private wordService: WordService,
      private utilsService: UtilsService
   ) {}

   ngOnInit(): void {
      setTimeout(() => (this.state = 'displayed'), 0);
      this.currentImage = this.word.pic_url;
      this.currentTranslations = [...this.word.russian];
      this.currentText = this.word.text;
   }

   onUpdateWord() {
      this.word.pic_url = this.currentImage;
      this.word.russian = this.currentTranslations;
      this.word.text = this.currentText;

      this.wordService.editWord(this.word);
      this.closeItself();
   }

   onDeleteTranslation(translation: string) {
      this.currentTranslations = this.currentTranslations.filter(
         t => t !== translation
      );
   }

   onHide(e: Event) {
      if (e.target === e.currentTarget) {
         this.closeItself();
      }
   }

   onPronounce() {
      this.utilsService.onPronounce(this.word.sound_url);
   }

   hasAnythingChanged() {
      return !(
         this.word.pic_url === this.currentImage &&
         this.word.russian.join('') === this.currentTranslations.join('') &&
         this.currentText === this.word.text
      );
   }

   private closeItself() {
      this.state = 'hidden';
      setTimeout(() => this.hide.emit(null), 500);
   }
}
