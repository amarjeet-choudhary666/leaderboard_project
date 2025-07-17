import { Request, Response } from 'express';
import User from '../model/user.model';
import ClaimHistory from '../model/claimHistory';

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ name });

    const io = req.app.get('io'); // access io from app
    io.emit('userCreated', newUser);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user', error: err });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err });
  }
};