const fs = require('fs/promises');
const uniqid = require('uniqid');


let data = {};

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json')); 
    } catch (error) {
        console.error("Error");
    }
   return  (req, res, next) => {
       req.storage = {
           getAll,
           getById,
           createCube
       }
       next();
   };
};

async function getAll(query) {
    const cubes = Object
    .entries(data)
    .map(([id,v]) => Object.assign({}, { id }, v));

    if(query.search){
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if(query.from){
        cubes = cubes.filter(c => c.difficulty >= Number(query.from));
    }
    if (query.to) {
        cubes = cubes.filter(c => c.difficulty <= Number(query.to));
    }

    return cubes;
};


   

async function getById(id) {
    return data[id]
}


async function createCube(cube) {
    const id = uniqid();
    data[id] = cube;
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2))
    } catch (error) {
        console.error("Error database");
    }
   
}

module.exports = {
    init,
    getAll,
    getById,
    createCube
}