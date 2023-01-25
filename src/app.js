const cors=require('cors');
const express=require('express');
const app=express();
const path=require('path')
const hbs=require('hbs');
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')
// api= y2GyLtvl6n26KPlWX7PSAppYjpvk424V
//curr condn:http://dataservice.accuweather.com/currentconditions/v1/apikey=y2GyLtvl6n26KPlWX7PSAppYjpvk424V
app.use(cors())
const viewspath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars engine for views location
app.set('view engine', 'hbs') 
app.set('views',viewspath)
hbs.registerPartials(partialsPath)
//set up express directory to serve
app.use(express.static(path.join(__dirname,'../public')))

const port=process.env.PORT||3000;
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Abhishek'
    })
}
)

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help page",
        helptext:"this is a help page",
        name:'Abhishek'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"provide a address"
        })
    }

    //const url='http://dataservice.accuweather.com/currentconditions/v1/202396?apikey=y2GyLtvl6n26KPlWX7PSAppYjpvk424V'
    // locationkey(req.query.address,(error,{location_key,latitude})=>{
    //     if(error){
    //         return res.send({error})
    //     }
    //     console.log(data)
    //     forecast(location_key,(error,forecastData)=>{
    //         if(error){
    //             return res.send({error})   
    //         }
    //         res.send({
    //             address:req.query.address,
    //             forecast:forecastData,
    //             name:"ABhishek"
    //             // location,
    //             // name:"abhishek",
    //             // address:req.query.address
    //         })
    //     })
    // })
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,name,longitude}={})=>{   //using destructuring object
        if(error){
            return res.send({error});
        }
        console.log(longitude,latitude);
        forecast(latitude,longitude,(error,{Temperature,humidity,feels_like,location})=>{
            if(error) return res.send({error})
            res.send({
                Temperature,
                humidity,
                feels_like,
                location

            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Abhishek'
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Abhishek",
        errorMessage:"Help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Abhishek",
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log("server is up on port "+port)
})
