'use strict';

import mongoose from 'mongoose';

exports = module.exports = () => {
  const User = new mongoose.Schema({
    telegram_id: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  });

  return mongoose.model('User', User);
};

exports['@require'] = [];
exports['@singleton'] = true;