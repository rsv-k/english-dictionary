import { Component, OnInit } from '@angular/core';
import { WordService } from '@core/services/word.service';

@Component({
   selector: 'app-word-create',
   templateUrl: './word-create.component.html',
   styleUrls: ['./word-create.component.scss']
})
export class WordCreateComponent implements OnInit {

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
   }

   showTranslations(word: string) {
      this.wordService.showTranslations(word);
   }
}
