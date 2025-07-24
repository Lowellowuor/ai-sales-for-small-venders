const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const successStoriesRoutes = require('./routes/successStoriesRoutes');
app.use('/api/success-stories', successStoriesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// data/successStoriesData.js
module.exports = {
  stories: [
    {
      id: 1,
      type: 'story',
      name: 'Grace Wanjiku',
      role: 'Fashion Retailer',
      location: 'Nairobi, Kenya',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      beforeRevenue: 'KES 25,000',
      afterRevenue: 'KES 110,000',
      increase: '340%',
      testimonial: 'PitchPoa AI transformed how I present my fashion pieces. Now customers immediately understand the value and craftsmanship. My closing rate went from 20% to 75%!',
      story: 'Grace struggled to communicate the unique value of her handmade fashion pieces. After 3 months with PitchPoa AI, she developed compelling storytelling techniques that highlight the cultural significance and quality of her work.',
      rating: 5,
      featured: true,
    },
    // ... other stories
  ],
  caseStudies: [
    {
      id: 1,
      title: 'Maasai Market Collective',
      participants: '200 Artisan Vendors',
      location: 'Nairobi, Kenya',
      timeline: '6 months',
      revenue: 'KES 24M increase',
      growth: '450%',
      challenge: 'Artisans struggled to communicate the cultural significance and quality of their handmade items to tourists and locals.',
      solution: 'Group training sessions focused on storytelling, cultural context, and value positioning using PitchPoa AI\'s multilingual capabilities.',
      results: [
        'Average vendor revenue increased 450%',
        'Tourist satisfaction scores improved 85%',
        'Repeat customer rate increased to 67%',
        'Collective bargaining power strengthened'
      ]
    },
    // ... other case studies
  ]
};
// controllers/successStoriesController.js
const { stories, caseStudies } = require('../data/successStoriesData');

// Get all success stories
exports.getAllStories = (req, res) => {
  try {
    res.json({
      success: true,
      data: stories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch success stories'
    });
  }
};

// Get featured stories
exports.getFeaturedStories = (req, res) => {
  try {
    const featured = stories.filter(story => story.featured);
    res.json({
      success: true,
      data: featured
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured stories'
    });
  }
};

// Get regular stories
exports.getRegularStories = (req, res) => {
  try {
    const regular = stories.filter(story => !story.featured);
    res.json({
      success: true,
      data: regular
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regular stories'
    });
  }
};

// Get all case studies
exports.getCaseStudies = (req, res) => {
  try {
    res.json({
      success: true,
      data: caseStudies
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch case studies'
    });
  }
};

// Get single story by ID
exports.getStoryById = (req, res) => {
  try {
    const story = stories.find(s => s.id === parseInt(req.params.id));
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    res.json({
      success: true,
      data: story
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch story'
    });
  }
};

// Get single case study by ID
exports.getCaseStudyById = (req, res) => {
  try {
    const caseStudy = caseStudies.find(c => c.id === parseInt(req.params.id));
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found'
      });
    }
    res.json({
      success: true,
      data: caseStudy
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch case study'
    });
  }
};
// routes/successStoriesRoutes.js
const express = require('express');
const router = express.Router();
const successStoriesController = require('../controllers/successStoriesController');

// Get all stories
router.get('/stories', successStoriesController.getAllStories);

// Get featured stories
router.get('/stories/featured', successStoriesController.getFeaturedStories);

// Get regular stories
router.get('/stories/regular', successStoriesController.getRegularStories);

// Get single story
router.get('/stories/:id', successStoriesController.getStoryById);

// Get all case studies
router.get('/case-studies', successStoriesController.getCaseStudies);

// Get single case study
router.get('/case-studies/:id', successStoriesController.getCaseStudyById);

module.exports = router;
{
  "success"; true,
  "data"; [
    {
      "id": 1,
      "type": "story",
      "name": "Grace Wanjiku",
      "role": "Fashion Retailer",
      "location": "Nairobi, Kenya",
      "avatar": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      "beforeRevenue": "KES 25,000",
      "afterRevenue": "KES 110,000",
      "increase": "340%",
      "testimonial": "PitchPoa AI transformed how I present my fashion pieces...",
      "story": "Grace struggled to communicate the unique value...",
      "rating": 5,
      "featured": true
    }
  ]
}
{
  "success"; true,
  "data"; [
    {
      "id": 1,
      "title": "Maasai Market Collective",
      "participants": "200 Artisan Vendors",
      "location": "Nairobi, Kenya",
      "timeline": "6 months",
      "revenue": "KES 24M increase",
      "growth": "450%",
      "challenge": "Artisans struggled to communicate...",
      "solution": "Group training sessions focused on storytelling...",
      "results": [
        "Average vendor revenue increased 450%",
        "Tourist satisfaction scores improved 85%"
      ]
    }
  ]
}