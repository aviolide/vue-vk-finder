import {MainSettings, TypeModules} from './main-settings';
import {Endpoint} from './endpoint';
import Handler from './handler';

interface IApi {
  vkApi?: boolean;
}
export class Api {
  endpoints: {[key: string]: Endpoint} = {};
  settings: MainSettings;
  vkApi: any;

  constructor(services: IApi) {
    this.settings = new MainSettings();

    for (const service in services) {
      this.endpoints[service] = new Endpoint(
        this.settings.getSocketUrl('vk'),
        this.settings.getSocketConfig()
      );
    }
    this.setProxy();
  }

  setProxy() {
    this.vkApi = new Proxy({}, new Handler('vkApi', this.endpoints.vkApi));
  }
}
