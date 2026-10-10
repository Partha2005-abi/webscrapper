const mongoose = require('mongoose');

const HeadingSchema = new mongoose.Schema({
  level: { type: String, required: true }, // e.g. 'H1', 'H2', 'H3'
  text: { type: String, required: true }
}, { _id: false });

const LinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, default: 'General' },
  rating: { type: String, default: '4.5 ★' },
  image: { type: String, default: '' }
}, { _id: false });

const ScrapedDataSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Website URL is required'],
    trim: true
  },
  pageTitle: {
    type: String,
    required: [true, 'Page Title is required'],
    trim: true
  },
  scrapedDate: {
    type: Date,
    default: Date.now
  },
  headings: [HeadingSchema],
  links: [LinkSchema],
  products: [ProductSchema],
  isSampleData: {
    type: Boolean,
    default: true
  },
  metaDescription: {
    type: String,
    default: 'Scraped metadata captured during web parsing demonstration.'
  }
}, {
  timestamps: true,
  collection: 'scraped_data' // Explicitly set collection name as per assignment rules
});

module.exports = mongoose.model('ScrapedData', ScrapedDataSchema);
