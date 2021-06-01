module.exports = {
    catalog: async (req, res) => {
        const cubes = await  req.storage.getAll(req.query);
        console.log(cubes);
        const ctx = {
            title: 'Cubicle',
            cubes,
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || ''
        };
        res.render('index', ctx);      
    }
}