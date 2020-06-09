import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { LearnService } from '@core/services/learn.service';
import { Subscription } from 'rxjs';
import { TranslationOption } from '@core/models/translationOption.model';
import { UtilsService } from '@core/services/utils.service';

@Component({
   selector: 'app-word-translation',
   templateUrl: './word-translation.component.html',
   styleUrls: ['./word-translation.component.scss']
})
export class WordTranslationComponent implements OnInit, OnDestroy {
   wordsPassed = 0;
   words: Word[];
   currentWord: Word;
   options: TranslationOption[];
   isOptionClicked = false;
   isFinish = false;
   private subscriptionTranslations: Subscription;
   private subscriptionWords: Subscription;

   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      this.learnService.getWordsToLearn();
      this.subscriptionWords = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.requestNewRandomTranslations();
         });

      this.subscriptionTranslations = this.learnService.randomTranslationsUpdateListener$
         .subscribe((translations: string[][]) => {
            this.currentWord = this.words[this.wordsPassed];
            this.options = translations.map(translation => {
               return {
                  value: translation.join(','),
                  correct: false
               };
            });

            this.shakeTranslations();
            this.onPronounce();
         });
   }

   onAnswer() {
      if (this.wordsPassed === this.words.length - 1) {
         this.isFinish = true;
         return;
      }

      if (this.isOptionClicked) {
         this.wordsPassed += 1;
         this.requestNewRandomTranslations();
      }

      this.isOptionClicked = !this.isOptionClicked;
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   private requestNewRandomTranslations() {
      this.learnService.getRandomTranslations(this.words[this.wordsPassed].russian);
   }

   private shakeTranslations() {
      const originalTranslation =  {
         value: this.currentWord.russian.join(','),
         correct: true
      };

      const randomIndex = Math.floor(Math.random() * this.options.length + 1);
      if (randomIndex === 5) {
         this.options.push(originalTranslation);
      } else {
         this.options.push(this.options[randomIndex]);
         this.options[randomIndex] = originalTranslation
      }
   }


   ngOnDestroy() {
      this.subscriptionTranslations.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
