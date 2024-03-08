
# Bill Buzz API

## Overview

The Bill Buzz is designed to help people manage and track invoices and payments efficiently. 

## Features

- **User Authentication:** Secure login and registration process.
- **Invoice Management:** Create, view, update, and delete invoices. 
- **Automated Reminders:** Automatically send reminders for overdue payments. //TODO
- **Immediate Payment Options:** Invoices contain a link for immediate payment by clients. //TODO

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/bill-buzz-api.git
cd bill-buzz-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the project root and define the following variables:

```env
MONGO_URI=mongodb+srv://<your_mongodb_uri>
TOKEN_SECRET=<your_jwt_secret>
```

4. **Start the server:**

```bash
npm start
```

The server will start running on `http://localhost:3000`.

## Usage

### Register a New User

- **Endpoint:** `/users/register`
- **Method:** POST
- **Body:**

```json
{
  "username": "yourUsername",
  "email": "yourEmail@example.com",
  "password": "yourPassword"
}
```

### Login

- **Endpoint:** `/users/login`
- **Method:** POST
- **Body:**

```json
{
  "email": "youremail@example.com",
  "password": "yourPassword"
}
```

### Create an Invoice

- **Endpoint:** `/invoices`
- **Method:** POST
- **Headers:** Authorization: Bearer `<your_token>`
- **Body:**

```json
{
  "clientName": "Client Name",
  "amount": 100,
  "dueDate": "2023-12-31",
  "status": "pending"
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or suggestions.

## License

Distributed under the MIT License. See `LICENSE` for more information.
