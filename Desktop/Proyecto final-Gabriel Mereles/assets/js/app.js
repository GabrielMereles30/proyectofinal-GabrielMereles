const lisProducts = document.querySelector('#listProducts');

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
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10)

    }

    productsArray = [...productsArray, productObj];

    productsHtml();

}
function productsHtml() {
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
        

        tr.append(tdImg, tdTitle);

        console.log(tr);
    })
}