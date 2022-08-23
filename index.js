let query = "clowns";
const body = document.querySelector("body");
const header = document.querySelector("header");
const slides = document.querySelectorAll("img.d-block.w-100.carousel-slide");
const viewButtons = document.querySelectorAll(".viewButton");
const modal = document.querySelector("#modal");

const loadData = (e) => {
    if(e.target.innerText === "Load Images"){
         query = 'Mountains';
    }else if(e.target.innerText === "Load Secondary Images"){
         query = 'cars';

    }else if(e.target.innerText === 'Search'){
        const searchQuery = document.querySelector(".searchBar").value;
        if(searchQuery){ query = searchQuery};
        query = searchQuery;
    }else{
        query = "question mark";
    }
    console.log(query);
    fetch(`https://api.pexels.com/v1/search?query=${query}`,{
  headers: {
    Authorization: "563492ad6f917000010000015080b999c314478fa318b5c998a262de"
  }
})
   .then(resp => {
     return resp.json()
   })
   .then(data => {
    console.log(data); 
    postImages(data)
   })

    
    
}
const createAlert = (loadedPics, cards) => {
    const alertContainer = document.createElement("div");
    alertContainer.setAttribute("class", "container d-flex justify-content-center");
    const alertBody = document.createElement("div");
    alertBody.setAttribute("class", "alert alert-success alertBar");
    alertBody.setAttribute("role", "alert");
    header.after(alertContainer);
    alertContainer.append(alertBody);
    alertBody.innerText = `Loaded ${loadedPics} images. Showing ${cards} images.`;
    setTimeout(function () {alertContainer.remove()}, 5000)

}


const postImages = (data) => {    
    const images = document.querySelectorAll(".card-img-top");
    for(rect of images){
        rect.remove();
    }
    const cards = document.querySelectorAll(".card");
    for(let i=0; i<cards.length; i++){
        const newImg = document.createElement("img");
        newImg.setAttribute("class", "card-img-top ")
        cards[i].prepend(newImg);
        const smallTxt = cards[i].querySelector("small.text-muted");
        const cardTxt = cards[i].querySelector("p.card-text");
        //console.log(data)
        smallTxt.innerText = data.photos[i].id;
        cardTxt.innerText = data.photos[i].alt;
        newImg.setAttribute("src", data.photos[i].src.medium );
        

    }
    createAlert(data.photos.length,cards.length);
}

const hideCard = (e) => {
    e.target.closest(".card").remove();
}

const callForest = () => {
    fetch(`https://api.pexels.com/v1/search?query=woods`,{
  headers: {
    Authorization: "563492ad6f917000010000015080b999c314478fa318b5c998a262de"
  }
})
   .then(resp => {
     return resp.json()
   })
   .then(data => {
    console.log(data); 
    populateCarousel(data)
   })

}
const populateCarousel = (data) => {
    for(let i=0; i<slides.length; i++){
     slides[i].setAttribute("src", `${data.photos[i].src.large2x}`);
    }

}

const expandPic = (e) => {
    const card = e.target.closest(".card");
    const pic = card.querySelector("img.card-img-top");
    const text = card.querySelector(".card-text").innerText;
    modal.querySelector("#modalLabel").innerText = text;
    modal.querySelector(".modal-body img").setAttribute("src", pic.getAttribute("src"));


    

}

window.onload = () => {
    //const loadBtn = document.querySelector("#loadImgButton");
    //loadBtn.addEventListener("click", loadData)
    const loadButtons = document.querySelectorAll(".loadImgButton");
    for(btn of loadButtons){btn.addEventListener("click", loadData)};

    const hideBtns = document.querySelectorAll(".hiderBtn");
    for(btn of hideBtns){btn.addEventListener("click", hideCard)};
    callForest();

    for(btn of viewButtons){btn.addEventListener("click", expandPic)}
}



