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
        const parentDiv = document.getElementById('parent-div');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 ">
                    <img src="${phone.image}" class="card-img-top img-fluid img-thumbnail" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                    </div>
                </div>
        `;
        parentDiv.appendChild(div)

    });
}