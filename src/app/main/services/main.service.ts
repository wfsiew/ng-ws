import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url = 'ws://localhost:5963/mykadwebsocket';
  private wsocket: WebSocket;

  constructor() { }

  listReader(callback) {
    this.wsocket = new WebSocket(this.url);
    this.wsocket.onopen = () => {
      this.wsocket.send(`{"Cmd":"LIST_READER"}`);
    };
    this.wsocket.onmessage = (evt: MessageEvent<any>) => {
      console.log('js-listReader-onmessage');
      const o = JSON.parse(evt.data);
      const data = JSON.parse(o.RespMessage);
      this.wsocket.close();
      callback(data, o.RespCode);
    };
    this.wsocket.onclose = () => {
      console.log('js-listReader-onclose---1');
    };
  }

  open(callback, slot) {
    console.log('js-open');	
    this.wsocket = new WebSocket(this.url);
    this.wsocket.onopen = () => {
      this.wsocket.send(`{"Cmd":"OPEN","Slot":"${slot}"}`);
    };
    this.wsocket.onmessage = (evt: MessageEvent<any>) => {
      console.log('js-open-onmessage');
      const o = JSON.parse(evt.data);
      this.wsocket.close();
      callback(o);
    };
    this.wsocket.onclose = () => {
      console.log('js-open-onclose---2');
    };
  }

  close(callback) {
    console.log('js-close');
    this.wsocket = new WebSocket(this.url);
    this.wsocket.onopen = () => {
      this.wsocket.send(`{"Cmd":"CLOSE"}`);
    };
    this.wsocket.onmessage = (evt: MessageEvent<any>) => {
      console.log('js-close-onmessage');
      const o = JSON.parse(evt.data);
      this.wsocket.close();
      callback(o);
    };
    this.wsocket.onclose = () => {
      console.log('js-close-onclose---L');
    };
  }

  readMyKad(callback) {
    console.log('js-readMyKad');
    this.wsocket = new WebSocket(this.url);
    this.wsocket.onopen = () => {
      this.wsocket.send(`{"Cmd":"READ_MYKAD"}`);
    };
    this.wsocket.onmessage = (evt: MessageEvent<any>) => {
      console.log('js-open-onmessage');
      const o = JSON.parse(evt.data);
      const data = JSON.parse(o.RespMessage);
      this.wsocket.close();
      callback(data, o.RespCode, o.RespSW12AndApiName);
    };
    this.wsocket.onclose = () => {
      console.log('js-readMyKad-onclose---3');
    };
  }
}
