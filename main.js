console.log('main.js loaded...');

let products = {};

let databaseUrl = "https://final-project-b1eeb-default-rtdb.europe-west1.firebasedatabase.app/";


async function getData() {
    let url = databaseUrl + ".json";
    let response = await fetch(url);
    products = await response.json();
    draw();
}

function draw() {
    let elem = [];
    let table = document.querySelector('.products');

    for (i = 0; i < products.list.length; i++) {
        if (products.list[i] === null) {
            continue;
        }
        elem[i] = `
        <div class="items">
            <img src= ${products.list[i].url} alt=${products.list[i].productName} class="img">
            <div class="productName">${products.list[i].productName}</div>
            <div class="price">${products.list[i].price} Lei</div>
            <a href="details.html?id=${i}">
                <button type="button" class="btn btn-outline-primary">DETAILS</button>
            </a>
        </div>    
        `
    }
    let finalString = elem.join('');
    table.innerHTML = finalString;
}





