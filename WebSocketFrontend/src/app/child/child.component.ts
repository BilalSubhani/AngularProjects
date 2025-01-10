import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { io } from 'socket.io-client'; 

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  private socket: any;
  messageReceived: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to server with ID:', this.socket.id);
    });

    this.socket.on('handleChange', (data: any) => {
      console.log('Message received from server:', data);
      this.messageReceived = data;
      this.cdr.detectChanges();
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('Connection error:', err);
    });
  }
}
