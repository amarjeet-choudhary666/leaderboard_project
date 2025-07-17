import claimHistory from "../model/claimHistory";
import User from "../model/user.model";
import {Request, Response} from 'express';
import { getLeaderboardData } from '../utils/leaderboard.helper';

export const claimPoints = async (req: Request, res: Response) => {
  try {
    console.log("Incoming route params:", req.params);

    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: 'userId is missing in params' });

    const user = await User.findById(userId);
    console.log("Found user:", user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    await claimHistory.create({
      userId: user._id,
      pointsClaimed: points,
      claimedAt: new Date(),
    });
    

    const io = req.app.get('io');
    const leaderboard = await getLeaderboardData();
    io.emit('leaderboardUpdated', leaderboard);

    res.status(200).json({ message: 'Points claimed', points });
  } catch (err) {
    console.error("Error in claimPoints:", err);
    res.status(500).json({ message: 'Claim failed', error: err });
  }
};


export const getClaimHistory = async (_req: Request, res: Response) => {
  try {
    const history = await claimHistory.find()
      .sort({ claimedAt: -1 }) // sort by claimedAt
      .populate('userId', 'name');

    const formatted = history.map((entry) => ({
      user: entry.userId?.name || 'Unknown',
      points: entry.pointsClaimed,
      claimedAt: new Date(entry.claimedAt).toLocaleString(), // FIXED HERE
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get history', err });
  }
};


