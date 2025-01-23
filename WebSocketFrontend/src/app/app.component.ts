import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client'; 
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChildComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private socket: any;
  messageReceived: string = '';
  message: string = '';

  title = 'WebSocketFrontend';

  constructor() {}

  ngOnInit(): void {
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to server with ID:', this.socket.id);
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('Connection error:', err);
    });
  }

  onSubmit(comp: any) {
    this.message = comp.value;
    this.messageReceived = this.message;
    console.log('Sending message:', this.message);
  
    if (this.socket && this.socket.connected) {
      console.log('worked');
      this.socket.emit('changeDetected', this.message);
    } else {
      console.error('Socket is not connected');
    }
    
  }
}
