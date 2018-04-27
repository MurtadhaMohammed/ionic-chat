import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  messags = [];
  message = '';
  nickname = '';
  joinMsg = 'hi message';
  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.nickname = this.navParams.get('nickname');

    this.socket.on('message', (messags) => {
      this.messags.push(messags);
    });

    this.socket.on('user-join', function (user) {
       console.log(user+" has join");
    });

    this.socket.on('user-left', function (user) {
       console.log(user+" has left");
    });
  }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
}
