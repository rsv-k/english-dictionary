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
   checkedWords: string[] = [];

   constructor(
      private wordService: WordService,
      private route: ActivatedRoute
      ) { }

   ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title =  title ? title.split('_').join(' ') : 'dictionary';

      this.words$ = this.wordService.getWordsUpdateListener();
      this.wordService.getWords(this.id);
   }

   showEditing(word: Word) {
      this.showEdit = true;
      this.word = word;
   }

   hideEditing() {
      this.word = null;
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
      this.wordService.deleteManyWords(this.checkedWords);
      this.checkedWords = [];
   }
}
