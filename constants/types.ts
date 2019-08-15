export interface IApiInfo {
  count?: number;
  items?: IFriendInfo;
}

export interface IUserInfo {
  user_info: IFriendInfo;
  friends: any;
}

export interface IFriendInfo {
  id: number;
  first_name: string;
  last_name: string;
  sex: number;
  bdate: string;
  city: ICity;
  country: ICountry;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  online: number;
  is_closed: boolean;
  friends_count: IFriendsCount;
  status: string;
  last_seen: ILastSeen;
  common_friends_count: number;
  common_friends?: any;
  isLoading: boolean;
  owner: number;
  wall: any;
}

interface ICity {
  id: number;
  title: string;
}

interface IFriendsCount {
  count?: number;
}

interface ICountry {
  id: number;
  title: string;
}

interface ILastSeen {
  time: number;
  platform: number;
}
