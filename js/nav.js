import { cartShoppingProducts } from "./cartShoppingProducts.js"

export function navBar () {
    const menuHandler = document.querySelector('#menuHandler')
    const shoppingCartHandler = document.querySelector('#shoppingCartHandler')
    const cartShopping = document.querySelector('.cartShopping')
    const closeCartButton = document.querySelector('.closeCart')
    const menuNav = document.querySelector('.menuNav')
    const logo = document.querySelector('.navLogoContainer')
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    const contents = document.querySelectorAll('#content')
    const options = document.querySelectorAll('#option')
    const nav = document.querySelector('nav')


    if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 60) {
        nav.classList.add('backgroundColor')
        } else {
        nav.classList.remove('backgroundColor')
        }
    })
    }

    const removeMenu = () => {
        menuNav.style.right = '-550px'
        menuHandler.style.transform = 'rotate(0deg)'
        main.style.filter = ''
        footer.style.filter = ''
    }

    const removeShoppingCart = () => {
        cartShopping.style.right = '-550px'
        main.style.filter = ''
        footer.style.filter = ''
    }

    const removeMenuWithBody = () => {
        contents.forEach(content => {
            content.addEventListener('click', () => removeMenu() )
        })
    }

    const showMenu = () => {
        const right = document.defaultView.getComputedStyle(menuNav).right
        removeMenuWithBody()
        if (right === '-550px') {
            menuNav.style.right = '0px'
            menuHandler.style.transform = 'rotate(90deg)'
            main.style.filter = 'blur(2px)'
            footer.style.filter = 'blur(2px)'
        }else {
            removeMenu()
        }
    }

    const showShoppingCart = () => {
        const right = document.defaultView.getComputedStyle(cartShopping).right
        removeMenuWithBody()
        if (right === '-550px') {
            cartShopping.style.right = '0px'
            main.style.filter = 'blur(2px)'
            footer.style.filter = 'blur(2px)'
        } else {
            removeShoppingCart()
        }
    }

    options.forEach(seccion => seccion.addEventListener('click', () => removeMenu() ))

    logo.addEventListener('click', () => removeMenu() )

    menuHandler.addEventListener('click', () => showMenu() )

    shoppingCartHandler.addEventListener('click', () => {
        showShoppingCart()
        cartShoppingProducts()
    })

    closeCartButton.addEventListener('click', () => removeShoppingCart())
}