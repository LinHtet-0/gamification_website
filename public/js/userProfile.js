// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {

  const token = localStorage.getItem("token");
  const callbackProfile = (responseStatusProfile, responseDataProfile) => {
    console.log("responseStatusProfile:", responseStatusProfile);
    console.log("responseDataProfile:", responseDataProfile);
    console.log(responseDataProfile);
    const playerData = responseDataProfile[0][0];
    const tableData = responseDataProfile[1];

    if (responseStatusProfile === 200) {
      const playerInfo = document.getElementById("playerInfo");
      playerInfo.innerHTML = `
      <div class="row glassmorphism-container ">
        <div class= "col-lg-4 col-md-6 col-sm-6 d-flex align-items-center justify-content-center">
          <img class="userProfile" src = "../images/userProfile.jpg">
        </div>
        <div class= "col-lg-8 col-md-6 col-sm-6">
          <div class="profile-card-body text-white mt-3">
            <div class="profile-card-text">
              <p class="fs-3">${playerData.player_name}</p>
              <p>Level: ${playerData.level}</p>
              <p>Account Age: ${playerData.account_years} year(s) ${playerData.account_months} month(s) ${playerData.account_days} day(s)</p>
            </div>
          </div>  
        </div>
      </div>
      
      <div class="row glassmorphism-container mt-3 text-white">
        <div class= "col-lg-4 col-md-6 col-sm-6 text-center">
          <p class="fs-5">Fav Champion</p>
          <img class="userChampion" src = "../images/favChampion.png">
          <p>${playerData.favourite_champion}</p>
        </div>
        <div class= "col-lg-4 col-md-6 col-sm-6 text-center">
          <p class="fs-5">Rank Status</p>
          <img class="userRankStatus" src = "../images/rankStatus.png">
          <p>${playerData.rank_status}</p>
        </div>
        <div class= "col-lg-4 col-md-6 col-sm-6 text-center">
          <p class="fs-5">Total Matches</p>
          <img class="userTotalMatch" src = "../images/totalMatches.png">
          <p>${playerData.total_matches}</p>
        </div>
      </div>

      <div class="row glassmorphism-container mt-3 text-white">
        <div class="col-12 col-md-12 col-lg-12 mb-5" id="progress_container">
          <h5 class="text-light">Statistic</h5>
          <p style="color:white">Experience Points</p>
          <div class="progress" style="height:30px;">
            <div class="progress-bar text-dark" role="progressbar" aria-label="Example with label" style="width:${(playerData.experience_points / 1000) * 100}%; background-color: rgb(164, 251, 13); font-size: 16px; font-weight: bold" aria-valuenow="${playerData.experience_points}" aria-valuemin="0" aria-valuemax="1000">${playerData.experience_points}</div>
          </div>
          <p class="mt-3" style="color:white">Rank Points</p>
          <div class="progress" style="height:30px;">
            <div class="progress-bar text-dark" role="progressbar" aria-label="Success example" style="width:${(playerData.rank_points / 300) * 100}%; background-color: rgb(164, 251, 13); font-size: 16px; font-weight: bold" aria-valuenow="${playerData.rank_points}" aria-valuemin="0" aria-valuemax="300">${playerData.rank_points}</div>
          </div>
        </div>
      </div>
      `;
      if (tableData.length === 0) {
        const table = document.getElementById("degree-list");
        table.innerHTML = `
        <tr>
          <td colspan="4">No challenges completed!</td>
        </tr>
        `;
      }
      else {
        const table = document.getElementById("degree-list");

        let indexCounter = 1; // Initialize the counter

        tableData.forEach(challenge => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <th scope="row">${indexCounter}</th>
          <td>${challenge.challenge_name}</td>
          <td>+${challenge.challenge_reward} points</td>
          <td>${challenge.completed_on}</td>
        `;
          table.appendChild(row);

          indexCounter++; // Increment the counter for the next row
        });
      }
    }
  };
  fetchMethod(currentUrl + `/api/profile`, callbackProfile, "GET", null, token);
});
