import {Settings} from 'utils/settings';
import io from 'socket.io';
import {listeners} from './listeners';

export class Sockets {
  settings: Settings;
  list: {[key: string]: any} = {};
  listener: any;

  constructor(settings: Settings) {
    this.settings = settings;
    this.init();
  }

  add(socketId, socket) {
    this.list[socketId] = socket;
  }

  get(socketId) {
    return this.list[socketId];
  }

  init() {}

}
