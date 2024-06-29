// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    const battleList = document.getElementById("battleList");

    responseData.forEach((result, index) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 leaderboard-item";
      displayItem.innerHTML = `
          <div class=" my-2 ${result.first_champion_id === result.winner_champion_id ? 'winnerCard' : 'loserCard'}">
              <div>
                  <div class="battleDuration d-flex" style="justify-content: space-between;">
                    <h5 class="me-5 text-white">⏲ Started Time : ${result.battle_started_time}</h5>
                    <h5 class="ms-5 text-white">⏲ Ended Time : ${result.battle_ended_time}</h5>
                  </div>
                  <div class="battleText d-flex" style="justify-content: space-between;">
                    <div class="card-text">
                      <p class="mb-0 text-white"><strong>${result.first_champion_id === result.winner_champion_id ? `Your picked champion "${result.champion_name}" has won!` : `Your picked champion "${result.champion_name}" has got beaten!`}</strong></p>
                    </div>
                    <div class="card-text">
                      <p class="mb-0 text-white"><strong>Rank Points</strong></p>
                      <p class="mb-0 text-white">${result.first_champion_id === result.winner_champion_id ? "+ 10 points" : "- 5 points"}</p>
                    </div>
                  </div>

              </div>
          </div>
      `;
      // append to the battleList
      battleList.appendChild(displayItem);
    });
  };

  // fetching battle result
  fetchMethod(currentUrl + "/api/battleFields", callback, "GET", null, token);
});
