import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LearnService } from '@core/services/learn.service';
import { Set } from '@core/models/set.model';
import { SetService } from '@core/services/set.service';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
   words$: Observable<Word[]>;
   sets$: Observable<Set[]>;
   word: Word;
   showEdit = false;
   id: string;
   title: string;
   checkedWords: Word[] = [];
   checkAll = false;
   availableGames: string[];
   currentPage = 0;

   constructor(
      private wordService: WordService,
      private learnService: LearnService,
      private route: ActivatedRoute,
      private setService: SetService
      ) { }

   ngOnInit(): void {
      this.wordService.emptyWords();

      this.availableGames = ['All', ...this.learnService.getAvailableGames()];
      this.id = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title =  title ? title.split('_').join(' ') : 'dictionary';

      this.words$ = this.wordService.wordsUpdateListener$;
      this.wordService.getWords(this.id);

      this.sets$ = this.setService.setsUpdateListener$;
      this.setService.getSets();
   }

   showEditing(word: Word) {
      this.showEdit = true;
      this.word = word;
   }

   hideEditing() {
      this.showEdit = false;
   }

   onCheckBoxChange(word: Word) {
      if (this.checkedWords.find(w => w.id === word.id)) {
         this.checkedWords = this.checkedWords.filter(checkedWord => checkedWord !== word);
      } else {
         this.checkedWords.push(word);
      }

      word.isChecked = !word.isChecked;
   }

   onScroll() {
      this.currentPage++;
      this.wordService.getWords(this.id, null, this.currentPage);
   }

   addToSet(setId: string) {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      const ids = this.getOnlyIds();

      this.setService.addWordsToSet(setId, ids, this.checkAll);

      this.uncheckWords();
   }

   manageSelected(gameNumber?: number) {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      if (!isNaN(gameNumber)) {
         this.sendToLearn(gameNumber);
      } else {
         this.deleteSelected();
      }

      this.uncheckWords();
   }

   private deleteSelected() {
      const ids = this.getOnlyIds();
      this.wordService.deleteManyWords(ids, this.checkAll);
   }

   private sendToLearn(gameNumber: number) {
      const ids = this.getOnlyIds();
      this.learnService.toggleLearnings(ids, this.checkAll, gameNumber, true);
   }

   private getOnlyIds(): string[] {
      return this.checkedWords.map(checkedWord => checkedWord.id);
   }

   private uncheckWords() {
      this.checkedWords = this.checkedWords.filter(word => {
         word.isChecked = false;
         return false;
      });
      this.checkAll = false;
   }
}
