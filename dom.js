const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionBtn = document.getElementById('show-millionaries');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculte-wealth');


getRandomUser();
getRandomUser();
getRandomUser();


let data = [];
//console.log(data)

//fetch data

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()
    //console.log(data)

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000000)
    }

    //console.log(newUser);
    addData(newUser)
}


// double Money

function doubleMoney(){
    data=data.map((user)=>{
        return{...user,money:user.money*2}
    })
    updateDom()
}


//filter millionaries

function filterMillionaries(){
    data=data.filter((user)=>{
        return user.money>100000
    })
    updateDom()
}

//sort  rich 

function sortRich(){
    data.sort((a,b)=>b.money-a.money)
   updateDom();
}


//Total wealth

function totalWealth(){
    const wealth=data.reduce((a,user)=>
        (a=a+user.money),0
    )

    const wealth1=document.createElement('div');
    wealth1.innerHTML=`<h3>Entire Wealth:<span>${moneyFormat(wealth)} </span></h3>`
    main.appendChild(wealth1)
}  

//create a function to push user information in let data=[]


function addData(user) {
    data.push(user)

    updateDom();
}


//Update Dom


function updateDom(providedUser = data) { //data is array .default value of provided user

    main.innerHTML = `<h2><strong> Person</strong>Wealth</h2>`

    providedUser.forEach((item) => {
        const element = document.createElement('div')
        element.classList.add('person');
        element.innerHTML = ` <h3><strong>${item.name}</strong>${moneyFormat(item.money)}</h3>`
        main.appendChild(element);
    })
}


///Money formation as a currency

function moneyFormat(money){
    return  '$'+ money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 

}


//event listener

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionBtn.addEventListener('click',filterMillionaries)
sortBtn.addEventListener('click',sortRich)
calculateWealthBtn.addEventListener('click',totalWealth);