module.exports = {
    details: async (req, res) => {
        
        const cubeDetails = await req.storage.getById(req.params.id);
     
        if (cubeDetails == undefined) {
            res.redirect('/404');
        }else{
            const ctx = {
                title: 'Details Page',
                cubeDetails
            }
            res.render('details', ctx);
        }
    },
    attach: async (req, res) =>{
        const cubeDetails = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories();
       

        res.render('attach', {
            title: 'Attach Stickers',
            cubeDetails,
            accessories
        });
    },
    attachPost: async (req, res) =>{

        const cubeId = req.params.cubeId;
        const stickerId =req.body.accessory

        await req.storage.attachSticker(cubeId, stickerId);

        res.redirect(`/details/${req.params.cubeId}`)
    }

} 