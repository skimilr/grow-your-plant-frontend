# grow-your-plant-frontend

Welcome to the Plant Growth Game! This is a fun, interactive application where users can grow and take care of their virtual plants. It is built with a Go backend and a Vue.js frontend, using TypeScript for enhanced development.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- Users can create and manage their plant profiles.
- Water and feed plants to help them grow.
- Plants will wither if neglected.
- User authentication is handled through the existing CRUD application.

## Getting Started

To get the project up and running on your local machine for development and testing purposes, follow these instructions.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)
- [Go](https://golang.org/dl/) (v1.16 or later)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or later)

# Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/plant-growth-game.git
   cd plant-growth-game

# API Endpoints

- **GET** `/api/plants`: Retrieve the list of plants for a user.
- **POST** `/api/plants`: Create a new plant for a user.
- **PATCH** `/api/plants/:id/water`: Water a specific plant.
- **PATCH** `/api/plants/:id/feed`: Feed a specific plant.

# Contributing

We welcome contributions! If you’d like to help out, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

