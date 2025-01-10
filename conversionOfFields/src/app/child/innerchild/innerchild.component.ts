import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-innerchild',
  templateUrl: './innerchild.component.html',
  styleUrls: ['./innerchild.component.css'],
  imports:[FormsModule, CommonModule]
})
export class InnerChildComponent {
  fields = [
    { type: 'heading', value: 'Editable Heading', isEditing: false },
    { type: 'paragraph', value: 'Editable paragraph content goes here.', isEditing: false },
    { type: 'button', value: 'Editable Button Text', isEditing: false },
  ];

  enableEditing(field: any) {
    field.isEditing = true;
  }

  saveEditing(field: any, event: any) {
    if (event.key === 'Enter' || event.type === 'blur') {
      field.isEditing = false;
    }
  }
}
