# url-shortener

A simple web application to shorten URLs, track link statistics, and manage links—built with Node.js, Express, MongoDB, and plain CSS.

## Features

Shorten any valid URL to a short link
Track the number of clicks on each short link
List and manage shortened URLs

## Prerequisites

Node.js installed
npm installed
A MongoDB Atlas account and cluster

## Setup Instructions

Install dependencies

bash
npm install

bash
node index.js

## Usage

Enter a valid URL in the input field.
Click the "Shorten" button.
The shortened URL and list of all URLs will appear below.
Click on any short URL to visit the original link and increment its click statistics.

## Project Structure

text
/url-shortener
  ├── index.js          # Backend server (Node.js + Express)
  ├── index.html        # Frontend (HTML + JS + plain CSS)
  ├── package.json      # npm dependencies
  └── ...               # Other files
## Tech Stack

Node.js
Express.js
MongoDB Atlas (Mongoose)
Shortid (for unique short URLs)
HTML5, CSS3, plain JavaScript

## Troubleshooting

Ensure your backend is running (node index.js) and "MongoDB connected" appears in the terminal.
Check your MongoDB connection string and credentials.
Open browser dev tools for errors in Console and Network tabs.
If CORS errors occur, verify you have app.use(cors()) in your server code.
