class User {
    constructor(user) {
        this.name = user.name
        this.weight = user.weight
    }

    render(node) {
        console.log(this)
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

    static UserLogin(userName){
        const baseURL = "http://localhost:3000/api/v1/users/"
        return fetch(baseURL)
            .then(response => response.json())
            .then(users =>{
                const main = document.querySelector("main")
                const currentUser = users.find(user => user.name == userName)
                main.dataset.userId = currentUser.id
            })

    }


}