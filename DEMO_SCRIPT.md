# 5-8 Minute Faculty Demonstration Script

**Project Title:** Web Scraper MERN Application  
**Subject:** Web Application Projects with React (CSE 3395)  
**Target Audience:** Project Guide / External Examiner / Faculty Evaluators  

---

## ⏱️ Timeline & Presentation Flow

### 0:00 - 1:00 Minute: Introduction & Project Scope
- **Action:** Open the application in the browser at `http://localhost:5173`.
- **Script:**
  > "Good morning/afternoon Respected Faculty. Today I am presenting my 5th Semester Minor Project titled **Web Scraper MERN Application** built for Web Application Projects with React.
  >
  > The objective of this application is to demonstrate a full-stack MERN architecture where a user can enter a website URL, view extracted structured web page data (such as page title, headings hierarchy, hyperlinks, and e-commerce product catalogs), and store these records persistently in a MongoDB database."

---

### 1:00 - 2:30 Minute: Homepage Demonstration & URL Parsing
- **Action:** Point out the dark navy navigation bar, application heading, and URL input field on `HomePage.jsx`.
- **Script:**
  > "As required by the assignment guidelines, the user interface features a clean blue-and-white theme with a dark navy navigation header.
  >
  > First, let us test input validation. If I submit an empty input or an invalid string like `not_a_url`, the system immediately displays a user-friendly error alert.
  >
  > Now, I will click one of our quick sample preset chips, for instance `https://www.amazon.in`. Upon clicking **Scrape Website**, a loading spinner triggers while our Express backend processes the request."

---

### 2:30 - 4:00 Minute: Results Page Details & Tabbed Navigation
- **Action:** Show the auto-redirection to `ResultsPage.jsx`. Click between **Headings**, **Links**, and **Products** tabs.
- **Script:**
  > "Once processed, we are automatically navigated to the **Scraped Website Details** page.
  >
  > In the main header card, we see the extracted URL, full Page Title, and the exact timestamp of recording.
  >
  > Below, we have organized tabs:
  > 1. Under **Headings**, we see structured H1, H2, and H3 tags.
  > 2. Under **Links**, we find extracted hyperlink references.
  > 3. Under **Products**, because Amazon is an e-commerce platform, our demonstration mode displays sample product records including names, prices, categories, and customer ratings."

---

### 4:00 - 5:30 Minute: Scraping History & MongoDB Persistence
- **Action:** Click **Back to Home** or navigate to **History** via the navigation bar.
- **Script:**
  > "Now let us navigate to the **History** page.
  >
  > Here, all previously scraped records are retrieved dynamically from our MongoDB database (`webscraper` database, `scraped_data` collection).
  >
  > The table displays serial numbers, website URLs, page titles, formatted date/time stamps, and interactive action buttons.
  >
  > If I click **View** on any row, it re-opens the exact details page. If I click **Delete**, a modal confirmation dialog pops up asking for confirmation before deleting the document from MongoDB."

---

### 5:30 - 7:00 Minute: Docker Container & `mongosh` Database Demonstration
- **Action:** Open terminal window showing Docker / `mongosh`.
- **Script:**
  > "To verify database persistence and Docker orchestration, let us open the terminal.
  >
  > Our database container runs via Docker Compose on port `27017`. By running `docker exec -it webscraper-mongodb mongosh`, we connect directly to the database shell.
  >
  > When I run `use webscraper` followed by `db.scraped_data.find().pretty()`, you can clearly inspect the JSON documents stored in our MongoDB collection."

---

### 7:00 - 8:00 Minute: Conclusion & Viva Opening
- **Script:**
  > "In summary, this project satisfies all mandatory assignment constraints: React single-page frontend, Express REST API, MongoDB storage, Docker containerization, and clean user experience.
  >
  > Thank you. I am now ready for Viva Voce questions."
