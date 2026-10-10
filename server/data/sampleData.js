/**
 * Sample / Demonstration Data Repository
 * Assignment constraint: Actual web scraping is not required.
 * This repository provides realistic static sample datasets for popular demonstration domains,
 * plus a dynamic structured fallback generator for any custom URL.
 */

const PRESET_SAMPLE_DATA = {
  'example.com': {
    pageTitle: 'Example Domain - Official Demonstration Page',
    headings: [
      { level: 'H1', text: 'Example Domain' },
      { level: 'H2', text: 'Illustrative Purpose Document' },
      { level: 'H3', text: 'Further Information & Standards' }
    ],
    links: [
      { label: 'More Information...', href: 'https://www.iana.org/domains/example' },
      { label: 'RFC Standards Repository', href: 'https://www.rfc-editor.org' },
      { label: 'Domain Name Registry', href: 'https://www.icann.org' }
    ],
    products: []
  },
  'amazon.in': {
    pageTitle: 'Amazon.in: Online Shopping India - Mobiles, Laptops, Fashion & More',
    headings: [
      { level: 'H1', text: 'Amazon Great Indian Festival - Unbeatable Deals' },
      { level: 'H2', text: 'Top Trending Smartphones & Electronics' },
      { level: 'H2', text: 'Best Sellers in Home Appliances' },
      { level: 'H3', text: 'Prime Customer Benefits & Fast Delivery' }
    ],
    links: [
      { label: 'Best Sellers', href: 'https://www.amazon.in/gp/bestsellers' },
      { label: 'Today Deals', href: 'https://www.amazon.in/deals' },
      { label: 'Customer Service', href: 'https://www.amazon.in/gp/help/customer/display.html' },
      { label: 'Electronics Category', href: 'https://www.amazon.in/electronics' }
    ],
    products: [
      { name: 'Apple iPhone 15 (128 GB) - Blue', price: '₹71,490', category: 'Electronics', rating: '4.7 ★' },
      { name: 'Samsung Galaxy M34 5G (8GB RAM)', price: '₹16,499', category: 'Electronics', rating: '4.3 ★' },
      { name: 'boAt Airdopes 141 TWS Earbuds', price: '₹1,299', category: 'Audio', rating: '4.1 ★' },
      { name: 'Sony WH-1000XM5 Wireless Headphones', price: '₹26,990', category: 'Audio', rating: '4.8 ★' }
    ]
  },
  'flipkart.com': {
    pageTitle: 'Online Shopping Site for Mobiles, Electronics, Furniture, Fashion & More',
    headings: [
      { level: 'H1', text: 'Flipkart - Big Billion Days Sale' },
      { level: 'H2', text: 'Mobiles & Accessories Offers' },
      { level: 'H2', text: 'Fashion & Clothing Catalog' },
      { level: 'H3', text: 'Home & Furniture Appliances' }
    ],
    links: [
      { label: 'Flipkart Plus Rewards', href: 'https://www.flipkart.com/plus' },
      { label: 'Mobiles Category', href: 'https://www.flipkart.com/mobile-phones-store' },
      { label: 'SuperCoins Balance', href: 'https://www.flipkart.com/supercoin' },
      { label: '24x7 Help Centre', href: 'https://www.flipkart.com/helpcentre' }
    ],
    products: [
      { name: 'Samsung Galaxy A15 5G (Light Blue)', price: '₹17,999', category: 'Smartphones', rating: '4.4 ★' },
      { name: 'boAt Rockerz 255 Pro+ Neckband', price: '₹1,099', category: 'Audio', rating: '4.2 ★' },
      { name: 'HRX Solid Men Round Neck T-Shirt', price: '₹499', category: 'Fashion', rating: '4.0 ★' },
      { name: 'HP 15s Intel Core i5 12th Gen Laptop', price: '₹52,990', category: 'Computers', rating: '4.5 ★' }
    ]
  },
  'wikipedia.org': {
    pageTitle: 'Wikipedia, the free encyclopedia - Knowledge for Everyone',
    headings: [
      { level: 'H1', text: 'Welcome to Wikipedia' },
      { level: 'H2', text: 'From Today Featured Article: Web Scraping Technologies' },
      { level: 'H2', text: 'Did You Know...' },
      { level: 'H3', text: 'In The News & Current Events' }
    ],
    links: [
      { label: 'Main Page', href: 'https://en.wikipedia.org/wiki/Main_Page' },
      { label: 'Community Portal', href: 'https://en.wikipedia.org/wiki/Wikipedia:Community_portal' },
      { label: 'Recent Changes', href: 'https://en.wikipedia.org/wiki/Special:RecentChanges' },
      { label: 'Donate to Wikimedia', href: 'https://donate.wikimedia.org' }
    ],
    products: []
  },
  'restaurant.com': {
    pageTitle: 'The Spice House - Fine Dining & Gourmet Restaurant',
    headings: [
      { level: 'H1', text: 'Welcome to The Spice House' },
      { level: 'H2', text: 'Chef Signature Tasting Menu' },
      { level: 'H2', text: 'Online Food Ordering & Reservations' },
      { level: 'H3', text: 'Customer Reviews & Hygiene Rating' }
    ],
    links: [
      { label: 'View Dining Menu', href: 'https://www.restaurant.com/menu' },
      { label: 'Book a Table', href: 'https://www.restaurant.com/reservations' },
      { label: 'Special Offers', href: 'https://www.restaurant.com/offers' }
    ],
    products: [
      { name: 'Butter Chicken Special Curry', price: '₹380', category: 'Main Course', rating: '4.9 ★' },
      { name: 'Paneer Tikka Lababdar', price: '₹320', category: 'Vegetarian', rating: '4.7 ★' },
      { name: 'Garlic Butter Naan Basket', price: '₹90', category: 'Breads', rating: '4.8 ★' },
      { name: 'Classic Chocolate Lava Cake', price: '₹180', category: 'Dessert', rating: '4.9 ★' }
    ]
  }
};

