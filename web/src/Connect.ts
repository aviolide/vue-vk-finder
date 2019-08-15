import {Api} from '../../src/utils/api';
import {messages} from './routes';

class Connect {
  api: Api;

  constructor() {}
  async init() {
    this.api = new Api({vkApi: true});
  }
}

const connect = new Connect();
connect.init();
export const api = connect.api;
