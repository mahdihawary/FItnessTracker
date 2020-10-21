document.addEventListener("DOMContentLoaded", function (e) {
    
    const baseURL = "http://localhost:3000/api/v1/users/"
    const exerciseBaseUrl = "http://localhost:3000/api/v1/exercises/"
    const dayBaseUrl = "http://localhost:3000/api/v1/days/"
    const routineURL = "http://localhost:3000/api/v1/routine/"

    const main = document.querySelector("main")
    const content = document.querySelector("#content")
    const aside = document.querySelector("#aside")
    // const formDiv = document.querySelector('.centered-form-div')

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
                logout()
            }
                else if (e.target.matches('.statsButton')) {
                getUserStats()
            }
        })
    }

    const createUserEvent = () => {
        const formDiv = document.querySelector('.centered-form-div')
        document.addEventListener('click', (e) => {
            const target = e.target
            if (target.matches("#signup")) {
                Render.removeLogin()
                Render.createNewUserForm(formDiv)
            }
        })
    }

    const submitListener = () => {
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            const target = e.target
            if (target.matches("#login")){
                User.UserLogin(target.name.value)
                Render.removeFormDiv()
                Render.renderUserNav()
                getCardioWeek() 

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
                // console.log('newUser submit')
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
                    .then(user => {
                        target.reset()
                        Render.removeFormDiv()
                        Render.renderLogin()
                    })
            }
        })
    }

    // fetch(exerciseBaseUrl)
    // .then(response => response.json())
    // .then( data => {
    //     for(const exercise of data){
    //         let newExercise = new Exercise(exercise.name)
    //         newExercise.render(aside)
    //     }
    // })

    // const createFormDiv = () => {
    //     const formDiv = document.createElement("div")
    //     formDiv.classList.add('centered-form-div')
    //     main.append(formDiv)
    // }

    // const removeFormDiv = () => {
    //     const formDiv = document.querySelector('.centered-form-div')
    //     formDiv.remove()
    // }

    // const renderLogin = () => {
    //     // should appear when page loads
    //     // should disapper after user logs in/signs up
    //     createFormDiv()
    //     const formDiv = document.querySelector('.centered-form-div')
    //     formDiv.innerHTML = `
    //         <form id="login">
    //             <label>UserName</label> 
    //             <input name = "name">
    //             <button type = "submit"> login </button>
    //             <button id="signup"> signup </button>
    //         </form>
    //     `
    // }

    // const removeLogin = () => {
    //     const formDiv = document.querySelector('.centered-form-div')
    //     formDiv.innerHTML = ``;
    // }
    
    const logout =() =>{
        main.dataset.userId = "nil"
        Render.clearUserNav()
        Render.removeUserView()
        Render.renderLogin()
    }

    

    // const removeUserView = () => {
    //     main.innerHTML = ``
    // }

    // const renderUserView = () => {
    //     renderAsideAndContentDiv()
    //     let mainElement = document.querySelector("main")
    //     // console.log(mainElement)
    //     let id = mainElement.dataset.userId
    //     console.log(mainElement.dataset.userId)
    //     const content = document.querySelector("#content")
    //     fetch(baseURL + `${mainElement.dataset.userId}`)
    //         .then(response => (response.json()))
    //         .then(user => {
    //             const newUser = new User(user)
    //             newUser.render(content)
    //         })
    // }
        // fetch(baseURL + 1)
        // .then(response => (response.json()))
        // .then(user => {
        //     const newUser = new User(user)
        //     newUser.render(content)
        // })

    // const renderUserNav = () => {
    //     let userIcon = document.createElement("p");
    //     userIcon.classList.add('userIcon');
    //     userIcon.textContent = `User-Name Here`
    //     let logoutBtn = document.createElement("button");
    //     logoutBtn.classList.add('logoutBtn');
    //     logoutBtn.textContent = `Logout`
    //     let statsButton = document.createElement("button");
    //     statsButton.classList.add('statsButton');
    //     statsButton.textContent = `Stats`
    //     document.querySelector('#userNav').append(userIcon, logoutBtn, statsButton)
    // }

    // const clearUserNav = () => {
    //     document.querySelector('#userNav').innerHTML = '';
    // }

    const getUserStats = () =>{
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL+userId)
            .then(response => (response.json()))
            .then(user => {
                console.log(user)
            })
            
    }
    const renderRoutineForm = () => { //will fetch exercises from database to allow selection

        fetch(exerciseBaseUrl)
        .then(response => response.json())
        .then( data => {
            
                const routineForm = document.createElement("form")
                routineForm.innerHTML =`
                <form id ="routine">
                < label >Routine name< /label>  
                <input name = "name" >
                <select name = "exercises" id = "exercise">
                </select>
                < button type = "submit" > Create Routine < /button>
                < /form>`
            for (const exercise of data) {
                let exerciseOption = `<option value = "${exercise.id}" > ${exercise.name} </option>`
                routineForm.append(exerciseOption)
            }

            
        })
    }

    const createRoutine = (options) =>{

        fetch(routineURL, options)
            .then(response => (response.json()))
            .then(routine => {
            console.log(routine)
            })
    }

    const getCardioWeek=()=>{
        const user_id = 39
        console.log(user_id)
        fetch(baseURL + user_id)
            .then(response => (response.json()))
            .then(user =>{
                console.log(user.data.attributes)
                const strengthCount = user.data.attributes.strength_week.length
                const cardioCount = user.data.attributes.cardio_week.length
                renderGraph(cardioCount, strengthCount)
            })
    }

    const renderGraph =( cardioCount, strengthCount) =>{
        const canvas = document.createElement("canvas")
        console.log(canvas)
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
        main.append(canvas)
    }


    navClickListener()
    // renderUserNav()
    // renderLogin()
    Render.renderLogin()
    createUserEvent()
    submitListener()
})