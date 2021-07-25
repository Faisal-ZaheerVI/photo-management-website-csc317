function fadeOut(event) {
    // alert('Photo is clicked!');
    console.log(event.path[1].id);
    let count = document.getElementById('items-count');
    let main = document.getElementById('container');
    console.log(main);
    let card = document.getElementById(event.path[1].id);
    card.style.opacity = 1;
    setInterval(() => {
        if (card.style.opacity > 0) {
            card.style.opacity -= 0.1;
        }
        else {
            main.removeChild(card);
            count.innerHTML = `There are ${main.childElementCount} photo(s) being shown`; 
        }
    }, 30);
}

function createPhotoCard(data, containerDiv) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let h1 = document.createElement('h1');
    img.src = data.url;
    h1.innerText = data.title;
    img.alt = "this was supposed to be a photo";
    div.setAttribute('id', 'photo-'+data.id);
    div.classList.add('fadeOut');
    div.addEventListener('click', fadeOut);
    div.appendChild(img);
    div.appendChild(h1);
    containerDiv.appendChild(div);
}

let mainDiv = document.getElementById("container");

if(mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('items-count').innerHTML = `There are ${photos.length} photo(s) being shown`;
    })
}

/* FLASH MESSAGE FADE OUT */
function setFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        // setInterval function is triggered every 50ms
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - .05; // In charge of how smooth the fadeout is
            flashElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

let flashElement = document.getElementById('flash-message');
if(flashElement) {
    setFlashMessageFadeOut();
}