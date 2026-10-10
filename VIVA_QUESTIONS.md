# Viva Voce Questions & Answers — Web Scraper MERN Application

**Subject:** Web Application Projects with React (CSE 3395)  
**Target:** 5th Semester B.Tech CSIT Minor Project Evaluation  

---

## 🔵 React.js & Vite Questions

### Q1: What is Vite and why was it chosen over Create React App (CRA)?
**Answer:** Vite is a next-generation frontend build tool. Unlike CRA which bundles the entire application using Webpack before serving, Vite serves source code over native ES Modules (ESM) during development. This provides near-instantaneous server startup and ultra-fast Hot Module Replacement (HMR).

### Q2: What is the purpose of React Router DOM v6 in this project?
**Answer:** React Router DOM provides client-side routing for Single Page Applications (SPAs). It allows navigation between pages (`HomePage`, `ResultsPage`, `HistoryPage`, `AboutPage`) without triggering a full browser page refresh, maintaining state across route transitions.

### Q3: How do `useState` and `useEffect` work in your application?
**Answer:**
- `useState` manages local component state (e.g., current URL input string, loading indicators, history arrays).
- `useEffect` handles side-effects, such as fetching backend health status or loading saved scraping history from MongoDB when a component mounts.

### Q4: How is state passed between `HomePage` and `ResultsPage`?
**Answer:** State is transferred using React Router's `navigate('/results', { state: { resultData } })` hook as well as a top-level lifted state in `App.jsx`.

---

## 🟢 Node.js & Express.js Questions

### Q5: What is Express.js and what role does it play in the MERN stack?
**Answer:** Express.js is a minimal and flexible Node.js web application framework. It acts as the backend server handling HTTP REST API requests (`GET`, `POST`, `DELETE`), executing business logic, interacting with MongoDB, and sending JSON responses to the React frontend.

### Q6: What is middleware in Express.js? Which middlewares did you use?
**Answer:** Middleware functions execute during the request-response cycle. Key middlewares used:
- `cors()`: Enables Cross-Origin Resource Sharing so React (port 5173) can query Express (port 5000).
- `express.json()`: Parses incoming HTTP request bodies containing JSON data.
- Custom logging middleware: Logs HTTP request method and timestamp to the terminal.

### Q7: Why are environment variables used (`dotenv`)?
**Answer:** Environment variables separate application configuration (like database connection strings and port numbers) from application code. This prevents hardcoding credentials and allows different configurations between development and production.

---

## 🍃 MongoDB & Mongoose Questions

### Q8: What is MongoDB and what type of database is it?
**Answer:** MongoDB is a document-oriented NoSQL database. It stores data in flexible, JSON-like BSON (Binary JSON) documents rather than rigid tables with rows and columns.

### Q9: What database and collection names are used in this project?
**Answer:**
- **Database:** `webscraper`
- **Collection:** `scraped_data`

### Q10: What is Mongoose and why is it used?
**Answer:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It defines strongly typed schemas (`ScrapedData.js`) for collection documents, enforces validation rules, and provides query helpers (`find()`, `save()`, `findByIdAndDelete()`).

### Q11: Explain the structure of your `ScrapedData` schema.
**Answer:** The schema includes:
- `url`: String (required)
- `pageTitle`: String (required)
- `scrapedDate`: Date (default `Date.now`)
- `headings`: Array of sub-documents `{ level: String, text: String }`
- `links`: Array of sub-documents `{ label: String, href: String }`
- `products`: Array of sub-documents `{ name: String, price: String, category: String, rating: String }`

---

## 🐳 Docker & DevOps Questions

### Q12: What is Docker and what problem does it solve?
**Answer:** Docker is a containerization platform that packages applications and their dependencies into lightweight, isolated containers. It eliminates the "works on my machine" problem by ensuring consistent execution across any operating system.

### Q13: What is the difference between Dockerfile and `docker-compose.yml`?
**Answer:**
- A `Dockerfile` defines instructions for building a single container image (e.g., Node.js backend).
- `docker-compose.yml` orchestrates multiple containerized services simultaneously (e.g., MongoDB database container + Express backend service + persistent volume mounts).

### Q14: How do you access MongoDB inside Docker using `mongosh`?
**Answer:** By running `docker exec -it webscraper-mongodb mongosh` in PowerShell or Command Prompt, followed by `use webscraper` and `db.scraped_data.find().pretty()`.

---

## 📡 REST API & Network Questions

### Q15: What is a REST API?
**Answer:** Representational State Transfer (REST) is an architectural style for designing networked applications. It uses standard HTTP methods (`GET` for reading, `POST` for creating, `DELETE` for removing) to manipulate resources identified by URIs.

### Q16: What HTTP status codes are returned by your backend?
**Answer:**
- `200 OK`: Successful retrieval or deletion.
- `201 Created`: Successful creation of a new scraped website record.
- `400 Bad Request`: Invalid or missing URL input.
- `404 Not Found`: Requested record ID does not exist.
- `500 Internal Server Error`: Server exception.

### Q17: Why did you implement Sample Data Demonstration Mode?
**Answer:** Per project guidelines, live web scraping overhead (like headless browsers or Cheerio DOM parsers) can fail due to anti-bot mechanisms, IP blocks, or network instability. Sample Data Mode guarantees 100% deterministic, reliable presentation results while demonstrating full database CRUD capabilities.
