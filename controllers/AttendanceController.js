const {
  captureAttendance,
} = require('../models/repository/AttendanceRepository');

exports.markAttendance = async (req, res) => {
  try {
    const { success, message } = await captureAttendance(
      req.file,
      req.user._id
    );
    if (success) return res.status(200).json({ message });
    return res.status(400).json({ message });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
