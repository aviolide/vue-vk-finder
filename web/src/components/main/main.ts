import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import VueTypes from 'vue-types';
import {IApiInfo, IFriendInfo} from '../../../../constants/types';
import moment from 'moment';
import {api} from '../../Connect';
import {friendsModule} from '../../ts/store';
import _ from 'lodash';

@Component({})
export default class Main extends Vue {
  query: Array<IFriendInfo> = [];
  list: Array<IFriendInfo> = [];
  checkClicked = false;
  //41305647

  created() {
    console.log('created r', this.$route);
    if (friendsModule.list.length) {
      this.query = friendsModule.query;
      this.list = friendsModule.list;
    }
  }

  parseDate(date) {
    const momentDate = moment.unix(date);
    const result = momentDate.format('MMMM Do YYYY');
    return result;
  }

  async checkFriends(id) {
    const friend = _.find(this.list, {id});
    if (!friend.friends_count) {
      const count = await api.vkApi.friendsCount(id);
      friend.friends_count = count.count;
    }
  }

  async addTag(tag) {
    if (!tag.id) {
      const result: any = await api.vkApi.getInfo(tag);
      this.list = _.concat(this.list, result);

      const userInfo = await api.vkApi.userInfo(tag);
      this.query.push(userInfo[0]);
    } else {
      const result: any = await api.vkApi.getInfo(tag.id);
      this.list = _.concat(this.list, result);
    }
    this.sortList();
  }

  removeTag(tag) {
    let arrayUsers = _.map(this.query, (item) => item.id);
    arrayUsers = _.pull(arrayUsers, tag.id);

    this.list = _.reject(
      this.list,
      (item) => !_.includes(arrayUsers, item.owner)
    );
    this.sortList();
  }

  customLabel(data) {
    return `${data.id} - ${data.first_name} ${data.last_name}`;
  }

  async countCommonFriends() {
    this.checkClicked = true;
    for (const item of this.list) {
      Vue.set(item, 'isLoading', true);
    }

    const arrayUsers = _.map(this.query, (item) => item.id);

    for (const item of this.list) {
      const response = await api.vkApi.friendsCount(item.id, arrayUsers);
      console.log('count', response);
      item.common_friends_count = response.count;
      item.common_friends = _.map(this.query, (item) => {
        if (_.includes(response.common_friends, item.id)) {
          return item;
        }
      });

      if (arrayUsers.length !== 1) {
        const opacity = 1 - 0.3 / response.count;
        Vue.set(item, 'opacity', opacity);
      }

      Vue.set(item, 'isLoading', false);
    }
    console.log('final list', this.list);
  }

  sortList() {
    this.list = _.sortBy(this.list, (item) => item.last_name);
  }

  async goWall(friend) {
    if (friend.common_friends_count) {
      this.checkClicked = false;
      friendsModule.setQuery(this.query);
      friendsModule.setList(this.list);

      const response = await api.vkApi.userWall(friend);
      if (response.items) {
        Object.assign(friend.wall, response.items);
      }
      friendsModule.setFriend(friend);
      this.$router.push('wall');
    }
  }
}
