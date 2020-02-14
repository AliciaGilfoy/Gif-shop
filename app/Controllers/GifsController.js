import GifsService from "../Services/GifsService.js";
import store from "../store.js";

//Private
function _drawAllGifs() {
  let gifs = store.State.gifs;
  let template = "";
  gifs.forEach(g => {
    template += g.Template
  });
  document.getElementById("gif-row").innerHTML = template
}

function _drawMyGifs() {
  let myGifs = store.State.myGifs;
  let template = "";
  myGifs.forEach(g => {
    template += g.Template
  });
  document.getElementById("saved-gifs").innerHTML = template
}



//Public
export default class GifsController {
  constructor() {
    store.subscribe("gifs", _drawAllGifs);
    store.subscribe("myGifs", _drawMyGifs)

    this.getAllApiGifs()
    this.getMyApiGifs()

  }

  getGifBySearch(event) {
    event.preventDefault();
    let searchData = event.target;
    GifsService.getApiGifBySearch(searchData.query.value)
  }

  getAllApiGifs() {
    GifsService.getAllApiGifs()
  }

  getMyApiGifs() {
    GifsService.getMyApiGifs()
  }

  delete(id) {
    GifsService.delete(id)
  }


  saveGif(id) {
    GifsService.saveGif(id)
  }


}
