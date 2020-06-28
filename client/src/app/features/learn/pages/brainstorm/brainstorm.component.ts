import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { Word } from '@core/models/word.model';
import { UtilsService } from '@core/services/utils.service';
import { AnswerResult } from '@core/models/answerResult.model';
import { Router } from '@angular/router';

@Component({
   selector: 'app-brainstorm',
   templateUrl: './brainstorm.component.html',
   styleUrls: ['./brainstorm.component.scss']
})
export class BrainstormComponent implements OnInit, OnDestroy {
   words: Word[];
   currentWord: Word;
   results: AnswerResult[] = [];

   private wordsSub: Subscription;

   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.wordsSub = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.getNextWord();
         }
      );
      this.learnService.getWordsToLearn(false, 7);
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   ngOnDestroy() {
      this.wordsSub.unsubscribe();
   }

   onAnswer(isCorrect: boolean) {
      this.results.push({
         isCorrect,
         wordId: this.currentWord.id
      });

      if (this.results.length === this.words.length) {
         return this.finishGame();
      }

      this.getNextWord();
   }

   private finishGame() {
      const ids = this.results.filter(r => r.isCorrect).map(r => r.wordId);
      this.learnService.toggleLearnings(ids, false, 0, false);

      this.router.navigate(['/learn/result'], {
         state: {
            gameName: 'Brainstorm',
            result: this.results
         }
      });
   }

   private getNextWord() {
      this.currentWord = this.words[this.results.length];
      this.onPronounce();
   }
}
