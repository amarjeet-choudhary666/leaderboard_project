import User from "../model/user.model"
import { Request, Response } from "express";


export const getLeaderboard = async (_: Request, res: Response) => {
    try {
      const users = await User.find().sort({ totalPoints: -1 });
  
      const leaderboard = users.map((user: { name: any; totalPoints: any; }, index: number) => ({
        rank: index + 1,
        name: user.name,
        totalPoints: user.totalPoints,
      }));
  
      res.json(leaderboard);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get leaderboard', error: err });
    }
  };


  export const getLeaderboardByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const users = await User.find().sort({ totalPoints: -1 });
  
      const leaderboard = users.map((user, index) => ({
        id: user._id.toString(),
        name: user.name,
        totalPoints: user.totalPoints,
        rank: index + 1,
      }));
  
      const target = leaderboard.find((entry) => entry.id === userId);
  
      if (!target) {
        return res.status(404).json({ message: 'User not found in leaderboard' });
      }
  
      res.status(200).json(target);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get user rank', error: err });
    }
  };
  