/**
 * Generates sample data based on requested URL.
 */
function getSampleDataForUrl(rawUrl) {
  let hostname = '';
  try {
    const formattedUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
    const parsed = new URL(formattedUrl);
    hostname = parsed.hostname.replace('www.', '').toLowerCase();
  } catch (e) {
    hostname = rawUrl.toLowerCase();
  }

  // Check preset match
  for (const domainKey in PRESET_SAMPLE_DATA) {
    if (hostname.includes(domainKey) || domainKey.includes(hostname)) {
      return {
        url: rawUrl,
        ...PRESET_SAMPLE_DATA[domainKey]
      };
    }
  }

  // Dynamic structured fallback for any other URL
  const domainTitle = hostname.charAt(0).toUpperCase() + hostname.slice(1);
  return {
    url: rawUrl,
    pageTitle: `${domainTitle} - Official Website Landing Page`,
    headings: [
      { level: 'H1', text: `Welcome to ${domainTitle}` },
      { level: 'H2', text: 'Key Products, Features & Services' },
      { level: 'H2', text: 'About Our Company & Mission' },
      { level: 'H3', text: 'Contact & Customer Support' }
    ],
    links: [
      { label: 'About Us', href: `https://${hostname}/about` },
      { label: 'Services & Solutions', href: `https://${hostname}/services` },
      { label: 'Contact Support', href: `https://${hostname}/contact` },
      { label: 'Privacy Policy', href: `https://${hostname}/privacy` }
    ],
    products: [
      { name: `${domainTitle} Premium Subscription`, price: '₹1,999/yr', category: 'Digital Service', rating: '4.6 ★' },
      { name: `${domainTitle} Developer API Pass`, price: '₹4,999', category: 'Enterprise API', rating: '4.8 ★' }
    ]
  };
}

module.exports = {
  PRESET_SAMPLE_DATA,
  getSampleDataForUrl
};
