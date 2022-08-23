let query = "clowns";
const loadData = (e) => {
    if(e.target.innerText === "Load Images"){
         query = 'Mountains';
    }else if(e.target.innerText === "Load Secondary Images"){
         query = 'cars';

    }
    fetch(`https://api.pexels.com/v1/search?query=${query}`,{
  headers: {
    Authorization: "563492ad6f917000010000015080b999c314478fa318b5c998a262de"
  }
})
   .then(resp => {
     return resp.json()
   })
   .then(data => {
    //console.log(data); 
    postImages(data)
   })

    
    
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
        newImg.setAttribute("src", data.photos[i].src.medium )
        //newImg.classList.add("imageSettings");

    }
}

const hideCard = (e) => {
    e.target.closest(".card").remove();
}

window.onload = () => {
    //const loadBtn = document.querySelector("#loadImgButton");
    //loadBtn.addEventListener("click", loadData)
    const loadButtons = document.querySelectorAll(".loadImgButton");
    for(btn of loadButtons){btn.addEventListener("click", loadData)};

    const hideBtns = document.querySelectorAll(".hiderBtn");
    for(btn of hideBtns){btn.addEventListener("click", hideCard)};
}





/* const makeProfile = function (p) {
    console.log(p)
    
    const oldCard = document.querySelector(".card");
    if(oldCard){
        oldCard.remove();
    }
    const newCard = document.createElement("div");
    newCard.innerHTML = `<div class="card col-md-3" style="width: 18rem;">
    <img src="${p.results[0].picture.large}" class="card-img-top" alt="profile pic">
    <div class="card-body">
      <h5 class="card-title">${p.results[0].name.first + " " + p.results[0].name.last}</h5>      
    </div>
  </div>`;

  document.querySelector(".row").append(newCard);
}
 */
