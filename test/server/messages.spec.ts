import {assert} from 'chai';
import {app} from 'modules/messages/app';
import {Api} from 'utils/api';

const api = new Api({vkApi: true});
// const dbMessages = app.settings.getDb();

describe('Test database methods', () => {
  before(async () => {
    await app.start();
    // await dbMessages.sequelize.sync({force: true});
  });

  beforeEach(async () => {});

  after(async () => {
    process.exit();
  });

  describe('#get', () => {
    it('Get info', async () => {
      const id: string = '8315063';
      const response = await api.vkApi.getInfo(id);
      assert.isNumber(response.length);
    });

    it('Get friends count', async () => {
      const id: string = '8315063';
      const friends = ['6961601'];
      const response = await api.vkApi.friendsCount(id, friends);
      assert.equal(response.count, friends.length);
      assert.equal(response.common_friends.length, friends.length);
    });

    it('Get user wall', async () => {
      const id: string = '8315063';
      const user = await api.vkApi.userInfo(id);
      const response = await api.vkApi.userWall(user[0]);
      assert.isNumber(response.items.length);
    });
  });
});
