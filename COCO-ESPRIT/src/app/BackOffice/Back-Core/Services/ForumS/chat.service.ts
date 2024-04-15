import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { MessageType } from '../../Models/Forum/MessageType';
import { Chat } from '../../Models/Forum/Chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  private messageSubject: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);



    constructor() { 
      this.initConnenctionSocket();
    }
  
    initConnenctionSocket() {
      const url = 'http://localhost:9092/ws'; // Adjust this URL according to your server configuration
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket)
    }
  
    joinRoom(roomId: string) {
      this.stompClient.connect({}, ()=>{
        this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
          const messageContent = JSON.parse(messages.body);
          const currentMessage = this.messageSubject.getValue();
          currentMessage.push(messageContent);
  
          this.messageSubject.next(currentMessage);
  
        })
      })
    }
  
    sendMessage(roomId: string, chatMessage: Chat) {
      this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
    }
  
    getMessageSubject(){
      return this.messageSubject.asObservable();
    }

}