import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { DynamicDivComponent } from './dynamic-div/dynamic-div.component';
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
  componentCreated: boolean = false;

  divStyles: { [key: string]: string } = {
    width: '300px',
    height: '200px',
    'background-color': '#000000',
    border: '2px solid #000000',
    'border-radius': '10px',
    padding: '10px',
    margin: '20px',
    position: 'absolute',
    top: '50px',
    left: '50px',
  };

  constructor(private resolver: ComponentFactoryResolver) {}

  createDynamicComponent() {
    const factory = this.resolver.resolveComponentFactory(DynamicDivComponent);
    this.container.clear();
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.style = this.divStyles;
    this.componentCreated = true;
  }

  updateStyle(property: string, value: string) {
    this.divStyles[property] = value;
  }
}
