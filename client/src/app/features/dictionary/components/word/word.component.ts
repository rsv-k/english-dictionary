import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
   selector: 'app-word',
   templateUrl: './word.component.html',
   styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
   @Input() word: Word;
   date: Date;
   @Output() showEditing = new EventEmitter<Word>();
   isPanelOpened = false;

   constructor(
      private wordService: WordService,
      private utilsService: UtilsService
      ) { }

   ngOnInit(): void {
      this.date = new Date(this.word.createdAt);
   }

   onDelete() {
      this.wordService.deleteWord(this.word.id);
   }

   onEdit() {
      this.showEditing.emit(this.word);
   }

   pronounce() {
      this.utilsService.onPronounce(this.word.sound_url)
   }
}
