import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { LearnService } from '@core/services/learn.service';
import { Word } from '@core/models/word.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GameOption } from '@core/models/GameOption.model';
import { Subscription } from 'rxjs';
import { AnswerResult } from '@core/models/answerResult.model';

const ANIMATION_TIME = 15000;
const PAUSE_ANIMATION = 1000;

@Component({
   selector: 'app-savannah',
   templateUrl: './savannah.component.html',
   styleUrls: ['./savannah.component.scss'],
   animations: [
      trigger('moveDown', [
         state('start', style({
            bottom: 'calc(100vh - 100px)'
         })),
         state('move', style({
            bottom: 0
         })),
         transition('start => move', animate(ANIMATION_TIME))
      ])
   ]
})
export class SavannahComponent implements OnInit, OnDestroy {
   state: string;
   isPauseBeforeStart: boolean;
   isFinished: boolean;
   results: AnswerResult[];
   words: Word[];
   options: GameOption[];
   currentWord: Word;
   timeoutHolder = null;

   private wordsSubscription: Subscription;
   private optionsSubscription: Subscription;

   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (![1, 2, 3, 4, 5].includes(+e.key) || this.isPauseBeforeStart) {
         return;
      } else {
         const gameOption = this.options[+e.key - 1];
         this.onAnswer(gameOption);
      }
   }

   constructor(private learnService: LearnService) { }

   ngOnInit(): void {
      this.initialieState();

      this.wordsSubscription = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.currentWord = this.words[this.results.length];

            this.animationMove();
         });
      this.learnService.getWordsToLearn(null, 3);

      this.optionsSubscription = this.learnService.randomOptionsUpdateListener$
         .subscribe((options: string[]) => {
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
      if (this.isPauseBeforeStart) {
         return;
      }

      this.highlightCorrectAndClicked(gameOption);
      this.isPauseBeforeStart = true;
      if (gameOption.isCorrect) {
         this.addResult(true);
      } else {
         this.addResult(false);
      }

      this.state = 'start';
      this.getNextWord();
      setTimeout(() => this.animationMove(), PAUSE_ANIMATION);
   }

   learnAgain() {
      this.initialieState();
      this.learnService.getWordsToLearn(false, 3);
   }

   private requestNewOptions() {
      this.learnService.getRandomOptions(this.currentWord.russian, 'russian');
   }

   private finishGame() {
      const ids = this.results.filter(option => option.isCorrect).map(option => option.wordId);
      this.learnService.toggleLearnings(ids, false, 3, false);
      this.isFinished = true;
   }

   private highlightCorrectAndClicked(gameOption: GameOption) {
      gameOption.color = 'warn';
      const correctOption = this.options.find(option => option.isCorrect);
      correctOption.color = 'primary';
   }

   private animationMove() {
      this.requestNewOptions();
      clearTimeout(this.timeoutHolder);
      this.isPauseBeforeStart = false;
      this.state = 'move';
      this.timeoutHolder = setTimeout(() => {
         this.addResult(false);
         this.getNextWord();
         if (this.isFinished) {
            clearTimeout(this.timeoutHolder);
            return;
         }

         this.state = 'start';
         setTimeout(() => this.animationMove(), PAUSE_ANIMATION);
      }, ANIMATION_TIME);
   }

   private addResult(isCorrect: boolean) {
      const result = {
         wordId: this.currentWord.id,
         isCorrect
      };

      this.results.push(result);
   }

   private getNextWord() {
      if (this.results.length !== this.words.length) {
         this.currentWord = this.words[this.results.length];
      } else {
         this.isFinished = true;
         this.finishGame();
      }
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

   private initialieState() {
      this.state = 'start';
      this.isPauseBeforeStart = false;
      this.isFinished = false;
      this.results = [];
      this.words = [];
      this.options = [];
      this.currentWord = null;
   }

   ngOnDestroy() {
      this.wordsSubscription.unsubscribe();
      this.optionsSubscription.unsubscribe();
   }
}
