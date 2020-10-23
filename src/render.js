class Render {

    constructor() {

    }

    static createFormDiv() {
        const main = document.querySelector("main")
        const formDiv = document.createElement("div")
        formDiv.classList.add('centered-form-div')
        main.append(formDiv)
    }

    static removeFormDiv() {
        const formDiv = document.querySelector('.centered-form-div')
        formDiv.remove()
    }

    static renderLogin() {
        Render.createFormDiv()
        const formDiv = document.querySelector('.centered-form-div')
        formDiv.innerHTML = `
            <form id="login">
                <label>UserName</label> 
                <input name = "name">
                <button type = "submit"> login </button>
                <button id="signup"> signup </button>
            </form>
        `
    }

    static removeLogin() {
        const formDiv = document.querySelector('.centered-form-div')
        formDiv.innerHTML = ``;
    }

    static createNewUserForm(node) {
        const form = document.createElement("form")
        form.setAttribute("id", "newUser")
        form.innerHTML = `
        <h2>New User</h2>
        <label>Name</label>
        <input name = "name">
        <label>Weight</label> 
        <input name ="weight">
        <button type="submit">submit</button>
        `
        node.append(form)
    }

    static renderUserNav() {
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

    static clearUserNav() {
        document.querySelector('#userNav').innerHTML = '';
    }

    static renderAsideAndContentDiv() {
        const main = document.querySelector("main")
        main.innerHTML = `
        <aside id="aside"></aside>
        <div class="content" id="content">
        `
    }

    static removeContentDivContent() {
        document.querySelector("#content").innerHTML = ``
    }

    static removeAsideDivContent() {
        document.querySelector("#aside").innerHTML = ``
    }

    static removeUserView() {
        document.querySelector("main").innerHTML = ``
    }

    static renderExercisesToAside(exercises) {
        const aside = document.querySelector("#aside");
        aside.innerHTML = ``;
        let asideHeader = document.createElement('div');
        asideHeader.classList.add('aside-header')
        asideHeader.innerHTML = `
            <h2>Exercises</h2>
            <h3 class="aside-tab selected-tab" data-name="selected">Strength</h3>
            <h3 class="aside-tab" data-name="">Cardio</h3>
        `
        aside.append(asideHeader);
        const unique = [];
        let distincExercises = [];
        for (let i = 0; i < exercises.length; i++) {
            if (!unique[exercises[i].id]) {
                distincExercises.push(exercises[i])
                unique[exercises[i].id] = 1;
            }
        }
        for (let exercise of distincExercises) {
            let asideBox = document.createElement('div');
            asideBox.classList.add('aside-box');
            asideBox.dataset.exerciseId = exercise.id
            asideBox.dataset.kind = exercise.kind
            asideBox.textContent = `${exercise.name}`
            aside.append(asideBox)
        }
        Render.showKindOfExercises()
    }

    static showKindOfExercises() {
        let tabs = document.querySelectorAll('.aside-tab')
        let exercises = document.querySelectorAll('.aside-box')

        for (const exercise of exercises) {
            exercise.style.display = "none"
        }
        if (tabs[0].dataset.name === "selected") {
            for (const ex of exercises) {
                if (ex.dataset.kind === "strength") {
                    ex.style.display = "block";
                }
            }
        } else if (tabs[1].dataset.name === "selected") {
            for (const ex of exercises) {
                if (ex.dataset.kind === "cardio") {
                    ex.style.display = "block";
                }
            }
        }
    }

    static renderExerciseGraphData(days) {
        let content = document.querySelector('#content')
        content.innerHTML = ``;
        let exerciseId = content.dataset.exerciseId

        // if(exerciseId){
        //     exerciseId = document.querySelectorAll('.aside-box')[0].dataset.exerciseId
        // }
        let h2 = document.createElement('h2');
        h2.textContent = content.dataset.exerciseName
        let ul = document.createElement('ul');
        let currentExerciseArray = [];
        for (const day of days) {
            if (exerciseId == day.exercise_id) {
                currentExerciseArray.push(day)
                let li = document.createElement('li');
                li.innerHTML = `
                    <p>Date: ${day.date}</p>
                    <p>Weight: ${day.weight}</p>
                    <p>Rep: ${day.rep}</p>
                    <p>Set: ${day.set}</p>
                    <p>Distance: ${day.distance}</p>
                    <p>Time: ${day.time}</p>
                `
                // ul.append(li)
            }
        }
    currentExerciseArray.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
        })

        let weight = []
        for (let day of currentExerciseArray) {
            weight.push(day.weight)
        }
        let date = []
        for (let day of currentExerciseArray) {
            date.push(day.date)
        }

        let distance = []
        for (let day of currentExerciseArray) {
            distance.push(day.distance)
        }

        let time = []
        for (let day of currentExerciseArray) {
            time.push(day.time)
        }

        let speed = [];
        for (let i = 0; i < time.length; i++) {
            speed.push((distance[i] / time[i])*60);
        }
        const canvas = document.createElement("canvas")
        const canvas2 = document.createElement("canvas")

        canvas.classList.add("graph")
        canvas2.classList.add("graph")
        if (content.dataset.kind == "cardio") {
            let graph = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                        label: `${content.dataset.exerciseName} Distance`,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: distance
                    }]
                }
            })
            content.append(canvas)
            let graph2 = new Chart(canvas2, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                        label: `${content.dataset.exerciseName} Speed in mph`,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: speed,
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                , scales: {
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                                    color: 'rgb(255, 0, 0)'
                            },

                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                            color: 'rgb(255, 0, 0)'
                            }
                        }]}}
            })
            content.append(canvas2)
        } else if (content.dataset.kind == "strength") {
            {
                let graph = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: date,
                        datasets: [{
                            label: `${content.dataset.exerciseName} weight`,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: weight
                        }]
                    }
                })
                content.append(canvas)
            }
        }
        // content.append(h2, ul)

    }


    static createRoutineForm(data) {
        const routineForm = document.createElement("form")
        routineForm.innerHTML = `
            <form id ="routine">
            < label >Routine name< /label>  
            <input name = "name" >
            <select name = "exercises" id = "exercise">
            </select>
            < button type = "submit" > Create Routine < /button>
            < /form>`
        for (const exercise of data) {
            let exerciseSelect = document.querySelector("select")
            let exerciseOption = `<option value = "${exercise.id}" > ${exercise.name} </option>`
            exerciseSelect.append(exerciseOption)
        }
    }

    static renderRoutineItems(exercise) {
        let exerciseList = document.querySelector("ul[data-routine-id]")

        const exerciseLi = document.createElement("li")
        exerciseLi.classList.add('aside-box')
        exerciseLi.innerHTML = `${exercise.name}
            <button id ="exLog">Log exercise</button>`
        exerciseLi.dataset.exerciseId = exercise.id
        exerciseLi.dataset.kind = exercise.kind
        exerciseList.append(exerciseLi)

    }


    static renderRoutine(routine) {
        const content = document.querySelector("#content")
        content.innerHTML = `<h3>${routine.data.attributes.name}</h3>`
        const exerciseList = document.createElement("ul")
        exerciseList.dataset.routineId = `${routine.data.id}`
        exerciseList.classList.add("routineTag")
        content.append(exerciseList)
        for (const exercise of routine.data.attributes.exercises) {
            // need to pass name for new exercise
            Render.renderRoutineItems(exercise)
        }
        const addExercise = document.createElement("button")
        addExercise.classList.add("addEx")
        addExercise.textContent = `Add an exercise`
        content.append(addExercise)

    }

}