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

function addRepair() {

    const search = document.getElementById('repair-search');
    const matchListRepair = document.getElementById('repair-search-list');

    const searchProducts = async (data) => {
        try {
            const res = await axios.get('/search/products?name=' + data)
            let matches = res.data
            console.log('--------DATA RES');
            console.log(res.data);
            if (data.length === 0) {
                matches = []
                matchListRepair.innerHTML = ''
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
                    
                        <div class="card card-body mb-1" onclick="addRepairToList('${match.name}', '${match.price}', '${match.shortcode}', '${match._id}')">
                            <h4>${match.name}</h4>
                            <small>Price: ${match.price}</small>
                            <small>Shortcode: ${match.shortcode}</small>
                        </div>
                    
                `
                ).join('')

            matchListRepair.innerHTML = html;
        }
    }
    search.addEventListener('input', () => searchProducts(search.value));


}

var repairCounter = 0

function addRepairToList(name, price, shortcode, id) {

    repairCounter++
    console.log(repairCounter);

    var html = `
        <div class="row">
            <div class="col-3">`+ repairCounter + `</div>
            <div class="col-3">`+ name + `</div>
            <div class="col-3">`+ price + `</div>
            <div class="col-3">`+ shortcode + `</div>
            </div>
            <input type="hidden" value="`+ id + `" name="newOrder[repair][` + repairCounter + `]{}">
    `
    console.log(typeof (document.getElementById('repair-search').value));
    var div = document.getElementById('repair-list');
    div.insertAdjacentHTML('beforeend', html)


}
