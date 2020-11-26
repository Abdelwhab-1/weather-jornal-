/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const key = 'fce396a2c15307aab78f7841a3dbbe52' ; 
const port = 8000; 
const root = "http://api.openweathermap.org/data/2.5/weather?zip=";
/*the get function 
shlould return data 
from the server */ 
const getData = async (url)=>{
    resp = await fetch(url); 
    body = await resp.json(); 
    return body ;
}
const postData = async (url = '', data = {})=>{

    // this will push the data to the app endpoint 
    const enternalResp = await fetch(url,{
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        }, 
        "body": JSON.stringify(data),
        
    })

    info = data; 
    // I'm returning the hole temp object incase I wanted to develope the project even further 
    // I could save only temperature but I want to improve the project so i Saved the hole temp object in the project end point and I restore it 
    // to the front end because I intend to add more features . 
    return info;
}
function getInputs(){
    const zip = document.querySelector("#zip").value; 
    const feelings = document.querySelector("#feelings").value;
    const data = {"zip":zip,"feelings":feelings}; 
    return data 
}
externalPost =async (data = {})=>{

    //get the data from the external api 
    const link = root+data["zip"]+"&appid="+key+"&units=imperial";
    const res = await fetch(link)
    try{
        all = await res.json(); 
        data["temp"] = all["main"]; 
        return data 
    }catch(error){
        console.log(error)
    }
 
    
}
updateUi = async (data = {})=>{
    const entryHodler = document.querySelector("#entryHolder"); 
    const date = document.querySelector("#date"); 
    const temp = document.querySelector("#temp"); 
    const content = document.querySelector("#content"); 
    date.textContent = `date : ${newDate}`; 
    temp.textContent=`tepmperature : ${data.temp.temp}F`; 
    content.textContent = `feelings : ${data.feelings}`; 

}
document.querySelector("#generate").addEventListener("click",()=>{
    const data = getInputs()
    externalPost(data)
    .then((info)=>postData("/temperature",info))
    .then((dataBack)=>updateUi(dataBack))
    

})


