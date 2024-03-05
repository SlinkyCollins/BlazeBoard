// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,  signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, TwitterAuthProvider} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBuTyztbVddBg8MSLayUeNzUp68_bwHTlk",
    authDomain: "practice-cf4ba.firebaseapp.com",
    projectId: "practice-cf4ba",
    storageBucket: "practice-cf4ba.appspot.com",
    messagingSenderId: "873343868277",
    appId: "1:873343868277:web:4e920839bded3cf8a1073c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // GitHub Sign In
  const gitBut = () => {
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      if(user){
        window.location.href = "dashboard.html"
      } else {
        window.location.href = "index.html"
      }
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    })
  }
  window.gitBut = gitBut;

  // Sign Up page
  function signUp() {
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let displayName = document.getElementById('displayName').value;
      const errorMessageContainer = document.getElementById('errorMessageContainer');

    if (email != "" && password != "" && displayName != ""){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
            const user = userCredential.user
            sendEmailVerification(auth.currentUser);
            console.log(user);
            if (email == user.email) {
                window.location.href = "index.html"
            }
            document.getElementById('displayName').value = ""
            document.getElementById('email').value = ""
            document.getElementById('password').value = ""
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

        if (errorCode == "auth/email-already-in-use"){
            errorMessageContainer.style.display = "block";
            errorMessageContainer.textContent = "Email already in use. Please use a different email address."
            errorMessageContainer.style.borderColor = "#ff0000";
            errorMessageContainer.style.color = "#ff0000";
            errorMessageContainer.style.backgroundColor = "#ffe6e6";
            setTimeout(() => {
                errorMessageContainer.style.display = "none";
            }, 3000)
        } else if (password.length < 6){
            errorMessageContainer.style.display = "block";
            errorMessageContainer.textContent = "Password must be at least six characters, please try again"
            errorMessageContainer.style.fontSize = "12px";
            errorMessageContainer.style.borderColor = "#ff0000";
            errorMessageContainer.style.backgroundColor = "#ffe6e6";
            errorMessageContainer.style.color = "#ff0000";
            setTimeout(() => {
                errorMessageContainer.style.display = "none";
            }, 3000)
          } else if (errorCode == "auth/invalid-email"){
            errorMessageContainer.style.display = "block";
            errorMessageContainer.textContent = "Invalid Email address, please try again."
            errorMessageContainer.style.borderColor = "#ff0000";
            errorMessageContainer.style.fontSize = "11px";
            errorMessageContainer.style.color = "#ff0000";
            errorMessageContainer.style.backgroundColor = "#ffe6e6";
            setTimeout(() => {
                errorMessageContainer.style.display = "none";
            }, 3000)
          } else if (errorCode == "auth/network-request-failed"){
            errorMessageContainer.style.display = "block";
            errorMessageContainer.textContent = "Network error, please check your internet connection and try again."
            errorMessageContainer.style.borderColor = "#ffc107";
            errorMessageContainer.style.fontSize = "12px";
            errorMessageContainer.style.color = "#ffc107";
            errorMessageContainer.style.backgroundColor = "#fff3cd";
            setTimeout(() => {
                errorMessageContainer.style.display = "none";
            }, 3000)
          }
        });
    } else {
        errorMessageContainer.style.display = "block";
        errorMessageContainer.textContent = "Please fill in the empty space(s)";
        errorMessageContainer.style.color = "red";
        errorMessageContainer.style.fontSize = "10px";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 3000)
    }
  }
  window.signUp = signUp;

  //Sign In Page
  const signIn = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let errorMessageContainer = document.getElementById('errorMessageContainer');

    if(email !="" && password !="") {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            if(user){
                window.location.href = "dashboard.html";
                // console.log(user);
            } else {
                window.location.href = "index.html";
            }
            document.getElementById('email').value = ""
            document.getElementById('password').value = ""
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            
            if(errorCode == "auth/invalid-credential") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Incorrect Email address or Password, please try again."
                errorMessageContainer.style.borderColor = "#ff0000";
                errorMessageContainer.style.fontSize = "10px";
                errorMessageContainer.style.color = "#ff0000";
                errorMessageContainer.style.backgroundColor = "#ffe6e6";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000) 
            } else if(errorCode == "auth/wrong-password") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Invalid Password, please try again."
                errorMessageContainer.style.borderColor = "#ff0000";
                errorMessageContainer.style.fontSize = "10px";
                errorMessageContainer.style.color = "#ff0000";
                errorMessageContainer.style.backgroundColor = "#ffe6e6";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000) 
            } else if(errorCode == "auth/invalid-email") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Invalid Email address, please try again."
                errorMessageContainer.style.borderColor = "#ff0000";
                errorMessageContainer.style.fontSize = "10px";
                errorMessageContainer.style.color = "#ff0000";
                errorMessageContainer.style.backgroundColor = "#ffe6e6";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
            } else if (errorCode == "auth/network-request-failed"){
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Network error, please check your internet connection and try again."
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              } else if (errorCode == "auth/too-many-requests") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Too many requests, pls try again later."
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              } else if (errorCode == "auth/user-not-found") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "User not found"
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              } else if (errorCode == "auth/operation-not-allowed") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Operation not allowed"
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              }
        });
    } else {
        errorMessageContainer.style.display = "block";
        errorMessageContainer.textContent = "Please fill in the empty space(s)";
        errorMessageContainer.style.color = "red";
        errorMessageContainer.style.fontSize = "10px";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 3000)
    }
  }
  window.signIn = signIn;


  //Google Sign In
