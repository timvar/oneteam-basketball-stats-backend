import mongoose, { Schema, Document } from 'mongoose';
import { TeamI } from './teamModel';
import { UserI } from './userModel';

export interface PlayerI extends Document {
  id: string;
  playerName: string;
  playerNumber: number;
  // team: TeamI['_id'];
  user: UserI['_id'];
}

const playerSchema: Schema = new Schema({
  playerName: { type: String, required: true },
  playerNumber: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId },
  user: { type: Schema.Types.ObjectId, required: true },
});

playerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<PlayerI>('Player', playerSchema);
