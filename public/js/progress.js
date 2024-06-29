// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const challengeList = document.getElementById("inGameProgressList");
    responseData.forEach((challenge) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="progressCard glassmorphism-container1 text-white">
              <div class="challenge-card-body">
                  <h5 class="challenge-card-title">🌍 ${challenge.challenge_name}</h5>
                  <p class="challenge-card-text">
                      ${challenge.challenge_description}
                  </p>
                  <p class="challenge-card-text">
                      Reward: ${challenge.challenge_reward} points
                  </p>
                  <div>
                    <button id="progressCheck" class="btn btn-info text-white">Complete Progress</button>
                  </div>
              </div>
          </div>
          `;
      const button = displayItem.querySelector("#progressCheck");
      button.addEventListener("click", function () {
        completeProgress(challenge.challenge_id);
      });
      challengeList.appendChild(displayItem);
    });
  };

  const completeProgress = (challenge_id) => {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/challenge_progress/challenges/${challenge_id}`
    const modal = document.getElementById("modalBody");
    const callback = (responseStatus, responseChallengeData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseChallengeData:", responseChallengeData);
      const challenge_name = responseChallengeData[2];
      const challenge_reward = responseChallengeData[3];
      const player_points = responseChallengeData[1];
      if (responseStatus === 201) {
        modal.innerHTML = `
        <p>You have completed the challenge named  "${challenge_name}" and earned "${challenge_reward}" points<p>
        <p>Your current experience points is "${player_points} points"<p>
        `
      }
      else if (responseChallengeData.length > 0) {
        modal.innerHTML = `
        <h3 class="text-warning"><strong>You have already completed the challenge</strong><h5>
        <p>You need to wait for the next challenge to be available!</p>
        `
      }

      const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
      progressModal.show();
    };
    fetchMethod(url, callback, "POST", null, token);
  };
  fetchMethod(currentUrl + "/api/challenges", callback);
});


document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const taskList = document.getElementById("taskList");
    responseData.forEach((task) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="progressCardForTask glassmorphism-container1 text-white">
              <div class="challenge-card-body">
                  <h5 class="challenge-card-title">🌍 ${task.title}</h5>
                  <p class="challenge-card-text">
                      ${task.description}
                  </p>
                  <p class="challenge-card-text">
                      Reward: ${task.points} points
                  </p>
                  <form>
                    <div class="form-group">
                        <input type="email" class="form-control" id="notes" aria-describedby="emailHelp" placeholder="Enter notes">
                        <small id="emailHelp" class="form-text text-white">We'll never share your notes with anyone else.</small>
                    </div>
                  </form>
                  <div>
                    <button id="progressCheck" class="btn btn-primary mt-3">Complete Progress</button>
                  </div>
              </div>
          </div>
          `;
      const button = displayItem.querySelector("#progressCheck");
      const noteData = displayItem.querySelector("#notes");
      button.addEventListener("click", function () {
        completeProgress(task.task_id, noteData);
      });
      taskList.appendChild(displayItem);
    });
  };


  const completeProgress = (task_id, notes) => {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/task_progress/tasks/${task_id}`
    const modal = document.getElementById("modalBody");
    const callback = (responseStatus, responseChallengeData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseChallengeData:", responseChallengeData);
      const title = responseChallengeData[2];
      const points = responseChallengeData[3];
      const player_points = responseChallengeData[1];
      const playerNote = responseChallengeData[4];
      if (responseStatus === 201) {
        modal.innerHTML = `
            <p>You have completed the challenge named  "${title}" and earned "${points}" points<p>
            <p>Your current experience points is "${player_points} points"<p>
            <div style="border: 1px solid green; border-radius: 10px;">
                <p class="mt-3 ms-3">Your Notes : "${playerNote}"<p>
            </div>
            `
      }
      else {
        alert("You have already completed the challenge");
      }

      const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
      progressModal.show();
    };
    const note = notes.value;
    const data = { note: note };
    fetchMethod(url, callback, "POST", data, token);
  };
  fetchMethod(currentUrl + "/api/tasks", callback);
});