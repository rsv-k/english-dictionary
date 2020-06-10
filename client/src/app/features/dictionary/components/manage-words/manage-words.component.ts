import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Word } from '@core/models/word.model';
import { LearnService } from '@core/services/learn.service';
import { WordService } from '@core/services/word.service';
import { SetService } from '@core/services/set.service';
import { Observable } from 'rxjs';
import { Set } from '@core/models/set.model';

@Component({
   selector: 'app-manage-words',
   templateUrl: './manage-words.component.html',
   styleUrls: ['./manage-words.component.scss']
})
export class ManageWordsComponent implements OnInit {
   @Input() checkAll: boolean;
   @Input() checkedWords: Word[];
   @Output() setCheckAll = new EventEmitter<boolean>();
   @Output() uncheckWords = new EventEmitter();
   availableGames: string[];
   sets$: Observable<Set[]>;

   constructor(
      private learnService: LearnService,
      private wordService: WordService,
      private setService: SetService
   ) { }

   ngOnInit(): void {
      this.availableGames = ['All', ...this.learnService.getAvailableGames()];

      this.sets$ = this.setService.setsUpdateListener$;
      this.setService.getSets();
   }

   manageSelected(gameNumber?: number) {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      if (!isNaN(gameNumber)) {
         this.sendToLearn(gameNumber);
      } else {
         this.deleteSelected();
      }

      this.uncheckWords.emit();
   }

   addToSet(setId: string) {
      if (!this.checkAll && !this.checkedWords.length) {
         return;
      }

      const ids = this.getOnlyIds();

      this.setService.addWordsToSet(setId, ids, this.checkAll);

      this.uncheckWords.emit();
   }

   private deleteSelected() {
      const ids = this.getOnlyIds();
      this.wordService.deleteManyWords(ids, this.checkAll);
   }

   private sendToLearn(gameNumber: number) {
      const ids = this.getOnlyIds();
      this.learnService.toggleLearnings(ids, this.checkAll, gameNumber, true);
   }

   private getOnlyIds(): string[] {
      return this.checkedWords.map(checkedWord => checkedWord.id);
   }

}
