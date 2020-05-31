import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class WordService {

   constructor(private http: HttpClient) { }

   getWords(): Word[] {
      return [
         { english: 'obese', russian: ['ожирение', 'страдающий ожирением'] },
         { english: 'cat', russian: ['кот'], text: 'a big grey cat was sitting nearby porch of my house' },
         { english: 'window', russian: ['окно'] },
      ];
   }

   showTranslations(word: string) {
      const url = 'http://api.lingualeo.com/gettranslates?word=' + word;
      this.http.get(url).subscribe(result => {
         console.log(result);
      });
   }
}
