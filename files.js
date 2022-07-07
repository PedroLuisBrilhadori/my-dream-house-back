const fs = require('fs').promises;

async function listarArquivosDoDiretorio(diretorio, arquivos) {

    if(!arquivos)
        arquivos = [];

    let listaDeArquivos = await fs.readdir(diretorio);
    for(let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }

    return arquivos;

}


async function places() {
    let places = await listarArquivosDoDiretorio(`${__dirname}/assets/places`); // coloque o caminho do seu diretorio
    let aux = [];
    let index = 0;

    places.forEach((place) => { 
        let noDirname = place.replace(`${__dirname}/assets/places/`, '');
        let nameObj = '';

        for(let i = 0; noDirname[i] !== '/'; i++){
            nameObj += noDirname[i];
        }

        if(!aux.includes(String(nameObj))){
            aux[index] = nameObj;
            index++;
        }
    });

    return aux;
}

async function objects(place, scene = '') {
    let objects = await listarArquivosDoDiretorio(`${__dirname}/assets/objects/${place}/${scene}`);
    let aux = [];
    let index = 0;

    objects.forEach((object) => { 
        let noDirname = object.replace(`${__dirname}/assets/objects/${place}/${scene}/`, '');

        if(noDirname.indexOf('.json') === -1){
            aux[index] = noDirname;
            index++;
        }
    });

    return aux;
}

async function scenes(place) {
    let scenes = await listarArquivosDoDiretorio(`${__dirname}/assets/places/${place}`); // coloque o caminho do seu diretorio
    let aux = [];
    let index = 0;
    

    scenes.forEach((scene) => { 
        let noDirname = scene.replace(`${__dirname}/assets/places/${place}/`, '');

        aux[index] = noDirname.replace('.jpg', '');
        index++;

    });

    return aux;
}

async function allscenes(){
    let scenes = await listarArquivosDoDiretorio(`${__dirname}/assets/places`);
    let aux = [];
    let index = 0;
    

    scenes.forEach((scene) => { 
        let noDirname = String(scene).replace(`${__dirname}`);
        let stringAux = '';

        for(let i = noDirname.indexOf('/') + 1; i < noDirname.length; i++){
            stringAux += noDirname[i];
        }

        noDirname = stringAux;
        
        aux[index] = noDirname;
        index++;

    });

    return aux;
}

async function path(fileName = '') {
    let files = await listarArquivosDoDiretorio(`${__dirname}/assets`); // coloque o caminho do seu diretorio
    let aux = [];
    let index = 0;

    fileName = fileName.replace(/\$/g, '/');

    files.forEach((file) => { 
        let noDirname = file.replace(`${__dirname}`, '');


        if(noDirname.indexOf(fileName) > -1 || fileName === ''){
            aux[index] = noDirname;
            index++;
        }

    });
    return aux;
}



module.exports = {
    places,
    objects,
    scenes,
    path,
    allscenes
}