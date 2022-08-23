import { products } from '../data/products.js'
import { cartShoppingProducts } from './cartShoppingProducts.js'

export function cards () {
    const productsCards = document.querySelector('.productsCards')
    const allStock = document.querySelector('#allStock')
    const teslaStock = document.querySelector('#teslaStock')
    const bmwStock = document.querySelector('#bmwStock')
    const mercedesStock = document.querySelector('#mercedesStock')
    const audiStock = document.querySelector('#audiStock')
    const allFilter = document.querySelector('.allFilter')
    const teslaFilter = document.querySelector('.teslaFilter')
    const bmwFilter = document.querySelector('.bmwFilter')
    const mercedesFilter = document.querySelector('.mercedesFilter')
    const audiFilter = document.querySelector('.audiFilter')
    const productsQuantity = document.querySelector('#productsQuantity')

    allStock.textContent = localStorage.getItem('allStock')
    teslaStock.textContent = JSON.parse(localStorage.getItem('teslaStock')).length
    bmwStock.textContent = JSON.parse(localStorage.getItem('bmwStock')).length
    mercedesStock.textContent = JSON.parse(localStorage.getItem('mercedesStock')).length
    audiStock.textContent = JSON.parse(localStorage.getItem('audiStock')).length

    let allProducts = []
    let productsAdded = []
    console.log(productsAdded)
    productsQuantity.textContent = JSON.parse(localStorage.getItem('productsAdded'))
    
    const cleanContainer = (container) => {
        container.innerHTML = ''
    }

    const showNumberOfProductsAdded = () => {
        let quantity = JSON.parse(localStorage.getItem('productsAdded'))
        quantity ? 
        productsQuantity.textContent = quantity.length
        : 
        productsQuantity.textContent = '0'
    }

    // Esta funcion (addListenerToAddButton) agrega el evento 'click'
    // a cada uno de los botones para agregar al carrito de las tarjetas
    //  y a su vez agrega el producto a un arreglo que se manda al local storage.
    const addListenerToAddButton = (products, items) => {  
        const nodesArray = [...products.children]         

        nodesArray.forEach((node) => {
            node.childNodes[3].childNodes[5].addEventListener('click', (e) => {
                const edition = e.path[2].childNodes[3].childNodes[1].textContent
                const product = items.find(item => item.edition === edition)
                productsAdded.push(product)
                localStorage.setItem('productsAdded', JSON.stringify(productsAdded))
                showNumberOfProductsAdded()
                cartShoppingProducts()
            })
        })
    }

    const generateCards = (items) => {
        cleanContainer(productsCards)
        items.forEach(product => {
            productsCards.innerHTML += `
                <div class="productCard">
                    <picture class="productImage">
                        <img src="${product.image}" alt="">
                    </picture>
                    <div class="productCardInfo">
                        <div class="priceAndStock">
                            <p>$${product.price}</p>
                            <span>Stock: ${product.stock}</span>
                        </div>
                        <div class="characteristics">
                            <h4>${product.edition}</h4>
                            <div>
                                <span>${product.brand}</span>
                                <span>${product.model}</span>
                            </div>
                        </div>
                        <picture class="addToCartButton">
                            <img src="./images/icons/plus.png" alt="">
                        </picture>
                    </div>
                </div>
            `
        })
        addListenerToAddButton(productsCards, items)
    }

    generateCards(products)
    showNumberOfProductsAdded()


    allFilter.addEventListener('click', () => {
        generateCards(products)
    })

    teslaFilter.addEventListener('click', () => {
        const teslaItems = products.filter(item => item.brand === 'Tesla')
        allProducts = [...teslaItems]
        generateCards(allProducts)
    })

    bmwFilter.addEventListener('click', () => {
        const bmwItems = products.filter(item => item.brand === 'BMW')
        allProducts = [...bmwItems]
        generateCards(allProducts)
    })

    mercedesFilter.addEventListener('click', () => {
        const mercedesItems = products.filter(item => item.brand === 'Mercedes')
        allProducts = [...mercedesItems]
        generateCards(allProducts)
    })

    audiFilter.addEventListener('click', () => {
        const audiItems = products.filter(item => item.brand === 'Audi')
        allProducts = [...audiItems]
        generateCards(allProducts)
    })
}