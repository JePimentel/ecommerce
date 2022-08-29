import { cartShoppingProducts } from "./cartShoppingProducts.js"
import { showNumberOfProductsAdded } from "./showNumberOfProductsAdded.js"

export function substractOrAddProduct() {
    const restorers = document.querySelectorAll('.substract')
    const adders = document.querySelectorAll('.add')

    restorers.forEach(substract => {
        substract.addEventListener('click', (e) => {
            const edition = e.composedPath()[3].childNodes[1].textContent
            const productsAddedToEdit = JSON.parse(localStorage.getItem('productsAdded'))
            productsAddedToEdit.forEach(product => {
                if (product.edition === edition) {
                    if (product.quantity > 1)
                        --product['quantity']
                    product['subtotal'] = product['quantity'] * product['price']
                }
            })
            localStorage.setItem('productsAdded', JSON.stringify(productsAddedToEdit))
            cartShoppingProducts()
            showNumberOfProductsAdded()
        })
    })

    adders.forEach(add => {
        add.addEventListener('click', (e) => {
            const edition = e.composedPath()[3].childNodes[1].textContent
            const productsAddedToEdit = JSON.parse(localStorage.getItem('productsAdded'))
            productsAddedToEdit.forEach(product => {
                if (product.edition === edition) {
                    if (product.quantity < product.stock) {
                        ++product['quantity']
                        product['subtotal'] = product['quantity'] * product['price']
                    }
                }
            })
            localStorage.setItem('productsAdded', JSON.stringify(productsAddedToEdit))
            cartShoppingProducts()
            showNumberOfProductsAdded()
        })
    })

}