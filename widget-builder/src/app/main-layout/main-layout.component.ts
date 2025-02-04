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
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  widgets = [] as Widget[];

  onWidgetCreated(newWidget: Widget) {
    this.widgets.push(newWidget);
  }
}
