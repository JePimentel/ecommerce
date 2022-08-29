export function cartEmpty() {
    return `
        <div class="closeCart">
            <picture>
                <img src="./images/icons/close.png" alt="">
            </picture>
        </div>
        <h2>My Cart</h2>
        <div class="cartEmpty">
            <picture>
                <img src="./images/emptyCar.svg" alt="">
            </picture>
            <h3>Your cart is Empty</h3>
            <p>You can add items to your cart by clicking on the "+" 
                button on the product page</p>
        </div>
        <div class="total">
            <span>0 items</span>
            <p>$0.00</p>
        </div>
    `
}