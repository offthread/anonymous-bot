'use strict';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

exports = module.exports = function() {
  let settings = {};
  let env = process.env.NODE_ENV || 'development';
  let config = {
    defaults: {

    },
    development: {
      mongo: {
        host: 'localhost',
        database: 'anonymous-development',
        port: 27017
      }
    },
    production: {
      mongo: {
        host: 'localhost',
        database: 'anonymous-production',
        port: 27017
      }
    }
  };

  settings = config[env];

  try {
    let secrets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'secrets.json')));
    if (secrets) {
      _.defaultsDeep(settings, secrets);
    }
  } catch (e) {
    throw e;
  };

  return settings;
};

exports['@singleton'] = true;