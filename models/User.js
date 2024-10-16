const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true },
    password: String,
    fullName: String,
    faceDescriptor: Array, // Array to store face descriptors for face recognition
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

UserSchema.methods.genToken = function () {
  const payload = { id: this.id };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const UserModel = mongoose.model('User', UserSchema);

exports.UserModel = UserModel;
