import mongoose, {Schema, Document} from 'mongoose';
mongoose.set('useCreateIndex', true);

export interface PlayerI extends Document {
  id: string;
  playerName: string;
  playerNumber: number;
}

const playerSchema: Schema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  playerNumber: {
    type: Number,
    required: true,
  },
});

playerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<PlayerI>('Player', playerSchema);
