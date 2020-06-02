import { Component, OnInit, Input } from '@angular/core';
import { Set } from '@core/models/set.model';

@Component({
   selector: 'app-set',
   templateUrl: './set.component.html',
   styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
   @Input() set: Set;

   constructor() { }

   ngOnInit(): void {
   }

}
