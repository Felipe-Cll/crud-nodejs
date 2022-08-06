const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ObjectId = require('mongodb').ObjectId
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://Felipe:password@crud-nodejs.l0rwo.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended: true}))
app.use('/css', express.static('css'));

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs')

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
    })
})

app.set('view engine', 'ejs')

app.route('/')
.get(function(req, res) {
    const cursor = db.collection('data').find()
    res.render('index.ejs')
})

.post((req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no banco de dados')
        res.redirect('/show')
    })
})

app.route('/show')
.get((req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {data: results})
    })
})

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
})

.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var email = req.body.email
    var tel = req.body.tel

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            email: email,
            tel: tel
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