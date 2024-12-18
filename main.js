console.log("It works");
const cafeTableBody = document.querySelector('#cafes tbody');
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
            const getPriceRange = document.querySelector('#price_range').value;
            const getSizeRange = document.querySelector('#size_range').value;

            const jsonObjectToPost = {
                name: getName,
                location: getLocation,
                rating: getRating,
                description: getDescription,
                price_range: getPriceRange,
                size: getSizeRange
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
    const params = new URLSearchParams();

    if (name) {
        params.append("name", name);
    }
    if (location) {
        params.append("location", location);
    }
    if (rating) {
        params.append("rating", rating);
    }
    if (price_range) {
        params.append("price_range", price_range);
    }
    if (size) {
        params.append("size", size);
    }
    if (description) {
        params.append("description", description);
    }

    const query = `/cafes?${params.toString()}`;

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
            cafeTableBody.innerHTML = "";

            // Hvis der ikke er nogle cafeer
            if (data.length === 0) {
                cafeTableBody.innerHTML = "<li>No cafes found matching your search</li>";
                return;
            }

            // Tilføj hver cafe
            data.forEach(cafe => {
                const listCafes = document.createElement("li");
                listCafes.innerText = `${cafe.name}, ${cafe.location}, Rating: ${cafe.rating}), 
                Price range: ${cafe.price_range} - Size: ${cafe.size}`;
                cafeTableBody.appendChild(listCafes);

                const createFavoriteButton = document.createElement('button')
                createFavoriteButton.dataset.id = cafe.cafe_id
                createFavoriteButton.innerHTML = "Favorite"
                listCafes.appendChild(createFavoriteButton)
            });
        })
        .catch(error => {
            console.error("Error fetching cafes:", error);
            cafeTableBody.innerHTML = "<li>Error fetching cafes. Please try again later.</li>";
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

// JavaScript to fetch cafe data and display it in the table

document.addEventListener("DOMContentLoaded", function() {
    // Get the table body where cafe data will be inserted
    const cafeTableBody = document.querySelector('#cafes tbody');


    // Fetch cafes data from the API
    fetch('http://localhost:4000/cafes/all')
        .then(response => response.json())
        .then(data => {
            // Clear any existing rows in the table body
            cafeTableBody.innerHTML = '';


            // Check if data exists
            if (data && Array.isArray(data)) {
                data.forEach(cafe => {
                    const row = document.createElement('tr');


                    // Create table data cells for each cafe property
                    const nameCell = document.createElement('td');
                    nameCell.textContent = cafe.name;
                    row.appendChild(nameCell);


                    const ratingCell = document.createElement('td');
                    ratingCell.textContent = cafe.rating;
                    row.appendChild(ratingCell);


                    // Append the row to the table body
                    cafeTableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching cafes data:', error);
        });
});


