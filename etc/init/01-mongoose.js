'use strict';

import mongoose from 'mongoose';

exports = module.exports = (settings) => {

  mongoose.connection.on('error', function(err) {
    console.error('mongo connection error: %s', err.message || err);
  });

  mongoose.connection.on('open', function() {
    console.info('mongo connection opened');
  });

  const mongo = settings.mongo;
  mongoose.connect(mongo.host, mongo.database, mongo.port);
};

exports['@require'] = [ 'config' ];