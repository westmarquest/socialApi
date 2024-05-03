# Social Media API
## Description
This project provides a RESTful API for a social media platform, allowing users to interact with posts, comments, reactions, and user profiles.

## Features
### User Management
-User Registration: Users can sign up for an account by providing a unique username and email.
-User Authentication: Registered users can log in to their accounts securely using their credentials.
-User Profile: Each user has a profile containing basic information such as username and email.
### Post Management
-Create Posts: Authenticated users can create new posts to share their thoughts and updates.
-Edit and Delete Posts: Users can edit or delete their own posts as needed.
### Commenting System
-Comment on Posts: Users can comment on posts to engage in discussions and provide feedback.
-Edit and Delete Comments: Users can modify or remove their own comments on posts.
### Reaction System
-React to Posts and Comments: Users can react to posts and comments with predefined reactions such as like, love, and laugh.
-View Reactions: The number and type of reactions are displayed alongside posts and comments.
## Installation and Setup
### Prerequisites
Node.js
MongoDB
### Installation
-Clone the repository to your local machine.
-Navigate to the project directory.
-Install dependencies with npm install.
### Configuration
Set up environment variables for database connection (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).
### Running the Server
Execute the following command:
`npm start`
## API Documentation
### Users
-GET /api/users: Get all users.
-GET /api/users/:userId: Get a specific user by ID.
-POST /api/users: Create a new user.
-PUT /api/users/:userId: Update an existing user.
-DELETE /api/users/:userId: Delete a user.
### Thoughts
-GET /api/thoughts: Get all thoughts.
-GET /api/thoughts/:thoughtId: Get a specific thought by ID.
-POST /api/thoughts: Create a new thought.
-PUT /api/thoughts/:thoughtId: Update an existing thought.
-DELETE /api/thoughts/:thoughtId: Delete a thought.
### Reactions
-POST /api/reactions/:thoughtId: Add a reaction to a thought.
-POST /api/reactions/:commentId: Add a reaction to a comment.
## Demonstration Vid
`https://drive.google.com/file/d/12ohK5iLVKDtOr4gAjPsG6yBQlEbRNQ4d/view?usp=sharing`

## Technologies Used
Node.js
Express.js
MongoDB
Mongoose ODM
