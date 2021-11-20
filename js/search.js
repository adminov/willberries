const search = () => {
    const input = document.querySelector('.search-block > input');

    const searchBtn = document.querySelector('.search-block > button');

    console.log(input);
    console.log(searchBtn);

    searchBtn.addEventListener('click', () => {
        console.log(input.value);
    })

};

search();