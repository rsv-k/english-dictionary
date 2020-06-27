import {
   Component,
   OnInit,
   OnDestroy,
   HostListener,
   ElementRef,
   ViewChild
} from '@angular/core';
import { Word } from '@core/models/word.model';
import { AnswerResult } from '@core/models/answerResult.model';
import { Subscription } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { UtilsService } from '@core/services/utils.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-listening',
   templateUrl: './listening.component.html',
   styleUrls: ['./listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {
   results: AnswerResult[];
   words: Word[];
   currentWord: Word;
   inputValue: string;
   isAnswered: boolean;
   wordsPassed: string;

   private inputPlaceholder: HTMLInputElement;
   @ViewChild('input', { static: false }) set input(el: ElementRef) {
      if (el) {
         this.inputPlaceholder = el.nativeElement;
      }
   }

   private subscriptionWords: Subscription;

   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (e.key !== 'Enter') {
         return;
      }

      this.onEnterClick();
   }
   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.initializeState();

      this.subscriptionWords = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.getNextWord();
         }
      );
      this.learnService.getWordsToLearn(false, 5);
   }

   private onEnterAnswer() {
      this.isAnswered = true;

      const result = {
         wordId: this.currentWord.id,
         isCorrect:
            this.inputValue.toUpperCase() ===
            this.currentWord.english.toUpperCase()
      };
      this.results.push(result);
   }

   onEnterClick() {
      if (this.isAnswered) {
         this.getNextWord();
         this.isAnswered = false;
         return;
      }

      this.onEnterAnswer();
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   learnAgain() {
      this.initializeState();
      this.learnService.getWordsToLearn(false, 5);
   }

   private getNextWord() {
      this.currentWord = this.words[this.results.length];

      if (!this.currentWord) {
         this.finishGame();
         return;
      }

      this.wordsPassed = this.results.length + 1 + ' / ' + this.words.length;

      this.inputValue = '';
      this.onPronounce();
      setTimeout(() => this.inputPlaceholder.focus(), 0);
   }

   private finishGame() {
      const ids = this.results.filter(r => r.isCorrect).map(r => r.wordId);
      this.learnService.toggleLearnings(ids, false, 5, false);

      this.router.navigate(['/learn/result'], {
         state: {
            gameName: 'Listening',
            result: this.results
         }
      });
   }

   private initializeState() {
      this.words = [];
      this.currentWord = null;
      this.results = [];
      this.inputValue = '';
      this.isAnswered = false;
   }

   ngOnDestroy() {
      this.subscriptionWords.unsubscribe();
   }
}
