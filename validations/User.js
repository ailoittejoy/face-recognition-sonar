exports.login = {
	userName: {
		in: ['body'],
		trim: true,
		notEmpty: true,
		errorMessage: 'userName cannot be empty',
		isString: {
			errorMessage: 'userName must be string',
		},
	},
	password: {
		in: ['body'],
		trim: true,
		notEmpty: true,
		errorMessage: 'Password cannot be empty',
		isString: {
			errorMessage: 'Password must be string',
		},
	},
};

exports.register = {
	userName: {
		in: ['body'],
		trim: true,
		notEmpty: true,
		errorMessage: 'userName cannot be empty',
		isString: {
			errorMessage: 'userName must be string',
		},
	},
	fullName: {
		in: ['body'],
		trim: true,
		notEmpty: true,
		errorMessage: 'fullName cannot be empty',
		isString: {
			errorMessage: 'fullName must be string',
		},
	},
	password: {
		in: ['body'],
		trim: true,
		notEmpty: true,
		errorMessage: 'Password cannot be empty',
		isString: {
			errorMessage: 'Password must be string',
		},
	},
};

exports.updateImages = {
	language: {
		in: ['body'],
		notEmpty: false,
		errorMessage: 'language cannot be empty',
		isArray: {
			errorMessage: 'language must be an array',
		},
	},
};