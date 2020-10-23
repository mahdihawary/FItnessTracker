

class User {

    constructor(user) {
        this.name = user.name
        this.weight = user.weight
        this.id = user.id
    }
    render(node) {
        const userDiv = document.createElement("div")
        userDiv.innerHTML = `<ul>
        <li>${this.name}</li>
        <li>${this.weight}</li>
        </ul>
        `
        node.append(userDiv)
    }
    // static create(node){
    //     const form = document.createElement("form")
    //     form.setAttribute("id", "newUser")
    //     form.innerHTML =`
    //     <h2>New User</h2>
    //     <label>Name</label>
    //     <input name = "name">
    //     <label>Weight</label> 
    //     <input name ="weight">
    //     <button type="submit">submit</button>
    //     `
    //     node.append(form)

    // }

    // would like to rename this
    static renderUserView(currentUser) {
        Render.renderAsideAndContentDiv()
        const newUser = new User(currentUser)
            newUser.render(content)
    }


    static UserLogin(userName){
        const baseURL = "http://localhost:3000/api/v1/users/"
        return fetch(baseURL)
            .then(response => response.json())
            .then(users => {
                const main = document.querySelector("main")
                const currentUser = users.find(user => user.name == userName)
                main.dataset.userName = currentUser.name
                main.dataset.userId = currentUser.id
                User.renderUserView(currentUser)
                User.getCardioWeek(currentUser)
                User.getRoutines(currentUser)
            })
    }

    static getCardioWeek(currentUser){
        const baseURL = "http://localhost:3000/api/v1/users/"
        const user_id = currentUser.id
        fetch(baseURL + user_id)
            .then(response => (response.json()))
            .then(user =>{
                const strengthCount = user.data.attributes.strength_week.length
                const cardioCount = user.data.attributes.cardio_week.length
                User.renderGraph(cardioCount, strengthCount)
                // User.getRecentRoutines(currentUser)
            })
    }

    static renderGraph ( cardioCount, strengthCount){
        const canvas = document.createElement("canvas")
        Render.renderAsideAndContentDiv()
        canvas.classList.add("graph")
        let graph = new Chart(canvas, {
            type: 'doughnut',
                data: {
                        datasets: [{
                            data: [cardioCount, strengthCount]
                        }],
                    
                    labels: [
                        `cardio`
                        ,`strength `
                    ]
                },
                options: {
                    title: {
                    display: true,
                    text: 'Graph'
                }
            }
        })
        content.append(canvas)
    }
        static renderRoutines = (routines) => {

            const aside = document.querySelector("#aside")
            aside.innerHTML=''
            const routineList = document.createElement("ul")
            for(const routine of routines){
                let routineLi = document.createElement("li")
                routineLi.classList.add('aside-box')
                routineLi.innerHTML = `
                <p class="asideExercise routineLi">${routine.name}</p>
                <button id ="remove-routine">X</button>`
                routineLi.querySelector("p").dataset.routineId = `${routine.id}`
                routineLi.dataset.routineId = `${routine.id}`
                routineLi.classList.add ("routineLi")
                routineList.append(routineLi)
            }
            const addRoutineButton = document.createElement('button')
            addRoutineButton.textContent ="Add new Routine"
            addRoutineButton.setAttribute("id", "addRoutine")
            routineList.prepend(addRoutineButton)
            aside.append(routineList)


        }

        static getRoutines = (currentUser) => {
            const baseURL = "http://localhost:3000/api/v1/users/"
            fetch(baseURL + currentUser.id)
                .then(response => (response.json()))
                .then(user => {
                    User.renderRoutines(user.data.attributes.routines)
                })
        }

    


}