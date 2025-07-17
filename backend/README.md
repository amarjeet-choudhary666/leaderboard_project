# Leaderboard Task Backend

This is the backend application for the Leaderboard Task project, built using Node.js, Express, and TypeScript. It provides RESTful APIs and WebSocket services to support the frontend application with real-time updates and data management.

## Technology Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building REST APIs.
- **TypeScript**: Typed superset of JavaScript for better code quality.
- **Socket.IO**: Enables real-time, bidirectional communication between client and server.
- **Mongoose**: MongoDB object modeling tool.
- **dotenv**: Loads environment variables from a .env file.

## Features

- RESTful API endpoints for user management, claims, and leaderboard data.
- Real-time WebSocket communication for live updates.
- Database connection and management using MongoDB and Drizzle ORM.
- CORS configured for frontend development servers.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- Build the TypeScript code:

```bash
npm run build
```

- Start the server:

```bash
npm start
```

- Start the server in development mode with hot reload:

```bash
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend` directory to configure environment variables such as:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## License

This project is licensed under the ISC License.
