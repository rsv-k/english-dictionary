import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
   words$: Observable<Word[] | { title: Date }[]>;
   word: Word;
   showEdit = false;
   setId: string;
   title: string;
   checkedWords: Word[] = [];
   checkAll = false;
   currentPage = 0;

   constructor(
      private wordService: WordService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.wordService.emptyWords();

      this.setId = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title = title ? title.split('_').join(' ') : 'dictionary';

      this.words$ = this.wordService.wordsUpdateListener$.pipe(
         map(words => {
            const newArr = [];
            const addedDates = {};

            for (const word of words) {
               const date = new Date(word.createdAt);
               const shortDate =
                  date.getDate() +
                  '-' +
                  date.getMonth() +
                  '-' +
                  date.getFullYear();
               if (!addedDates[shortDate]) {
                  newArr.push({
                     title: new Date(word.createdAt)
                  });
                  addedDates[shortDate] = true;
               }

               newArr.push(word);
            }

            return newArr;
         })
      );
      this.wordService.getWords(this.setId);
   }

   toggleEditing(word: Word) {
      this.showEdit = !this.showEdit;
      this.word = word;
      document.body.style.overflowY = this.showEdit ? 'hidden' : '';
   }

   onCheckBoxChange(word: Word) {
      if (this.checkedWords.find(w => w.id === word.id)) {
         this.checkedWords = this.checkedWords.filter(
            checkedWord => checkedWord !== word
         );
      } else {
         this.checkedWords.push(word);
      }

      word.isChecked = !word.isChecked;
   }

   onScroll() {
      this.currentPage++;
      this.wordService.getWords(this.setId, null, this.currentPage);
   }

   setCheckAll(isChecked: boolean) {
      this.checkAll = isChecked;
   }

   uncheckWords() {
      this.checkedWords = this.checkedWords.filter(word => {
         word.isChecked = false;
         return false;
      });
      this.checkAll = false;
   }
}
