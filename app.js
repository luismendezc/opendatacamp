const express = require('express')

const app = express()
const path = require('path')

const nextbike = require('./utils/nextbike')
const dvb = require('./utils/dvb')
const vvo = require('./utils/vvo')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'))

app.get('/test', (req, res) =>{
    var title = "Dynamobility"

    nextbike(200, (error, nextBikeData) => {
        if (error) {
            return res.send({ error })
        }
    
        const mobiStationsSource = nextBikeData.countries[0].cities[0].places
        var mobiStations = []
        
        //console.log(mobiStations)
        mobiStationsSource.forEach(element => {
            mobiStations.push({ name: element.name, lat: element.lat, lng: element.lng,  bikes: element.bikes_available_to_rent})
        });

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


            //console.log(dvbData.substring(dvbData.indexOf('<h1 class="heading style11">Verbindungsauskunft</h1>'), dvbData.indexOf('<h2 class="heading style12">Fahrtdetails</h2>')))

            vvo((error, vvoData) =>{
                if(error){
                    return res.send({error})
                }

/*                console.log("HOla")
                console.log(vvoData)*/

                var arrVVO = []
                arrVVO = [{place: vvoData[0].place, id: vvoData[0].id}, {place: vvoData[4].place, id: vvoData[4].id}]
                

              //console.log(arrVVO[0])

                res.render('trams',{
                    dvbData: dvbData.substring(dvbData.indexOf('<h1 class="heading style11">Verbindungsauskunft</h1>'), dvbData.indexOf('<h2 class="heading style12">Fahrtdetails</h2>')),
                    mobiStations: mobiStations,
                    vvoData: arrVVO
                })

            })

            
        })

    
    })


})

app.get('/', (req, res)=>{
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


            res.render('index',{
                dvbData: dvbData.substring(dvbData.indexOf('<h1 class="heading style11">Verbindungsauskunft</h1>'), dvbData.indexOf('<h2 class="heading style12">Fahrtdetails</h2>')),
                mobiStations: mobiStations
            })
        })

    
    })

    

})


app.post('/result', (req, res) => {
    const { userinfo } = req.body;
    
})



app.listen(3000, () => {
    console.log("Server started, listening on port 3000")
})