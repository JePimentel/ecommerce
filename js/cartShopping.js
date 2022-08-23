import { cartEmpty } from "./cartEmpty.js"

export function cartShopping () {
    const cartShoppingContainer = document.querySelector('.cartShopping')
    let productsAdded = JSON.parse(localStorage.getItem('productsAdded'))
    let deleteButton
    let allProductsAdded = ''
    cartShoppingContainer.innerHTML = ''

    if (productsAdded) {
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

    deleteButton = document.querySelectorAll('.delete')
    let deleteButtonArray = [...deleteButton]
    deleteButtonArray.forEach(button => {
        button.addEventListener('click', (e) => {
            //.parentNode.childNodes[5].childNodes[1].textContent
            console.log(e.path[1])
        })
    })
}