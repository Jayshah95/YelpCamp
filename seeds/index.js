const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true,useCreateIndex: true,
useUnifiedTopology: true})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
 
const seedDB = async () => {
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          
           author : '6126addb174a2403232cdf91',
           location : `${cities[random1000].city}, ${cities[random1000].state}`,
           title : `${sample(descriptors)} ${sample(places)}`,
           description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam soluta aliquid quod quo ipsa nesciunt consequatur id perferendis sunt quasi. Nostrum quibusdam molestiae minima, at laudantium vitae nemo alias ut?',
           price,
            geometry: {
                type: "Point",
                coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude,            
                ]
            },
           images : [
               {
                url: 'https://res.cloudinary.com/jshah15/image/upload/v1629791806/YelpCamp/lkcqviqxs69yux9kq1m9.png',
                filename: 'YelpCamp/lkcqviqxs69yux9kq1m9'
               },
               {
                url: 'https://res.cloudinary.com/jshah15/image/upload/v1629791807/YelpCamp/ar8pp98afdn0od3dxin5.jpg',
                filename: 'YelpCamp/ar8pp98afdn0od3dxin5'
               }
           ]
       })
       await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
