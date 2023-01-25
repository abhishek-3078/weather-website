//const axios=require('axios')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// axios.get('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=delhi').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.Temperature)
//         }
//     })
// })
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...';
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }
            else{
                console.log(data)
               messageOne.textContent=data.location;
               messageTwo.textContent="temperature:"+data.Temperature+" C:";
               messageTwo.innerText+="\n Humidity:"+data.humidity+"\n feels like:"+data.feels_like;

               
            }
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