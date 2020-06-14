import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { AnswerResult } from '@core/models/answerResult.model';
import { Observable } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { UtilsService } from '@core/services/utils.service';
import { tap } from 'rxjs/operators';

@Component({
   selector: 'app-word-cards',
   templateUrl: './word-cards.component.html',
   styleUrls: ['./word-cards.component.scss']
})
export class WordCardsComponent implements OnInit {
   isFinished: boolean;
   wordsLength: number;
   results: AnswerResult[];
   words$: Observable<Word[]>;
   checkedWords = {};

   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      this.initializeState();
      this.words$ = this.learnService.wordsUpdateListener$
         .pipe(
            tap((words) => this.wordsLength = words.length)
         );
      this.learnService.getWordsToLearn(false, 6);
   }

   onPronounce(soundUrl: string) {
      this.utilsService.onPronounce(soundUrl);
   }

   addResult(word: Word, isCorrect: boolean) {
      const result = {
         wordId: word.id,
         isCorrect
      };

      this.checkedWords[word.id] = isCorrect ? '1px solid green' : '1px solid red';
      this.onPronounce(word.sound_url);

      this.results.push(result);

      if (this.results.length === this.wordsLength) {
         this.finishGame();
      }
   }

   learnAgain() {
      this.initializeState();
      this.learnService.getWordsToLearn(false, 6);
   }

   finishGame() {
      const ids = this.results.filter(r => r.isCorrect).map(r => r.wordId);
      this.learnService.toggleLearnings(ids, false, 6, false);
      this.isFinished = true;
   }

   private initializeState() {
      this.results = [];
      this.isFinished = false;
      this.wordsLength = 0;
      this.checkedWords = {};
   }

}
