const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3001;

mongoose.connect(`mongodb+srv://samanthasjohn22:Sam2002@cluster0.osd469u.mongodb.net/CarShowroom?retryWrites=true&w=majority`).then(() => {
  console.log('Database connected');
}, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  image: String, // Add an image field to store the URL or path
});

// Pre-save hook to encode the image URL before saving it to the database
carSchema.pre('save', function (next) {
  this.image = encodeURIComponent(this.image);
  next();
});

const Car = mongoose.model('Car', carSchema, 'SearchResults');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm || (isNaN(searchTerm) && typeof searchTerm !== 'string')) {
    return res.status(400).json({
      error: 'Invalid search term'
    });
  }

  try {
    const results = await Car.find({
      $or: [{
          brand: {
            $regex: searchTerm,
            $options: 'i'
          }
        },
        {
          model: {
            $regex: searchTerm,
            $options: 'i'
          }
        },
        {
          year: !isNaN(searchTerm) ? parseInt(searchTerm) : undefined
        }, // Parse the searchTerm as an integer
      ],
    });

    console.log('Results from SearchResults collection:', results);

    res.json(results);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
