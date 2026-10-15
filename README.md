# URL Shortener

A small backend project for creating short URLs, redirecting visitors, and checking click counts.

## Requirements

- Node.js
- MongoDB
- Nodemon installed globally

## Setup

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server runs on `http://localhost:3000` by default.

## API

### Create a short URL

```http
POST /urls
Content-Type: application/json
```

Request body:

```json
{
  "originalUrl": "https://example.com"
}
```

The response contains the generated `shortUrl`.

Only `http` and `https` URLs are accepted.

### Redirect to the original URL

```http
GET /urls/:shortUrl
```

Example:

```text
http://localhost:3000/urls/abc12345
```

A successful request redirects to the original URL and increases its click count by one.

### View URL analytics

```http
GET /urls/:shortUrl/analytics
```

Example response:

```json
{
  "shortUrl": "abc12345",
  "originalUrl": "https://example.com",
  "clickCount": 3
}
```

## Common responses

- `201` means a short URL was created.
- `400` means the request contains invalid data.
- `404` means the short URL does not exist.
- `409` means a duplicate short URL was generated.

## Project structure

```text
config/       Database connection
controllers/  Request handlers
models/       Mongoose schemas
routes/       Express routes
index.js      Application entry point
```
