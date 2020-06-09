import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LearnService } from '@core/services/learn.service';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
   words$: Observable<Word[]>;
   word: Word;
   showEdit = false;
   id: string;
   title: string;
   checkedWords: string[] = [];
   checkAll = false;
   sendToOptions = [
      'All',
      'Word-translation',
      'Translation-word',
      'Savannah',
      'Word constructor',
      'Listening',
      'Word cards'
   ];

   constructor(
      private wordService: WordService,
      private learnService: LearnService,
      private route: ActivatedRoute
      ) { }

   ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title =  title ? title.split('_').join(' ') : 'dictionary';

      this.words$ = this.wordService.wordsUpdateListener$;
      this.wordService.getWords(this.id);
   }

   showEditing(word: Word) {
      this.showEdit = true;
      this.word = word;
   }

   hideEditing() {
      this.showEdit = false;
   }

   checkWord(id: string) {
      if (this.checkedWords.includes(id)) {
         this.checkedWords = this.checkedWords.filter(wordId => wordId !== id);
      } else {
         this.checkedWords.push(id);
      }
   }

   deleteSelected() {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      this.wordService.deleteManyWords(this.checkedWords, this.checkAll);
      this.checkedWords = [];
      this.checkAll = false;
   }

   sendToLearn(index: number) {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      this.learnService.toggleLearnings(this.checkedWords, this.checkAll, index, true);
      this.checkedWords = [];
      this.checkAll = false;
   }
}
