import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { DynamicDivComponent } from './dynamic-div/dynamic-div.component';
import { DynamicDisplayComponent } from './dynamic-display/dynamic-display.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  imports: [
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
})
export class ParentComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  componentCreated: boolean = false;
  dataReceived: boolean = false;
  dynamicData: any;
  buttonData: string = 'Create Dynamic Div';

  divStyles: { [key: string]: string } = {
    width: '600px',
    height: '300px',
    'background-color': '#f4f4f4',
    border: '1px solid #000000',
    'border-radius': '10px',
    padding: '10px',
    margin: '20px',
    position: 'absolute',
    top: '50px',
    left: '50px',
  };

  constructor(private resolver: ComponentFactoryResolver) {}

  createDynamicComponent() {
    if (!this.dataReceived) {
      const factory =
        this.resolver.resolveComponentFactory(DynamicDivComponent);
      if (this.container) {
        this.container.clear();
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.style = this.divStyles;
        this.componentCreated = true;

        componentRef.instance.dynamicDataEvent.subscribe((event: string) => {
          this.fetchDynamicData(event);
        });
      }
    } else {
      const componentFactory = this.resolver.resolveComponentFactory(
        DynamicDisplayComponent
      );
      if (this.dynamicContainer) {
        this.dynamicContainer.clear();
        const componentRef =
          this.dynamicContainer.createComponent(componentFactory);
        componentRef.instance.data = this.dynamicData;
        this.componentCreated = true;
      }
    }
  }

  updateStyle(property: string, value: string) {
    this.divStyles[property] = value;
  }

  fetchDynamicData(event: any) {
    this.dataReceived = true;
    this.dynamicData = event;
    if (this.componentCreated) this.buttonData = 'Display Div';
  }

  isExpanded: { [key: string]: boolean } = {
    dimensions: false,
    appearance: false,
    spacing: false,
    position: false,
  };

  toggleSection(section: string): void {
    Object.keys(this.isExpanded).forEach((key) => {
      this.isExpanded[key] = key === section ? !this.isExpanded[key] : false;
    });
  }
}
