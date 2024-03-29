import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

// uniqness eamil
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    username: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: '' },
  },
  { timestamps: true },
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`;
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      username: this.username,
      confirmed: this.confirmed,
    },
    process.env.JWT_SECRET,
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    username: this.username,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

schema.plugin(uniqueValidator, {
  message: 'This value has already used',
});

export default mongoose.models.user || mongoose.model('user', schema);
