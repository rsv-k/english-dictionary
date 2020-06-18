import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Word } from '@core/models/word.model';

const DEFAULT_PIC =
   'https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   constructor(private snackBar: MatSnackBar) {}

   showSnackBar(msg: string) {
      this.snackBar.open(msg, null, { duration: 1500 });
   }

   changeIdField(data) {
      return data.result.map(obj => {
         obj.id = obj._id;
         delete obj._id;
         return obj;
      });
   }

   setDefaultPic(words: Word[]) {
      return words.map(word => {
         word.pic_url = word.pic_url ? word.pic_url : DEFAULT_PIC;
         return word;
      });
   }

   onPronounce(soundUrl: string) {
      const audio = new Audio(soundUrl);
      audio.load();
      audio.play();
   }

   shuffleArray(arr: any[]) {
      const newArr = [...arr];

      for (let i = 0; i < newArr.length; i++) {
         const randomIndex = Math.floor(Math.random() * (i + 1));
         const itemAtIndex = newArr[randomIndex];

         newArr[randomIndex] = newArr[i];
         newArr[i] = itemAtIndex;
      }

      return newArr;
   }
}
