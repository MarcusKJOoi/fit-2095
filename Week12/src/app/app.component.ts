import { Component } from "@angular/core";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  userName: string = "";
  userNameInput: string;
  messageText: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
  showAudioPlayer: boolean = false;
  fileName: string;
  constructor() {
    this.socket = io.connect();
  }
  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("msg", data => {
      this.messages.push(data);
    });
    this.socket.on("transcribeAudio", data => {
      this.fileName = data.fileName;
      this.showAudioPlayer = true;
    });
  }
  sendMessage() {
    this.socket.emit("newMsg", {
      from: this.userName,
      msg: this.messageText,
    });
    this.messageText = "";
  }
  setUserName() {
    this.userName = this.userNameInput;
    this.userNameInput = "";
  }
  textToAudio() {
    this.socket.emit("transcribeAudio", { msg: this.messageText })
    this.messageText = "";
  }
}