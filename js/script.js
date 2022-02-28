const loadPhone = () => {
    const input = document.getElementById('input-field');
    const inputText = (input.value).toLowerCase();

    // load url from api
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
}

// display phone
const displayPhone = (phones) => {
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                </div>
        `
    });
}