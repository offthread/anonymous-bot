'use strict';

exports = module.exports = (Group) => {

  const getAllGroups = () => {
    return Group.find();
  };

  const addOrUpdateGroup = (telegramId, name) => {
    return Group.update({
      telegram_id: telegramId
    },
    {
      telegram_id: telegramId,
      name: name
    },
    { upsert: true });
  };

  const getGroupByTelegramId = (telegramId) => {
    return Group.findOne({ telegram_id: telegramId });
  }

  return {
    getAllGroups,
    addOrUpdateGroup,
    getGroupByTelegramId
  };

};

exports['@require'] = [ 'models/group' ];
exports['@singleton'] = true;