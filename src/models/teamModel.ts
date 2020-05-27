import mongoose, { Schema, Document } from 'mongoose';
import { UserI } from './userModel';

export interface TeamI extends Document {
  id: string;
  teamName: string;
  user: UserI['_id'];
}

const teamSchema: Schema = new Schema({
  teamName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
});

teamSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<TeamI>('Team', teamSchema);
