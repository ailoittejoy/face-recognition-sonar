const router = require('express').Router();
const { checkSchema } = require('express-validator');
const { markAttendance } = require('../controllers/AttendanceController');
const ErrorHandleHelper = require('../models/helpers/ErrorHandleHelper');

const AttendanceValidator = require('../validations/Attendance');
const { upload } = require('../models/helpers/UtilsHelper');

router.post('/mark', upload.single('file'), markAttendance);

module.exports = router;
