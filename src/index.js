document.addEventListener("DOMContentLoaded", function (e) {
    
    const baseURL = "http://localhost:3000/api/v1/users/"
    const exerciseBaseUrl = "http://localhost:3000/api/v1/exercises/"
    const dayBaseUrl = "http://localhost:3000/api/v1/days/"

    const content = document.querySelector("#content")
    const aside = document.querySelector("#aside")
    const main = document.querySelector("main")


    fetch(exerciseBaseUrl)
    .then(response => response.json())
    .then( data => {
        for(const exercise of data){
            let newExercise = new Exercise(exercise.name)
            newExercise.render(aside)
        }
    })

    const renderLogin = () => {
        const formDiv = document.createElement("div")
        formDiv.innerHTML = `<div>
        <form id="login">
                <label> UserName </label> 
                <input name = "name">
                <button type = "submit"> login </button>
        </form>                    
                </div>
        `
        main.append(formDiv)
    }

    const logout =() =>{
        main.dataset.userId = "nil"
        renderLogin()
    }




    const createUserEvent = () => {
        document.addEventListener('click', (e) => {
            const target = e.target

            if (target.matches("#signup")) {
                User.create(content)
            }

            if (target.matches("#logout")){
                logout()
            }
        })
    }
    const submitListener = () => {
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            const target = e.target
            if (target.matches("#login")){
              User.UserLogin(target.name.value)
                

            }
            
            else if(target.matches('#newDay')){
                console.log('newDay submit')

                options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        date: target.date.value,
                        user_id: target.userId.value,
                        exercise_id: target.exerciseId.value,
                        weight: target.weight.value,
                        rep: target.reps.value,
                        set: target.sets.value,
                        distance: target.distance.value,
                        time: target.time.value
                    })
                }
    
                fetch(dayBaseUrl, options)
                    .then(response => response.json())
                    .then(console.log)
                    target.reset()

            }
            else if(target.matches('#newUser')){
                console.log('newUser submit')
                options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: target.name.value,
                        weight: target.weight.value
                    })
                }
    
                fetch(baseURL, options)
                    .then(response => response.json())
                    .then(console.log)
                    target.reset()
            }
        })
    }

        fetch(baseURL + 1)
        .then(response => (response.json()))
        .then(user => {
            const newUser = new User(user)
            newUser.render(content)
        })

    const renderUserNav = () => {
        let userIcon = document.createElement("p");
        userIcon.classList.add('userIcon');
        userIcon.textContent = `User-Name Here`
        let logoutBtn = document.createElement("button");
        logoutBtn.classList.add('logoutBtn');
        logoutBtn.textContent = `Logout`
        let statsButton = document.createElement("button");
        statsButton.classList.add('statsButton');
        statsButton.textContent = `Stats`
        document.querySelector('#userNav').append(userIcon, logoutBtn, statsButton)
    }

    const clearUserNav = () => {
        document.querySelector('#userNav').innerHTML = '';
    }

    const navClickListener = () => {
        let header = document.querySelector('header');
        header.addEventListener('click', e => {
            if(e.target.matches('h1')){
                console.log('render home page')
            }
            else if (e.target.matches('.userIcon')){
                console.log('render user page')
            }
            else if (e.target.matches('.logoutBtn')){
                console.log('logout user')
            }
            else if (e.target.matches('.statsButton')) {
                getUserStats()
            }
        })
    }
    const getUserStats = () =>{
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL+userId)
            .then(response => (response.json()))
            .then(user => {
                console.log(user)
            })
            
    }





    navClickListener()
    renderUserNav()
    renderLogin()
    createUserEvent()
    submitListener()
})