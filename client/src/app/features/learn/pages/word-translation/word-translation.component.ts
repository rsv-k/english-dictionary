import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { LearnService } from '@core/services/learn.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-word-translation',
   templateUrl: './word-translation.component.html',
   styleUrls: ['./word-translation.component.scss']
})
export class WordTranslationComponent implements OnInit, OnDestroy {
   wordsPassed = 0;
   words: Word[];
   options: string[];
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
            this.options = translations.map(translation => translation.join(','));
            const randomIndex = Math.floor(Math.random() * this.options.length);
            this.options.push(this.options[randomIndex]);
            this.options[randomIndex] = this.words[this.wordsPassed].russian.join(',');
            this.onPronounce();
         });
   }

   onClick() {
      this.wordsPassed += 1;
      this.requestNewRandomTranslations();
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
