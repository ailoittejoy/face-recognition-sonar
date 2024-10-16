const router = require('express').Router();
const { checkSchema } = require('express-validator');
const {
  login,
  register,
  updateImages,
} = require('../controllers/UserController');
const ErrorHandleHelper = require('../models/helpers/ErrorHandleHelper');

const AttendanceRoutes = require('./Attendance');
const UserValidator = require('../validations/User');
const { upload } = require('../models/helpers/UtilsHelper');
const { authenticateJWT } = require('../models/helpers/AuthHelper');

router.post(
  '/login',
  checkSchema(UserValidator.login),
  ErrorHandleHelper.requestValidator,
  login
);
router.post(
  '/register',
  checkSchema(UserValidator.register),
  ErrorHandleHelper.requestValidator,
  upload.array('file'),
  register
);
router.post('/images', authenticateJWT(), upload.array('file'), updateImages);

router.use('/attendance', authenticateJWT(), AttendanceRoutes);

module.exports = router;
