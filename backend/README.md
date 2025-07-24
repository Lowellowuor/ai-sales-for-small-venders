# PitchPoa Backend

## Setup

1. Clone this repo and navigate to the `backend` folder.
2. Copy `.env.example` to `.env` and fill in your MongoDB URI and API key.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server (dev mode):
   ```bash
   npm run dev
   ```

## Endpoints

- `POST /api/v1/contact` — Receive contact/support form submissions
- `POST /api/v1/terms-question` — Receive terms of service questions
- `GET /api/v1/users` — List users
- `POST /api/v1/messages` — Send WhatsApp message (stub)
- `GET /api/v1/analytics` — Return analytics data (stub)
- `POST /api/v1/webhooks` — Register a webhook endpoint

## Integration

- Point your frontend API calls to `http://localhost:5000/api/v1/...`
- Deploy backend (Render, Heroku, etc.) and update frontend API URLs accordingly.

## Environment Variables
- `MONGODB_URI` — Your MongoDB connection string
- `API_KEY` — API key for authenticating requests
- `PORT` — Port to run the server (default: 5000) 