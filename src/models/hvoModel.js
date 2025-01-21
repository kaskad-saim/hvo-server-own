import mongoose from 'mongoose';

const hvoDataSchema = new mongoose.Schema({
  parameters: Object,
  lastUpdated: Date,
});

const Hvo1Model = mongoose.model('hvo1Models', hvoDataSchema);
const Hvo2Model = mongoose.model('hvo2Models', hvoDataSchema);

export { Hvo1Model, Hvo2Model };