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

app.get('/tramMap', (req, res) =>{
    var title = "Dynamobility"
    res.render('trams', { title })
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
        
            const mobiStationsSource = nextBikeData.countries[0].cities[0].places
            var mobiStations = []
            
            //console.log(mobiStations)
            mobiStationsSource.forEach(element => {
                mobiStations.push({ name: element.name, lat: element.lat, lng: element.lng,  bikes: element.bikes_available_to_rent})
            });

            res.render('index',{
                mobiStations: mobiStations
            
            })
        })
    
})

app.listen(3000, () => {
    console.log("Server started, listening on port 3000")
})