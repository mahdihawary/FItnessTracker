document.addEventListener("DOMContentLoaded", function (e) {
    const baseURL ="http://localhost:3000/api/v1/users/"

    
fetch(baseURL+1)
.then(response =>(response.json()))
.then(user => (console.log(user)))

})