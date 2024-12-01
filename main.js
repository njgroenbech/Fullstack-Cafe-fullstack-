console.log("It works");
const cafeList = document.querySelector('#all-cafe')
const submitButtonCafe = document.querySelector("#submitCafe");

// check if username exists in users table
function validateUsernameBeforeRegister() {
    const username = document.querySelector("#usernameRequired").value; // Hent værdien fra inputfeltet

    if (!username) {
        alert("Please provide a username.");
        return Promise.reject("Username is required");
    }

    // Check if username exists
    return fetch(`http://localhost:4000/users/check?username=${username}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Username does not exist");
            }
        })
        .then(data => {
            if (data.exists) {
                return true; // Username is valid
            } else {
                throw new Error("Username does not exist");
            }
        })
        .catch(error => {
            alert(error.message);
            return Promise.reject(error);
        });
}

// -------------------------- Button to Add New Cafe -------------------
submitButtonCafe.addEventListener("click", () => {
    validateUsernameBeforeRegister()
        .then(()=> {
            const getName = document.querySelector("#name").value;
            const getLocation = document.querySelector("#location").value;
            const getRating = document.querySelector('#rating').value;
            const getDescription = document.querySelector('#description').value;


            const jsonObjectToPost = {
                name: getName,
                location: getLocation,
                rating: getRating,
                description: getDescription
            };

            const fetchConfiguration = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonObjectToPost)
            };

            // Send data to server and play confetti when success
            fetch("http://localhost:4000/cafes/new", fetchConfiguration)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: {y: 0.6}
                    });
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        });
});


const submitButtonUser = document.querySelector("#submitUser");

// -------------------------- Button to Add New User -------------------
submitButtonUser.addEventListener("click", () => {
    const getNameUser = document.querySelector("#username").value;
    const getEmailUser = document.querySelector("#email").value;
    const getPassword = document.querySelector('#password').value;

    const jsonObjectToPostUser = {
        username: getNameUser,
        email: getEmailUser,
        password: getPassword
    };

    const fetchConfigurationUser = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObjectToPostUser)
    };

    // Send data to server and play confetti when success
    fetch("http://localhost:4000/users/new", fetchConfigurationUser)
        .then(async (res) => {
            if (res.status === 201) {
                const responseBody = await res.json();
                console.log(responseBody.message);

                // Trigger confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                console.error('Error:', res.status);
            }
        })

});

const filterButton = document.querySelector("#filterButton");


// Funktion til at hive fat og vise cafeerne
function fetchCafesBySearchFilter() {
    // Indsamling af inputværdier
    const name = document.querySelector("#nameF").value;
    const location = document.querySelector("#locationF").value;
    const rating = document.querySelector("#ratingF").value;
    const price_range = document.querySelector('#prices').value
    const description = document.querySelector("#descriptionF").value;
    const size = document.querySelector('#size').value

    // Opbyg query string baseret på brugerens input
    let query = "/cafes?";
    if (name) {
        query += `name=${name}&`;
    }
    if (location) {
        query += `location=${location}&`;
    }
    if (rating) {
        query += `rating > ${rating}&`;
    }
    if (price_range) {
        query += `price_range=${price_range}`
    }
    if (size) {
        query += `size=${size}`
    }
    if (description) {
        query += `description=${description}`;
    }
    // Handle multiple conditions (search filters)

    // Lav en fetch anmodning til vores API
    fetch(`http://localhost:4000${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch cafes");
            }
            return response.json();
        })
        .then(data => {
            /// Til at fjerne hvad der er i forvejen
            cafeList.innerHTML = "";

            // Hvis der ikke er nogle cafeer
            if (data.length === 0) {
                cafeList.innerHTML = "<li>No cafes found matching your search</li>";
                return;
            }

            // Tilføj hver cafe
            data.forEach(cafe => {
                const listCafes = document.createElement("li");
                listCafes.innerText = `${cafe.name}, ${cafe.location}, Rating: ${cafe.rating}), 
                Price range: ${cafe.price_range} - Size: ${cafe.size}`;
                cafeList.appendChild(listCafes);

                const createFavoriteButton = document.createElement('button')
                createFavoriteButton.dataset.id = cafe.cafe_id
                createFavoriteButton.innerHTML = "Favorite"
                listCafes.appendChild(createFavoriteButton)
            });
        })
        .catch(error => {
            console.error("Error fetching cafes:", error);
            cafeList.innerHTML = "<li>Error fetching cafes. Please try again later.</li>";
        });
}

// Event listener til filter-knappen
filterButton.addEventListener("click", fetchCafesBySearchFilter);

// Function to handle logins
async function login () {
    const usernameValue = document.querySelector('#loginUsername').value
    const passwordValue = document.querySelector('#loginPassword').value
    console.log('Sending data to login endpoint:', { username: usernameValue, password: passwordValue });
    const url = ('http://localhost:4000/login')
    // Check if username and password exist
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameValue,
                password: passwordValue,
            }),
        });
        if (!response.ok) {
            throw new Error
        }
        const json = await response.json();
        console.log("successfully logged in")
    } catch (error) {
        console.error(error.message)
    }
}

// Click event for login
const loginButton = document.querySelector('#loginButton')
loginButton.addEventListener('click', login)

