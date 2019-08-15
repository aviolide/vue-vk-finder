import {Settings} from 'utils/settings';
import _ from 'lodash';
import axios from 'axios';
import {idApp, keyApp} from '../../../../constants/vk';
import {IFriendInfo} from '../../../../constants/types';

export class VkApi {
  settings: Settings;
  db: any;
  headers: Object;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  async getInfo(id: string) {
    const result = await axios.get(
      `https://api.vk.com/method/friends.get?user_id=${id}&fields=bdate,sex,country,city,photo_200_orig,photo_100,online,last_seen,status,lists&access_token=${keyApp}&v=5.101`
    );
    const outArray = _.filter(result.data.response.items, (item) => {
      item.friends_count = null;
      item.isLoading = false;
      item.common_friends_count = 0;
      item.common_friends = [];
      item.opacity = 1;
      item.owner = id;
      item.wall = [];

      return (
        !item.is_closed &&
        item.deactivated !== 'deleted' &&
        item.deactivated !== 'banned'
      );
    });
    return outArray;
  }

  async friendsCount(id: string, users: any) {
    const result = await axios.get(
      `https://api.vk.com/method/friends.get?user_id=${id}&access_token=${keyApp}&v=5.101`
    );

    if (users) {
      const friendsUsers = result.data.response.items;
      let count = 0;
      const common_friends = [];
      for (const user of users) {
        if (_.includes(friendsUsers, parseInt(user))) {
          ++count;
          common_friends.push(user);
        }
      }

      return {count, common_friends};
    }

    console.log('out', JSON.stringify(result.data));
    return result.data.response;
  }

  async userWall(user) {
    const result = await axios.get(
      `https://api.vk.com/method/wall.get?owner_id=${user.id}&count=10&access_token=${keyApp}&v=5.101`
    );
    console.log('out', JSON.stringify(result.data));
    return result.data.response;
  }

  async userInfo(id: string) {
    const result = await axios.get(
      `https://api.vk.com/method/users.get?user_ids=${id}&fields=bdate,sex,country,city,photo_200_orig,photo_100,online,last_seen,status,list&access_token=${keyApp}&v=5.101`
    );
    console.log(JSON.stringify(result.data));
    return result.data.response;
  }
}
