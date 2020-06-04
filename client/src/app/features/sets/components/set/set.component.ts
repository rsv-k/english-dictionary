import { Component, OnInit, Input } from '@angular/core';
import { Set } from '@core/models/set.model';
import { SetService } from '@core/services/set.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-set',
   templateUrl: './set.component.html',
   styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
   @Input() set: Set;
   isEditing = false;
   title: string;

   constructor(
      private setService: SetService,
      private router: Router
      ) { }

   ngOnInit(): void {
   }

   onDeleteSet() {
      this.setService.deleteSet(this.set.id);
   }

   onEdit() {
      if (this.isEditing && this.title.trim().length > 1) {
         this.set.title = this.title;
         this.setService.editSet(this.set);
      } else if (!this.isEditing) {
         this.title = this.set.title;
      }

      this.isEditing = !this.isEditing;

   }

   onInput(title: string) {
      this.title = title;
   }

   moveToDictionary(e: Event) {
      if (e.target === e.currentTarget) {
         this.router.navigate(['set', this.set.title.toLowerCase().split(' ').join('_'), this.set.id]);
      }
   }
}
