const db = require('./db');
const { Movie, Person } = db.models;
const { op } = db.sequelize;

(async () => {
    //syncs all tables
    await db.sequelize.sync({ force: true });

    try {
        const movie = await Movie.create({
            title: 'Toy Story',
            runtime: 81,
            releaseDate: '1995-11-22',
            isAvailableOnVHS: true
        });
        console.log(movie.toJSON());
        const movie2 = await Movie.create({
            title: 'The martian',
            runtime: 115,
            releaseDate: '2004-04-14',
            isAvailableOnVHS: true
        });
        console.log(movie2.toJSON());
        const person = await Person.create({
            firstName: 'Tom',
            lastName: 'Hanks'
        });
        console.log(person.toJSON());
        const movieById = await Movie.findByPk(2);
        console.log(movieById.toJSON());
        const movies = await Movie.findAll({
            attributes: ['id', 'title'], // return only id and title
            where: {
                isAvailableOnVHS: true
            }
        });
        console.log(movies.map(movie => movie.toJSON()));
        const somethingtodelete = await Movie.findByPk(2);
        somethingtodelete.destroy();
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors:', errors);
        } else {
            throw error;
        }
    }
})();
