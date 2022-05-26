document.querySelector('#locationForm').addEventListener('submit',(event)=>{
    let address = ''
    event.preventDefault();
    address = document.querySelector('#locationInput').value;
    getForecast(address);
})

function getForecast(address = ''){
    let resultElement = document.querySelector('.result')
    fetch(`/weather?address=${address}`).then((res)=>{
        
        res.json().then((val)=>{
            if(val.error){
                resultElement.innerHTML = val.error;
            }
            else{
                resultElement.innerHTML = val.location + '\n' + val.forecast;
            }
        })
    })
}


