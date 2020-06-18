import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from '@core/models/word.model';
import { GameOption } from '@core/models/GameOption.model';
import { Subscription } from 'rxjs';
import { AnswerResult } from '@core/models/answerResult.model';
import { LearnService } from '@core/services/learn.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
   selector: 'app-word-translation-word',
   templateUrl: './word-translation-word.component.html',
   styleUrls: ['./word-translation-word.component.scss']
})
export class WordTranslationWordComponent implements OnInit, OnDestroy {
   private games = {
      'word-translation': 1,
      'translation-word': 2
   };

   gameName: string;
   results: AnswerResult[];
   words: Word[];
   currentWord: Word;
   options: GameOption[];
   isOptionClicked = false;
   isFinished = false;
   currentPlayNumber: number;

   private subscriptionOptions: Subscription;
   private subscriptionWords: Subscription;

   @HostListener('window:keyup', ['$event']) onkeyup(e: KeyboardEvent) {
      if (![1, 2, 3, 4, 5].includes(+e.key) && e.key !== 'Enter') {
         return;
      }

      if (e.key === 'Enter') {
         return this.onNothing();
      }

      const option = this.options[+e.key - 1];
      this.onAnswer(option);
   }

   constructor(
      private route: ActivatedRoute,
      private learnService: LearnService,
      private utilsService: UtilsService
   ) {}

   ngOnInit(): void {
      this.initializeState();

      this.learnService.getWordsToLearn(null, this.games[this.gameName]);
      this.subscriptionWords = this.learnService.wordsUpdateListener$.subscribe(
         (words: Word[]) => {
            this.words = words;
            this.requestNewRandomOptions();
         }
      );

      this.subscriptionOptions = this.learnService.randomOptionsUpdateListener$.subscribe(
         (options: string[]) => {
            this.options = options.map(translation => {
               return {
                  value: translation,
                  isCorrect: false
               };
            });

            this.shakeOptions();

            if (this.games[this.gameName] === 1) {
               this.onPronounce();
            }
         }
      );
   }

   onAnswer(gameOption: GameOption) {
      if (this.isOptionClicked) {
         this.requestNewRandomOptions();
         this.currentPlayNumber++;
      } else {
         if (this.games[this.gameName] === 2) {
            this.onPronounce();
         }

         this.addResult(gameOption.isCorrect);
         this.highlightCorrectAndChosenOption(gameOption);
      }

      this.isOptionClicked = !this.isOptionClicked;
   }

   onNothing() {
      if (!this.isOptionClicked) {
         this.addResult(false);
         if (this.games[this.gameName] === 2) {
            this.onPronounce();
            this.highlightCorrectAndChosenOption();
         }
      } else {
         this.requestNewRandomOptions();
         this.currentPlayNumber++;
      }

      this.isOptionClicked = !this.isOptionClicked;
   }

   onPronounce() {
      this.utilsService.onPronounce(this.currentWord.sound_url);
   }

   learnAgain() {
      this.initializeState();
      this.learnService.getWordsToLearn(null, this.games[this.gameName]);
   }

   private addResult(isCorrect: boolean) {
      this.results.push({
         wordId: this.currentWord.id,
         isCorrect
      });
   }

   private requestNewRandomOptions() {
      this.getNextWord();
      const languageToFetch = {
         'word-translation': 'russian',
         'translation-word': 'english'
      };
      const language = languageToFetch[this.gameName];
      if (!this.currentWord) {
         return;
      }

      this.learnService.getRandomOptions(this.currentWord[language], language);
   }

   private shakeOptions() {
      const languageToFetch = {
         'word-translation': 'russian',
         'translation-word': 'english'
      };
      const language = languageToFetch[this.gameName];

      const correctGameOption = {
         value:
            language === 'russian'
               ? this.currentWord.russian.join(',')
               : this.currentWord.english,
         isCorrect: true
      };

      const randomIndex = Math.floor(Math.random() * 5);
      this.options[4] = this.options[randomIndex];
      this.options[randomIndex] = correctGameOption;
   }

   private initializeState() {
      this.gameName = this.route.snapshot.data.gameName;
      this.results = [];
      this.words = [];
      this.currentWord = null;
      this.options = [];
      this.isOptionClicked = false;
      this.isFinished = false;
      this.currentPlayNumber = 1;
   }

   private highlightCorrectAndChosenOption(gameOption?: GameOption) {
      if (gameOption) {
         gameOption.color = 'warn';
      }

      const correctTranslation = this.options.find(opt => opt.isCorrect);
      correctTranslation.color = 'primary';
   }

   private finishGame() {
      const ids = this.results
         .filter(option => option.isCorrect)
         .map(option => option.wordId);
      this.learnService.toggleLearnings(
         ids,
         false,
         this.games[this.gameName],
         false
      );
      this.isFinished = true;
   }

   private getNextWord() {
      const nextWord = this.words[this.results.length];

      if (!nextWord) {
         this.finishGame();
      }

      this.currentWord = this.words[this.results.length];
   }

   ngOnDestroy() {
      this.subscriptionOptions.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
