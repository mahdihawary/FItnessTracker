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


    static removeUserView(){
        document.querySelector("main").innerHTML = ``
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