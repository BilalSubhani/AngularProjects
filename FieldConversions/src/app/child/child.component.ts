import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerChildComponent } from './innerchild/innerchild.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  imports:[FormsModule, CommonModule, InnerChildComponent]
})
export class ChildComponent {
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
