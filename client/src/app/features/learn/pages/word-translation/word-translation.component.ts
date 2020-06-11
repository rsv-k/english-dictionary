import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Word } from '@core/models/word.model';
import { LearnService } from '@core/services/learn.service';
import { Subscription } from 'rxjs';
import { GameOption } from '@core/models/GameOption.model';
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
   options: GameOption[];
   isOptionClicked = false;
   isFinished = false;
   private subscriptionOptions: Subscription;
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
            this.requestNewRandomOptions();
         });

      this.subscriptionOptions = this.learnService.randomOptionsUpdateListener$
         .subscribe((options: string[][]) => {
            this.currentWord = this.words[this.results.length];
            this.options = options.map(translation => {
               return {
                  value: translation.join(','),
                  isCorrect: false
               };
            });

            this.shakeOptions();
            this.onPronounce();
         });
   }

   onAnswer(gameOption: GameOption) {
      if (this.isOptionClicked) {
         this.results.push({
            id: this.currentWord.id,
            isCorrect: gameOption.isCorrect
         });
         this.requestNewRandomOptions();
      } else {
         this.highlightCorrectAndChosenOption(gameOption);
      }

      if (this.results.length === this.words.length) {
         this.finishGame();
         return;
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

   private requestNewRandomOptions() {
      const word = this.words[this.results.length];
      if (!word) {
         return;
      }

      this.learnService.getRandomOptions(word.russian, 'russian');
   }

   private shakeOptions() {
      const correctGameOption =  {
         value: this.currentWord.russian.join(','),
         isCorrect: true
      };

      const randomIndex = Math.floor(Math.random() * 5);
      this.options[4] = this.options[randomIndex];
      this.options[randomIndex] = correctGameOption;
   }

   private highlightCorrectAndChosenOption(gameOption: GameOption) {
      gameOption.color = 'warn';
      const correctTranslation = this.options.find(opt => opt.isCorrect);
      correctTranslation.color = 'primary';
   }

   private finishGame() {
      const ids = this.results.filter(option => option.isCorrect).map(option => option.id);
      this.learnService.toggleLearnings(ids, false, 1, false);
      this.isFinished = true;
   }

   ngOnDestroy() {
      this.subscriptionOptions.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
