import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nickname = '';
  constructor(public navCtrl: NavController) {

  }

  goToChat() {
    this.navCtrl.push(ChatRoomPage, { nickname: this.nickname });
  }

}
