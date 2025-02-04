import { Widget } from './../main-layout/main-layout.component';
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
        *ngFor="let widget of widgets; let i = index"
        [ngStyle]="widget.styles"
        class="widget"
        cdkDragBoundary=".preview-container"
        cdkDrag
      >
        <div class="element-controls">
          <button class="delete-btn" (click)="deleteElement(i)" title="Delete">
            <i class="fas fa-times"></i>
          </button>
        </div>
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
      .element-controls {
        position: absolute;
      }
      .delete-btn {
        padding: 0.25rem;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .delete-btn:hover {
        background: #dc2626;
      }
    `,
  ],
})
export class PreviewComponent implements OnChanges {
  @Input() widgets: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {}

  deleteElement(index: number) {
    this.widgets.splice(index, 1);
  }
}
