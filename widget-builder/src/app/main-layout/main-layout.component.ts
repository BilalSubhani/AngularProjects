import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetEditorComponent } from '../widget-editor/widget-editor.component';
import { PreviewComponent } from '../preview/preview.component';

export interface Widget {
  id: string;
  html: string;
  styles: { [key: string]: string };
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, WidgetEditorComponent, PreviewComponent],
  template: `
    <div class="container">
      <aside class="sidenav">
        <app-widget-editor
          (widgetCreated)="onWidgetCreated($event)"
        ></app-widget-editor>
      </aside>

      <main class="preview-area">
        <app-preview [widgets]="widgets"> </app-preview>
      </main>
    </div>
  `,
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  widgets = [] as Widget[];

  onWidgetCreated(newWidget: Widget) {
    this.widgets.push(newWidget);
  }
}
