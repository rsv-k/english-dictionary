import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { WordService } from '@core/services/word.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit, OnDestroy {
   words: Word[] | { title: Date }[];
   word: Word;
   showEdit = false;
   setId: string;
   title: string;
   checkedWords: Word[] = [];
   checkAll = false;
   currentPage = 0;
   private subscription: Subscription;

   constructor(
      private wordService: WordService,
      private route: ActivatedRoute,
      private utilsService: UtilsService
   ) {}

   ngOnInit(): void {
      this.setId = this.route.snapshot.params.id;
      const title = this.route.snapshot.params.setName;

      this.title = title ? title.split('_').join(' ') : 'dictionary';

      this.route.data.subscribe((data: Data) => {
         this.words = data.words;
      });

      this.subscription = this.wordService.wordsUpdateListener$
         .pipe(map(this.utilsService.addDateAmongWords))
         .subscribe((words: Word[] | { title: Date }[]) => {
            this.words = words;
         });
   }

   toggleEditing(word: Word) {
      this.showEdit = !this.showEdit;
      this.word = word;
      document.body.style.overflowY = this.showEdit ? 'hidden' : '';
   }

   onCheckBoxChange(word: Word) {
      if (this.checkedWords.find(w => w.id === word.id)) {
         this.checkedWords = this.checkedWords.filter(
            checkedWord => checkedWord !== word
         );
      } else {
         this.checkedWords.push(word);
      }

      word.isChecked = !word.isChecked;
   }

   onScroll() {
      this.currentPage++;
      const options = {
         setId: this.setId,
         startsFrom: this.currentPage,
         isCachingWords: true
      };
      this.wordService.getWords(options);
   }

   setCheckAll(isChecked: boolean) {
      this.uncheckWords();
      this.checkAll = isChecked;
   }

   uncheckWords() {
      this.checkedWords = this.checkedWords.filter(word => {
         word.isChecked = false;
         return false;
      });
      this.checkAll = false;
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
