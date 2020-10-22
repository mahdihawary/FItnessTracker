class Render{

    constructor() {
        
    }
    
    static createFormDiv(){
        const main = document.querySelector("main")
        const formDiv = document.createElement("div")
        formDiv.classList.add('centered-form-div')
        main.append(formDiv)
    }

    static removeFormDiv(){
        const formDiv = document.querySelector('.centered-form-div')
        formDiv.remove()
    }

    static renderLogin(){
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

    static removeLogin(){
        const formDiv = document.querySelector('.centered-form-div')
        formDiv.innerHTML = ``;
    }

    static createNewUserForm(node){
        const form = document.createElement("form")
        form.setAttribute("id", "newUser")
        form.innerHTML =`
        <h2>New User</h2>
        <label>Name</label>
        <input name = "name">
        <label>Weight</label> 
        <input name ="weight">
        <button type="submit">submit</button>
        `
        node.append(form)
    }

    static renderUserNav(){
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

    static clearUserNav(){
        document.querySelector('#userNav').innerHTML = '';
    }

    static renderAsideAndContentDiv () {
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

    static removeUserView(){
        document.querySelector("main").innerHTML = ``
    }

    static renderExercisesToAside(exercises) {
        const aside = document.querySelector("#aside");
        aside.innerHTML = ``;
        let asideTitle = document.createElement('h2');
        asideTitle.classList.add('asideTitle');
        asideTitle.textContent = `Exercises`;
        aside.append(asideTitle);

        const unique = [];
        let distincExercises = [];
        for( let i=0; i < exercises.length; i++){
            if( !unique[exercises[i].id] ){
                distincExercises.push(exercises[i])
                unique[exercises[i].id] = 1;
            }
        }
        for(let exercise of distincExercises){
            let asideBox = document.createElement('div');
            asideBox.classList.add('aside-box');
            asideBox.dataset.exerciseId = exercise.id
            asideBox.dataset.kind = exercise.kind
            asideBox.textContent = `${exercise.name}`
            aside.append(asideBox)
        }
    }

    static renderExerciseGraphData(days){
        let content = document.querySelector('#content')
        content.innerHTML = ``;
        let exerciseId = content.dataset.exerciseId
        // if(exerciseId === undefined){
        //     exerciseId = document.querySelectorAll('.aside-box')[0].dataset.exerciseId
        // }
        let h2 = document.createElement('h2');
        h2.textContent = content.dataset.exerciseName
        let ul = document.createElement('ul');
        console.log(exerciseId)
        let currentExerciseArray = [];
        for(const day of days){
            if( exerciseId == day.exercise_id){
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
                console.log(day)
                ul.append(li)
            }
        }
        content.append(h2, ul)
        // console.log(currentExerciseArray)

    }


    static createRoutineForm(data){
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
    }

}