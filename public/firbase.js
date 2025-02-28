
    // Initialize Firebase

    function saveData() {
      const inputData = document.getElementById("username").value;
      localStorage.setItem("data", inputData);
    }
    const firebaseConfig = {
        apiKey: "AIzaSyAOm9KenCnGOyhBx_tN4zL2r8Qz0ABNHP4",
        authDomain: "login-ea077.firebaseapp.com",
        databaseURL: "https://login-ea077-default-rtdb.firebaseio.com/",
        projectId: "login-ea077",
        storageBucket: "login-ea077.appspot.com",
        messagingSenderId: "653281759783",
        appId: "1:653281759783:web:130cdf89ad6a92706e3402",
        measurementId: "G-NQ0XF8BDZQ"
    };


    firebase.initializeApp(firebaseConfig);

    // Get a reference to the Firebase Realtime Database
    const database = firebase.database();

    


    
    // Function to log in
    function login(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // document.getElementById("message").textContent = "Logged in successfully!";
                // fetchSigninDetails();
                // alert("Signup error: " + email);
                window.location.href = "dashboard.html";
                
            })
            .catch((error) => {
                //document.getElementById("message").textContent = "Login error: " + error.message;
                alert("Login error: " + error.message)
            });



            
    }

    // Function to sign up
    function signup(event) {
        event.preventDefault();

        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const reg = document.getElementById("id").value;
        const name = document.getElementById("username").value;




        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Get the user ID
                const userId = userCredential.user.uid;

                // Store the signup details in the database
                database.ref("users/" + userId).set({
                    name: name,
                    registration_Num: reg,
                    email: email,
                    password: password
                });

                //document.getElementById("message").textContent = "Signed up successfully!";
                alert("Signed up successfully!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                //document.getElementById("message").textContent = "Signup error: " + error.message;
                alert("Signup error: " + error.message)
            });
    }

    // Function to fetch sign-in details
    function fetchSigninDetails() {
        const signinList = document.getElementById("signinList");

        // Retrieve all users from the database
        database.ref("users").once("value")
            .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    const email = user.email;

                    // Create a list item and append the email to the list
                    const listItem = document.createElement("li");
                    listItem.textContent = email;
                    signinList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.log("Fetch error: " + error.message);
            });
    }

