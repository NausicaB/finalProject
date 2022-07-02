console.log('cart.js loaded...');

let databaseUrl = "https://final-project-b1eeb-default-rtdb.europe-west1.firebasedatabase.app/";
let index = window.location.search.substring(4);

let basketItems = [];
let basketSummary = '';

function getData() {
    basketItems = localStorage.getItem('basket');
    basketItems = JSON.parse(basketItems);
    console.log(basketItems);
    updateBasket()
}

function updateBasket() {
    let tableData = [];
    let updatedBasket = '';
    let thead = '';
    let count = 0;
    
    if (basketItems === null) {
        document.querySelector('.tableBody').innerHTML = `
            Your cart is empthy. <br>
            Click <a href="index.html?id=index">here</a> to continue shopping
        `
    }
    else {
        for (const [i, value] of Object.entries(basketItems)) {

            thead = `
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th>Remove Item</th>
                </tr>
                `

            let subtotal = value.quantity * value.price;
            updatedBasket = `
                    <tr class='tableData'>
                        <td class="item">${value.name}</td>
                        <td class="qty">
                            <button type="button" class="btn btn-primary" onclick="decrease('${i}')"> - </button> 
                            <span class="qtyValue" style="padding: 5px 10px;">${value.quantity}</span>
                            <button type="button" class="btn btn-primary" onclick="increase('${i}')"> + </button>
                        </td>
                        <td class="price">${value.price}</td>
                        <td class="subtotal" style="font-weight: bold">${subtotal}</td>
                        <td class="delete">
                            <button onclick="remove('${i}')" type="button" class="btn btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                `
                
            count = count + value.quantity 
            basketSummary = `
                        <h4> Summary </h4>
                        <div> Total items: ${count} </div>
                        <div style="margin-bottom: 20px;"> Delivery Costs: free </div>
                        <h4> Total: ${subtotal} Lei </h4>
                        
                        <button type="button" class="btn btn-success" style="margin-bottom: 20px;">Proceed to checkout</button>
                    ` 
            tableData.push(updatedBasket);
            let finalData = tableData.join('')
            document.querySelector('.tableHead').innerHTML = thead;
            document.querySelector('.tableBody').innerHTML = finalData;
            document.querySelector('.summary').innerHTML = basketSummary;
        }
    }
}

function decrease(idx) {
    idx = Number(idx);
    let elem = basketItems[idx].quantity;
    if (elem > 1) {
        elem = elem - 1;
        document.querySelectorAll('.qtyValue')[idx].innerHTML = elem;
        basketItems[idx].quantity = elem;
    } 
    updateBasket();
}

function increase(idx) {
    idx = Number(idx);
    let elem = basketItems[idx].quantity;
    elem = elem + 1;
    document.querySelectorAll('.qtyValue')[idx].innerHTML = elem;
    basketItems[idx].quantity = elem;
    updateBasket()
}

function remove(idx) {
    idx = Number(idx);
    let elem = document.querySelectorAll('.tableData');
    if (
        confirm(`Are you sure you want to delete the link: ${basketItems[idx].name}?`)
        ) {
        elem[idx].remove();
        basketItems.splice(idx, 1);
        if (basketItems.length === 0) {
            document.querySelector('.tableHead').remove();
            document.querySelector('.tableBody').innerHTML = `
            Your cart is empthy. <br>
            Click <a href="index.html?id=index">here</a> to continue shopping
            `
            document.querySelector('.summary').remove();
        }
    }
    localStorage.removeItem('basket', 'idx')
    updateBasket()
}

