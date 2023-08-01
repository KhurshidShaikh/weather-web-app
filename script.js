
async function fetchweather(city){

const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${encodeURIComponent(city)}&unitGroup=metric`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a2472a99c8msh954d59e11191d37p178c87jsnd0746cc944a5',
		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
	}
};



try {
	const response = await fetch(url, options);
	const result = await response.text();
	// console.log(result);
	const parsedData = Papa.parse(result, { header: true });
   
    const firstrow=parsedData.data[0]
     const Temperature=firstrow.Temperature;
    const date=firstrow['Date time'];
    const d=new Date(date);
    const dayName=d.toLocaleDateString('en-us', {weekday: 'long'});



      Name.innerHTML=firstrow.Name;
	  Temprature.innerHTML=Math.floor(Temperature)+'&#8451';
	  condition.innerHTML=firstrow.Conditions;
      Humidity.innerHTML=Math.floor(firstrow['Relative Humidity']*100/100)+"%";
	  Min.innerHTML=firstrow['Minimum Temperature']+'&#8451';
	  Max.innerHTML=firstrow['Maximum Temperature']+'&#8451';
	  day.innerHTML=dayName;

	  if(firstrow.Conditions=="Rain, Partially cloudy"){
		icon.classList="fa-solid fa-cloud-showers-heavy";
	  }
	  else if(firstrow.Conditions=="Rain"){
		icon.classList="fa-solid fa-cloud-showers-heavy";

	  }
	  else if(firstrow.Conditions=="Rain, Overcast"){
		icon.classList="fa-solid fa-cloud-showers-heavy";
	  }
	  
	  else{
		icon.classList="fa-solid fa-cloud-sun";
	  }
      
	  //forcasting days
	  const datarr=parsedData.data;
	  const daysArr=[];
	  const tempforecastarr=[];
	  const conditionforecastarr=[];
	  const minforecastarr=[];
	  const maxforecastarr=[];

	  for(let i=1;i<datarr.length;i++){
  
	  const arrayofdate=new Date(datarr[i]['Date time']);
	  Array.from(arrayofdate);
	  const arrayofday=arrayofdate.toLocaleDateString('en-us', {weekday: 'long'});
		  daysArr.push(arrayofday);
		  tempforecastarr.push(datarr[i].Temperature);
		  conditionforecastarr.push(datarr[i].Conditions);
		  minforecastarr.push(datarr[i]['Minimum Temperature']);
		  maxforecastarr.push(datarr[i]['Maximum Temperature']);
  }
	  //forecasting days
  const dayselement=document.querySelectorAll('.forcastdays');
	  Array.from(dayselement);
	  dayselement.forEach((element,index) => {
	      element.innerHTML=daysArr[index];
  });
	 //forecasting temperature
	const tempforecast=document.querySelectorAll('.tempforecast');
	Array.from(tempforecast);
	tempforecast.forEach((element,index)=>{
		element.innerHTML=Math.floor(tempforecastarr[index])+"'&#8451";
	})
	//forecasting conditions
	const conditionforecast=document.querySelectorAll('.conditionforecast');
	Array.from(conditionforecast);
	conditionforecast.forEach((element,index)=>{
		element.innerHTML=conditionforecastarr[index];
	})
     //forecasting min
	 const minforecast=document.querySelectorAll('.minforecast');
	 Array.from(minforecast);
	 minforecast.forEach((element,index)=>{
		element.innerHTML=minforecastarr[index]+"'&#8451";
	 })
    //forecasting max
	const maxforecast=document.querySelectorAll('.maxforecast');
      Array.from(maxforecast);
	  maxforecast.forEach((element,index)=>{
		element.innerHTML=maxforecastarr[index]+"'&#8451";
	  })




   
} catch (error) {
	console.error(error);
	alert("Enter a valid location");
	return null;
}

}


async function autofetchweather(latitude,longitude){
	const url = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a2472a99c8msh954d59e11191d37p178c87jsnd0746cc944a5',
			'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
		}
	};
	
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		// console.log(result);
		const city=result[0].name;
		fetchweather(city);
		
	} catch (error) {
		console.error(error);
	}

	
	}
	

 document.getElementById('search').addEventListener('click',function(e){
	e.preventDefault();
	const city=document.getElementById('cityname').value;
fetchweather(city);


})

 function  success(position){
	// console.log(position.coords.latitude);
	// console.log(position.coords.longitude);
	const latitude=position.coords.latitude;
	const longitude=position.coords.longitude;
	autofetchweather(latitude,longitude);

}
function failure(){
	alert("Please enter your location");
}


window.addEventListener("load", async()=>{
	navigator.geolocation.getCurrentPosition(success,failure);
})





