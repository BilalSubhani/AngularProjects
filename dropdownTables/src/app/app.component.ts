import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  listItems = [
    { key: 'Use Cases', values: ['E-Commerce', 'Food', 'Flower'] },
    { key: 'Integration', values: [] },
    { key: 'Developers', values: ['Documentation', 'Chat Now'] },
  ];

  editingKeyIndex: number | null = null;
  editingValueIndex: { [key: number]: number | null } = {};

  expandedIndex: number = -1;
  indexUp: number = -1;

  newKey: string = '';
  newValues: { [key: string]: string } = {};

  draggedItemIndex: number | null = null;
  draggedValueIndex: { [key: number]: number | null } = {};

  toggleExpand(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  addValue(item: { key: string; values: string[] }): void {
    const newValue = this.newValues[item.key]?.trim();
    if (newValue) {
      item.values.push(newValue);
      this.newValues[item.key] = '';
    }

    console.log(this.listItems);
  }

  removeValue(item: { key: string; values: string[] }, index: number): void {
    item.values.splice(index, 1);
  }

  addNewKey(): void {
    const trimmedKey = this.newKey.trim();
    if (trimmedKey) {
      this.listItems.push({ key: trimmedKey, values: [] });
      this.newKey = '';
    }
  }

  removeKey(index: number): void {
    this.listItems.splice(index, 1);
    if (this.expandedIndex === index) {
      this.expandedIndex = -1;
    } else if (this.expandedIndex > index) {
      this.expandedIndex--;
    }
  }

  editKey(index: number): void {
    event?.stopPropagation();
    this.editingKeyIndex = index;
  }

  saveKey(index: number): void {
    event?.stopPropagation();
    this.editingKeyIndex = null;
  }

  cancelEditKey(index: number): void {
    event?.stopPropagation();
    this.editingKeyIndex = null;
  }

  editValue(itemIndex: number, valueIndex: number): void {
    event?.stopPropagation();
    this.editingValueIndex[itemIndex] = valueIndex;
  }

  saveValue(itemIndex: number, valueIndex: number): void {
    event?.stopPropagation();
    this.editingValueIndex[itemIndex] = null;
  }

  cancelEditValue(itemIndex: number, valueIndex: number): void {
    event?.stopPropagation();
    this.editingValueIndex[itemIndex] = null;
  }

  onDragStart(itemIndex: number): void {
    this.draggedItemIndex = itemIndex;
  }

  onValueDragStart(
    itemIndex: number,
    valueIndex: number,
    event: DragEvent
  ): void {
    event.stopPropagation();
    this.draggedItemIndex = itemIndex;
    this.draggedValueIndex[itemIndex] = valueIndex;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(itemIndex: number): void {
    if (this.draggedItemIndex !== null && this.draggedItemIndex !== itemIndex) {
      const draggedItem = this.listItems[this.draggedItemIndex];
      this.listItems.splice(this.draggedItemIndex, 1);
      this.listItems.splice(itemIndex, 0, draggedItem);

      if (this.expandedIndex === this.draggedItemIndex) {
        this.expandedIndex = itemIndex;
      } else if (
        this.expandedIndex > this.draggedItemIndex &&
        this.expandedIndex <= itemIndex
      ) {
        this.expandedIndex--;
      } else if (
        this.expandedIndex < this.draggedItemIndex &&
        this.expandedIndex >= itemIndex
      ) {
        this.expandedIndex++;
      }

      this.draggedItemIndex = null;
    }
  }

  onValueDrop(itemIndex: number, valueIndex: number, event: DragEvent): void {
    event.stopPropagation();
    if (
      this.draggedItemIndex !== null &&
      this.draggedValueIndex[itemIndex] !== null &&
      this.draggedItemIndex === itemIndex
    ) {
      const values = this.listItems[itemIndex].values;
      const draggedValue = values[this.draggedValueIndex[itemIndex]!];
      values.splice(this.draggedValueIndex[itemIndex]!, 1);
      values.splice(valueIndex, 0, draggedValue);
      this.draggedItemIndex = null;
      this.draggedValueIndex[itemIndex] = null;
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
