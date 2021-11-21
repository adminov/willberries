const search = () => {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    const renderGoods = (array) => {
        const longGoodsList = document.querySelector('.long-goods-list');

        longGoodsList.innerHTML = "";
        array.forEach(({label, img, name, description, id, price}) => {

            const goodBlock = document.createElement('div');

            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');

            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${label ? null : 'd-none'}">${label}</span>
                    <img src="db/${img}" alt="${name}" class="goods-image">
                    <h3 class="goods-title">${name}</h3>
                    <p class="goods-description">${description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${id}">
                        <span class="button-price">$${price}</span>
                    </button>
                </div>
             `;

            longGoodsList.append(goodBlock);
        });
    };


    const getData = (inputValue) => {
        fetch('db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter((item) => {
                    return item.name.toLowerCase().includes(inputValue.toLowerCase());
                });
                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== './goods.html') {
                    window.location.href = './goods.html';
                } else {
                    renderGoods(array);
                }

            });
    };

    searchBtn.addEventListener('click', () => {
        getData(input.value);
    })

};

search();