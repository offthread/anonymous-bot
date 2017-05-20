import IoC from 'electrolyte';
import path from 'path';

IoC.use(IoC.dir(path.join(__dirname, 'boot')));
IoC.use('models', IoC.dir(path.join(__dirname, 'app/models')));
IoC.use('handlers', IoC.dir(path.join(__dirname, 'app/handlers')));
IoC.use('services', IoC.dir(path.join(__dirname, 'app/services')));

module.exports = IoC;