const gBut = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    if (user) {
        window.location.href = "dashboard.html"
    } else {
        window.location.href = "index.html"
    }
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);

    if (errorCode == "auth/operation-not-allowed") {
        errorMessageContainer.style.display = "block";
        errorMessageContainer.textContent = "Operation not allowed"
        errorMessageContainer.style.borderColor = "#ffc107";
        errorMessageContainer.style.fontSize = "12px";
        errorMessageContainer.style.color = "#ffc107";
        errorMessageContainer.style.backgroundColor = "#fff3cd";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 3000)
      } else if (errorCode == "auth/popup-closed-by-user") {
        errorMessageContainer.style.display = "block";
        errorMessageContainer.textContent = "Popup closed by user"
        errorMessageContainer.style.borderColor = "#ffc107";
        errorMessageContainer.style.fontSize = "12px";
        errorMessageContainer.style.color = "#ffc107";
        errorMessageContainer.style.backgroundColor = "#fff3cd";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 3000)
      } else if (errorCode == "auth/cancelled-popup-request") {
        errorMessageContainer.style.display = "block";
        errorMessageContainer.textContent = "Popup request cancelled by user"
        errorMessageContainer.style.borderColor = "#ffc107";
        errorMessageContainer.style.fontSize = "12px";
        errorMessageContainer.style.color = "#ffc107";
        errorMessageContainer.style.backgroundColor = "#fff3cd";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 3000)
      }
  });
}
window.gBut = gBut;


    // Twitter Sign In
    const twitBut = () => {
        signInWithPopup(auth, twitterProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            if(user) {
              window.location.href = "dashboard.html"
            } 
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

            if (errorCode == "auth/operation-not-allowed") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Operation not allowed"
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              } else if (errorCode == "auth/popup-closed-by-user") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Popup closed by user"
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              } else if (errorCode == "auth/cancelled-popup-request") {
                errorMessageContainer.style.display = "block";
                errorMessageContainer.textContent = "Popup request cancelled"
                errorMessageContainer.style.borderColor = "#ffc107";
                errorMessageContainer.style.fontSize = "12px";
                errorMessageContainer.style.color = "#ffc107";
                errorMessageContainer.style.backgroundColor = "#fff3cd";
                setTimeout(() => {
                    errorMessageContainer.style.display = "none";
                }, 3000)
              }

            // The email of the user's account used.
            // const email = error.customData.email;
            // console.log(email);
          });
    }
    window.twitBut = twitBut;

    