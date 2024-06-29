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
                      <button id="deleteProgress" class="btn btn-outlint-dark text-white">Delete</button>
                      <button id="progressCheck" class="btn btn-info text-white">Update</button>
                    </div>
                </div>
            </div>
            `;
        const button = displayItem.querySelector("#deleteProgress");
        button.addEventListener("click", function () {
          deleteProgress(challenge.challenge_id);
        });

        const buttonUpdate = displayItem.querySelector("#progressCheck");
        buttonUpdate.addEventListener("click", function () {
          updateProgress(challenge.challenge_id);
        });

        challengeList.appendChild(displayItem);
      });
    };
  
    const deleteProgress = (challenge_id) => {
      const url = currentUrl + `/api/challenges/${challenge_id}`
      const callback = (responseStatus, responseChallengeData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseChallengeData:", responseChallengeData);

        if (responseStatus === 200) {
          window.location.reload();
        }
      };
      fetchMethod(url, callback, "DELETE");
    };

    const updateProgress = (challenge_id) => {
        const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
        progressModal.show();
        
        const updateButton = document.getElementById("updateButton");
        updateButton.addEventListener("click", function (event) {
            event.preventDefault();
            
            const challenge_name = document.getElementById("challenge_name").value;
            const challenge_description = document.getElementById("challenge_description").value;
            const challenge_reward = document.getElementById("challenge_reward").value;
            
            const data = {
                challenge_name: challenge_name,
                challenge_description: challenge_description,
                challenge_reward: challenge_reward
            }
            
            const url = currentUrl + `/api/challenges/${challenge_id}`
            const callback = (responseStatus, responseChallengeData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseChallengeData:", responseChallengeData);
        
                if (responseStatus === 200) {
                    alert("Update Successfully!")
                    window.location.reload();
                }
                else{
                    alert("ERROR : Your input value for reward should be integer!")
                    window.location.reload();
                }
            };
            fetchMethod(url, callback, "PUT", data);
        });
    };

    const buttonC = document.getElementById("postButton");
    buttonC.addEventListener("click", function () {
        createProgress();
    });

    const createProgress = () => {
        const createModal = new bootstrap.Modal(document.getElementById('createModal'));
        createModal.show();
        const buttonCreate = document.getElementById("createButton");
        buttonCreate.addEventListener("click", function (event) {
            event.preventDefault();
            const challenge_name = document.getElementById("post_challenge_name").value;
            const challenge_description = document.getElementById("post_challenge_description").value;
            const challenge_reward = document.getElementById("post_challenge_reward").value;
            
            const data = {
                challenge_name: challenge_name,
                challenge_description: challenge_description,
                challenge_reward: challenge_reward
            }

            
            const url = currentUrl + `/api/challenges/`
            const callback = (responseStatus, responseChallengeData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseChallengeData:", responseChallengeData);
        
                if (responseStatus === 201) {
                    alert("Create Successfully!")
                    window.location.reload();
                }
                else{
                    alert("ERROR : Your input value for reward should be integer! or Your input value for name and description should not be empty!")
                    window.location.reload();
                }
            };
            fetchMethod(url, callback, "POST", data);
        });
    }
    fetchMethod(currentUrl + "/api/challenges", callback);
  });
  