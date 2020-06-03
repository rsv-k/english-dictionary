import { Component, OnInit, Input } from '@angular/core';
import { Set } from '@core/models/set.model';
import { SetService } from '@core/services/set.service';

@Component({
   selector: 'app-set',
   templateUrl: './set.component.html',
   styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
   @Input() set: Set;

   constructor(private setService: SetService) { }

   ngOnInit(): void {
   }

   onDeleteSet() {
      this.setService.deleteSet(this.set.id);
   }

}
