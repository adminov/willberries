const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');
    const btnMore = document.querySelector('.more');

     const renderGoods = (goods) => {
         const longGoodsList = document.querySelector('.long-goods-list');

         longGoodsList.innerHTML = "";
         goods.forEach(({label, img, name, description, id, price}) => {

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


     const getData = (linkValue, category) => {
         fetch('db/db.json')
             .then((res) => res.json())
             .then((data) => {
                 const array = category ? data.filter((item) => item[category] === linkValue) : data;
                 localStorage.setItem('goods', JSON.stringify(array));

                 if (window.location.pathname !== './goods.html') {
                     window.location.href = './goods.html';
                 }

             });
     };

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkValue = link.textContent;
            const category = link.dataset.field;
            getData(linkValue, category);
        })
    });

    if (localStorage.getItem('goods')) {
        renderGoods(JSON.parse(localStorage.getItem('goods')));
    }

    if (btnMore) {
        btnMore.addEventListener('click', (event) => {
            event.preventDefault();
            getData();
        });
    }
};

getGoods();