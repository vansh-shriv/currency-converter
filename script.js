// const b_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json"
const b_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const flagImage = "https://flagsapi.com/US/shiny/64.png";

const btn = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to"&& code==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateflag=(element)=>{
    let code = element.value
    let countrycode = countryList[code];
    let newsrclink = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrclink;
}


btn.addEventListener("click",async (event)=>{
    event.preventDefault();
    let amt = document.querySelector("input");
    let amtVal = amt.value;
    if(amtVal==""||amtVal<0){
        amtVal=0;
        amt.value="0";
    }
    const url = `${b_url}/${fromCurr.value.toLowerCase()}.min.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let msg = document.querySelector(".msg")
    msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal*rate} ${toCurr.value}`

})

let icon = document.querySelector("#icon");


