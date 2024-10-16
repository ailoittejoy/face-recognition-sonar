const bcrypt = require('bcrypt');
const { UserModel } = require('../User');
const { getFaceDescriptor } = require('../helpers/FaceHelper');
const { modifyOutputData } = require('../helpers/UserHelper');

exports.findUser = async (query) => await UserModel.findOne(query);

exports.checkAndLogin = async (body) => {
  try {
    const { userName, password } = body;
    const user = await this.findUser({ userName });
    // If user not found or password doesn't match, send error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: 'Invalid credentials' };
    }
    return {
      success: true,
      message: 'Login successful',
      data: modifyOutputData(user),
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.checkAndCreateUser = async (body) => {
  try {
    const isUserExists = await this.findUser({ userName: body.userName });
    if (isUserExists) {
      return {
        success: false,
        message: 'User exists with this user name',
      };
    }
    const hashedPassword = await bcrypt.hash(
      body.password,
      bcrypt.genSaltSync(8)
    ); // 10 is the salt rounds
    await UserModel.insert({
      userName: body.userName,
      fullName: body.fullName,
      password: hashedPassword,
    });
    return {
      success: true,
      message: 'User registered successfully',
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.checkAndUpdateFaceDescriptor = async (images, loggedInUser) => {
  try {
    const user = await this.findUser({ _id: loggedInUser._id });
    if (!user) {
      return { success: false, message: 'Invalid user' };
    }
    const faceDescriptor = await getFaceDescriptor(images);
    user.faceDescriptor = [...user.faceDescriptor, ...faceDescriptor];
    await user.save();
    return { success: true, message: 'User images are updated' };
  } catch (error) {
    throw new Error(error);
  }
};
