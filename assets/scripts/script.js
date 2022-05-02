function selectModelType(element) {
    const verifySelected = element.parentNode.querySelector(".selected");
    const image = element.querySelector(".type-image");
    if(verifySelected !== null)
    {
        verifySelected.classList.remove("selected");
    }
    image.classList.toggle("selected");
}

function selectCollarType(element) {
    const verifySelected = element.parentNode.querySelector(".selected");
    const image = element.querySelector(".type-image");
    if(verifySelected !== null)
    {
        verifySelected.classList.remove("selected");
    }
    image.classList.toggle("selected");
}

function selectTextureType(element) {
    const verifySelected = element.parentNode.querySelector(".selected");
    const image = element.querySelector(".type-image");
    if(verifySelected !== null)
    {
        verifySelected.classList.remove("selected");
    }
    image.classList.toggle("selected");
}

function checkInputs() {
    const checkModel = document.querySelector(".model .selected");
    const checkCollar = document.querySelector(".collar .selected");
    const checkTexture = document.querySelector(".texture .selected");
    const checkImage = document.querySelector(".image-reference input").value;
    const confirmOrderButton = document.querySelector(".image-reference button");
    if(checkModel !== null && checkCollar !== null && checkTexture !== null && checkImage !== "")
    {
        confirmOrderButton.disabled = false;
        confirmOrderButton.classList.add("enabled");
    }
    else
    {
        confirmOrderButton.disabled = true;
        confirmOrderButton.classList.remove("enabled");
    }
}

function createOrderRequest() {
    let model = document.querySelector(".model .selected").parentNode.querySelector("h1").innerHTML;
    let collar = document.querySelector(".collar .selected").parentNode.querySelector("h1").innerHTML;
    let texture = document.querySelector(".texture .selected").parentNode.querySelector("h1").innerHTML;
    let imageReference = document.querySelector(".image-reference input");
    const isValidImage = isUrl(imageReference.value);
    if(isValidImage)
    {
        switch(model)
        {
            case 'T-shirt':
                model = "t-shirt";
                break;
            case 'Camiseta':
                model = "top-tank";
                break;
            case 'Manga longa':
                model = "long";
                break;
        }
        switch(collar)
        {
            case 'Gola V':
                collar = "v-neck";
                break;
            case 'Gola redonda':
                collar = "round";
                break;
            case 'Gola polo':
                collar = "polo";
                break;
        }
        switch(texture)
        {
            case 'Seda':
                texture = "silk";
                break;
            case 'Algodão':
                texture = "cotton";
                break;
            case 'Poliéster':
                texture = "polyester";
                break;
        }
        const orderRequest = {
            "model": model,
            "neck": collar,
            "material": texture,
            "image": imageReference.value,
            "owner": name,
            "author": name,
        };
        const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', orderRequest);
        request.then(function () {
            alert("Sua encomenda foi confirmada!");
            getLastOrders();
            imageReference.value = "";
        });
        request.catch(function () {
            alert("Ops, não conseguimos processar sua encomenda... Tente novamente!");
        });
    }
    else
    {
        alert("URL inválido, revise os dados e tente novamente!");
    }
}

function getLastOrders() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(loadLastOrders);
}

function loadLastOrders(element) {
    const ordersList = document.querySelector(".last-orders ul");
    ordersList.innerHTML = "";
    for(let i = 0 ; i < element.data.length ; i++)
    {
        ordersList.innerHTML += `<li onclick="selectOrder('${element.data[i].image}', '${element.data[i].model}', '${element.data[i].neck}', '${element.data[i].material}', '${element.data[i].owner}')">
            <img src="${element.data[i].image}" />
            <h2><strong>Criador</strong>: ${element.data[i].owner}</h2>
        </li>`
    }
}

function selectOrder(image, model, collar, texture, owner) {
    const confirmation = confirm("Deseja encomendar esta blusa?");
    if(confirmation)
    {
        const orderRequest = {
            "model": model,
            "neck": collar,
            "material": texture,
            "image": image,
            "owner": owner,
            "author": name,
        };
        const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', orderRequest);
        request.then(function () {
            alert("Sua encomenda foi confirmada!");
            getLastOrders();
            imageReference.value = "";
        });
        request.catch(function () {
            alert("Ops, não conseguimos processar sua encomenda... Tente novamente!");
        });
    }
}

function isUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
}

function disableButton() {
    const confirmOrderButton = document.querySelector(".image-reference button");
    confirmOrderButton.disabled = true;
}

const name = prompt("Qual é o seu primeiro nome?");
setInterval(checkInputs, 10);
disableButton();
getLastOrders();