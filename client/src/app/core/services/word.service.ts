import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'word';

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

   showTranslations(word: Observable<string>) {
      return word.pipe(
         debounceTime(2000),
         distinctUntilChanged(),
         switchMap(w => this.getTranslations(w))
      );
   }

   private getTranslations(word) {
      if (word.trim().length === 0) {
         return of([]);
      }

      const url = BACKEND_URL + '/translations/' + word;
      return this.http.get<{msg: string, translations: any}>(url)
      .pipe(
         map(data => {
            return data.translations.map(translation => {
               return {
                  pic_url: translation.pic_url,
                  value: translation.value
               };
            });
         }),
      );
   }
}
