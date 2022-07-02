console.log('admin.js loaded...');

state = { 
    editIdx: null
}

let databaseUrl = "https://final-project-b1eeb-default-rtdb.europe-west1.firebasedatabase.app/";

let items = {};

async function getData() {

    let url = databaseUrl + ".json";
    let response = await fetch(url);
    items = await response.json();
    
    draw();
}

function draw() {
    console.log(items);
    let row = [];
    let tableRow = document.querySelector('.tableBody')
    let content = '';
    tableRow.innerHTML = `
        <h1> Cartof </h1>
    `;
        
    for (i = 0; i < items.list.length; i++) {
        if (items.list[i] === null) {
            continue;
        }
        content = 
            `<tr>
                <td class="tableImage"> <img id="image" src="${items.list[i]['url']}" alt=""></td>
                <td class="tableName">
                    <a href="" onclick="event.preventDefault(); editItem('${i}')">
                        ${items.list[i]['productName']}
                    </a>
                </td>
                <td class="tablePrice">${items.list[i]['price']} Lei</td>
                <td class="tableStock">${items.list[i]['stock']}</td>
                <td>
                    <a href="">
                        <img src="images/trash.svg" alt="" onclick="event.preventDefault(); deleteItem('${i}')">
                    </a>
                </td>
            </tr>
            `
            row.push(content);
    }

    tableRow.innerHTML = row.join('');
    showTable();
}

function showTable() {
    document.querySelector('#itemsList').classList.add('hidden');
    document.querySelector('.tableList').classList.remove('hidden');
    // document.querySelector('#editList').classList.add('hidden');
}

function showForm() {
    document.querySelector('#itemsList').classList.remove('hidden');
    document.querySelector('.tableList').classList.add('hidden');
    // document.querySelector('#editList').classList.remove('hidden');
}

function editItem(idx) {
    showForm();
    let itemTitle = document.querySelector('#itemsList');
    let inputItem = document.querySelector('#editList'); 



    
    console.log(inputItem);
    state.editIdx = idx;
}

async function saveChanges() {

    let url = document.querySelector('[name="image"]').value.trim();
    let name = document.querySelector('[name="name"]').value.trim();
    let description = document.querySelector('[name="description"]').value.trim();
    let price = document.querySelector('[name="price"]').value.trim();
    let stock = document.querySelector('[name="stock"]').value.trim();

    if (state.editIdx !== null) {
        let response = await fetch(databaseUrl + "list" + "/" + state.editIdx + ".json", {
            method: "PUT",
            body: JSON.stringify({
                url: url,     
                productName: name,
                price: price,
                stock: stock,
                description: description
            }),
          });
    }
    else {
        let response = await fetch(databaseUrl + "list.json", {
            method: "POST",
            body: JSON.stringify({
                url: url,     
                productName: name,
                price: price,
                stock: stock,
                description: description
            }),
        });
    }

    state.editIdx = null;
    
    getData();
    showTable();
}


async function addProducts() {
    showForm();

    document.querySelector('.add > h4').innerText = 'Add item';
    document.querySelector('[name="image"]').value =  '';
    document.querySelector('[name="name"]').value =  '';
    document.querySelector('[name="description"]').innerHTML =  '';
    document.querySelector('[name="price"]').value =  '';
    document.querySelector('[name="stock"]').value =  '';

}

function cancel(){
    showTable();
}

async function deleteItem(idx) {
    if (
        confirm(`Are you sure you want to delete the link: ${items.list[idx]['productName']}?`)
        ) {
            //state.list.splice(idx, 1);
            //https:// .... .com/2/.json
            let url = databaseUrl +  "list" + "/" + idx + ".json";
            let response = await fetch(url, {
                method: "DELETE",
            });
            await getData();
        }
    }
    

    