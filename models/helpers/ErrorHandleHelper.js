const { validationResult } = require('express-validator');
const chalk = require('chalk');

exports.customErrorLogger = (err) => {
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  console.error(chalk.red('X'), err);
};

exports.requestValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
