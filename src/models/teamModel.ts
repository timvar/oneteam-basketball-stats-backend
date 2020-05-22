import mongoose, { Schema, Document } from 'mongoose';

export interface TeamI extends Document {
  id: string;
  teamName: string;
}

const teamSchema: Schema = new Schema({
  teamName: { type: String, required: true },
});

teamSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<TeamI>('Team', teamSchema);
