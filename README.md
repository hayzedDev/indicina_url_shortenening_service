# URL Shortening Service

This project is a URL shortening service built with TypeScript, utilizing Express for the backend and React for the frontend. The service allows users to encode long URLs into shorter, more manageable links, and provides statistics on the usage of these links.

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

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

The backend is built using Express and TypeScript. It handles the core functionality of the URL shortening service.

- **src/app.ts**: Entry point of the backend application. Initializes the Express app, sets up middleware, and configures routes.
- **src/controllers/urlController.ts**: Contains the `UrlController` class with methods for handling URL encoding, decoding, and statistics retrieval.
- **src/routes/urlRoutes.ts**: Defines the API routes for the application and connects them to the `UrlController` methods.
- **src/services/urlService.ts**: Contains the `UrlService` class that manages the business logic for encoding and decoding URLs, as well as managing URL statistics.
- **src/utils/encoder.ts**: Utility functions for generating short URLs, encoding long URLs, decoding short URLs, and retrieving URL statistics.
- **src/types/index.ts**: Exports interfaces that define the structure of data used in the application, such as URL data and request/response types.
- **src/models/urlModel.ts**: Defines the Mongoose schema and model for storing URL data in a MongoDB database.
- **package.json**: Configuration file for the backend, listing dependencies, scripts, and metadata.
- **tsconfig.json**: TypeScript configuration file for the backend.

### Frontend

The frontend is built using React and TypeScript. It provides a user interface for interacting with the URL shortening service.

- **src/components/UrlForm.tsx**: A form for users to input long URLs for encoding.
- **src/components/UrlList.tsx**: Displays a list of shortened URLs and their statistics.
- **src/components/UrlStatistics.tsx**: Shows detailed statistics for a specific shortened URL.
- **src/pages/HomePage.tsx**: Main landing page for the application.
- **src/pages/StatsPage.tsx**: Displays statistics for shortened URLs.
- **src/App.tsx**: Main application component that sets up routing and renders the appropriate pages.
- **src/index.tsx**: Entry point for the frontend application, rendering the App component into the DOM.
- **src/types/index.ts**: Exports interfaces that define the structure of data used in the frontend.
- **package.json**: Configuration file for the frontend, listing dependencies, scripts, and metadata.
- **tsconfig.json**: TypeScript configuration file for the frontend.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Start the backend server:

   ```bash
   cd ../backend
   npm run start
   ```

5. Start the frontend application:

   ```bash
   cd ../frontend
   npm run start
   ```

## Running Test Cases

To ensure the application is working as expected, you can run the test cases for both the backend and frontend.

### Backend Tests

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run the tests:

   ```bash
   npm test
   ```

## Usage

Once both the backend and frontend are running, you can access the application in your web browser. Use the form to input long URLs and receive shortened versions. You can also view statistics for each shortened URL.
