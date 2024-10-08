const  accessKey = "WO-OCpzj1nOixxlCyV49eZgLg6EpnV1FNWpeFfHHRTk"

const formEL = document.querySelector("form")
const searchInput = document.getElementById("search-input")
const searchResulstEl = document.getElementById("search-results") 
const showMoreButton = document.getElementById("show-more-button")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInput.value;
    const url =   `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searchResulstEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result)=>{
        const imageWraper = document.createElement("div")
        imageWraper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        // imageWraper.appendChild(image)
        // imageWraper.appendChild(imageLink)
        imageWraper.appendChild(image)
        imageWraper.appendChild(imageLink)
        searchResulstEl.appendChild(imageWraper)

    })

    page++;

    if(page > 1){
        showMoreButton.style.display = "block";
    }


}


formEL.addEventListener("submit", (event) =>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMoreButton.addEventListener("click", ()=>{
    searchImages()

})

