import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';

@Component({
   selector: 'app-word',
   templateUrl: './word.component.html',
   styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
   @Input() word: Word;
   @Output() showEditing = new EventEmitter<Word>();
   isPanelOpened = false;

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
   }

   onDelete() {
      this.wordService.deleteWord(this.word.id);
   }

   onEdit() {
      this.showEditing.emit(this.word);
   }

   pronounce() {
      if (!this.word.sound_url) {
         return;
      }
      const audio = new Audio(this.word.sound_url);
      audio.load();
      audio.play();
   }
}
