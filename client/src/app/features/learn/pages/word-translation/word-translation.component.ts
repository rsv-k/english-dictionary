import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { LearnService } from '@core/services/learn.service';
import { Subscription } from 'rxjs';
import { TranslationOption } from '@core/models/translationOption.model';

@Component({
   selector: 'app-word-translation',
   templateUrl: './word-translation.component.html',
   styleUrls: ['./word-translation.component.scss']
})
export class WordTranslationComponent implements OnInit, OnDestroy {
   wordsPassed = 0;
   words: Word[];
   currentWord: Word;
   options: TranslationOption[];
   isOptionClicked = false;
   private subscriptionTranslations: Subscription;
   private subscriptionWords: Subscription;

   constructor(private learnService: LearnService) { }

   ngOnInit(): void {
      this.subscriptionWords = this.learnService.wordsUpdateListener$
         .subscribe((words: Word[]) => {
            this.words = words;
            this.requestNewRandomTranslations();
         });
      this.learnService.getWordsToLearn();

      this.subscriptionTranslations = this.learnService.randomTranslationsUpdateListener$
         .subscribe((translations: string[][]) => {
            this.currentWord = this.words[this.wordsPassed];
            this.options = translations.map(translation => {
               return {
                  value: translation.join(','),
                  correct: false
               };
            });

            const randomIndex = Math.floor(Math.random() * this.options.length);
            this.options.push(this.options[randomIndex]);

            this.options[randomIndex] = {
               value: this.currentWord.russian.join(','),
               correct: true
            };

            this.onPronounce();
         });
   }

   onAnswer() {
      if (this.isOptionClicked) {
         this.wordsPassed += 1;
         this.requestNewRandomTranslations();
      }

      this.isOptionClicked = !this.isOptionClicked;
   }

   onPronounce() {
      const audio = new Audio(this.words[this.wordsPassed].sound_url);
      audio.load();
      audio.play();
   }

   private requestNewRandomTranslations() {
      this.learnService.getRandomTranslations(this.words[this.wordsPassed].russian);
   }

   ngOnDestroy() {
      this.subscriptionTranslations.unsubscribe();
      this.subscriptionWords.unsubscribe();
   }
}
