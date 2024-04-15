import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {
  messages: { name: string, message: string }[] = [];
  state = false;

  constructor(private http: HttpClient) { }
  
  display(): void {
    const openButton = document.querySelector('.chatbox__button') as HTMLElement;
    const chatBox = document.querySelector('.chatbox__support') as HTMLElement;
    const sendButton = document.querySelector('.send__button') as HTMLElement;
  
    openButton.addEventListener('click', () => this.toggleState(chatBox));
  
    sendButton.addEventListener('click', () => this.onSendButton(chatBox));
  
    const node = chatBox.querySelector('input') as HTMLInputElement;
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }
  

  toggleState(chatbox: HTMLElement): void {
    this.state = !this.state;

    if (this.state) {
      chatbox.classList.add('chatbox--active');
    } else {
      chatbox.classList.remove('chatbox--active');
    }
  }

  onSendButton(chatbox: HTMLElement): void {
    const textField = chatbox.querySelector('input');
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(r => r.json())
      .then(r => {
        let msg2 = { name: "Sam", message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox);
        textField.value = '';
      });
  }

  updateChatText(chatbox: HTMLElement): void {
    let html = '';
    this.messages.slice().reverse().forEach(item => {
      if (item.name === "Sam") {
        html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
      } else {
        html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
      }
    });

    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
  }
}