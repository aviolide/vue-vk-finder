import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';
import {IFriendInfo} from '../../../../../constants/types';

@Module({name: 'friends', namespaced: true})
export class Friends extends VuexModule {
  list: Array<IFriendInfo> = [];
  friend: IFriendInfo = null;
  query: any = null;

  get getList() {
    return this.list;
  }

  get getFriend() {
    return this.friend;
  }

  @Mutation
  setList(list: Array<IFriendInfo>) {
    this.list = list;
  }

  @Mutation
  setQuery(query: any) {
    this.query = query;
  }

  @Mutation
  setFriend(data: IFriendInfo) {
    this.friend = data;
  }

  @Action
  async load() {
    // const listMembers = await api.members.get();
    // this.set(listMembers);
    // console.log(listMembers);
  }
}
