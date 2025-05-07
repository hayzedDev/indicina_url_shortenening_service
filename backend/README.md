# URL Shortening Service

This project is a URL shortening service built with TypeScript, utilizing Express for the backend and React for the frontend. 

## Backend

The backend is responsible for handling URL encoding, decoding, and statistics retrieval. It is structured as follows:

- **Entry Point**: `src/app.ts` initializes the Express application, sets up middleware, and configures routes.
- **Controllers**: `src/controllers/urlController.ts` contains the `UrlController` class, which handles incoming requests related to URL operations.
- **Routes**: `src/routes/urlRoutes.ts` defines the API routes and connects them to the appropriate controller methods.
- **Services**: `src/services/urlService.ts` contains the business logic for managing URLs.
- **Utilities**: `src/utils/encoder.ts` provides utility functions for URL encoding and decoding.
- **Types**: `src/types/index.ts` defines the data structures used throughout the application.

### Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Backend

To start the backend server, run:
```
npm start
```

## Frontend

The frontend provides a user interface for interacting with the URL shortening service. It is structured as follows:

- **Components**: 
  - `src/components/UrlForm.tsx` for submitting long URLs.
  - `src/components/UrlList.tsx` for displaying shortened URLs.
  - `src/components/UrlStatistics.tsx` for showing statistics of shortened URLs.
  
- **Pages**: 
  - `src/pages/HomePage.tsx` serves as the main landing page.
  - `src/pages/StatsPage.tsx` displays statistics for specific URLs.

- **Main Application**: `src/App.tsx` sets up routing and renders the appropriate components.

### Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Frontend

To start the frontend application, run:
```
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.