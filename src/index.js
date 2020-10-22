document.addEventListener("DOMContentLoaded", function (e) {

    const baseURL = "http://localhost:3000/api/v1/users/"
    const exerciseBaseUrl = "http://localhost:3000/api/v1/exercises/"
    const dayBaseUrl = "http://localhost:3000/api/v1/days/"
    const routineURL = "http://localhost:3000/api/v1/routines/"


    const main = document.querySelector("main")
    const content = document.querySelector("#content")
    const aside = document.querySelector("#aside")
    // const formDiv = document.querySelector('.centered-form-div')

    const navClickListener = () => {
        let header = document.querySelector('header');
        header.addEventListener('click', e => {
            if (e.target.matches('h1')) {
                console.log('render home page')
            } else if (e.target.matches('.userIcon')) {
                console.log('render user page')
            } else if (e.target.matches('.logoutBtn')) {
                console.log('logout user')
                logout()
            } else if (e.target.matches('.statsButton')) {
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
            if (target.matches("#login")) {
                User.UserLogin(target.name.value)
                Render.removeFormDiv()
                Render.renderUserNav()
                // getCardioWeek() 

            } else if (target.matches('#newDay')) {
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

            } else if (target.matches('#newUser')) {
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
            } else if (target.matches(".exerciseForm")) {
                console.log(target.exercises.value)
                const routineExURL = "http://localhost:3000/api/v1/routine_exercises/"
                const routineId = document.querySelector(".routineTag").dataset.routineId
                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        routine_id: routineId,
                        exercise_id: target.exercises.value
                    })
                }

                fetch(routineExURL, options)
                    .then(response => response.json())
                    .then(console.log)


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
            else if(e.target.matches('.aside-tab')){
                let tabs = document.querySelectorAll('.aside-tab')
                for(const tab of tabs){
                    tab.dataset.name = "not";
                    tab.classList.remove("selected-tab")
                }
                e.target.dataset.name = "selected"
                e.target.classList.add("selected-tab")
                Render.showKindOfExercises()
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


    const logout = () => {
        main.dataset.userId = "nil"
        Render.clearUserNav()
        Render.removeUserView()
        Render.renderLogin()
    }

    const getUserStats = () => {
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL + userId)
            .then(response => (response.json()))
            .then(user => {
                // console.log(user.data.attributes.exercises)
                // render exercise stats to #content 
                Render.renderExerciseGraphData(user.data.attributes.days_month)
                Render.renderExercisesToAside(user.data.attributes.exercises)
            })       

    }
    const asideDivListener = () => {
        document.addEventListener('click', (e) => {
            const target = e.target
            if (target.matches("#removeRoutine")) {
                // delete fetch to routine using parent element id
            }
            if (target.matches(".routineLi")) {
                const content = document.querySelector("#content")
                content.innerHTML = ''

                getRoutine(target.dataset.routineId)
            }

        })
    }

    const contentDivListener = () => {
        document.addEventListener('click', (e) => {
            const target = e.target
            if (target.matches(".addEx")) {

                fetch(exerciseBaseUrl)
                    .then(response => response.json())
                    .then(data => {
                        renderRoutineEdit(data)
                    })
            }

            if (target.matches("#exLog")) {
                const exerciseId = target.parentElement
                const exerciseKind = target.parentElement.dataset.kind
                if (exerciseKind == "cardio") {
                    renderDayCardioForm(exerciseId)
                } else if (exerciseKind == "strength") {
                    renderDayStrengthForm(exerciseId)
                }


            }
        })
    }

    const renderRoutineEdit = (data) => {
        const content = document.querySelector("#content")
        const routineEditForm = document.createElement("form")
        routineEditForm.classList.add("exerciseForm")
        routineEditForm.innerHTML =
            `<label> Routine name </label> 
                    <select name = "exercises" id = "exercise" ></select>
                    <button type = "submit"> Add exercise to routine </button> 
                    <form>`
        content.append(routineEditForm)
        console.log(data)
        let exerciseOption = ``
        const exerciseSelect = document.querySelector("#exercise")
        for (const exercise of data) {
            exerciseOption = exerciseOption + `<option value = "${exercise.id}"> ${exercise.name} </option>`
            console.log(exerciseSelect)
        }
        exerciseSelect.innerHTML = exerciseOption
    }

    const renderDayCardioForm = (exerciseEl) => {
        const main = document.querySelector("main")
        exerciseEl.dataset.exerciseId
        main.dataset.userId
        const form = document.createElement('form')
        form.innerHTML = `
        <label> distance </label> 
        <input name = "distance">
        <label> time </label>
        <input name = "time">
        <button type ="submit" id ="newDay"> submit </button>
        `
        exerciseEl.append(form)
    }
    const renderDayStrengthForm = (exerciseEl) => {
        const main = document.querySelector("main")
        exerciseEl.dataset.exerciseId
        main.dataset.userId
        const form = document.createElement('form')
        form.innerHTML = `
        <label> weight </label> 
        <input name = "weight">
        <label> reps </label>
        <input name = "reps">
        <label> sets </label> 
        <input name = "sets">
        <button type ="submit" id ="newDay"> submit </button>
        `
        exerciseEl.append(form)
    }



    const renderRoutineForm = () => { //will fetch exercises from database to allow selection

        fetch(exerciseBaseUrl)
            .then(response => response.json())
            .then(data => {
                Render.createRoutineForm(data)
            })
    }

    const createRoutine = (options) => {

        fetch(routineURL, options)
            .then(response => (response.json()))
            .then(routine => {
                console.log(routine)
            })
    }

    const renderRoutine = (routine) => {
        const content = document.querySelector("#content")
        const exerciseList = document.createElement("ul")
        exerciseList.innerHTML = `<h3>${routine.data.attributes.name}</h3>`
        exerciseList.dataset.routineId = `${routine.data.id}`
        exerciseList.classList.add("routineTag")
        console.log(routine)
        for (const exercise of routine.data.attributes.exercises) {
            const exerciseLi = document.createElement("li")
            exerciseLi.innerHTML = `${exercise.name}
            <button id ="exLog">Log exercise</button>`
            exerciseLi.dataset.exerciseId = exercise.id
            exerciseLi.dataset.kind = exercise.kind
            exerciseList.append(exerciseLi)
        }
        const addExercise = document.createElement("button")
        addExercise.classList.add("addEx")
        addExercise.textContent = `Add an exercise`
        content.append(addExercise)

        content.prepend(exerciseList)

    }

    const getRoutine = (routineId) => {
        fetch(routineURL + routineId)
            .then(response => (response.json()))
            .then(routine => {
                renderRoutine(routine)
            })
    }
    contentDivListener();
    navClickListener();
    Render.renderLogin();
    createUserEvent();
    submitListener();
    asideDivListener();

})