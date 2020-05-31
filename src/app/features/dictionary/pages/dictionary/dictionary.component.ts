import { Component, OnInit } from '@angular/core';
import { Word } from '@core/models/word.model';

@Component({
   selector: 'app-dictionary',
   templateUrl: './dictionary.component.html',
   styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
   words: Word[] = [
      { english: 'obese', russian: ['ожирение', 'страдающий ожирением'] },
      { english: 'cat', russian: ['кот'], text: 'a big grey cat was sitting nearby porch of my house' },
      { english: 'window', russian: ['окно'] },
   ];

   constructor() { }

   ngOnInit(): void {
   }

}
