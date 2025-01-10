import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, ChildComponent, CommonModule]
})
export class AppComponent {
  isSidenavOpen = false;
  action: string = "";

  @ViewChild('child') childComponent!: ElementRef;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    if(!this.isSidenavOpen)
      this.action = "";
    else
    this.action = 'Close';
  }

  scrollTo(componentId: string) {
    this.toggleSidenav();

    if (componentId === 'child' && this.childComponent) {
      const childElement = document.getElementById('child');
      if (childElement) {
        childElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (componentId === 'innerchild') {
      const innerChildElement = document.getElementById('innerchild');
      if (innerChildElement) {
        innerChildElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
