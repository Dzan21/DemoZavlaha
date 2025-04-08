# Irrigation System Demo

This project is a demonstration of an irrigation system management application. It allows users to register, log in, and control irrigation systems both automatically and manually. The application integrates with weather APIs to provide accurate irrigation data based on the user's location.

## Features

- User Registration and Login
- Dashboard for managing irrigation systems
- Integration with weather APIs for real-time weather data
- Simulated sensor data for irrigation control
- Manual and automatic irrigation control options

## Project Structure

```
irrigation-system-demo
├── src
│   ├── app.ts                     # Entry point of the application
│   ├── controllers                # Contains controllers for handling requests
│   │   ├── authController.ts      # Handles user authentication
│   │   ├── dashboardController.ts  # Manages dashboard functionalities
│   │   └── sensorController.ts     # Manages sensor-related functionalities
│   ├── routes                     # Contains route definitions
│   │   ├── authRoutes.ts          # Routes for authentication
│   │   ├── dashboardRoutes.ts      # Routes for dashboard management
│   │   └── sensorRoutes.ts         # Routes for sensor data
│   ├── services                   # Contains business logic
│   │   ├── authService.ts         # Logic for user authentication
│   │   ├── dashboardService.ts     # Logic for dashboard management
│   │   └── sensorService.ts        # Logic for handling sensor data
│   ├── models                     # Contains data models
│   │   ├── userModel.ts           # User data model
│   │   └── sensorModel.ts         # Sensor data model
│   ├── utils                      # Utility functions
│   │   └── weatherAPI.ts          # Functions for fetching weather data
│   └── types                      # TypeScript types and interfaces
│       └── index.ts               # Common types used throughout the application
├── config                         # Configuration files
│   └── database.ts                # Database configuration settings
├── package.json                   # NPM configuration file
├── tsconfig.json                  # TypeScript configuration file
└── README.md                      # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd irrigation-system-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database settings in `config/database.ts`.

4. Start the application:
   ```
   npm start
   ```

## Usage

- Navigate to the login page to register or log in.
- Access the dashboard to control the irrigation system.
- The application will automatically fetch weather data based on your location to optimize irrigation.

## Note

Sensor functionalities are simulated in this demo. Actual sensor integration will require additional hardware and implementation.