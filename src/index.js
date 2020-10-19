document.addEventListener("DOMContentLoaded", function (e) {
    const baseURL = "http://localhost:3000/api/v1/users/"
    const main = document.querySelector("main")



    const createUserEvent = () => {
        document.addEventListener('click', (e) => {
            const target = e.target

            if (target.matches("#signup")) {
                User.create(main)
            }

        })
    }
    const submitListener = () => {
        document.addEventListener('submit', (e) => {
            e.preventDefault()
            const target = e.target
            console.log(target.name.value)
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
        })
    }


    fetch(baseURL + 1)
        .then(response => (response.json()))
        .then(user => {
            const newUser = new User(user)
            newUser.render(main)
        })





    createUserEvent()
    submitListener()
})