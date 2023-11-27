const Car = require('../models/car');

const getCars = async (req, res) => {
    try {

        //Extract parametes from query
        const { name, variant, city,page = 1, pageSize = 5} = req.query;

        const query = {};
        if (name ) {
            query.name = name;
        }
        if(variant){
            query.variant = variant
        }
        if(city){
            query.city = city
        }

        const totalCars = await Car.countDocuments(query);

        const totalPages = Math.ceil(totalCars / pageSize);
        const currentPage = parseInt(page);

        const cars = await Car.find(query)
            .limit(pageSize)
            .skip((currentPage - 1) * pageSize);

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No cars found' });
        }

        const paginationData = {
            totalCars,
            totalPages,
            currentPage,
            pageSize,
        };

        res.status(200).json({ cars, pagination: paginationData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCars;
