import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WordService } from '@core/services/word.service';
import { Observable, Subject } from 'rxjs';
import { Translation } from '@core/models/translation.model';

@Component({
   selector: 'app-word-create',
   templateUrl: './word-create.component.html',
   styleUrls: ['./word-create.component.scss']
})
export class WordCreateComponent implements OnInit {
   wordText$ = new Subject<string>();
   translations$: Observable<Translation[]>;
   @Output() hideCreation = new EventEmitter();

   constructor(private wordService: WordService) { }

   ngOnInit(): void {
      this.translations$ = this.wordService.showTranslations(this.wordText$);
   }

   chooseTranslation(translation: Translation) {

   }

   onHide(e: Event) {
      if (e.target === e.currentTarget) {
         this.hideCreation.emit();
      }
   }
}
