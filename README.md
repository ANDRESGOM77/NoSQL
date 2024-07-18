# NoSQL

## Table of Contents

- [User Story](#userStory)
- [Installation](#installation)
- [Usage](#Usage)
- [Features](#features)
- [Technologies Usage](#technologies-usage)
- [License](#license)
- [Contributing](#contributing)
- [links](#links)
- [Questions](#Questions)

## User Story

```
As a social media startup,
I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.
```
## Installation

1. Clone the repository:

- git clone https://github.com/ANDRESGOM77/NoSQL.git

2. Navigate to the project directory

3. Install the required npm packages:

- npm install

## Usage

1. Start the application:

- npm start

2. Follow the prompts to navigate through the application and perform various operations such as viewing, adding, and deleting departments, roles, and employees.

## Features

Users:

 - GET /api/users: Retrieve all users
 - GET /api/users/:userId: Retrieve a single user by ID
 - POST /api/users: Create a new user
 - PUT /api/users/:userId: Update a user
 - DELETE /api/users/:userId: Delete a user

Thoughts:

 - GET /api/thoughts: Retrieve all thoughts
 - GET /api/thoughts/:thoughtId: Retrieve a single thought by ID
 - POST /api/thoughts: Create a new thought
 - PUT /api/thoughts/:thoughtId: Update a thought
 - DELETE /api/thoughts/:thoughtId: Delete a thought

Friends:
 
 - POST /api/users/:userId/friends/:friendId: Add a new friend to a user's friend list
 - DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list

Reactions:

 - POST /api/thoughts/:thoughtId/reactions: Create a new reaction to a thought
 - DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction to a thought

 ## Technologies Usage

- Node.js
- Mongo Compass
- npm packages:
    - mongoose: Mongo client for Node.js
- Insomnia 

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## links for video 

video :