// claimHistory.model.ts
import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pointsClaimed: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now }
});

export default mongoose.model('ClaimHistory', claimHistorySchema);
