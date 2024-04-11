import { Component, OnInit } from '@angular/core';
import { ChatboxService } from 'src/app/BackOffice/Back-Core/Services/ForumS/chatbox.service';

@Component({
  selector: 'app-chat-boot',
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.css']
})
export class ChatBootComponent implements OnInit {

  constructor(private chatboxService: ChatboxService) { }

  ngOnInit(): void {
    this.chatboxService.display();
  }
  /*getMessages() {
    return this.chatboxService.messages$;
  }*/

  
}
