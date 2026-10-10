# MINOR PROJECT REPORT

**TOPIC:** Full-Stack Web Scraper MERN Application  
**DEGREE:** Bachelor of Technology (B.Tech) in Computer Science & Information Technology (CSIT)  
**SEMESTER:** 5th Semester  
**ACADEMIC YEAR:** 2026–2027  
**SUBJECT:** Web Application Projects with React (CSE 3395)  

---

## 1. Abstract
The **Web Scraper MERN Application** is an interactive web engineering project built using MongoDB, Express.js, React.js, and Node.js (MERN stack). The primary objective is to present a clean, intuitive platform where users can input any website URL, view extracted structural metadata (page title, headings hierarchy, hyperlinks, and e-commerce product catalogs), and preserve these records in a MongoDB database. Built with Docker containerization and a sample demonstration architecture, the application ensures high stability, reproducibility, and academic compliance.

---

## 2. Introduction
In modern web development, extracting structured information from websites plays a vital role in competitive analysis, data aggregation, and search engine indexers. This minor project demonstrates how modern full-stack single-page applications (SPAs) communicate via asynchronous RESTful APIs with a non-relational database.

The frontend is built with React.js using Vite for fast bundling, utilizing modular state management and React Router DOM. The backend is powered by Node.js and Express.js, managing database interactions through Mongoose schemas on MongoDB.

---

## 3. Project Objectives
- Develop a responsive, user-friendly frontend interface matching modern UI aesthetics (Blue/White color scheme, dark navy header).
- Implement a RESTful API backend handling URL parsing, data insertion, retrieval, and deletion.
- Configure MongoDB containerization using Docker and Docker Compose.
- Enforce strict input validation for URLs and graceful error handling.
- Maintain persistent history of parsed websites with interactive view and delete capabilities.

---

## 4. Technology Stack
- **Frontend Layer:** React 18, Vite, React Router DOM v6, Lucide React Icons, Axios HTTP Client.
- **Styling:** CSS3 variables, HSL color tokens, Responsive Flexbox & Grid, CSS glassmorphism.
- **Backend Layer:** Node.js, Express.js, REST API Architecture.
- **Database Layer:** MongoDB v6.0 (`webscraper` database, `scraped_data` collection), Mongoose ORM.
- **DevOps & Containerization:** Docker, Docker Compose, `mongosh` CLI shell.

---

## 5. System Architecture
```text
  [ User Browser ]
        │
  (HTTP Requests: Vite Port 5173)
        │
        ▼
  [ React SPA Frontend ]  <──(Axios REST API Calls)──>  [ Express API Server ] (Port 5000)
                                                                 │
                                                       (Mongoose ORM Connection)
                                                                 │
                                                                 ▼
                                                       [ MongoDB Container ] (Port 27017)
                                                        Database: webscraper
                                                        Collection: scraped_data
```

---

## 6. Module Descriptions

### Module 1: Common Navigation Header (`Navbar.jsx`)
Features a dark navy gradient design (`#0B192C` to `#1E3A8A`), logo branding, and active-tab indicator routing to Home, History, and About pages.

### Module 2: Scraper Homepage (`HomePage.jsx`)
Provides the main user interaction panel with website URL input field, quick preset sample chips (`example.com`, `amazon.in`, `flipkart.com`, `wikipedia.org`), loading indicator, and validation error messages.

### Module 3: Scraped Results Details (`ResultsPage.jsx`)
Displays extracted website metadata organized into tabbed sections:
- **Headings Tab:** Visual breakdown of H1, H2, and H3 tags.
- **Links Tab:** List of hyperlinked anchor tags.
- **Products Tab:** E-commerce product catalog with prices and ratings.

### Module 4: History Management (`HistoryPage.jsx`)
Presents a responsive data table featuring serial numbers, URL links, page titles, formatted timestamps, and action buttons (`View` and `Delete` with pop-up modal confirmation).

---

## 7. Database Design
- **Database Name:** `webscraper`
- **Collection Name:** `scraped_data`

### Data Dictionary (`ScrapedData` Schema)
| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Auto | Primary Document Key |
| `url` | String | Yes | Original or sanitized HTTP/HTTPS website URL |
| `pageTitle` | String | Yes | Captured title tag of the web page |
| `scrapedDate` | Date | Yes | Timestamp when record was saved |
| `headings` | Array | No | Array of `{ level: "H1", text: "..." }` |
| `links` | Array | No | Array of `{ label: "...", href: "..." }` |
| `products` | Array | No | Array of `{ name, price, category, rating }` |
| `isSampleData`| Boolean| Default true| Label indicating demonstration mode |

---

## 8. Implementation Details
The project follows a clean separation of concerns:
1. `server/server.js`: Sets up Express middleware, CORS handling, and DB invocation.
2. `server/config/db.js`: Initializes Mongoose connection to `mongodb://127.0.0.1:27017/webscraper`.
3. `client/src/services/api.js`: Wraps Axios API calls for seamless async/await communication.

---

## 9. Testing & Verification

| Test Case ID | Test Scenario | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| TC-01 | Homepage URL Empty Submit | Display error: "Please enter a website URL." | PASSED |
| TC-02 | Invalid URL String | Display error: "Please enter a valid HTTP or HTTPS URL." | PASSED |
| TC-03 | Valid URL Submit (`amazon.in`)| Returns sample data & redirects to Results view | PASSED |
| TC-04 | Database Insert | Document saved to MongoDB `webscraper.scraped_data` | PASSED |
| TC-05 | History Page Load | Renders all saved database records in table | PASSED |
| TC-06 | Delete Record Confirmation | Record removed from MongoDB on modal confirm | PASSED |

---

## 10. Screenshots
*(Attach screenshots of Homepage, Results Page, History Page, and `mongosh` terminal during report submission).*

---

## 11. Conclusion
The **Web Scraper MERN Application** successfully fulfills all project requirements for the 5th Semester B.Tech CSIT minor project. The system demonstrates robust REST API integration, state management in React, Docker containerization, and MongoDB data persistence.

---

## 12. Future Scope
- **Live Scraping Engine:** Integrate Puppeteer / Cheerio on the backend for live real-time HTML parsing.
- **Export Formats:** Add CSV / JSON download capabilities for scraped datasets.
- **Authentication:** Implement JWT-based user login to isolate user-specific scraping history.
