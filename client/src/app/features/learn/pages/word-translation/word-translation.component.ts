import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
   results = [];
   words: Word[];
   currentWord: Word;
   options: TranslationOption[];
   isOptionClicked = false;
   isFinished = false;
   private subscriptionTranslations: Subscription;
   private subscriptionWords: Subscription;
   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (![1, 2, 3, 4, 5].includes(+e.key)) {
         return;
      }

      const option = this.options[+e.key - 1];
      this.onAnswer(option);
   }


   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      this.learnService.getWordsToLearn(null, 1);
      this.subscriptionWords = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.requestNewRandomTranslations();
         });

      this.subscriptionTranslations = this.learnService.randomTranslationsUpdateListener$
         .subscribe((translations: string[][]) => {
            this.currentWord = this.words[this.results.length];
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

   onAnswer(translationOption: TranslationOption) {
      if (this.isOptionClicked) {
         this.results.push({
            id: this.currentWord.id,
            isCorrect: translationOption.correct
         });
      } else {
         this.highlightCorrectAndChosenOption(translationOption);
      }

      if (this.results.length === this.words.length) {
         this.finishGame();
         return;
      }

      if (this.isOptionClicked) {
         this.requestNewRandomTranslations();
      }
      this.isOptionClicked = !this.isOptionClicked;
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   learnAgain() {
      this.isFinished = false;
      this.isOptionClicked = false;
      this.results = [];
      this.currentWord = null;
      this.learnService.getWordsToLearn(null, 1);
   }

   private requestNewRandomTranslations() {
      this.learnService.getRandomTranslations(this.words[this.results.length].russian);
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
         this.options[randomIndex] = originalTranslation;
      }
   }

   private highlightCorrectAndChosenOption(translationOption: TranslationOption) {
      translationOption.color = 'warn';
      const correctTranslation = this.options.find(opt => opt.correct);
      correctTranslation.color = 'primary';
   }

   private finishGame() {
      const ids = this.results.filter(option => option.isCorrect).map(option => option.id);
      this.learnService.toggleLearnings(ids, false, 1, false);
      this.isFinished = true;
   }

   ngOnDestroy() {
      this.subscriptionTranslations.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
