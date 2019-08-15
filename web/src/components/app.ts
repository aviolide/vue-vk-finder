import {Component, Vue, Watch} from 'vue-property-decorator';
import '../sass/app.sass';
import Main from './main/main.vue';
import Multiselect from 'vue-multiselect';
import {IApiInfo, IFriendInfo, IUserInfo} from '../../../constants/types';
import {api} from '../Connect';

@Component({
  components: {Main}
})
export default class App extends Vue {
  //41305647

  created() {
    console.log('created');
    this.setData();
  }

  async setData() {
    console.log('setdata');
  }

}
