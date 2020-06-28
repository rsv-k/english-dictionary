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
import { Router, ActivatedRoute } from '@angular/router';
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
   state = 'start';
   isPauseBeforeStart = false;
   results: AnswerResult[] = [];
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
         this.onAnswer(gameOption, gameOption.isCorrect);
      }
   }

   constructor(
      private learnService: LearnService,
      private router: Router,
      private utilsService: UtilsService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      const setId = this.route.snapshot.queryParams.setId;
      this.learnService.getWordsToLearn(null, 3, setId);
      this.wordsSubscription = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.getNextWord();

            this.requestNewOptions();
         }
      );

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

            this.animationMove();
         }
      );
   }

   onAnswer(gameOption: GameOption, isCorrect: boolean) {
      if (this.isPauseBeforeStart) {
         return;
      }

      clearTimeout(this.timeoutHolder);
      this.highlightCorrectAndClicked(gameOption);
      this.isPauseBeforeStart = true;
      this.addResult(isCorrect);
      this.getNextWord();

      if (!this.currentWord) {
         return this.finishGame();
      }
      this.state = 'start';

      this.timeoutHolder = setTimeout(() => {
         this.animationMove();
         this.requestNewOptions();
      }, PAUSE_ANIMATION);
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
      this.highlightCorrect();
   }

   private highlightCorrect() {
      const correctOption = this.options.find(option => option.isCorrect);
      correctOption.color = 'primary';
   }

   private animationMove() {
      clearTimeout(this.timeoutHolder);
      this.isPauseBeforeStart = false;
      this.state = 'move';

      this.timeoutHolder = setTimeout(() => {
         const correctOption = this.options.find(option => option.isCorrect);
         this.onAnswer(correctOption, false);
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

   ngOnDestroy() {
      this.wordsSubscription.unsubscribe();
      this.optionsSubscription.unsubscribe();
   }
}
