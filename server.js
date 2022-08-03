const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Felipe:password@crud-nodejs.l0rwo.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs')

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
    })
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {data: results})
    })
})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('salvo no banco de dados')
        res.redirect('/show')
    })
})

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').find(Object(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
})

.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado no Banco de dados')
    })
})

app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})