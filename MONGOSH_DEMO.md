# MongoDB & Docker Shell Demonstration (`mongosh`)

This guide contains the exact steps and commands required for demonstrating the **MongoDB Database & Docker Setup** for your B.Tech Minor Project evaluation.

---

## 1. Pull Official MongoDB Docker Image
```powershell
docker pull mongo:6.0
```

## 2. Create & Run MongoDB Docker Container
```powershell
docker run -d --name webscraper-mongodb -p 27017:27017 -v mongodb_data:/data/db mongo:6.0
```
Verify the container status:
```powershell
docker ps
```

## 3. Connect to Containerized Database using `mongosh`
Execute `mongosh` directly inside the running Docker container:
```powershell
docker exec -it webscraper-mongodb mongosh
```

## 4. Create or Select Database `webscraper`
Inside the `mongosh` shell prompt:
```javascript
use webscraper
```

## 5. Create Collection `scraped_data`
```javascript
db.createCollection("scraped_data")
```

## 6. Insert Sample Website Record into `scraped_data`
```javascript
db.scraped_data.insertOne({
  url: "https://www.flipkart.com",
  pageTitle: "Online Shopping Site for Mobiles, Electronics, Furniture, Fashion & More",
  scrapedDate: new Date(),
  headings: [
    { level: "H1", text: "Flipkart - Big Billion Days Sale" },
    { level: "H2", text: "Mobiles & Accessories Offers" },
    { level: "H3", text: "Home & Furniture Appliances" }
  ],
  links: [
    { label: "Flipkart Plus Rewards", href: "https://www.flipkart.com/plus" },
    { label: "Mobiles Store", href: "https://www.flipkart.com/mobile-phones-store" }
  ],
  products: [
    { name: "Samsung Galaxy A15 5G", price: "₹17,999", category: "Smartphones", rating: "4.4 ★" },
    { name: "boAt Rockerz 255 Pro+", price: "₹1,099", category: "Audio", rating: "4.2 ★" }
  ],
  isSampleData: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 7. Query and Display Inserted Documents
To list all documents formatted nicely:
```javascript
db.scraped_data.find().pretty()
```

To search for a specific record by URL:
```javascript
db.scraped_data.find({ url: "https://www.flipkart.com" })
```

To count total records:
```javascript
db.scraped_data.countDocuments()
```

---

## 📄 Example MongoDB JSON Document Structure

```json
{
  "_id": { "$oid": "66f4ab12e84c90d1f3b89001" },
  "url": "https://www.amazon.in",
  "pageTitle": "Amazon.in: Online Shopping India - Mobiles, Laptops, Fashion & More",
  "scrapedDate": { "$date": "2026-10-10T02:00:00.000Z" },
  "headings": [
    { "level": "H1", "text": "Amazon Great Indian Festival - Unbeatable Deals" },
    { "level": "H2", "text": "Top Trending Smartphones & Electronics" }
  ],
  "links": [
    { "label": "Best Sellers", "href": "https://www.amazon.in/gp/bestsellers" },
    { "label": "Today Deals", "href": "https://www.amazon.in/deals" }
  ],
  "products": [
    {
      "name": "Apple iPhone 15 (128 GB) - Blue",
      "price": "₹71,490",
      "category": "Electronics",
      "rating": "4.7 ★"
    }
  ],
  "isSampleData": true,
  "createdAt": { "$date": "2026-10-10T02:00:00.000Z" },
  "updatedAt": { "$date": "2026-10-10T02:00:00.000Z" }
}
```
