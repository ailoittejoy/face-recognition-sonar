const { detectFaces, compareFaces } = require('../helpers/FaceHelper');
const { UserModel } = require('../User');
const { Attendance } = require('../Attendance');

exports.captureAttendance = async (image, loggedIn) => {
	try {
		const user = await UserModel.findOne({ _id: loggedIn });
		if (!user) {
			return { success: false, message: 'User not found' };
		}
		const checkTodaysAttendance = await Attendance.aggregate([
			{
				$addFields: {
					creationDate: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
				},
			},
			{ $match: { creationDate: new Date().toISOString().slice(0, 10) } },
		]);
		if (checkTodaysAttendance && checkTodaysAttendance.length > 0) {
			return { success: false, message: 'Attendance already recorded' };
		}
		// Perform face recognition
		const detections = await detectFaces(image);
		if (detections.length === 0) {
			return { success: false, message: 'No face detected' };
		}
		const isFaceMatch = await compareFaces(user, detections);
		console.log('isFaceMatch', isFaceMatch);
		if (isFaceMatch) {
			// Mark attendance for the recognized user
			await Attendance.create({ userId: user._id });
			return { success: true, message: 'Attendance recorded' };
		} else {
			return { success: false, message: 'Face does not match user' };
		}
	} catch (error) {
		throw new Error(error);
	}
};
