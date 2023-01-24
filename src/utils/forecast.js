const request=require('request')
const axios=require('axios')

// const forecast=(key,callback)=>{
//     const url="http://dataservice.accuweather.com/currentconditions/v1/"+key+"?apikey=y2GyLtvl6n26KPlWX7PSAppYjpvk424V"
//     request({url:url,json:true},(error,response)=>{
       
//         if(error){
//             callback("unable to connect internet")
//         }else if(response.body.code){
//             callback("unable to find location",undefined)
//         }
//         else{
//             callback(undefined,'temperature is '+response.body[0].Temperature.Metric.Value+"C")
//         }

//     })
// }
const Forecast=(latitude,longitude,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid=aa04558a0788b847bf61784866807d42"
//     request({url:url,json:true},(error,response)=>{

//         if(error){
//             callback("unable to connect internet");
//         }
//         else if(response.body.cod>=400){
//             callback(response.body.message,undefined)
//         }
//         else{
//             callback(undefined,{
//                 Temperature:response.body.main.temp,
//                 humidity:response.body.main.humidity,
//                 feels_like:response.body.main.feels_like,
//                 location:response.body.name
//             })
//         }
//     })
// }
    axios.get(url).then((response)=>{
        
        callback(undefined,{
            Temperature:response.data.main.temp,
            humidity:response.data.main.humidity,
            feels_like:response.data.main.feels_like,
            location:response.data.name
        })
    }).catch((error)=>{
        callback("unable to connect to internet")
    })
    
    
        
}

module.exports=Forecast






//     })
// }
module.exports=Forecast
