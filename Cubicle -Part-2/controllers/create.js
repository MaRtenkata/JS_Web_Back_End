module.exports = {
    create: (req, res) => {
        res.render('create', {title: 'Create Cube'} );
    },
    post: async (req, res) => {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficultyLevel)
        }
        
        try {
            await req.storage.createCube(cube);
        } catch (error) {
            if(error.name == 'ValidationError'){
                return res.render('create', {title: 'Create Cube', error: "All fields are required"})
            }
        }
      

        res.redirect('/');
    }

}