export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItems = cartItems.find(cartItems => cartItems.id === cartItemToAdd.id);

    if (existingCartItems) {
        return cartItems.map(cartItems => 
            cartItems.id === cartItemToAdd.id
                ? { ...cartItems, quantity: cartItems.quantity + 1 }
                : cartItems
            )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}; 

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItems = cartItems.find(
        cartItems => cartItems.id === cartItemToRemove.id
    )

    if (existingCartItems === 1) {
        return cartItems.filter(cartItems => cartItems.id !== cartItemToRemove.id);
    }

    return cartItems.map(
        cartItems => cartItems.id === cartItemToRemove.id ? { ...cartItems, quantity: cartItems.quantity - 1 }
        : cartItems
    );
};