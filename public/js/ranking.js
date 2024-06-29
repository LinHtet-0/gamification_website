// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    const playerList = document.getElementById("playerList");
    console.log(responseData);
    const allPlayerData = responseData[0];
    const loginPlayerId = responseData[1];
    const sortedData = allPlayerData.sort((a, b) => b.rank_points - a.rank_points);
    sortedData.forEach((player, index) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-4 leaderboard-item";
      displayItem.innerHTML = `
          <div class="card-hoverable my-2 ${loginPlayerId === player.player_id ? 'first-card' : 'glassmorphism-container1'}">
              <div class="card-body clickable" data-player-id="${player.player_id}">
                  <h5 class="card-title text-center text-white">${index + 1}</h5>
                  <div class="card-text">
                      <p class="mb-0 text-white"><strong>Player Name</strong></p>
                      <p class="mb-0 text-white">${player.player_id == loginPlayerId ? "👉 YOU" : `${player.player_name}`}</p>
                  </div>
                  <div class="card-text">
                      <p class="mb-0 text-white"><strong>Rank Points</strong></p>
                      <p class="mb-0 text-white">${player.rank_points}</p>
                  </div>
                  <img class="profile-image buttonImg" src="${index === 0 ? './images/king.png' : './images/profile.png'}"/>
              </div>
          </div>
      `;
      playerList.appendChild(displayItem);
    });

    const firstCardBody = document.querySelector('.first-card');
    if (firstCardBody) {
      firstCardBody.classList.add('red-background');
    }

    // Add click event listener to all elements with class 'clickable'
    const clickableCards = document.querySelectorAll('.clickable');
    clickableCards.forEach(card => {
      card.addEventListener('click', function () {
        const playerId = this.getAttribute('data-player-id');

        if (playerId == loginPlayerId) {
          window.location.href = "profile.html";
        }
        else {
          window.location.href = `singlePlayerInfo.html?player_id=${playerId}`;
        }

      });
    });
  };

  // Replace the URL below with your actual API endpoint
  fetchMethod(currentUrl + "/api/players", callback, "GET", null, token);
});
