import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-word-edit',
   templateUrl: './word-edit.component.html',
   styleUrls: ['./word-edit.component.scss']
})
export class WordEditComponent implements OnInit, OnDestroy {
   @Input() word: Word;
   @Output() hide = new EventEmitter();

   subscription: Subscription;
   showPictureInput = false;

   currentImage = '';
   currentTranslations: string[];

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.currentImage = this.word.pic_url;
      this.currentTranslations = [...this.word.russian];
   }

   onUpdateWord() {
      this.word.pic_url = this.currentImage;
      this.word.russian = this.currentTranslations;

      this.subscription = this.wordService.editWord(this.word).subscribe(() => {
         this.hide.emit();
      });
   }

   onDeleteTranslation(translation: string) {
      this.currentTranslations = this.currentTranslations.filter(t => t !== translation);
   }

   onHide(e: Event) {
      if (e.target === e.currentTarget) {
         this.hide.emit();
      }
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
}
