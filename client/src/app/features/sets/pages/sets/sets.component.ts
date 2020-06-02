import { Component, OnInit } from '@angular/core';
import { Set } from '@core/models/set.model';

@Component({
   selector: 'app-sets',
   templateUrl: './sets.component.html',
   styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
   sets: Set[] = [
      { title: 'Animals' },
      { title: 'Family' },
      { title: 'Environment' }
   ];

   constructor() { }

   ngOnInit(): void {
   }

}
