import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-learn',
   templateUrl: './learn.component.html',
   styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
   titles: string[] = [
      'Word-translation',
      'Translation-word',
      'Savannah',
      'Word constructor',
      'Listening',
      'Word cards'
   ];

   wordsToLearn = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
   };

   words: Word[];
   subscription: Subscription;

   constructor(private wordService: WordService) { }

   ngOnInit() {
      this.subscription = this.wordService.getWordsToLearn()
         .subscribe(words => {
            words.forEach(word => {
               if (word.learn.wordTranslation) {
                  this.wordsToLearn[1] += 1;
               }

               if (word.learn.translationWord) {
                  this.wordsToLearn[2] += 1;
               }

               if (word.learn.savannah) {
                  this.wordsToLearn[3] += 1;
               }

               if (word.learn.wordConstructor) {
                  this.wordsToLearn[4] += 1;
               }

               if (word.learn.listening) {
                  this.wordsToLearn[5] += 1;
               }

               if (word.learn.wordCards) {
                  this.wordsToLearn[6] += 1;
               }
            });

            this.words = words;
         });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
