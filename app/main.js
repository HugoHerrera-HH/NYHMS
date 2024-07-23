let noti = document.getElementById('news');

function Api_con_axios() {
    axios({
        method: 'GET',
        url: 'https://gnews.io/api/v4/search?q=example&apikey=3aa7e46dfa563b1d3eeb2e6ea67d2ced'
    }).then(res => {
        let noticias = res.data.articles;

        if (noticias.length === 0) {
            console.log('No se encontraron noticias.');
            return;
        }

        console.log(noticias);

        noticias.map(elemento => {
            let div = document.createElement('div');
            div.innerHTML = `<br>
            <img style='max-width=800px'; src=${elemento.image}
            <h1>${elemento.title}</h1>
            <h2>${elemento.description}</<h2> `;
            noti.appendChild(div);
        });
    }).catch(error => {
        console.error('Error en la solicitud API:', error);
    });
}

Api_con_axios();
