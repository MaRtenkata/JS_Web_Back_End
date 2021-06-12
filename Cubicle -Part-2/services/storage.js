const Comment = require('../models/Comment');
const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')




let data = {};

async function init() {
  
   return  (req, res, next) => {
       req.storage = {
           getAll,
           getById,
           createCube,
           edit,
           createComment,
           createAccessory,
           getAllAccessories,
           attachSticker
       }
       next();
   };
};

async function getAll(query) {
    const options = {};
    

    if (query.search) {
        options.name =  { $regex: query.search, $options: 'i'}
    }
    if (query.from) {
        options.difficulty = { $gte: Number(query.from) }
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);
    }

    const cubes = Cube.find(options).lean();
    return cubes;
};


async function getById(id) {
    const cube = await Cube.findById(id).populate('comments').populate('acssesories').lean();
    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);
    if (!existing) {
        throw new ReferenceError('No such ID!!!')
    } 

    Object.assign(existing, cube)
    return existing.save()
}


async function createCube(cube) {
    const record = new Cube(cube);
    return record.save();
}

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError('No such ID!!!')
    } 

    const newComment = new Comment(comment)
    await newComment.save()

    cube.comments.push(newComment);
    await cube.save()
}


async function getAllAccessories() {
    return await Accessory.find({}).lean();
}


async function createAccessory(accessory){
    const record = new Accessory(accessory)
    return record.save();
}



async function attachSticker(cubeId, stickerId) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError('No such ID!!!')
    } 
    const sticker = await Accessory.findById(stickerId)
    if (!sticker) {
        throw new ReferenceError('No such ID!!!')
    } 

    cube.accessory.push(sticker);
    return cube.save()
}

module.exports = {
    init,
    getAll,
    getById,
    createCube,
    edit,
    createComment,
    createAccessory,
    getAllAccessories,
    attachSticker
}