import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  parameters: Object,
  info: Object,
  alarms: Object,
  im: Object,
  others: Object,
  lastUpdated: Date,
});

const Kotel1Model = mongoose.model('kotel1Models', dataSchema);
const Kotel2Model = mongoose.model('kotel2Models', dataSchema);
const Kotel3Model = mongoose.model('kotel3Models', dataSchema);

dataSchema.index({ lastUpdated: 1 });


export { Kotel1Model, Kotel2Model, Kotel3Model };