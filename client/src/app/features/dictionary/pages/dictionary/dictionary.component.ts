import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
   checkedWords: Word[] = [];
   checkAll = false;
   currentPage = 0;

   constructor(
      private wordService: WordService,
      private route: ActivatedRoute
      ) { }

   ngOnInit(): void {
      this.wordService.emptyWords();

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
