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


## Screenshots

Setup
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/992526b2-1753-42e7-8079-e301f47d0307">

Home Page
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/a1424713-7532-4f6d-97c9-fad60daa7160">

Books Page
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/ad9c4e85-2177-44e5-9b11-e95a84da8274">

Recommendations Page
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/2fc664e8-445f-4276-a3c3-d752a5323e41">

Add Book Page
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/22a67ef9-f86d-425d-97d2-67b91cc94fbc">

Add Book Page - validation
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/63f9739e-5663-4c67-b273-526c7f8aebb4">

Add Recommendations Page
<img width="1552" alt="image" src="https://github.com/user-attachments/assets/87bb5f4c-7d64-4354-9697-443ea5dd1ccc">

