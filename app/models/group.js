'use strict';

import mongoose from 'mongoose';

exports = module.exports = () => {
  const Group = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    telegram_id: {
      type: Number,
      required: true
    }
  });

  return mongoose.model('Group', Group);
};

exports['@require'] = [];
exports['@singleton'] = true;