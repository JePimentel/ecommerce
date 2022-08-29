import { cartShoppingProducts } from './cartShoppingProducts.js'
import { deleteProductButtons } from './deleteProductButtons.js'
import { showNumberOfProductsAdded } from './showNumberOfProductsAdded.js'
import { substractOrAddProduct } from './subtractOrAddProduct.js'

export function cards() {
    const products = JSON.parse(localStorage.getItem('products'))
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

    allStock.textContent = localStorage.getItem('allStock')
    teslaStock.textContent = JSON.parse(localStorage.getItem('teslaStock')).length
    bmwStock.textContent = JSON.parse(localStorage.getItem('bmwStock')).length
    mercedesStock.textContent = JSON.parse(localStorage.getItem('mercedesStock')).length
    audiStock.textContent = JSON.parse(localStorage.getItem('audiStock')).length

    let allProducts = JSON.parse(localStorage.getItem('productsAdded'))
    let productsAdded = allProducts
    productsQuantity.textContent = JSON.parse(localStorage.getItem('productsAdded'))

    const cleanContainer = (container) => {
        container.innerHTML = ''
    }
    /*
     Esta funcion (addListenerToAddButton) agrega el evento 'click'
     a cada uno de los botones para agregar al carrito de las tarjetas,
      y a su vez agrega el producto a un arreglo que se manda al local storage.

    También valida si el producto ya se encuentra en el carrito, si está en el carrito,
    agrega uno más a la cantidad.
    */
    const addListenerToAddButton = (productsNode, items) => {
        const nodesArray = [...productsNode.children]
        nodesArray.forEach((node) => {
            node.childNodes[3].childNodes[5].addEventListener('click', (e) => {
                const edition = e.path[2].childNodes[3].childNodes[1].textContent
                const product = items.find(item => item.edition === edition)
                console.log(product.stock)
                if (product.stock > 0) {
                    if (productsAdded != null) {
                        productsAdded.push(product)
                    } else {
                        productsAdded = [product]
                    }
                    if (edition != null) {
                        const productsNotNull = productsAdded.filter(item => item != null && item != undefined)
                        localStorage.setItem('productsAdded', JSON.stringify(productsNotNull))
                        let getProductsAdded = JSON.parse(localStorage.getItem('productsAdded'))
                        let productsEdited = []
                        getProductsAdded.forEach(item => {
                            if (productsEdited.length != 0) {
                                const finded = productsEdited.filter(productToFind => productToFind.edition === item.edition)
                                if (finded.length != 0) {
                                    if (finded.length > 1) {
                                        finded.pop()
                                        productsEdited.forEach(items2 => {
                                            if (items2.quantity < items2.stock) {
                                                if (finded[0].edition === items2.edition) {
                                                    items2['quantity'] += 1
                                                    items2['subtotal'] = items2['price'] * items2['quantity']
                                                }
                                            }
                                        })
                                    } else if (finded[0]['quantity'] >= 1) {
                                        productsEdited.forEach(items2 => {
                                            if (items2.quantity < items2.stock) {
                                                if (finded[0].edition === items2.edition) {
                                                    items2['quantity'] += 1
                                                    items2['subtotal'] = items2['price'] * items2['quantity']
                                                }
                                            }
                                        })
                                    } else {
                                        productsEdited.push(finded[0])
                                    }
                                } else {
                                    productsEdited.push(item)
                                }
                            } else {
                                productsEdited.push(item)
                            }
                        })

                        localStorage.setItem('productsAdded', JSON.stringify(productsEdited))
                    }
                    showNumberOfProductsAdded()
                    cartShoppingProducts()
                }
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
                            <p>$${parseInt(product.price).toLocaleString('en')}</p>
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
                            <img src="./images/icons/plus.png" alt="add to cart">
                        </picture>
                    </div>
                </div>
            `
        })
        addListenerToAddButton(productsCards, items)
    }
    console.log(navigator.userAgent)
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