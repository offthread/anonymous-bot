'use strict';

import bootable from 'bootable';
import IoC from './ioc-init';

let app = bootable({});

app.phase(bootable.di.initializers());
app.phase(bootable.di.routes());

app.boot(function(err) {
  if (err) {
    console.log(err.message);
    console.log(err.stack);
    return process.exit(-1);
  }
});

module.exports = app;
