import mongoose, {Schema, Document} from 'mongoose';

export interface StatI extends Document {
  id: string;
  playerNumber: number;
  onePm: number;
  twoPm: number;
  threePm: number;
  onePa: number;
  twoPa: number;
  threePa: number;
  orb: number;
  to: number;
  drb: number;
  ast: number;
  blk: number;
  stl: number;
}

const statSchema: Schema = new Schema({
  playerNumber: { type: Number }, 
  onePm: { type: Number },  
  twoPm: { type: Number },  
  threePm: { type: Number }, 
  onePa: { type: Number }, 
  twoPa: { type: Number }, 
  threePa: { type: Number }, 
  orb: { type: Number }, 
  to: { type: Number }, 
  drb: { type: Number }, 
  ast: { type: Number }, 
  blk: { type: Number }, 
  stl: { type: Number }
});

statSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<StatI>('Stat', statSchema);
