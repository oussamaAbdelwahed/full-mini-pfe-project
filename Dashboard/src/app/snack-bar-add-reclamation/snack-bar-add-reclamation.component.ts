import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar-add-reclamation',
  templateUrl: './snack-bar-add-reclamation.component.html',
  styleUrls: ['./snack-bar-add-reclamation.component.css']
})
export class SnackBarAddReclamationComponent implements OnInit {

  message: string
  messageClass: string

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit() {
    this.message = this.data
  }

}
