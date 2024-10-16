const {
	checkAndCreateUser,
	checkAndLogin,
	checkAndUpdateFaceDescriptor,
} = require('../models/repository/UserRepository');

exports.register = async (req, res) => {
	try {
		const { success, message } = await checkAndCreateUser(req.body);
		if (success) return res.status(200).json({ message });
		else return res.status(400).json({ message });
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error' });
	}
};

exports.login = async (req, res) => {
	try {
		const { success, message, data } = await checkAndLogin(req.body);
		if (success) return res.status(200).json({ message, data });
		else return res.status(400).json({ message });
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error' });
	}
};
exports.updateImages = async (req, res) => {
	try {
		// Check if files are uploaded
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No files uploaded' });
		}
		const { success, message } = await checkAndUpdateFaceDescriptor(req.files,req.user._id);
		if (success) return res.status(200).json({ message });
		else return res.status(400).json({ message });
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: 'Internal server error' });
	}
};
