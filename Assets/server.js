const express = require('express')
const app = express()
const PORT = process.env.PORT || '8080';
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
app.use(cors())


app.get('/', (req, res) => {
    MongoClient.connect('mongodb+srv://bitnik:Nikrinsan1$@impact-run.nf0h0.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
        var collection = client.db('Impact-Run').collection('Impact-Run');
        collection.findOne({ Name: 'Nag Varun Konreddy' }, (err, result) => {
            res.send(result)
        })
    })
})

app.listen(PORT)
