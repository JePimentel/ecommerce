export function showNumberOfProductsAdded() {
    const productsQuantity = document.querySelector('#productsQuantity')

    let quantity = JSON.parse(localStorage.getItem('productsAdded'))
    let noNullNoUndifined
    if (quantity) {
        noNullNoUndifined = quantity.filter(item => item != undefined)
        let ProductsQuantity = 0
        noNullNoUndifined.forEach(item => ProductsQuantity += item.quantity)
        noNullNoUndifined ?
            productsQuantity.textContent = ProductsQuantity
            :
            productsQuantity.textContent = '0'
    }
}