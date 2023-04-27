const request=require('request')
 
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

 
module.exports=geocode