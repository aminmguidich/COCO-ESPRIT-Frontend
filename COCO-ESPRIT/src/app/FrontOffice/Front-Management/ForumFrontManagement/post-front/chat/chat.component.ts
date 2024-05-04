import { Component, OnInit, OnChanges } from '@angular/core';
import { MessageType } from 'src/app/BackOffice/Back-Core/Models/Forum/MessageType';
import { ChatService } from 'src/app/BackOffice/Back-Core/Services/ForumS/chat.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/BackOffice/Back-Core/Models/Forum/Chat';
import { StorageService } from 'src/app/BackOffice/Back-Core/Services/User/_services/storage.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent  implements OnInit {

  messageInput: string = '';
  username: number;
  messageList: any[] = [];
  Sender:string='';
  constructor(private chatService: ChatService,
    private route: ActivatedRoute,
    private router:Router,
    private storageService: StorageService
    ){

  }

  getCurrentUser() {
    return this.storageService.getUser();
  }

  ngOnInit(): void {
    this.username = this.getCurrentUser().userId;
    this.Sender= this.getCurrentUser().username;
    this.chatService.joinRoom("ABC");
    this.listenMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      sender: this.Sender,
      user: this.username,
      type: MessageType.CHAT // Assuming regular chat messages here

    }as Chat
    this.chatService.sendMessage( "ABC",chatMessage);
    console.log("user",chatMessage);

    this.messageInput = '';
  }

  listenMessage() {
    this.chatService.getMessageSubject().subscribe((messages: Chat[]) => {
      this.messageList = messages.map((item: Chat) => ({
        ...item,
        message_side: item.sender === this.Sender ? 'sender' : 'receiver'
      }));

      // Handling messages based on MessageType
      this.messageList.forEach(message => {
        if (message.type === MessageType.JOIN) {
          this.handleJoinMessage(message.user);
        } else if (message.type === MessageType.LEAVE) {
          this.handleLeaveMessage(message.user);
        }
      });
  


    });
  }

 handleJoinMessage(userId: number) {
    const joinMessage: Chat = {
      message: `${userId} has joined the chat.`,
      user: userId,
      sender:this.Sender,
      type: MessageType.JOIN
    };
    this.messageList.push(joinMessage);
  }

  handleLeaveMessage(userId: number) {
    const leaveMessage: Chat = {
      message: `${userId} has left the chat.`,
      user: userId,
      sender:this.Sender,
      type: MessageType.LEAVE
    };
    this.messageList.push(leaveMessage);
  }

  gotoList() {
    this.router.navigate(['/ListPostFront']);
    }
}
