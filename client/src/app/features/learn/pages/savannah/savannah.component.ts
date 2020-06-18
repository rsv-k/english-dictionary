import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { LearnService } from '@core/services/learn.service';
import { Word } from '@core/models/word.model';
import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/animations';
import { GameOption } from '@core/models/GameOption.model';
import { Subscription } from 'rxjs';
import { AnswerResult } from '@core/models/answerResult.model';
import { Router } from '@angular/router';
import { UtilsService } from '@core/services/utils.service';

const ANIMATION_TIME = 5000;
const PAUSE_ANIMATION = 1000;

@Component({
   selector: 'app-savannah',
   templateUrl: './savannah.component.html',
   styleUrls: ['./savannah.component.scss'],
   animations: [
      trigger('moveDown', [
         state(
            'start',
            style({
               bottom: 'calc(100vh - 100px)'
            })
         ),
         state(
            'move',
            style({
               bottom: 0
            })
         ),
         transition('start => move', animate(ANIMATION_TIME))
      ])
   ]
})
export class SavannahComponent implements OnInit, OnDestroy {
   state: string;
   isPauseBeforeStart: boolean;
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

   constructor(
      private learnService: LearnService,
      private router: Router,
      private utilsService: UtilsService
   ) {}

   ngOnInit(): void {
      this.initialieState();

      this.wordsSubscription = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.currentWord = this.words[this.results.length];

            this.animationMove();
         }
      );
      this.learnService.getWordsToLearn(null, 3);

      this.optionsSubscription = this.learnService.randomOptionsUpdateListener$.subscribe(
         (options: string[]) => {
            this.options = options.map(translation => {
               return {
                  value: translation,
                  isCorrect: false
               };
            });
            this.options.push({
               value: this.currentWord.russian.join(','),
               isCorrect: true
            });

            this.options = this.utilsService.shuffleArray(this.options);
         }
      );
   }

   onAnswer(gameOption: GameOption) {
      if (this.isPauseBeforeStart) {
         return;
      }

      this.highlightCorrectAndClicked(gameOption);
      this.isPauseBeforeStart = true;
      this.addResult(gameOption.isCorrect);
      if (this.results.length === this.words.length) {
         return this.finishGame();
      }

      this.state = 'start';
      this.getNextWord();
      this.timeoutHolder = setTimeout(
         () => this.animationMove(),
         PAUSE_ANIMATION
      );
   }

   learnAgain() {
      this.initialieState();
      this.learnService.getWordsToLearn(false, 3);
   }

   private requestNewOptions() {
      this.learnService.getRandomOptions(this.currentWord.russian, 'russian');
   }

   private finishGame() {
      clearTimeout(this.timeoutHolder);

      const ids = this.results
         .filter(option => option.isCorrect)
         .map(option => option.wordId);
      this.learnService.toggleLearnings(ids, false, 3, false);

      this.router.navigate(['/learn/result'], {
         state: {
            gameName: 'Savannah',
            result: this.results
         }
      });
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

         this.state = 'start';
         this.timeoutHolder = setTimeout(
            () => this.animationMove(),
            PAUSE_ANIMATION
         );
      }, ANIMATION_TIME);
   }

   private addResult(isCorrect: boolean) {
      this.results.push({
         wordId: this.currentWord.id,
         isCorrect
      });
   }

   private getNextWord() {
      this.currentWord = this.words[this.results.length];
   }

   private initialieState() {
      this.state = 'start';
      this.isPauseBeforeStart = false;
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
