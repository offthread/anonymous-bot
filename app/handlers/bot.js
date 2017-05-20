'use strict';

import TeleBot from 'telebot';
import fs from 'fs';


exports = module.exports = (settings, groupServices, userServices) => {

  const chatTypes = {
    group: 'group',
    private: 'private'
  };

  const bot = new TeleBot(settings.telegramToken);

  bot.on('/register', (msg, props) => {
    return userServices.addOrUpdateUser(msg.from.id, msg.from.username)
      .then((result) => {
        return msg.reply.text(
          `User ${msg.from.id} registered with username ${msg.from.username}!`,
          { asReply: true }
        );
      });
  });

  bot.on('/add', (msg, props) => {
    if (String(msg.chat.type) !== chatTypes.group) {
      throw {
        message: 'You need to use this command inside a group',
        showToUser: true
      };
    }
    return groupServices.addOrUpdateGroup(msg.chat.id, msg.chat.title)
      .then((result) => {
        return msg.reply.text(
          `Group ${msg.chat.title} registered with id ${msg.chat.id}`,
          { asReply: true }
        );
      });
  });

  bot.on('/groups', (msg, props) => {
    return groupServices.getAllGroups()
      .then((groups) => {
        let groupsStrings = groups.map((group) => {
          return `${group.name}: ${group.telegram_id}`;
        });
        return msg.reply.text(
          'Available groups:\n' + groupsStrings.join('\n'),
          { asReply: true }
        );
      });
  });

  bot.on('/send', (msg, props) => {
    if (String(msg.chat.type) !== chatTypes.private) {
      throw {
        message: 'You need to user this command a private chat',
        showToUser: true
      };
    }
    const messageData = msg.text.split(' ');
    if (messageData.length < 3) {
      return msg.reply.text('You need to send the group id and message');
    }
    let telegramId = parseInt(messageData[1]);
    let message = messageData.slice(2).join(' ');
    return userServices.getUserByTelegramId(msg.chat.id)
      .then((user) => {
        if (!user) {
          throw {
            message: 'Sorry, but you are not allowed to use me :(',
            showToUser: true
          };
        }
        return groupServices.getGroupByTelegramId(telegramId);
      })
      .then((group) => {
        if (!group) {
          throw {
            message: 'I am not allowed to send messages to this group',
            showToUser: true
          };
        }
        return bot.sendMessage(telegramId, message);
      });
  });

  bot.on('error', (error) => {
    if (error.error.showToUser) {
      return error.data.reply.text(
        error.error.message,
        { asReply: true });
    }
      return error.data.reply.text(
        'There was an error processing your command',
        { asReply: true });
  });

  return bot;
};

exports['@singleton'] = true;
exports['@require'] = [ 'config', 'services/group', 'services/user' ];