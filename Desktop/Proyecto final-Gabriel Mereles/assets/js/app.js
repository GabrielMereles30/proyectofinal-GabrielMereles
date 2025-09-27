const lisProducts = document.querySelector('#listProducts');
const contentProducts = document.querySelector('#contentProducts');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
});

function eventListeners() {
    lisProducts.addEventListener('click',getDataElements);
}

function getDataElements(e) {
    if(e.target.classList.contains('btn-add')) {
        const elementHtml = e.target.parentElement.parentElement;
        selecData(elementHtml)
    }
}

function selecData(prod) {
    const productObj = {
        img: prod.querySelector('img').src,
        title: prod.querySelector('h4').textContent,
        price: parseFloat(prod.querySelector('#currentPrice').textContent.replace('$','')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    }

    const exists = productsArray.some(prod => prod.id === productObj.id);

    if (exists) {
        showAlert('Ya añadido al carrito', 'error');
        return;
    }
    
    productsArray = [...productsArray, productObj];
    showAlert('Añadido con éxito', 'succes');
    productsHtml();

}
function productsHtml() {
    cleanHtml();
    productsArray.forEach(prod =>{
        const { img, title, price, quantity, id} = prod;

        const tr = document.createElement('tr');

        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        prodImg.alt = 'image product'
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        const prodTitle = document.createElement('p');
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle)
        
        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('p');
        prodPrice.textContent = `$${price.toFixed(2)}`;
        tdPrice.appendChild(prodPrice)

        const tdQuantity = document.createElement('td');
        const prodQuantity = document.createElement('input');
        prodQuantity.type = 'number';
        prodQuantity.min = '1';
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        tdQuantity.appendChild(prodQuantity);

        const tdDelete = document.createElement('td');
        const prodDelete = document.createElement('button');
        prodDelete.type = 'button';
        prodDelete.textContent= 'X';
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete);

        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

        contentProducts.appendChild(tr);
        
    });
}

function destroyProduct(idProd) {
    productsArray = productsArray.filter(prod => prod.id !== idProd);
    showAlert('Producto Eliminado', 'success');
    productsHtml
}
function cleanHtml() {
    contentProducts.innerHTML = '';
}


function showAlert(message, type) {
    const nonRepeatAlert = document.querySelector('.alert');
    if (nonRepeatAlert) nonRepeatAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 5000); 
}
