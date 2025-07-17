import User from "../model/user.model";

export const getLeaderboardData = async () => {
  const users = await User.find().sort({ totalPoints: -1 });

  return users.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints,
  }));
};
