function orderSearch() {
    const search = document.getElementById('search');
    const matchList = document.getElementById('match-list');

    const searchCars = async (data) => {
        try {
            const res = await axios.get('/search/car?regno=' + data)
            let matches = res.data

            if (data.length === 0) {
                matches = []
                matchList.innerHTML = ''
            }
            outputHTML(matches)
        } catch (err) {
            console.log(err);
        }
    }
    const outputHTML = matches => {
        if (matches.length > 0) {
            const html = matches
                .map(
                    match => `
                    <a href="/orders/new?regno=${match.regno}">
                        <div class="card card-body mb-1">
                            <h4>${match.regno}</h4>
                            <small>${match.make} ${match.model}</small>
                            <small>${match.owner.name}</small>
                        </div>
                    </a>
                `
                ).join('')

            matchList.innerHTML = html;
        }
    }

    search.addEventListener('input', () => searchCars(search.value));
}