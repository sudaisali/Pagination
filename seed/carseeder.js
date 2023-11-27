const mongoose = require('mongoose');
const Car = require('../models/car'); // Assuming you have the Car model defined in a separate file

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CMS');

// Function to generate random data for cars
function generateRandomCar() {
  const makes = ['Toyota', 'Honda', 'Suzuki', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Chevrolet', 'Ford', 'Hyundai'];
  const models = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Truck'];
  const variants = ['Base', 'Premium', 'Limited Edition'];
  const names = ['XV', 'Civic', 'Corolla', 'Accord', 'C-Class', 'Camry', 'Mustang', 'Santro', 'Civic', 'Altima'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

  const randomMake = makes[Math.floor(Math.random() * makes.length)];
  const randomModel = models[Math.floor(Math.random() * models.length)];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomPrice = Math.floor(Math.random() * 5000000) + 1000000; // Random price between 1,000,000 and 5,000,000
  const randomYear = Math.floor(Math.random() * 10) + 2013; // Random year between 2013 and 2022
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  return {
    make: randomMake,
    model: randomModel,
    variant: randomVariant,
    name: randomName,
    price: randomPrice,
    year: randomYear,
    city: randomCity,
  };
}

// Seed data into the database
async function seedData() {
  try {
    // Clear existing data
    await Car.deleteMany({});

    // Create and save 50 random cars
    const cars = [];
    for (let i = 0; i < 100; i++) {
      const randomCar = generateRandomCar();
      const car = new Car(randomCar);
      await car.save();
      cars.push(car);
    }

    console.log('Seed data successfully inserted:', cars);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the seedData function
seedData();
