
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const weatherBox=document.querySelector('.weather')
const iconDiv=document.querySelector('.icon')
const upcomingIcon=document.querySelectorAll('.wIcon')
const time=document.querySelectorAll('.time')
const temperatureBox=document.querySelectorAll('.temp')
const upcomingForecast=document.querySelector('.upcoming-forecast')
const printMessage=(data)=>{
    if(data.error){
        messageOne.textContent=data.error
    }
    else{
        console.log("upcoming:",data)
        
       messageOne.textContent=data.location;
       messageTwo.textContent="Temperature: "+data.Temperature+" \xB0C";
       messageTwo.innerText+="\n Humidity: "+data.humidity+"\n Feels Like: "+data.feels_like+" \xB0C";
        const img=document.createElement("img")
        console.log(data.icon)
        img.setAttribute('src',`https://www.openweathermap.org/img/wn/${data.icon}@2x.png`)
        
        iconDiv.insertAdjacentElement("beforeend",img)
        

    }
}
const printUpcoming=(data)=>{
    upcomingForecast.style.display="flex"
    let k=0;
    for(let i of data){
        console.log(i)
        console.log("time:",i.dt)

    time[k].innerText=moment.unix(i.dt).format('hh:mm A')
    upcomingIcon[k].setAttribute('src',`https://www.openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`)
    
    temperatureBox[k++].innerText=i.main.temp+"\xB0 C"
    }

}
const myWeather=()=>{
    iconDiv.innerHTML=""
    messageOne.textContent='Loading...';
    messageTwo.textContent=''
    upcomingForecast.style.display="none";
    
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((location)=>{
        console.log(location.coords)
        const latitude=location.coords.latitude
        const longitude=location.coords.longitude;
        fetch(`/myweather?latitude=${latitude}&longitude=${longitude}`).then(res=>{
            // console.log(res.json())
            
            res.json().then((data)=>{
                
                printMessage(data)
                printUpcoming(data.data)
            })
        })
    })
}else{
    console.log("no")
}
}

weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    // if(e.target.name==="myFunction") return myWeather();
    const location=search.value
    iconDiv.innerHTML=""
    messageOne.textContent='Loading...';
    messageTwo.textContent=''
    upcomingForecast.style.display="none";
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            printMessage(data)
            printUpcoming(data.data)
        })
    })

    // fetch("http://api.openweathermap.org/geo/1.0/direct?q="+encodeURIComponent(location)+"&limit=5&appid=aa04558a0788b847bf61784866807d42").then((response)=>{
    //     response.json().then((data)=>{
            
    //             console.log(data)
                
    //          messageOne.textContent="location: \n"+JSON.stringify(data[1]);
    //         //    messageTwo.textContent="temperature:"+data.Temperature;
               
    //         }
    //     )
    // })
   
    

})