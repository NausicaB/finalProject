let item = {};
let databaseUrl = "https://final-project-b1eeb-default-rtdb.europe-west1.firebasedatabase.app/";
let index = window.location.search.substring(4);
if (index.length < 1) {
    window.location = "index.html";
}

async function getData() {
    const response = await fetch(databaseUrl + 'list/' + index + ".json");
    item = await response.json();
    console.log(item);
    draw();
}

function draw() {
    document.querySelector('#photo').src = item.url;
    
    document.querySelector('#prodName').innerHTML = item.productName;
    
    document.querySelector('.stock').innerHTML = "In stock: " + item.stock;

    
    document.querySelector('.quantity').innerHTML = `
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantity" name="quantity" min="1" max=${item.stock} value="1">
    `

    document.querySelector('#price').innerHTML = item.price + " Lei";

    document.querySelector('#descript').innerHTML = "Description: <br>" + item.description;

}

function addToCart() {
    
    let quantity = document.querySelector('#quantity').value;
    quantity = Number(quantity);
    
    if (quantity <= 0 || quantity > item.stock || isNaN(quantity)) {
        document.querySelector('.alert.alert-danger').innerHTML =
            `Please input the correct quantity`;
        document.querySelector('.alert.alert-danger').classList.remove('hidden');
        document.querySelector('#cartBtn').classList.add('alert.alert-danger');
        return;
    }
    else {
        document.querySelector('.alert.alert-danger').classList.add('hidden')
        document.querySelector('.alert.alert-success').innerHTML =
            `${item.productName} was successfully added to your basket`;
        document.querySelector('.alert.alert-success').classList.remove('hidden')
        document.querySelector('#cartBtn').classList.add('alert.alert-success');
    }

    let products = {
        idProduct: item.id, 
        name: item.productName,
        stock: item.stock,
        price: item.price,
        quantity: quantity
    }

    let basket = localStorage.getItem("basket");
    if (basket === null) {
        basket = [];
    } else {
        basket = JSON.parse(basket);
    }
    let found = false;
    for (let p of basket) {
      if (p.idProduct === products.idProduct) {
        p.quantity += products.quantity;
        found = true;
      }
    }
    if (!found) {
        basket.push(products);
    }

    localStorage.setItem("basket", JSON.stringify(basket));
}