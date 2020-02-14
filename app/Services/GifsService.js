import store from "../store.js";
import Gif from "../Models/Gif.js"

// @ts-ignore
let _SandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Alicia/gifs",
  timeout: 3000
})

// @ts-ignore
let _gifApi = axios.create({
  baseURL: " //api.giphy.com/v1/gifs",
  timeout: 3000
})


class GifsService {
  getAllApiGifs() {
    _gifApi.get("trending?api_key=JDqROKsYjkvS2m1VFizjFkwzp33KFUA9")
      .then(res => {
        let apiGifs = res.data.data.map(gif => new Gif(gif));
        store.commit("gifs", apiGifs)
        console.log(store.State.gifs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  saveGif(id) {
    let gif = store.State.gifs.find(gif => gif.id == id)
    _SandboxApi.post("", gif)
      .then(res => {
        let gif = new Gif(res.data.data)
        let newGifs = [...store.State.myGifs, gif]
        store.commit("myGifs", newGifs)
      }).catch(err => {
        throw new Error(err);
      });
  }
  delete(id) {
    _SandboxApi.delete(id)
      .then(res => {
        let filteredGifs = store.State.myGifs.filter(g => g.id != id)
        store.commit("myGifs", filteredGifs)
      }).catch(err => {
        throw new Error(err);
      });
  }
  getMyApiGifs() {
    _SandboxApi.get("")
      .then(res => {
        let myGifs = res.data.data.map(gif => new Gif(gif));
        store.commit("myGifs", myGifs)
      }).catch(err => {
        throw new Error(err);
      });
  }
  getApiGifBySearch(searchData) {
    _gifApi.get("search?api_key=JDqROKsYjkvS2m1VFizjFkwzp33KFUA9&q=" + searchData)
      .then(res => {
        let apiGifs = res.data.data.map(gif => new Gif(gif));
        store.commit("gifs", apiGifs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

const service = new GifsService();
export default service;
