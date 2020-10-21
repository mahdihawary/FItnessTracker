class User {
    constructor(user) {
        this.name = user.name
        this.weight = user.weight
        this.id = user.id
    }
    render(node) {
        // console.log(this)
        const userDiv = document.createElement("div")
        userDiv.innerHTML = `<ul>
        <li>${this.name}</li>
        <li>${this.weight}</li>
        </ul>
        `
        node.append(userDiv)

    }
    static create(node){
        const form = document.createElement("form")
        form.setAttribute("id", "newUser")
        form.innerHTML =`
        <label>Name</label>
        <input name = "name">
        <label>Weight</label> 
        <input name ="weight">
        <button type="submit">submit</button>
        `
        node.append(form)

    }
    static renderUserView(currentUser) {
        const baseURL = "http://localhost:3000/api/v1/users/"
        Render.renderAsideAndContentDiv()
        let mainElement = document.querySelector("main")
        // console.log(mainElement)
        let id = mainElement.dataset.userId
        console.log(currentUser)
        const content = document.querySelector("#content")
        const newUser = new User(currentUser)
            newUser.render(content)

        // fetch(baseURL + `${currentUser.id}`)
        //     .then(response => (response.json()))
        //     .then(user => {
        //         const newUser = new User(user)
        //         newUser.render(content)
        //     })
    }


    static UserLogin(userName){
        const baseURL = "http://localhost:3000/api/v1/users/"
        return fetch(baseURL)
            .then(response => response.json())
            .then(users =>{
                const main = document.querySelector("main")
                const currentUser = users.find(user => user.name == userName)
                main.dataset.userId = currentUser.id
                User.renderUserView(currentUser)
                


            })
    }

    

    


}