export default class Gif {
    constructor(data) {
        this.id = data._id || data.id
        this.title = data.title
        this.url = ""
        this.button = ""

        if (!data.images) {
            this.url = data.url;
        } else {
            this.url = data.images.original.url;
        }
        if (data.id) {
            this.button = `<button class="card-text btn save-button text-success" onclick="app.gifsController.saveGif('${this.id}')"><i class="far fa-save"></i></button>`
        } else {
            this.button = `<button class="card-text btn delete-button text-danger" onclick="app.gifsController.delete('${this.id}')"><i class="far fa-trash-alt"></i></button>`
        }
    }


    get Template() {
        return `
                <div class="card bg-dark text-white">
                    <img src="${this.url}" class="card-img" height="400" width="200">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${this.title}</h5>
                ${this.button}                    
                </div>
                </div>
        
        `
    }
}