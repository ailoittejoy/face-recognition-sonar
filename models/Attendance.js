const mongoose = require('mongoose');
const { defaultAttendanceStatus } = require('../config/Options');

const AttendanceSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: defaultAttendanceStatus.PRESENT,
      trim: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

exports.Attendance = Attendance;
