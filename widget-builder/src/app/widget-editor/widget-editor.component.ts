import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-widget-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.css'],
})
export class WidgetEditorComponent {
  activeTab: 'layout' | 'appearance' | 'advanced' = 'layout';

  layoutSettings = {
    margin: {
      top: '10',
      right: '10',
      bottom: '10',
      left: '10',
    },
    padding: {
      top: '10',
      right: '10',
      bottom: '10',
      left: '10',
    },
    width: '300px',
    height: 'auto',
    position: 'static',
  };

  appearanceSettings = {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333',
    textAlign: 'center',
  };

  htmlContent: string = `<p>Your widget content here</p>`;
  advancedSettings = {
    imageUrl: '',
    videoUrl: '',
    customCss: '',
  };

  @Output() widgetCreated = new EventEmitter<any>();

  setActiveTab(tab: 'layout' | 'appearance' | 'advanced'): void {
    this.activeTab = tab;
  }

  createWidget(): void {
    const styles: { [key: string]: string } = {};

    styles[
      'margin'
    ] = `${this.layoutSettings.margin.top}px ${this.layoutSettings.margin.right}px ${this.layoutSettings.margin.bottom}px ${this.layoutSettings.margin.left}px`;

    styles[
      'padding'
    ] = `${this.layoutSettings.padding.top}px ${this.layoutSettings.padding.right}px ${this.layoutSettings.padding.bottom}px ${this.layoutSettings.padding.left}px`;

    styles['width'] = this.layoutSettings.width;
    if (this.layoutSettings.height) {
      styles['height'] = this.layoutSettings.height;
    }
    styles['position'] = this.layoutSettings.position;

    styles['background-color'] = this.appearanceSettings.backgroundColor;
    styles['border'] = this.appearanceSettings.border;
    styles['border-radius'] = this.appearanceSettings.borderRadius;
    styles['box-shadow'] = this.appearanceSettings.boxShadow;
    styles['font-family'] = this.appearanceSettings.fontFamily;
    styles['font-size'] = this.appearanceSettings.fontSize;
    styles['color'] = this.appearanceSettings.color;
    styles['text-align'] = this.appearanceSettings.textAlign;

    if (this.advancedSettings.customCss) {
      this.advancedSettings.customCss.split(';').forEach((rule) => {
        const [property, value] = rule.split(':');
        if (property && value) {
          styles[property.trim()] = value.trim();
        }
      });
    }

    const widget = {
      html: this.htmlContent,
      styles,
      advanced: { ...this.advancedSettings },
    };

    this.widgetCreated.emit(widget);
    this.resetForm();
  }

  resetForm(): void {
    this.layoutSettings = {
      margin: {
        top: '10',
        right: '10',
        bottom: '10',
        left: '10',
      },
      padding: {
        top: '10',
        right: '10',
        bottom: '10',
        left: '10',
      },
      width: '300px',
      height: 'auto',
      position: 'static',
    };

    this.appearanceSettings = {
      backgroundColor: '#f4f4f4',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#333',
      textAlign: 'center',
    };

    this.htmlContent = `<p>Your widget content here</p>`;
    this.advancedSettings = {
      imageUrl: '',
      videoUrl: '',
      customCss: '',
    };
    this.activeTab = 'layout';
  }
}
