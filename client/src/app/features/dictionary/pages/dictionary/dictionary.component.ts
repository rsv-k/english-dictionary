import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
   words: Word[];
   showCreation = false;

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.words = this.wordService.getWords();
   }

   hideCreation() {
      this.showCreation = false;
   }
}
