// const baseURL = "https://catfact.ninja/fact";
// let facts = document.querySelector("#facts");
// let btn = document.querySelector(".factsbtn");

// const getFacts = async () =>{
//     // console.log("getting data ......");
//     let response = await fetch(baseURL);
//     // console.log(response);
//     let data = await response.json();
//     facts.innerText = data['fact'];
// }

// // // PPROMISE CALL
// // function getFacts() {
// //     fetch(baseURL).then((response)=>{
// //         return response.json()
// //     }).then((data)=>{
// //         console.log(data);
// //         facts.innerText = data['fact'];
// //     })
// // }

// btn.addEventListener("click", getFacts);



//PROJECT BUILDING
let BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let mssg = document.querySelector(".msg");


const updateDaily = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0){
        amount.value = 1;
        amtVal = "1";
    }

    const newUrl = `${BASE_URL}/${fromCurr.value}`;

    let response = await fetch(newUrl);
    let data = await response.json();
    let rate = await data.rates[toCurr.value];

    let newAmount = amtVal * rate;
    console.log(newAmount)

    mssg.innerText = `${amtVal} ${fromCurr.value} = ${newAmount} ${toCurr.value}`;
}



for (let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    
    select.addEventListener("change", (evt)=>{
        changeFlag(evt.target);
    });
}

const changeFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateDaily();
});

window.addEventListener("load", updateDaily);