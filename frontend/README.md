# URL Shortening Service - Frontend

This project is the frontend for the URL Shortening Service. It is built with React and TypeScript and provides a user-friendly interface for encoding long URLs into short URLs and viewing statistics for those URLs.

---

## Features

- **URL Encoding**: Users can input long URLs and receive a shortened version.
- **URL List**: Displays a list of all shortened URLs along with their visit statistics.
- **URL Statistics**: Provides detailed statistics for each shortened URL.

---

## Prerequisites

Ensure you have **Node.js v20.10.0** installed on your system. If not, follow these steps:

1. **Check Node.js Version**:

   ```bash
   node -v
   ```

2. **Install Node.js v20.10.0**:

   - Visit the [Node.js official website](https://nodejs.org/) and download the **v20.10.0** installer for your operating system.
   - Alternatively, use a version manager like `nvm`:
     ```bash
     nvm install 20.10.0
     nvm use 20.10.0
     ```

3. **Verify Installation**:
   ```bash
   node -v
   ```

---

## Getting Started

### Development Configuration

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hayzedDev/indicina_url_shortenening_service
   cd url-shortening-service
   ```

2. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   - Create a `.env` file by copying the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with the appropriate values. For example:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:5100
     REACT_APP_FRONTEND_URL=http://localhost:3001
     PORT=3001
     ```

5. **Run the application in development mode**:

   ```bash
   npm start
   ```

6. **Access the application**:
   - The frontend will run on: `http://localhost:3001`
   - Ensure the backend is running on: `http://localhost:5100`

---

### Production Configuration

1. **Build the frontend**:

   ```bash
   npm run build
   ```

2. **Serve the production build**:

   ```bash
   npm run serve
   ```

3. **Access the application**:
   - The frontend will run on the port specified in the `.env` file (e.g., `http://localhost:3001`).

---

## Project Structure

- **src/components**: Contains reusable React components.
- **src/pages**: Contains page components for routing.
- **src/types**: Contains TypeScript interfaces for type definitions.

---

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Axios**: For making API calls to the backend.

---

## URLs

- **Frontend**:

  - Development: `http://localhost:3001`
  - Production: Based on the `PORT` specified in `.env`.

- **Backend**:
  - Development: `http://localhost:5100`
  - Production: Based on the backend `.env` configuration.

---
