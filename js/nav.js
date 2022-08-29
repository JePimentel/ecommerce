import { cartShoppingProducts } from "./cartShoppingProducts.js"

export function navBar() {
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
    const homeLink = document.querySelector('#homeLink')

    let show = true

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 60) {
                nav.classList.add('backgroundColor')
                homeLink.style.color = '#E94959'
            } else {
                nav.classList.remove('backgroundColor')
                homeLink.style.color = '#262626'
            }
        })
    }

    if (menuNav) {
        if (window.screen.width > 500) {
            main.style.filter = ''
            footer.style.filter = ''
        }
    }

    const removeMenu = () => {
        menuNav.style.right = '-550px'
        menuHandler.style.transform = 'rotate(0deg)'
        main.style.filter = ''
        footer.style.filter = ''
    }

    const removeMenuWithBody = () => {
        contents.forEach(content => {
            content.addEventListener('click', () => removeMenu())
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
        } else {
            removeMenu()
        }
    }

    const showShoppingCart = () => {
        removeMenuWithBody()
        if (show) {
            cartShopping.style.right = '0%'
            show = !show
        } else {
            cartShopping.style.right = '-100%'
            show = !show
        }
    }

    options.forEach(seccion => seccion.addEventListener('click', () => removeMenu()))

    logo.addEventListener('click', () => removeMenu())

    menuHandler.addEventListener('click', () => {
        showMenu()
        window.onresize = () => {
            let display = document.defaultView.getComputedStyle(menuNav).display
            let right = document.defaultView.getComputedStyle(menuNav).right
            if (window.screen.width >= 500) {
                main.style.filter = ''
                footer.style.filter = ''
            } else if (display === 'block' && right === '-550px') {
                main.style.filter = ''
                footer.style.filter = ''
            } else {
                main.style.filter = 'blur(2px)'
                footer.style.filter = 'blur(2px)'
            }

        }
    })

    shoppingCartHandler.addEventListener('click', () => {
        showShoppingCart()
        cartShoppingProducts()
    })

    closeCartButton.addEventListener('click', () => removeShoppingCart())
}