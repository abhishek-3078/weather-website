const request=require('request')
// const locationkey=(address,callback)=>{
//   //open weather app= aa04558a0788b847bf61784866807d42
//     const url="http://dataservice.accuweather.com/locations/v1/cities/search?apikey=y2GyLtvl6n26KPlWX7PSAppYjpvk424V&q="+encodeURIComponent(address)
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback('unable to connect to services',undefined)
//         }else if(response.body.length===0){
//             callback('unable to find location. Try another search')
//         }else{
//             callback(undefined,{
//                 location_key:response.body[0].Key,
//                 latitude:response.body[0].GeoPosition.Latitude,
//                 longitude:response.body[0].GeoPosition.Longitude,
//                 location:response.body[0].LocalizedName

//             })
//         }
//     })
// }

    
   const geocode=(address,callback)=>{
    const URL="http://api.openweathermap.org/geo/1.0/direct?q="+encodeURIComponent(address)+"&limit=5&appid=aa04558a0788b847bf61784866807d42"
    request({url:URL,json:true},(error,response)=>{
        if(error){
            
                callback('unable to connect to internet',undefined)
                
        }
        else if(response.body.length===0) callback('unable to find the location')
              else{
            callback(undefined,{
                name:response.body[0].name,
                latitude:response.body[0].lat,
                longitude:response.body[0].lon
            })
        }
    
})

   }
//    geocode("mumbai",(error,{latitude,name,longitude})=>{   //using destructuring object
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log(latitude,longitude,name)
//     }
// })


 

 
module.exports=geocode