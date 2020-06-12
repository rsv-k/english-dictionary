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
   setId: string;
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

      this.setId = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title =  title ? title.split('_').join(' ') : 'dictionary';

      this.words$ = this.wordService.wordsUpdateListener$;
      this.wordService.getWords(this.setId);
   }

   showEditing(word: Word) {
      this.showEdit = true;
      this.word = word;
      document.body.style.overflowY = 'hidden';
   }

   hideEditing() {
      this.showEdit = false;
      document.body.style.overflowY = '';

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
