# URL Shortener Setup Instructions

This is a RESTful URL Shortener service built with **Node.js*, **Express**, **MongoDB**, and a **minimal EJS UI**.

## Features

-Create a short URL from a long URL
 Redirect short URLs to original
 Update an existing short URL
 Delete a short URL
 Get statistics (access count, timestamps)
 frontend built using EJS templates



## Project structure
 url_shortener/
│
├── controllers/
│ ├── urlController.js # API logic
│ └── uiController.js # UI logic
│
├── routes/
│ ├── urlRoutes.js # /shorten API endpoints
│ └── uiRoutes.js # Web frontend routes
│
├── models/
│ └── Url.js # Mongoose schema
│
├── views/
│ └── index.ejs # EJS frontend form
│
├── config/
│ └── db.js # MongoDB connection
│
├── .env # Environment variables
├── .gitignore
├── server.js # Entry point
└── README.md



## 🛠️ Installation & Setup

### Prerequisites

- Node.js & npm 
- express
- MongoDB (local or cloud)

### 1. Clone the Repository

cmd
https://github.com/jawadazad67/jawaad-innovaxel-ahmad.git
cd firstname-innovaxel-lastname
 ## Install Dependencies
npm install
## Setup Environment Variables
Create a .env file:

add in .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/url_shortener_db

##
Make sure your local MongoDB server is running:

mongod
## Start Server
nodemon server.js


## Visit in browser:
👉 http://localhost:5000/





 ## API Endpoints
Method	Endpoint	Description
POST	/shorten/	Create a short URL
GET	/:code	Redirect to original URL
PUT	/shorten/:code	Update URL
DELETE	/shorten/:code	Delete URL
GET	/shorten/:code/stats	Get stats for a short URL

## UI Actions (EJS)
All actions can also be performed from the frontend at
http://localhost:5000/

Forms for:

Create

Update

Delete

Get Stats

Retrieve Original URL