import { cartEmpty } from "./cartEmpty.js"

export function cartShoppingProducts () {
    let cartShoppingContainer = document.querySelector('.cartShopping')
    let productsAdded = JSON.parse(localStorage.getItem('productsAdded'))
    let closeCart
    let deleteButton
    let allProductsAdded = ''
    cartShoppingContainer.innerHTML = ''

    const listenButtonDelete = () => {
        deleteButton = document.querySelectorAll('.delete')
        let deleteButtonArray = [...deleteButton]
        deleteButtonArray.forEach(button => {
            button.addEventListener('click', (e) => {
                let editionProduct = e.path[1].childNodes[5].childNodes[1].textContent
                const products = productsAdded.filter(item => item != null && item.edition === editionProduct)
                productsAdded = products
                localStorage.setItem('productsAdded', JSON.stringify(productsAdded))
                generateProducts()
                cartShoppingProducts()
            })
        })
    }

    const generateProducts = () => {
        productsAdded = JSON.parse(localStorage.getItem('productsAdded'))
        console.log(productsAdded)
        if (productsAdded) {
            cartShoppingContainer.innerHTML = ''
            productsAdded.forEach(product => {
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
                            <span>$${product.price}</span>
                        </div>
                        <span class="subtotal">Subtotal: $2,000,000.00</span>
                        <div class="addOrRemove">
                            <picture>
                                <img src="./images/icons/removeShoppingCart.png" alt="">
                            </picture>
                            <p>1</p>
                            <picture>
                                <img src="./images/icons/addShoppingCart.png" alt="">
                            </picture>
                        </div>
                    </div>
                </div>
                `
                listenButtonDelete()
            })

            cartShoppingContainer.innerHTML = `
            <div class="closeCart">
                <picture>
                    <img src="./images/icons/close.png" alt="">
                </picture>
            </div>
            <h2>My Cart</h2>
            <div class="productsAdded">
                ${allProductsAdded}
            </div>
            <div class="total">
                <span>0 items</span>
                <p>$0.00</p>
            </div>
            `
        } else {
            cartShoppingContainer.innerHTML = cartEmpty()
        }
    }
    generateProducts()

    listenButtonDelete()

}