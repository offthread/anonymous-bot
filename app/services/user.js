'use strict';

exports = module.exports = (User) => {
  const addOrUpdateUser = (telegramId, username) => {
    return User.update({
      telegram_id: telegramId
    },{
      telegram_id: telegramId,
      username: username
    },
    { upsert: true });
  };

  const getUserByTelegramId = (telegramId) => {
    return User.findOne({ telegram_id: telegramId });
  };

  return {
    addOrUpdateUser,
    getUserByTelegramId
  };
};

exports['@singleton'] = true;
exports['@require'] = [ 'models/user' ];