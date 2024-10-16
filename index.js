const express = require('express');
const lusca = require('lusca');
const logger = require('morgan');
const chalk = require('chalk');

require('dotenv').config();
require('./config/DbConnection');

const indexRoute = require('./routes/index');
const { loadModels } = require('./models/helpers/FaceHelper');

const { PORT, NODE_ENV } = process.env;

const app = express();

app.use(express.json());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(logger('dev'));

app.set('port', PORT || 3000);

app.listen(app.get('port'), () => {
  loadModels().then();
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

app.use('/api', indexRoute);
