require('@babel/register');
require('ts-node');
require('tsconfig-paths/register');

import {Api} from 'utils/api';
import {Settings} from 'utils/settings';
import {TypeModuleMessages} from 'utils/main-settings';
import path from 'path';
import {Routes} from 'utils/routes';
import {VkApi} from 'modules/messages/controllers/vkapi';
import {Sockets} from 'utils/sockets';

class App {
  private readonly name: TypeModuleMessages = 'vk';
  readonly settings: Settings;

  vkApi: VkApi;
  sockets: Sockets;
  api: Api;
  routes: Routes;

  constructor() {
    this.settings = new Settings(this.name);
    this.sockets = new Sockets(this.settings);
    this.api = new Api({vkApi: true});

    this.vkApi = new VkApi(this.settings);
    this.routes = new Routes({vkApi: this.vkApi});
  }

  async start() {
    this.settings.startServer(this.onConnection.bind(this));
    // await this.settings.initDatabase(this.models);
    this.routes.setRoutes();
    console.log('start server');
  }

  onConnection(socket: any) {
    console.log('api start', socket.id, socket.user);

    this.sockets.add(socket.id, {socket});
    this.routes.init(socket);

    socket.on('disconnect', () => {
      console.log('warning, socket disconnected!');
    });
  }

}

export const app = new App();
