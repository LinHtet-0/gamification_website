// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const challengeList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
            <div class="progressCard glassmorphism-container1 text-white">
                <div class="challenge-card-body">
                    <h5 class="challenge-card-title">🌍 ${task.title}</h5>
                    <p class="challenge-card-text">
                        ${task.description}
                    </p>
                    <p class="challenge-card-text">
                        Reward: ${task.points} points
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
                deleteProgress(task.task_id);
            });

            const buttonUpdate = displayItem.querySelector("#progressCheck");
            buttonUpdate.addEventListener("click", function () {
                updateProgress(task.task_id);
            });

            challengeList.appendChild(displayItem);
        });
    };

    const deleteProgress = (task_id) => {
        const url = currentUrl + `/api/tasks/${task_id}`
        const callback = (responseStatus, responseChallengeData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseChallengeData:", responseChallengeData);

            if (responseStatus === 204) {
                window.location.reload();
            }
        };
        fetchMethod(url, callback, "DELETE");
    };

    const updateProgress = (task_id) => {
        const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
        progressModal.show();

        const updateButton = document.getElementById("updateButton");
        updateButton.addEventListener("click", function (event) {
            event.preventDefault();

            const task_name = document.getElementById("task_name").value;
            const task_description = document.getElementById("task_description").value;
            const task_reward = document.getElementById("task_reward").value;

            const data = {
                task_name: task_name,
                task_description: task_description,
                task_reward: task_reward
            }

            const url = currentUrl + `/api/tasks/${task_id}`
            const callback = (responseStatus, responseChallengeData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseChallengeData:", responseChallengeData);

                if (responseStatus === 200) {
                    alert("Update Successfully!")
                    window.location.reload();
                }
                else {
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
            const task_name = document.getElementById("post_task_name").value;
            const task_description = document.getElementById("post_task_description").value;
            const task_reward = document.getElementById("post_task_reward").value;

            const data = {
                task_name: task_name,
                task_description: task_description,
                task_reward: task_reward
            }

            const url = currentUrl + `/api/tasks/`
            const callback = (responseStatus, responseChallengeData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseChallengeData:", responseChallengeData);

                if (responseStatus === 201) {
                    alert("Create Successfully!")
                    window.location.reload();
                }
                else {
                    alert("ERROR : Your input value for reward should be integer! or Your input value for name and description should not be empty!")
                    window.location.reload();
                }
            };
            fetchMethod(url, callback, "POST", data);
        });
    }
    fetchMethod(currentUrl + "/api/tasks", callback);
});
