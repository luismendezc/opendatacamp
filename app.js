const express = require('express')

const app = express()
const path = require('path')

const nextbike = require('./utils/nextbike')
const dvb = require('./utils/dvb')

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

app.post('/result', (req, res) => {
    const { userinfo } = req.body;
    
})


app.get('/dvb', (req, res) => {
    /*if (!req.query.radius) {
        return res.send({
            error: 'You must provide a radius range!'
        })
    }*/
    
    dvb( (error, dvbData) => {
            if (error) {
                return res.send({ error })
            }
        
            /*const mobiStationsSource = nextBikeData.countries[0].cities[0].places
            var mobiStations = []
            
            //console.log(mobiStations)
            mobiStationsSource.forEach(element => {
                mobiStations.push({ name: element.name, lat: element.lat, lng: element.lng,  bikes: element.bikes_available_to_rent})
            });*/


            console.log(dvbData.substring(dvbData.indexOf('<h1 class="heading style11">Verbindungsauskunft</h1>'), dvbData.indexOf('<h2 class="heading style12">Fahrtdetails</h2>')))


            res.render('routeplan',{
                dvbData: dvbData.substring(dvbData.indexOf('<h1 class="heading style11">Verbindungsauskunft</h1>'), dvbData.indexOf('<h2 class="heading style12">Fahrtdetails</h2>'))
            
            })
        })
    
})



app.listen(3000, () => {
    console.log("Server started, listening on port 3000")
})