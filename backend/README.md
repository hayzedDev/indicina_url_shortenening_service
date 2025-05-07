# URL Shortening Service - Backend

This is the backend service for the URL Shortening application. It is built with TypeScript and Express and handles URL encoding, decoding, and statistics retrieval.

---

## Prerequisites

Ensure you have **Node.js v20.10.0** installed on your system. If not, follow these steps to install it:

1. **Check Node.js Version**:
   Run the following command to check your current Node.js version:

   ```bash
   node -v
   ```

2. **Install Node.js v20.10.0**:

   - Visit the [Node.js official website](https://nodejs.org/) and download the **v20.10.0** installer for your operating system.
   - Alternatively, use a version manager like `nvm` (Node Version Manager) to install it:
     ```bash
     nvm install 20.10.0
     nvm use 20.10.0
     ```

3. **Verify Installation**:
   After installation, verify the version:
   ```bash
   node -v
   ```

---

## Project Structure

The backend is structured as follows:

- **Entry Point**: `src/app.ts` initializes the Express application, sets up middleware, and configures routes.
- **Controllers**: `src/controllers/urlController.ts` contains the `UrlController` class, which handles incoming requests related to URL operations.
- **Routes**: `src/routes/urlRoutes.ts` defines the API routes and connects them to the appropriate controller methods.
- **Services**: `src/services/urlService.ts` contains the business logic for managing URLs.
- **Utilities**: `src/utils/encoder.ts` provides utility functions for URL encoding and decoding.
- **Types**: `src/types/index.ts` defines the data structures used throughout the application.
- **Models**: `src/models/urlModel.ts` defines the Mongoose schema and model for storing URL data in MongoDB.

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd url-shortening-service
   ```

2. **Navigate to the Backend Directory**:

   ```bash
   cd backend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   - Create a `.env` file by copying the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with the appropriate values for your environment (e.g., MongoDB connection string, port, etc.).

---

## Running the Backend

### Development Mode

To run the backend in development mode with live reloading:

```bash
npm run dev
```

### Production Mode

To build and run the backend in production mode:

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:<PORT>` (default: `5100`).

---

## API Endpoints

### 1. **Encode URL**

**Endpoint**: `POST /api/encode`
**Description**: Encodes a long URL into a short URL.

#### Request:

```json
{
  "longUrl": "https://example.com"
}
```

#### Response:

```json
{
  "success": true,
  "message": "URL encoded successfully",
  "data": "abc123"
}
```

---

### 2. **Decode URL**

**Endpoint**: `GET /api/decode/:urlPath`
**Description**: Decodes a short URL back into the original long URL.

#### Request:

- **Path Parameter**: `urlPath` (e.g., `abc123`)

#### Response:

```json
{
  "success": true,
  "message": "URL decoded successfully",
  "data": "https://example.com"
}
```

#### Error Response (if the short URL does not exist):

```json
{
  "success": false,
  "message": "URL not found"
}
```

---

### 3. **Get URL Statistics**

**Endpoint**: `GET /api/statistics/:shortUrl`
**Description**: Retrieves statistics for a given short URL.

#### Request:

- **Path Parameter**: `shortUrl` (e.g., `abc123`)

#### Response:

```json
{
  "success": true,
  "message": "URL statistics retrieved successfully",
  "data": {
    "longUrl": "https://example.com",
    "createdAt": "2023-01-01T00:00:00Z",
    "visits": 10,
    "lastAccessed": "2023-01-02T00:00:00Z",
    "referrers": [{ "domain": "google.com", "count": 5 }],
    "geoDistribution": [{ "country": "United States", "count": 7 }]
  }
}
```

#### Error Response (if the short URL does not exist):

```json
{
  "success": false,
  "message": "URL statistics not found"
}
```

---

### 4. **List All URLs**

**Endpoint**: `GET /api/list`
**Description**: Retrieves a list of all stored URLs.

#### Response:

```json
{
  "success": true,
  "message": "URLs retrieved successfully",
  "data": [
    {
      "shortUrl": "abc123",
      "longUrl": "https://example1.com",
      "createdAt": "2023-01-01T00:00:00Z",
      "visits": 10,
      "lastAccessed": "2023-01-02T00:00:00Z"
    },
    {
      "shortUrl": "xyz456",
      "longUrl": "https://example2.com",
      "createdAt": "2023-01-03T00:00:00Z",
      "visits": 5,
      "lastAccessed": "2023-01-04T00:00:00Z"
    }
  ]
}
```

---

## Testing

To run the backend tests:

```bash
npm run test
```

---
