const express = require('express')
const path = require('path');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 80;

const App = express()

//Set paths for express config
const publicDirPath = path.join(__dirname, '../public'); // joining paths using path to keep this platform independent
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view folder location
App.set('view engine', 'hbs');
App.set('views', viewDirectoryPath)
hbs.registerPartials(partialsPath)

// setting up directory from where static files can be served
App.use(express.static(publicDirPath));

App.get('',(req,res)=>{
    res.render('index',{ //Name of the view (the .hbs file in view folder)
        title: 'Weather'
    })
})

App.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Me'
    })
})

App.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        helpMsg: 'To get help, visit the link below'
    })
})

App.get('/weather',(req, res)=>{
    urlQueries = req.query;
    console.log(urlQueries);
    if(!urlQueries.address){
        //using return here, because res.send doesnt stop function execution
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(urlQueries.address, (error, {Latitude, Longitude, location}={}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(Latitude, Longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                providedAddress: urlQueries.address,
                location: location,
                forecast: forecastData
            });
        })
    })
})


//404 pages

App.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help Acticle not found',
        errorMsg: 'The help article you\'re looking for is not available. It might have been removed or the location might have changed'
    })
})

App.get('*',(req,res)=>{
    res.render('404',{
        title: 'Not Found',
        errorMsg: 'Page not found'
    })
})


// App.get('',(req, res)=>{
//     res.send('<h1>Home Page</h1>');
// })

// App.get('/help',(req, res)=>{
//     res.sendFile(path.join(publicDirPath, '/help/help.html'))
// })

// App.get('/about',(req, res)=>{
//     res.sendFile(path.join(publicDirPath, '/about/about.html'));
// })

App.listen(port,()=>{
    console.log("Server up on port " + port);
});