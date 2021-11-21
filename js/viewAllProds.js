const viewAllProds = () => {
    const btnMore = document.querySelector('.more');

    try {
        btnMore.addEventListener('click', (event) => {
            event.preventDefault();
            if (window.location.pathname !== './goods.html') {
                window.location.href = './goods.html';
            }

        });
    } catch (e) {
        console.error(e.message)
    }

};

viewAllProds();