import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';

@Injectable({
   providedIn: 'root'
})
export class WordService {

   constructor() { }

   getWords(): Word[] {
      return [
         { english: 'obese', russian: ['ожирение', 'страдающий ожирением'] },
         { english: 'cat', russian: ['кот'], text: 'a big grey cat was sitting nearby porch of my house' },
         { english: 'window', russian: ['окно'] },
      ];
   }
}
