import { cartEmpty } from "./cartEmpty.js"
import { deleteProductButtons } from "./deleteProductButtons.js"
import { cards } from "./cards.js"
import { substractOrAddProduct } from "./subtractOrAddProduct.js"

export function cartShoppingProducts() {
    let cartShoppingContainer = document.querySelector('.cartShopping')
    let buyButton
    let productsAdded = JSON.parse(localStorage.getItem('productsAdded'))

    let allProductsAdded = ''
    cartShoppingContainer.innerHTML = ''
    let productsNotNull = []


    productsAdded = JSON.parse(localStorage.getItem('productsAdded'))

    const total = (items) => {
        let itemsTotal = 0
        items.forEach(item => itemsTotal += item.quantity)
        const totals = document.querySelector('.totals')
        const totalItems = document.querySelector('.totalItems')
        totalItems.textContent = items.length > 1 ? `${itemsTotal} products` : `${itemsTotal} product`
        let sum = 0
        items.forEach(item => {
            sum += item.price * item.quantity
        })
        totals.textContent = `$${sum.toLocaleString('en')}`

    }

    const buy = () => {
        buyButton = document.querySelector('.buy')
        buyButton.addEventListener('click', () => {
            const productsToBuy = JSON.parse(localStorage.getItem('productsAdded'))
            const products = JSON.parse(localStorage.getItem('products'))
            let productsModify
            products.map(product => {
                const productFinded = productsToBuy.find(productToFind => productToFind['edition'] === product['edition'])
                if (productFinded) {
                    console.log(product['stock'])
                    console.log(product['quantity'])
                    product['stock'] = product['stock'] - product['quantity']
                    product['quantity'] = 1
                    console.log(product['stock'])
                    product['subtotal'] = product['price']
                }
            })
            productsModify = [...products]
            localStorage.setItem('productsAdded', JSON.stringify([]))
            localStorage.setItem('products', JSON.stringify(productsModify))
            cards()
            cartShoppingProducts()
        })
    }

    if (productsAdded != 0) {
        productsNotNull = productsAdded.filter(item => item != null && item != undefined)
        localStorage.setItem('productsAdded', JSON.stringify(productsNotNull))
        cartShoppingContainer.innerHTML = ''
        productsNotNull.forEach(product => {
            allProductsAdded += `
                <div class="product">
                    <img class="delete" src="./images/icons/delete.png" alt="">
                    <picture class="productImage">
                        <img src="${product.image}" alt="">
                    </picture>
                    <div class="productAddedInfo">
                        <p class="productAddedEdition">${product.edition}</p>
                        <div class="stockAndPrice">
                            <span>Stock: ${product.stock}</span>
                            <span>$${parseInt(product.price).toLocaleString('en')}</span>
                        </div>
                        <span class="subtotal">Subtotal: $${parseInt(product.subtotal).toLocaleString('en')}</span>
                        <div class="addOrRemove">
                            <picture class="substract">
                                <img src="./images/icons/removeShoppingCart.png" alt="">
                            </picture>
                            <p>${product.quantity}</p>
                            <picture class="add">
                                <img src="./images/icons/addShoppingCart.png" alt="">
                            </picture>
                        </div>
                    </div>
                </div>
                `
        })

        cartShoppingContainer.innerHTML = `
            <div class="closeCartProducts">
                <picture>
                    <img src="./images/icons/close.png" alt="">
                </picture>
                <button class="buy">Buy</button>
            </div>
            <h2>My Cart</h2>
            <div class="productsAdded">
                ${allProductsAdded}
            </div>
            <div class="total">
                <span class="totalItems">0 items</span>
                <p class="totals">$0.00</p>
            </div>
            `

        substractOrAddProduct()
        total(productsNotNull)
        buy()
    } else {
        cartShoppingContainer.innerHTML = cartEmpty()
        cards()
    }
    deleteProductButtons()
}