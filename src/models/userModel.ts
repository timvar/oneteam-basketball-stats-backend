import mongoose, { Schema, Document } from 'mongoose';

export interface UserI extends Document {
  id: string;
  userName: string;
  passwordHash: string;
  password: string;
}

const userSchema: Schema = new Schema({
  userName: { type: String },
  passwordHash: { type: String },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model<UserI>('User', userSchema);
