import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  template: `
    <div class="preview-container">
      <div
        *ngFor="let widget of widgets"
        [ngStyle]="widget.styles"
        class="widget"
        cdkDragBoundary=".preview-container"
        cdkDrag
      >
        <div [innerHTML]="widget.html"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .preview-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .widget {
        position: relative;
        margin-bottom: 1rem;
        border: 1px dashed #ccc;
        padding: 0.5rem;
        cursor: move;
      }
    `,
  ],
})
export class PreviewComponent implements OnChanges {
  @Input() widgets: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {}
}
