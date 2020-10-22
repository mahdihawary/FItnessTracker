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
                Render.removeContentDivContent()
                Render.removeAsideDivContent()
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
                // getCardioWeek() 

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

    const exerciseClickListener = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('div[data-exercise-id]')){
                const content = document.querySelector('#content')
                content.dataset.exerciseId = e.target.dataset.exerciseId
                content.dataset.kind = e.target.dataset.kind
                content.dataset.exerciseName = e.target.textContent

                getUserStats()
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

    
    const logout =() =>{
        main.dataset.userId = "nil"
        Render.clearUserNav()
        Render.removeUserView()
        Render.renderLogin()
    }

    const getUserStats = () =>{
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL+userId)
            .then(response => (response.json()))
            .then(user => {
                // console.log(user.data.attributes.exercises)
                // render exercise stats to #content 
                Render.renderExerciseGraphData(user.data.attributes.days_month)
                Render.renderExercisesToAside(user.data.attributes.exercises)
            })       
    }
    const renderRoutineForm = () => { //will fetch exercises from database to allow selection

        fetch(exerciseBaseUrl)
        .then(response => response.json())
        .then( data => {
            Render.createRoutineForm(data)
        })
    }

    const createRoutine = (options) =>{

        fetch(routineURL, options)
            .then(response => (response.json()))
            .then(routine => {
            // console.log(routine)
            })
    }

    exerciseClickListener()
    navClickListener()
    Render.renderLogin()
    createUserEvent()
    submitListener()

})
