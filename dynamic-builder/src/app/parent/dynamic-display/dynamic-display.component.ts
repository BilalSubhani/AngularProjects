import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-display',
  templateUrl: './dynamic-display.component.html',
  styleUrls: ['./dynamic-display.component.css'],
  imports: [CommonModule, FormsModule, CdkDrag],
})
export class DynamicDisplayComponent implements OnInit {
  @Input() data: any;
  divStyle: any = {};
  divObject: any[] = [];

  ngOnInit(): void {
    if (this.data) {
      //console.log('DynamicDisplayComponent initialized with data:', this.data);
      this.divStyle = this.data.divStyle;
      console.log('DynamicDisplayComponent:', this.divStyle);
      this.divObject = this.data.divObject;
    } else {
      console.warn('DynamicDisplayComponent received no data!');
    }
  }

  getElementStyles(element: any) {
    if (element.tag !== 'button') {
      return {
        fontSize: `${element.fontSize}px`,
        color: element.color,
        textAlign: element.position,
      };
    } else {
      return {
        fontSize: `${element.fontSize}px`,
        color: element.color,
      };
    }
  }
}
