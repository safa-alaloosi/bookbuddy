# BookBuddy Project - CSC441 Web App Development - Project Assignment Week 4

This README provides instructions for setting up and running the project.

## Prerequisites

- Node.js and npm installed on your system
- Docker (optional, for database setup)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/safa-alaloosi/bookbuddy.git
   cd bookbuddy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Database Setup

### Using Docker

If you have Docker installed, you can easily set up MySQL and MongoDB databases using the following command:

```
docker-compose up -d
```

### Manual Setup

If you're not using Docker, you'll need to set up MySQL and MongoDB manually. After setting up your databases, update the credentials in the `index.js` file:

1. Open `index.js` in your preferred text editor.
2. Locate the MySQL and MongoDB connection configurations.
3. Update the credentials to match your local database settings.
