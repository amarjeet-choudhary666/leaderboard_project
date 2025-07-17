import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cookieParser())
app.use(express.urlencoded({limit: "16kb", extended: true}))
app.use(express.json({limit: "16kb"}))

app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

import userRoutes from './routes/user.routes'
import claimRoutes from './routes/claim.routes'
import leaderBoardRoutes from './routes/leaderBoard.routes'

app.use("/users", userRoutes)
app.use('/claim', claimRoutes)
app.use('/leaderboard', leaderBoardRoutes)

export {app}