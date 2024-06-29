// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    console.log(responseData);
    const messages = responseData[0];
    const loginPlayerId = responseData[1];
    const messageList = document.getElementById("messageList");
    messages.forEach((message) => {

      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 leaderboard-item";
      displayItem.innerHTML = `
            <div class="my-2 ${loginPlayerId === message.player_id ? 'userMessage' : 'glassmorphism-container1'}">
                <div class="card-body clickable"">
                    <div class="card-text">
                        <p class="mb-0 text-white"><strong>Player Name</strong></p>
                        <p class="mb-0 text-white">${message.player_id == loginPlayerId ? "👉 YOU" : `${message.player_name}`}</p>
                    </div>
                    <div class="card-text d-flex">
                    <p class="mb-0 text-white"><strong>⏲</strong></p>
                    <p class="mb-0 text-white">${message.message_created_on}</p>
                    </div>
                    <div class="card-text">
                        <p class="mb-0 text-white"><strong>Message</strong></p>
                        <p class="mb-0 text-white">${message.message}</p>
                    </div>
                    <img class="profile-image_for_message" src="${message.player_id == loginPlayerId ? './images/messageProfile.png' : './images/profile.png'}"/>
                    <div class="playerAccess d-flex">
                      ${message.player_id == loginPlayerId
          ? `<div id="editPlayerMessage" style="cursor: pointer" data-message-id="${message.id}" class="me-3"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></div>`
          : ''
        }
                      ${message.player_id == loginPlayerId
          ? `<div id="deletePlayerMessage" style="cursor: pointer" data-message-id="${message.id}"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></div>`
          : ''
        }
                    </div>
                   
                </div>
            </div>
        `;
      messageList.appendChild(displayItem);

      const deletePlayerMessage = displayItem.querySelector("#deletePlayerMessage");

      const editPlayerMessage = displayItem.querySelector("#editPlayerMessage");
      if (editPlayerMessage) {
        editPlayerMessage.addEventListener("click", function () {
          const messageId = this.getAttribute("data-message-id");
          const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
          progressModal.show();
          const updateButton = document.getElementById("updateButton");
          updateButton.addEventListener("click", function () {
            const updateMessage = document.getElementById("updateMessage");
            const message = updateMessage.value;
            if (message != null) {
              const messageData = {
                message: message,
              };
              const callbackForEditMessage = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus === 204) {
                  window.location.reload();
                }
              };
              fetchMethod(currentUrl + `/api/messages/${messageId}`, callbackForEditMessage, "PUT", messageData);
            }
          });
        });
      }

      if (deletePlayerMessage) {
        deletePlayerMessage.addEventListener("click", function () {
          const messageId = this.getAttribute("data-message-id");
          const callbackForDeleteMessage = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus === 204) {
              window.location.reload();
            }
          };
          fetchMethod(currentUrl + `/api/messages/${messageId}`, callbackForDeleteMessage, "DELETE");
        });
      }
    });

    const submit = document.getElementById("submit");
    const input_value = document.getElementById("sendMessage");
    submit.addEventListener("click", function (event) {
      event.preventDefault();
      const message = input_value.value;
      const messageData = {
        message: message,
      };
      const callbackForMessage = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus === 201) {
          window.location.reload();
        }
      };
      fetchMethod(currentUrl + "/api/messages", callbackForMessage, "POST", messageData, token);
    });
  };

  // Replace the URL below with your actual API endpoint
  fetchMethod(currentUrl + "/api/messages", callback, "GET", null, token);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
});
