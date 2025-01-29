import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ElementTag {
  value: string;
  label: string;
}

interface AlignmentOption {
  value: string;
  label: string;
  icon: string;
}

interface DynamicElement {
  tag: string;
  content: string;
  fontSize: number;
  color: string;
  position: string;
}

@Component({
  selector: 'app-dynamic-div',
  templateUrl: './dynamic-div.component.html',
  styleUrls: ['./dynamic-div.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DynamicDivComponent {
  @Input() style: any;
  @Output() dynamicDataEvent = new EventEmitter<any>();

  selectedTag: string = '';
  content: string = '';
  fontSize: number = 16;
  color: string = '#000000';
  position: string = 'left';
  elements: DynamicElement[] = [];

  availableTags: ElementTag[] = [
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'p', label: 'Paragraph' },
    { value: 'button', label: 'Button' },
    { value: 'input', label: 'Input Field' },
    { value: 'ul', label: 'Unordered List' },
    { value: 'ol', label: 'Ordered List' },
  ];

  alignmentOptions: AlignmentOption[] = [
    { value: 'left', label: 'Align Left', icon: 'fas fa-align-left' },
    { value: 'center', label: 'Align Center', icon: 'fas fa-align-center' },
    { value: 'right', label: 'Align Right', icon: 'fas fa-align-right' },
  ];

  divStyle: any;
  ngOnInit() {
    this.divStyle = this.style;
  }

  get isListElement(): boolean {
    return this.selectedTag === 'ul' || this.selectedTag === 'ol';
  }

  getPlaceholder(): string {
    const placeholders: { [key: string]: string } = {
      h1: 'Enter heading text',
      h2: 'Enter subheading text',
      p: 'Enter paragraph text',
      button: 'Enter button text',
      input: 'Enter placeholder text',
    };
    return placeholders[this.selectedTag] || 'Enter text';
  }

  onTagSelect(): void {
    this.content = '';
    this.fontSize = 16;
    this.color = '#000000';
    this.position = 'left';
  }

  isValidElement(): boolean {
    return this.selectedTag !== '' && this.content.trim() !== '';
  }

  addElement(): void {
    if (this.isValidElement()) {
      const newElement: DynamicElement = {
        tag: this.selectedTag,
        content: this.content.trim(),
        fontSize: this.fontSize,
        color: this.color,
        position: this.position,
      };
      this.elements.push(newElement);
      this.selectedTag = '';
      this.content = '';
    }
  }

  deleteElement(index: number): void {
    this.elements.splice(index, 1);
  }

  clearElements(): void {
    this.elements = [];
  }

  getElementStyles(element: DynamicElement): any {
    return {
      fontSize: `${element.fontSize}px`,
      color: element.color,
    };
  }

  dynamicData: any;
  saveElements() {
    this.dynamicData = {
      divStyle: this.divStyle,
      divObject: this.elements,
    };

    this.transmitData();
  }

  transmitData() {
    this.dynamicDataEvent.emit(this.dynamicData);
  }
}
