# Secret Sharing Web Application

This is a web application built using Node.js, Express.js, MongoDB, Mongoose, and Bootstrap. The application allows users to submit secrets anonymously, which can be viewed by all others. Users must sign up or log in using either local authentication or Google OAuth to submit a secret.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies-Used](#Technologies-Used)
- [Contributing](#contributing)

## Features

- **Local Authentication**: Users can sign up and log in using a valid email and password.
- **Google OAuth**: Users can sign up and log in using their Google account.
- **Submit Secrets Anonymously**: Logged-in users can submit secrets anonymously.
- **View Secrets**: All submitted secrets can be viewed by anyone visiting the site.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/learnAuthAndSec.git
    cd learnAuthAndSec
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up MongoDB:**
    - Make sure you have MongoDB installed and running on your machine.
    - As we are using MongoDB to store signup, login and submitted secrets information in local database.
   ```bash
    mongod
    ```

4. **Start the application:**
    ```bash
    node app.js
    ```

5. **Access the app:**
    - Open your browser and go to `http://localhost:3000`

## Usage

- **Home Page:**
  - View a basic homepage with register and signup buttons.

- **User Authentication:**
  - Sign up and log in to submit secrets anonymously which can be viewed by anyone.
 
## Technologies-Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **Bootstrap**: Front-end framework for responsive web design

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit your changes with a descriptive message.
5. Push your changes to your forked repository.
6. Create a pull request to the main repository.


