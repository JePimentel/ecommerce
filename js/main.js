import { navBar } from './nav.js'
import { cards } from './cards.js'
import { localStorageApp } from './services/localStorageApp.js'  
import { cartShopping } from './cartShopping.js'

document.addEventListener('DOMContentLoaded', () => {
    localStorageApp()
    cartShopping()
    navBar()
    cards()
})