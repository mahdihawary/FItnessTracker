document.addEventListener("DOMContentLoaded", function (e) {

    const baseURL = "http://localhost:3000/api/v1/users/"
    const exerciseBaseUrl = "http://localhost:3000/api/v1/exercises/"
    const dayBaseUrl = "http://localhost:3000/api/v1/days/"
    const routineURL = "http://localhost:3000/api/v1/routines/"
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontFamily = 'ui-monospace';

    const main = document.querySelector("main")
    const content = document.querySelector("#content")
    const aside = document.querySelector("#aside")
    // const formDiv = document.querySelector('.centered-form-div')

    const navClickListener = () => {
        let header = document.querySelector('header');
        header.addEventListener('click', e => {
            if (e.target.matches('h1')) {
                let userName = document.querySelector('main').dataset.userName
                User.UserLogin(userName)
            } else if (e.target.matches('.userIcon')) {
                userPage()
            } else if (e.target.matches('.logoutBtn')) {
                logout()
            } else if (e.target.matches('.statsButton')) {
                getUserStats()
                // Render.removeUserView()
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

                const exercise = target.parentElement
                if (exercise.dataset.kind =="cardio"){
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
                        distance: target.distance.value,
                        time: target.time.value
                    })
                }}
                else if (exercise.dataset.kind == "strength") {
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
                        })
                    }
                }
                fetch(dayBaseUrl, options)
                    .then(response => response.json())
                    .then()
                target.remove()

            } else if (target.matches('#newUser')) {

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
                    .then(data => {
                        getRoutine(routineId)
                    })


            } else if(e.target.matches("#editUser")){
                let userId = document.querySelector('main').dataset.userId

                e.preventDefault();
                console.log("edit user submit")
                options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: target.name.value,
                        weight: target.weight.value
                    })
                }
                fetch(baseURL + userId, options)
                    .then(response => response.json())
                    .then(user => {
                        User.UserLogin(user.name)
                    })
            }
            else if (e.target.matches("#addRoutine")){
                console.log("inside submit")
                const main = document.querySelector("main")
                options = {
                    
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: main.dataset.userId,
                        name: target.name.value,
                    })
                }
                createRoutine(options)
            }
        })
    }

    const exerciseClickListener = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('div[data-exercise-id]')) {
                const content = document.querySelector('#content')
                console.log(content)
                content.dataset.exerciseId = e.target.dataset.exerciseId
                content.dataset.kind = e.target.dataset.kind
                content.dataset.exerciseName = e.target.textContent
                console.log(e.target)
                getUserStats()
            } else if (e.target.matches('.aside-tab')) {
                let tabs = document.querySelectorAll('.aside-tab')
                for (const tab of tabs) {
                    tab.dataset.name = "not";
                    tab.classList.remove("selected-tab")
                }
                e.target.dataset.name = "selected"
                e.target.classList.add("selected-tab")
                Render.showKindOfExercises()
            }

        })
    }

    const userPageListener = () => {
        document.addEventListener("click", e => {
            let userId = document.querySelector('main').dataset.userId
            if(e.target.matches("#editUser")){
                let user = {
                    name: e.target.dataset.name,
                    weight: e.target.dataset.weight,
                    id: userId
                }
                Render.editUserForm(user)
            }

        })
    }

    const logout = () => {
        main.dataset.userId = "nil"
        Render.clearUserNav()
        Render.removeUserView()
        Render.renderLogin()
    }

    const userPage = () => {
        Render.removeUserView()
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL + userId)
        .then(response => (response.json()))
        .then(Render.renderUserPage)
    }

    const getUserStats = () => {
        // Render.renderAsideAndContentDiv()
        const userId = document.querySelector("main").dataset.userId
        fetch(baseURL + userId)
            .then(response => (response.json()))
            .then(user => {
                // render exercise stats to #content 
                Render.renderExerciseGraphData(user.data.attributes.days_month)
                Render.renderExercisesToAside(user.data.attributes.exercises)
            })

    }
    const asideDivListener = () => {
        document.addEventListener('click', (e) => {
            const target = e.target
            if (target.matches("#remove-routine")) {
                options = {
                    method: "DELETE",
                }
                console.log(target.parentElement.dataset.routineId)
                fetch(routineURL + target.parentElement.dataset.routineId, options)
                .then(response =>response.json())
                .then(user => User.getRoutines(user))
            }
            else if (target.matches(".routineLi")) {
                const content = document.querySelector("#content")
                content.innerHTML = ''
                

                getRoutine(target.dataset.routineId)
            }
            else if (target.matches("#addRoutine")){
                target.remove()
                renderRoutineForm()
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
        let exerciseOption = ``
        const exerciseSelect = document.querySelector("#exercise")
        for (const exercise of data) {
            exerciseOption = exerciseOption + `<option value = "${exercise.id}"> ${exercise.name} </option>`
        }
        exerciseSelect.innerHTML = exerciseOption
    }

    const renderDayCardioForm = (exerciseEl) => {
        const main = document.querySelector("main")
        const date = getDate()
        const form = document.createElement('form')
        form.id ="newDay"
        form.innerHTML = `
        <label> distance </label> 
        <input name = "distance">
        <input type="hidden" name="date" value="${date}">
        <input type="hidden" name="userId" value="${main.dataset.userId}">
        <input type="hidden" name="exerciseId" value="${exerciseEl.dataset.exerciseId}">
        <label> time </label>
        <input name = "time">
        <button type ="submit" id ="newDay"> submit </button>
        `
        exerciseEl.append(form)
    }
    const renderDayStrengthForm = (exerciseEl) => {
        const main = document.querySelector("main")
        const date = getDate()
        const form = document.createElement('form')
        form.id = "newDay"
        form.innerHTML = `
        <label> weight </label> 
        <input name = "weight">
        <label> reps </label>
        <input type = "hidden" name = "date" value = "${date}">
        <input type = "hidden" name = "userId" value = "${main.dataset.userId}">
        <input type = "hidden" name = "exerciseId" value = "${exerciseEl.dataset.exerciseId}">
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
            .then(user => {
                User.getRoutines(user)
            })
    }

    const getRoutine = (routineId) => {
        fetch(routineURL + routineId)
            .then(response => (response.json()))
            .then(routine => {
                Render.renderRoutine(routine)
            })
    }

    const getDate = () => {
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        date = yyyy + '/' + mm + '/' + dd;
        return date
        // date.toLocaleDateString()
        return date 
    }

    userPageListener();
    exerciseClickListener();
    contentDivListener();
    navClickListener();
    Render.renderLogin();
    createUserEvent();
    submitListener();
    asideDivListener();

})