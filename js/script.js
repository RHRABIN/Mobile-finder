const loadPhone = () => {
    const input = document.getElementById('input-field');
    const inputText = (input.value).toLowerCase();
    input.value = "";
    // load url from api
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
}

// display all  phone on ui
const displayPhone = (phones) => {
    if (phones.length <= 0) {
        error('No found result!!');
    }


    phones?.forEach(phone => {
        const parentDiv = document.getElementById('parent-div');
        // parentDiv.innerHTML = ""
        const div = document.createElement('div');
        div.classList.add('col');
        // div.innerHTML = ""
        div.innerHTML = `
            <div class="card border-radious">

                        <img src="${phone.image}" class="card-img-top border-radious img-width" alt="...">
                        <div class="card-body ">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <h6 class="card-text">${phone.brand}</h6>
                            <button onclick="phoneDetail('${phone.slug}')" class="btn btn-success" >Details</button>
                        </div>

                    </div>
            `;
        error('')
        parentDiv.textContent = " "
        parentDiv.appendChild(div)

    });

}
const phoneDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
}

// display detail on ui
const displayDetail = phone => {
    const detailParent = document.getElementById('display-detail');
    detailParent.textContent = ""
    const sensor = phone.mainFeatures.sensors.map(ph => ph);
    // console.log(phone)
    const div = document.createElement('div');
    detailParent.textContent = ""
    div.classList.add('col');
    div.innerHTML = `
            <div class="card border-radious">

                        <div><img src="${phone.image}" class="card-img-top border-radious img-width" alt="..."> </div>
                        <div class="card-body ">
                            <h4 class="card-title">${phone.name ? phone.name : "No name"}</h4>
                            <h6 class="card-text">${phone.releaseDate ? phone.releaseDate : "No release date Found"}</h6>


                            <h6>Main Features:</h6><ul>
                               <li>${phone.mainFeatures.storage}</li>
                               <li>${phone.mainFeatures.displaySize}</li>
                               <li>${phone.mainFeatures.chipSet}</li>
                               <li>${phone.mainFeatures.memory}</li>
                             </ul>


                            <h6>Sensors:</h6><ol>
                            <li style="list-style-type:square">${sensor}</li></ol>
                            <h6>Others:</h6> <ul>
                                <li>Bluetooth: ${phone?.others?.Bluetooth ? phone.others.Bluetooth : "No"}</li>
                                <li>GPS: ${phone?.others?.GPS ? phone.others.GPS : "No"}</li>
                                <li>NFC: ${phone?.others?.NFC ? phone.others.NFC : "No"}</li>
                                <li>Radio: ${phone?.others?.Radio ? phone.others.Radio : "No"}</li>
                                <li>USB: ${phone?.others?.USB ? phone.others.USB : "No"}</li>
                                <li>WLAN: ${phone?.others?.WLAN ? phone.others.WLAN : "No"}</li>
                            </ul>
                        </div>

                    </div>
            `;

    detailParent.appendChild(div);
}
// error function
const error = (err) => {
    document.getElementById('error').innerText = err;

}