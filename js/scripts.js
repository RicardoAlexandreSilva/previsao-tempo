document.querySelector('#search').addEventListener('submit',async(event)=>{
    event.preventDefault();

    const cityName = document.querySelector("#city_name").value;

    if(!cityName){
       document.querySelector('#weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade......');
        return;
    }
    const apiKey = "eb5c176a81ac77468731b3993e4c7993";
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    const result = await fetch(apiUrl);
    const json  = await result.json();
    
    if(json.cod === 200){
        showInfo({
         city:json.name,
         country:json.sys.country,
         temp:json.main.temp,
         tempMax:json.temp_Max,
         tempMin:json.temp_Min,
         description:json.weather[0].description,
         tempIcon:json.weather[0].icon,
         ventoSpeed:json.wind.speed,
         umidade:json.main.speed,

        });

    }else{
        document.querySelector('#weather').classList.remove('show');
        showAlert(`Você precisa digitar uma cidade...
        <img src="asset/imag/404.svg"/>    
            
    `);
    }
});


function showInfo(json){

    showAlert("");
    document.querySelector('#weather').classList.add('show');
    document.querySelector('#title').innerHTML=`${json.city},${json.country}`;
    document.querySelector('#temp_value').innerHTML=`${json.temp.toFixed(1).toString().replace(".",",")}<sup>C°</sup>`;
    document.querySelector('#temp_descricao').innerHTML=`${json.description}`;
    document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML=`${json.tempMax.toFixed(1).toString().replace(".",",")}<sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML=`${json.tempMin.toFixed(1).toString().replace(".",",")}<sup>C°</sup>`;
    document.querySelector('#umid').innerHTML=`${json.umidade}`;
    document.querySelector('#vent').innerHTML=`${json. ventoSpeed.toFixed(1)}Km/h`;

}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}