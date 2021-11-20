const cart = () => {
    const modalCart = document.getElementById('modal-cart');

    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.button-cart')) {
            modalCart.style.display = 'flex';
        } else if (target.closest('.modal-close') || !target.closest('.modal')) {
            modalCart.style.display = '';
        }
    })
};

cart();