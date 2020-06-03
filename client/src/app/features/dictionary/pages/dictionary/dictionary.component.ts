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

   constructor(
      private wordService: WordService,
      private route: ActivatedRoute
      ) { }

   ngOnInit(): void {
      this.id = this.route.snapshot.params.id;
      this.title = history.state.title || 'Dictionary';

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
}
