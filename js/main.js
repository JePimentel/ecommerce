import { navBar } from './nav.js'
import { cards } from './cards.js'
import { localStorageApp } from './services/localStorageApp.js'  
import { cartShoppingProducts } from './cartShoppingProducts.js'

document.addEventListener('DOMContentLoaded', () => {
    localStorageApp()
    cards()
    cartShoppingProducts()
    navBar()
})