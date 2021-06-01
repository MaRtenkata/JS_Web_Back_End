module.exports = {
    details: async (req, res) => {
        
        const cubeDetails = await req.storage.getById(req.params.id);
        console.log(req.params.id);

        if (cubeDetails == undefined) {
            res.redirect('/404');
        }else{
            const ctx = {
                title: 'Details Page',
                cubeDetails
            }
            res.render('details', ctx);
        }

       
    }

} 