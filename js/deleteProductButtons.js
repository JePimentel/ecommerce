import { cartShoppingProducts } from './cartShoppingProducts.js'
import { showNumberOfProductsAdded } from './showNumberOfProductsAdded.js'
import { cards } from './cards.js'


export function deleteProductButtons() {
    let productsAdded = JSON.parse(localStorage.getItem('productsAdded'))
    let deleteButtons = document.querySelectorAll('.delete')
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                let editionProduct = e.composedPath()[1].childNodes[5].childNodes[1].textContent
                const products = productsAdded.findIndex(item => item.edition === editionProduct)
                productsAdded.splice(products, 1)
                localStorage.setItem('productsAdded', JSON.stringify(productsAdded))
                cartShoppingProducts()
                showNumberOfProductsAdded()
                cards()
            })
        })
    }
}