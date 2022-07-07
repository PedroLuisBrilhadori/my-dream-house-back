const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors')


const list = require('./files');

app.use('/assets',express.static(`${__dirname}/assets`));
app.use(cors())

app.get('/:place/:scene?/objects', (req, res) => {
    if(!req.params.place) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (list.objects(req.params.place, req.params.scene).then( (a) => {
        res.json({ 
            objects: a
        });
    })).catch(err => {
        res.send(err)
    });
});

app.get('/places', (req, res) => {
    (list.places().then( (a) => {
        res.json({ 
            places: a
        });
    })).catch(err => {
        res.send(err)
    })
});

app.get('/:place/scenes', (req, res) => {
    if(!req.params.place) {
        res.send("Parametros não preenchidos corretamentes");
        return;
    }

    (list.scenes(req.params.place).then( (a) => {
        res.json({ 
            scenes: a
        });
    })).catch(err => {
        res.send(err)
    });
});

app.get('/scenes', (req, res) => {
    (list.allscenes().then( (a) => {
        res.json({ 
            scenes: a
        });
    })).catch(err => {
        res.send(err)
    })
});

app.get('/:file?/path', (req, res) => {
    (list.path(req.params.file).then( (a) => {
        res.json({ 
            files: a
        });
    })).catch(err => {
        res.send(err)
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

