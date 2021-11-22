const cart = () => {
    const modalCart = document.getElementById('modal-cart');
    const longGoodsList = document.querySelector('.long-goods-list');
    const cartTableGoods = document.querySelector('.cart-table__goods');


    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.filter(item => item.id !== id);

        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.map((item) => {
            if (item.id === id){
                if (item.count > 0) {
                    item.count--
                }
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.map((item) => {
            if (item.id === id){
                item.count++;
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };

    //формирование товара в корзине
    const renderCartGoods = (cartArray) => {
        cartTableGoods.innerHTML = '';
        cartArray.forEach((item) => {
            const {name, price, count} = item;
            const  tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${name}</td>
                <td>${price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${count}</td>
                <td><button class="cart-btn-plus"">+</button></td>
                <td>${+price * +count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `;

            cartTableGoods.append(tr);

            tr.addEventListener('click', (event) => {
                console.log(event.target);
                let target = event.target;
                if (target.classList.contains('cart-btn-minus')) {
                    minusCartItem(item.id);
                    console.log(item.id);
                } else if (target.classList.contains('cart-btn-plus')) {
                    plusCartItem(item.id);
                } else if (target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(item.id);
                }
            })
        })
    };

    //Добавление товаров
    const addToCart = (goodId) => {
        const goods = JSON.parse(localStorage.getItem('goods'));
        const clickedGood = goods.find(item => item.id === goodId);
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];

        if (cart.some(item => item.id === clickedGood.id)) {
            cart.map(item => {
                if (item.id === clickedGood.id) {
                    item.count++
                }
                return item;
            })
        } else {
            clickedGood.count = 1;
            cart.push(clickedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    };

    //open and closes for trash
    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.button-cart')) {
            const cartArray = localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : [];

            renderCartGoods(cartArray);

            modalCart.style.display = 'flex';
        } else if (target.closest('.modal-close') || !target.closest('.modal') && target.classList.contains('overlay')) {
            modalCart.style.display = '';
        }
    });

    //Получение верстку товара
    if (longGoodsList) {
        longGoodsList.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('.add-to-cart')) {
                const btnCart = event.target.closest('.add-to-cart');
                const goodId = btnCart.dataset.id;
                console.log(goodId);
                addToCart(goodId);
            }
        })
    }
};

cart();