# Web Scraper MERN Application — Minor Project

**Course:** B.Tech CSIT — 5th Semester (Academic Year 2026–2027)  
**Subject:** Web Application Projects with React (CSE 3395)  
**Stack:** React.js (Vite), Express.js, Node.js, MongoDB (`webscraper`), Docker & Docker Compose

---

## 📌 Project Overview

The **Web Scraper MERN Application** is a full-stack web application designed for analyzing and inspecting web page structures. Users can input any website URL, view extracted information (page titles, date/time timestamps, headings H1–H3, hyperlinks, and sample e-commerce products), and store records in a MongoDB database.

Per academic assignment guidelines, actual live website scraping is safely simulated using a realistic **Sample Data Demonstration Mode** without relying on flaky third-party scraping libraries.

---

## 📁 Repository Structure

```text
web-scraper-mern/
├── client/                     # React 18 + Vite Frontend App
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ConfirmModal
│   │   ├── pages/              # HomePage, ResultsPage, HistoryPage, AboutPage
│   │   ├── services/           # Axios API Client
│   │   ├── App.jsx             # Router Setup
│   │   ├── main.jsx            # Entry Point
│   │   └── index.css           # Blue/White Design System
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                     # Express.js REST API Server
│   ├── config/                 # db.js (Mongoose Connection)
│   ├── controllers/            # scrapeController.js
│   ├── models/                 # ScrapedData.js (webscraper.scraped_data)
│   ├── routes/                 # scrapeRoutes.js
│   ├── data/                   # sampleData.js (Mock Payloads)
│   ├── server.js               # Entry Point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml          # Docker Container Orchestration
├── .env.example                # Environment variables template
├── README.md                   # Setup & Execution Documentation
├── MONGOSH_DEMO.md             # MongoDB Docker & mongosh Command Guide
├── PROJECT_REPORT.md           # Minor Project Academic Report
├── DEMO_SCRIPT.md              # 5-8 Minute Presentation Script
└── VIVA_QUESTIONS.md           # Viva Voce Questions & Answers
```

---

## 🛠️ Prerequisites & Installation (Windows)

1. **Node.js**: Install Node.js (v18 or higher) from [nodejs.org](https://nodejs.org).
2. **Docker Desktop** (Optional for DB): Download and install Docker Desktop from [docker.com](https://www.docker.com).
3. **MongoDB Shell (`mongosh`)** (Optional): Download from MongoDB Download Center.

---

## 🚀 Step-by-Step Running Guide

### Step 1: Start MongoDB Database via Docker Compose
Open PowerShell in the project root directory:
```powershell
docker-compose up -d mongodb
```
*Note: If Docker is not available, local MongoDB installed on port 27017 will be automatically detected.*

### Step 2: Start the Express Backend Server
Open a terminal window:
```powershell
cd server
npm install
npm run dev
```
Backend API will start at: `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`).

### Step 3: Start the React Frontend Application
Open a second terminal window:
```powershell
cd client
npm install
npm run dev
```
Frontend will launch at: `http://localhost:5173`.

---

## 🌐 REST API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status & MongoDB connection check |
| `POST` | `/api/scrape` | Accept `{ url }`, return parsed record & save to MongoDB |
| `GET` | `/api/history` | Retrieve all saved history records from `webscraper.scraped_data` |
| `GET` | `/api/history/:id` | Fetch details of a single record by ObjectId |
| `DELETE`| `/api/history/:id` | Delete a scraped record from MongoDB |

---

## 📊 Database Specification
- **Database Name:** `webscraper`
- **Collection Name:** `scraped_data`
- **Schema Fields:** `url`, `pageTitle`, `scrapedDate`, `headings` `[{ level, text }]`, `links` `[{ label, href }]`, `products` `[{ name, price, category, rating }]`.

Refer to [MONGOSH_DEMO.md](file:///c:/Users/PC/OneDrive/Desktop/Proj/MONGOSH_DEMO.md) for full `mongosh` interactive terminal commands.
