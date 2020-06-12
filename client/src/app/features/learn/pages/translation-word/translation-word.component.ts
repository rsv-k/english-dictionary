import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { GameOption } from '@core/models/gameOption.model';
import { Subscription } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-translation-word',
  templateUrl: './translation-word.component.html',
  styleUrls: ['./translation-word.component.scss']
})
export class TranslationWordComponent implements OnInit, OnDestroy {

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
      this.learnService.getWordsToLearn(null, 2);
      this.subscriptionWords = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.requestNewRandomOptions();
         });

      this.subscriptionOptions = this.learnService.randomOptionsUpdateListener$
         .subscribe((options: string[]) => {
            this.currentWord = this.words[this.results.length];
            this.options = options.map(translation => {
               return {
                  value: translation,
                  isCorrect: false
               };
            });

            this.shakeOptions();
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
         this.onPronounce();
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
      this.learnService.getWordsToLearn(null, 2);
   }

   private requestNewRandomOptions() {
      const word = this.words[this.results.length];
      if (!word) {
         return;
      }

      this.learnService.getRandomOptions(word.english, 'english');
   }

   private shakeOptions() {
      const correctGameOption =  {
         value: this.currentWord.english,
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
      this.learnService.toggleLearnings(ids, false, 2, false);
      this.isFinished = true;
   }

   ngOnDestroy() {
      this.subscriptionOptions.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
