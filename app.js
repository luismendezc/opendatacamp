const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'))

app.get('/', (req, res) =>{
    var title = "Dynamobility"
    res.render('index', { title })
})

app.listen(3000, () => {
    console.log("Server started, listening on port 3000")
})