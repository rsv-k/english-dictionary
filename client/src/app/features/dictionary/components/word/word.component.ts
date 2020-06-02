import { Component, OnInit, Input } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';

@Component({
   selector: 'app-word',
   templateUrl: './word.component.html',
   styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
   @Input() word: Word;
   isPanelOpened = false;

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
   }

   onDelete() {
      this.wordService.deleteWord(this.word.id);
   }
}
