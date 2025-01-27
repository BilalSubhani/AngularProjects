import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KanbanBoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  parentListItems = [
    { key: 'Use Cases', values: ['E-Commerce', 'Food', 'Flower'] },
    { key: 'Integration', values: [] },
    { key: 'Developers', values: ['Documentation', 'Chat Now'] },
  ];

  updateListItems(updatedListItems: { key: string; values: string[] }[]) {
    this.parentListItems = [...updatedListItems];
  }
}
