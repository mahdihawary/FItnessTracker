class Render{

    constructor() {
        
    }

    static renderAsideAndContentDiv () {
        const main = document.querySelector("main")
        main.innerHTML = `
        <aside id="aside"></aside>
        <div class="content" id="content">
        `
    }

}