..# Leaderboard Task Project - Technology Stack Overview

This repository contains the full-stack Leaderboard Task project, consisting of a frontend React application and a backend Node.js/Express API with real-time WebSocket support.

## Technology Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast frontend build tool and development server.
- **Socket.IO**: Real-time, bidirectional communication with the backend.
- **JavaScript (JSX)**: Component-based UI development.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building REST APIs.
- **TypeScript**: Typed superset of JavaScript for better code quality.
- **Socket.IO**: Real-time WebSocket communication.
- **Mongoose**: MongoDB object modeling tool.
- **dotenv**: Environment variable management.

## Project Structure

- `frontend/`: React frontend application built with Vite.
- `backend/`: Node.js backend API built with Express and TypeScript.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Setup and Run

#### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with necessary environment variables (e.g., `PORT`, `MONGODB_URI`).

4. Run the backend server in development mode:

```bash
npm run dev
```

The backend server will start on the port specified in `.env` or default to 3000.

#### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as configured).

## License

This project is licensed under the MIT License.
