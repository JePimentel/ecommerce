import { products } from "../../data/products.js"

export function localStorageApp () {
    const teslaProducts = products.filter(product => product.brand === 'Tesla')
    const audiProducts = products.filter(product => product.brand === 'Audi') 
    const bmwProducts = products.filter(product => product.brand === 'BMW') 
    const mercedesProducts = products.filter(product => product.brand === 'Mercedes')
    const all = teslaProducts.length + audiProducts.length + bmwProducts.length + mercedesProducts.length

    localStorage.setItem('allStock', JSON.stringify(all))
    localStorage.setItem('teslaStock', JSON.stringify(teslaProducts))
    localStorage.setItem('audiStock', JSON.stringify(audiProducts))
    localStorage.setItem('bmwStock', JSON.stringify(bmwProducts))
    localStorage.setItem('mercedesStock', JSON.stringify(mercedesProducts))
}