const loadPhone = () => {
    const input = document.getElementById('input-field');
    const inputText = (input.value).toLowerCase();
    // empty field
    input.value = "";
    //load spinner
    displaySpinner('block');
    // load url from api
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;

    showAllPhone(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
}

// display all  phone on ui ::::::::::::::::::::::
const displayPhone = (phones) => {
    // display detail clear
    document.getElementById('display-detail').textContent = ""
    const parentDiv = document.getElementById('parent-div');
    parentDiv.textContent = ""
    // :::::::::::::cheack phones ::::::::::::::::::

    if (phones.length <= 0) {
        error('No found result!!');
        displaySpinner('none ');
        noMore('none');
        document.getElementById('footer').style.position = 'absolute';
        document.getElementById('button-show').style.display = 'none'
    }


    phones?.forEach(phone => {

        const div = document.createElement('div');
        div.classList.add('col');
        // div.textContent = ""
        div.innerHTML = `
                <div class="card border-radious h-100">
    
                            <img src="${phone.image}" class="card-img-top border-radious img-width" alt="...">
                            <div class="card-body ">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <h6 class="card-text">${phone.brand}</h6>
                                <a onclick="phoneDetail('${phone.slug}')" class="btn btn-success" href="#detail">Details</a>
                            </div>
    
                        </div>
                `;
        displaySpinner('none')
        error('')
        parentDiv.appendChild(div);
        document.getElementById('button-show').style.display = "block";
        document.getElementById('footer').style.position = 'relative';
        noMore('none');

    });
}


// ::::::::::: Phone detail load :::::::::
const phoneDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
}

// :::::::: display detail on ui :::::::::
const displayDetail = phone => {
    const detailParent = document.getElementById('display-detail');
    //clear detail
    detailParent.textContent = ""
    const sensor = phone.mainFeatures.sensors.map(ph => ph);
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
    noMore('none')
    detailParent.appendChild(div);
}
// :::::::::::::::: show more result :::::::::::::::::
const showAllPhone = (url) => {          //ths function from button
    let url1 = url;
    showAll = () => {
        fetch(url1)
            .then(res => res.json())
            .then(data => displayMore(data.data.slice(20)))
    }

}
const displayMore = (phones) => {

    document.getElementById('display-detail').textContent = ""
    const parentDiv = document.getElementById('parent-div');
    // parentDiv.textContent = ""
    // :::::::::::::cheack phones ::::::::::::::::::

    if (phones.length <= 0) {
        noMore('block')
        displaySpinner('none ');
        document.getElementById('footer').style.position = 'relative';
        document.getElementById('button-show').style.display = 'block'
    }


    phones?.forEach(phone => {

        const div = document.createElement('div');
        div.classList.add('col');
        // div.textContent = ""
        div.innerHTML = `
                    <div class="card border-radious h-100">
        
                                <img src="${phone.image}" class="card-img-top border-radious img-width" alt="...">
                                <div class="card-body ">
                                    <h5 class="card-title">${phone.phone_name}</h5>
                                    <h6 class="card-text">${phone.brand}</h6>
                                    <a onclick="phoneDetail('${phone.slug}')" class="btn btn-success" href="#detail">Details</a>
                                </div>
        
                            </div>
                    `;
        displaySpinner('none')
        error('')
        parentDiv.appendChild(div);
        document.getElementById('button-show').style.display = "block";
        document.getElementById('footer').style.position = 'relative';

    });
}

// error function
// not found error made
const error = (err) => {
    document.getElementById('error').innerText = err;

}
// spinner display remove and add
const displaySpinner = (style) => {
    document.getElementById('display-spinner').style.display = style;
}
// more result not found error
const noMore = (err) => {
    document.getElementById('no-more').style.display = err;
}