import { Widget } from './../main-layout/main-layout.component';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnChanges {
  @Input() widgets: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {}

  deleteElement(index: number) {
    this.widgets.splice(index, 1);
  }
}
