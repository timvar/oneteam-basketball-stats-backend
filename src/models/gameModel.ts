import mongoose, {Schema, Document} from 'mongoose';

export interface GameI extends Document {
  id: string;
  homeTeam: string;
  awayTeam: string;
  gameNumber: string;
  description: string;
  gameDate: string;
}

const gameSchema: Schema = new Schema({
  homeTeam: { type: String, required: true },  
  awayTeam: { type: String, required: true },
  gameNumber: { type: String, required: true },  
  description: { type: String, required: true },  
  gameDate: { type: String, required: true },  
});

gameSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<GameI>('Game', gameSchema);
