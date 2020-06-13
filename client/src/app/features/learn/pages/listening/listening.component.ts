import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Word } from '@core/models/word.model';
import { AnswerResult } from '@core/models/answerResult.model';
import { Subscription } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
  styleUrls: ['./listening.component.scss']
})
export class ListeningComponent implements OnInit, OnDestroy {
   isFinished: boolean;
   results: AnswerResult[];
   words: Word[];
   currentWord: Word;
   inputValue: string;
   isAnswered: boolean;
   @ViewChild('input') input: ElementRef;

   private subscriptionWords: Subscription;

   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (e.key !== 'Enter') {
         return;
      }

      this.onEnterClick();
   }
   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      this.initializeState();

      this.subscriptionWords = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.getNextWord();
         });
      this.learnService.getWordsToLearn(false, 5);
   }

   private onEnterAnswer() {
      this.isAnswered = true;

      const result = {
         wordId: this.currentWord.id,
         isCorrect: this.inputValue.toUpperCase() === this.currentWord.english.toUpperCase()
      };
      this.results.push(result);
   }

   onEnterClick() {
      if (this.isAnswered) {
         this.getNextWord();
         this.isAnswered = false;
         this.input.nativeElement.focus();
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

      this.inputValue = '';
      this.onPronounce();
   }

   private finishGame() {
      this.isFinished = true;
      const ids = this.results.filter(r => r.isCorrect).map(r => r.wordId);
      this.learnService.toggleLearnings(ids, false, 5, false);
   }

   private initializeState() {
      this.words = [];
      this.currentWord = null;
      this.results = [];
      this.inputValue = '';
      this.isAnswered = false;
      this.isFinished = false;
   }

   ngOnDestroy() {
      this.subscriptionWords.unsubscribe();
   }

}
