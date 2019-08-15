import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import VueTypes from 'vue-types';
import {IApiInfo, IFriendInfo} from '../../../../constants/types';
import moment from 'moment';
import {api} from '../../Connect';
import {friendsModule} from '../../ts/store';

@Component({})
export default class Wall extends Vue {
  friend: IFriendInfo = null;

  created() {
    this.friend = friendsModule.friend;
    console.log('created r', this.$route, this.friend, friendsModule.friend);
  }

  parseDate(item) {
    return moment.unix(item).format('MMMM Do YYYY');
  }

  check(item) {
    console.log('asdasd', item)
  }
}
