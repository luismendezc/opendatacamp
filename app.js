const express = require('express')

const app = express()
const path = require('path')

const nextbike = require('./utils/nextbike')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'))

app.get('/', (req, res) =>{
    var title = "Dynamobility"
    res.render('index', { title })
})

app.get('/test', (req, res) => {
    if (!req.query.radius) {
        return res.send({
            error: 'You must provide a radius range!'
        })
    }
    console.log(nextbike)
    nextbike(req.query.radius, (error, nextBikeData) => {
            if (error) {
                return res.send({ error })
            }
        
            console.log("Next Bike data: "+ nextBikeData)

            res.render('index',{
                nextbike: nextBikeData
            
            })
        })
    
})

app.listen(3000, () => {
    console.log("Server started, listening on port 3000")
})