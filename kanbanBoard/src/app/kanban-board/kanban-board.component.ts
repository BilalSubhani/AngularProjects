import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  imports: [FormsModule, CommonModule],
})
export class KanbanBoardComponent {
  listItems = [
    { key: 'Use Cases', values: ['E-Commerce', 'Food', 'Flower'] },
    { key: 'Integration', values: [] },
    { key: 'Developers', values: ['Documentation', 'Chat Now'] },
  ];

  newKey = '';
  newValue = '';
  selectedKey = '';

  editingKey = { key: '', index: -1 };
  editingValue = { value: '', keyIndex: -1, valueIndex: -1 };

  addKey() {
    if (this.newKey.trim()) {
      this.listItems.push({ key: this.newKey.trim(), values: [] });
      this.newKey = '';
    }
  }

  deleteKey(key: string) {
    this.listItems = this.listItems.filter((item) => item.key !== key);
  }

  addValue(key: string) {
    if (this.newValue.trim()) {
      const item = this.listItems.find((item) => item.key === key);
      if (item) {
        item.values.push(this.newValue.trim());
        this.newValue = '';
      }
    }
  }

  deleteValue(key: string, value: string) {
    const item = this.listItems.find((item) => item.key === key);
    if (item) {
      item.values = item.values.filter((val) => val !== value);
    }
  }

  startEditKey(key: string, index: number) {
    this.editingKey = { key, index };
  }

  saveEditKey() {
    if (this.editingKey.index !== -1 && this.editingKey.key.trim()) {
      this.listItems[this.editingKey.index].key = this.editingKey.key.trim();
      this.editingKey = { key: '', index: -1 };
    }
  }

  startEditValue(value: string, keyIndex: number, valueIndex: number) {
    this.editingValue = { value, keyIndex, valueIndex };
  }

  saveEditValue() {
    if (
      this.editingValue.keyIndex !== -1 &&
      this.editingValue.valueIndex !== -1 &&
      this.editingValue.value.trim()
    ) {
      this.listItems[this.editingValue.keyIndex].values[
        this.editingValue.valueIndex
      ] = this.editingValue.value.trim();
      this.editingValue = { value: '', keyIndex: -1, valueIndex: -1 };
    }
  }

  onDragStart(event: DragEvent, key: string, value: string) {
    event.dataTransfer?.setData('text/plain', JSON.stringify({ key, value }));
  }

  onDrop(event: DragEvent, targetKey: string) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const { key, value } = JSON.parse(data);
      this.moveValue(key, value, targetKey);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  moveValue(sourceKey: string, value: string, targetKey: string) {
    const sourceItem = this.listItems.find((item) => item.key === sourceKey);
    const targetItem = this.listItems.find((item) => item.key === targetKey);
    if (sourceItem && targetItem) {
      sourceItem.values = sourceItem.values.filter((val) => val !== value);
      targetItem.values.push(value);
    }
  }
}
