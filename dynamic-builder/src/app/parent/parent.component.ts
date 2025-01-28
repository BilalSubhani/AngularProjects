import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { DynamicDivComponent } from './dynamic-div/dynamic-div.component';
import { DynamicDisplayComponent } from './dynamic-display/dynamic-display.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ParentComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;

  componentCreated: boolean = false;
  dataReceived: boolean = false;
  dynamicData: any;

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
    this.createDynamicComponent();
  }
}
