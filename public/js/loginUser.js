// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 200) {
      // Check if login was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        console.log(responseData);
        const userId = parseInt(responseData.user_id);
        if (userId === 1) {
          window.location.href = "challengeStatistic.html";
        }
        else {
          window.location.href = "profile.html";
        }

      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
      setTimeout(() => {
        warningCard.classList.add("d-none");
      }, 3000);
    }
  };

  const loginForm = document.getElementById("loginForm");

  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      username: username,
      password: password,
    };
    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    // Reset the form fields
    loginForm.reset();
  });
});