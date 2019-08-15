import {MainSettings, TypeModules} from './main-settings';
import mysql from 'promise-mysql';
import express from 'express';
import socketIo from 'socket.io';
import http from 'http';
import Sequelize from 'sequelize';
import {awaitExpression} from 'babel-types';

export class Settings extends MainSettings {
  moduleConnect: {[key: string]: any} = {
    messages: {
      connect: {},
      sequelize: {}
    }
  };

  constructor(name?: any) {
    super(name);
    this.moduleConnect = {
      messages: {},
      members: {}
    };
  }

  startServer(onConnected: Function) {
    const port = this.configs.vk.port;
    const app = express();
    const server = http.createServer(app);

    server.listen(port, '0.0.0.0');

    server.on('error', (err) => {
      console.error(err);
    });
    server.on('listening', () => {
      console.log(`Listening server ${module} on port ${port}`);
    });

    const io = socketIo.listen(server);

    io.sockets.on('connection', onConnected);
    return app;
  }
}
