import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { AnswerResult } from '@core/models/answerResult.model';
import { LearnService } from '@core/services/learn.service';
import { Subscription } from 'rxjs';
import { Character } from '@core/models/character.model';
import { UtilsService } from '@core/services/utils.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-word-constructor',
   templateUrl: './word-constructor.component.html',
   styleUrls: ['./word-constructor.component.scss']
})
export class WordConstructorComponent implements OnInit, OnDestroy {
   results: AnswerResult[];
   words: Word[];
   currentWord: Word;
   englishWord: string[];
   characters: Character[];
   isAnswered: boolean;

   private mistakes: number;
   private subscriptionWords: Subscription;

   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (e.key === 'Enter') {
         this.onNext();
         return;
      }

      const key = (e.key === ' ' ? '_' : e.key).toUpperCase();
      if (this.characters.findIndex(c => c.value === key) < 0) {
         return;
      }

      this.chooseCharacter(key);
   }

   constructor(
      private learnService: LearnService,
      private utilsService: UtilsService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.initializeState();
      this.learnService.getWordsToLearn(null, 4);
      this.subscriptionWords = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.getNextWord();
         }
      );
   }

   chooseCharacter(key: string) {
      if (this.isItNextLetter(key)) {
         this.englishWord[
            this.currentWord.english.length - this.characters.length
         ] = key;

         const charIndex = this.characters.findIndex(c => c.value === key);
         this.characters.splice(charIndex, 1);
      } else {
         if (this.mistakes === 1) {
            this.addResult(false);
            this.getNextWord();
            return;
         }

         this.mistakes++;
         const charIndex = this.characters.findIndex(c => c.value === key);
         this.characters[charIndex].highlight = true;
         setTimeout(() => (this.characters[charIndex].highlight = false), 500);
      }

      if (this.characters.length === 0) {
         this.onPronounce();
         this.isAnswered = true;
      }
   }

   learnAgain() {
      this.initializeState();
      this.learnService.getWordsToLearn(null, 4);
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   onNext() {
      if (this.isAnswered) {
         this.addResult(true);
         this.getNextWord();
         this.isAnswered = false;
      }
   }

   private finishGame() {
      const ids = this.results.filter(r => r.isCorrect).map(w => w.wordId);
      this.learnService.toggleLearnings(ids, false, 4, false);

      this.router.navigate(['/learn/result'], {
         state: {
            gameName: 'Word constructor',
            result: this.results
         }
      });
   }

   private getNextWord() {
      this.mistakes = 0;
      this.currentWord = this.words[this.results.length];

      if (!this.currentWord) {
         this.finishGame();
         return;
      }

      this.englishWord = Array(this.currentWord.english.length);
      this.characters = this.calculateCharacters(this.currentWord.english);
   }

   private calculateCharacters(word: string) {
      let characters = [];
      for (const c of word) {
         characters.push({
            value: c.trim().toUpperCase() || '_',
            highlight: false
         });
      }
      characters = this.utilsService.shuffleArray(characters);

      return characters;
   }

   private isItNextLetter(character: string) {
      if (character === '_') {
         character = ' ';
      }

      return (
         this.currentWord.english[
            this.currentWord.english.length - this.characters.length
         ].toUpperCase() === character
      );
   }

   private initializeState() {
      this.results = [];
      this.words = [];
      this.currentWord = null;
      this.englishWord = [];
      this.characters = [];
      this.mistakes = 0;
      this.isAnswered = false;
   }

   private addResult(isCorrect: boolean) {
      const result = {
         wordId: this.currentWord.id,
         isCorrect
      };

      this.results.push(result);
   }

   ngOnDestroy() {
      this.subscriptionWords.unsubscribe();
   }
}
