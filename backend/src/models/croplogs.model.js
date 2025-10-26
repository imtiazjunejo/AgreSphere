// backend/models/croplogs.model.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  // frontend uses string date like "2025-08-01" — keep it as string for simplicity
  date: { type: String, default: '' },
  activity: { type: String, default: '' },
  notes: { type: String, default: '' },
  cost: { type: Number, default: 0 },
  // optional: store client's local id if frontend generates one (not required)
  clientId: { type: String, default: '' },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  season: { type: String, default: '' },
  farmingType: { type: String, default: 'owner' }, // owner | partnership | lease
  landOwner: { type: String, default: '' },
  hasFarmer: { type: Boolean, default: false },
  farmers: [{ type: String }],
  leaseAmount: { type: Number, default: 0 },
});

const cropLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: projectSchema, default: () => ({}) },
    activities: { type: [activitySchema], default: [] },
    saleAmount: { type: Number, default: 0 }, // gross sale
  },
  { timestamps: true }
);

const CropLog = mongoose.model('CropLog', cropLogSchema);

export default CropLog;
