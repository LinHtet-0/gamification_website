// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

document.addEventListener("DOMContentLoaded", function () {
    let images = ["./images/champion1.png", "./images/champion2.png", "./images/champion3.png", "./images/champion4.png", "./images/champion5.png", "./images/champion6.png", "./images/champion7.png", "./images/champion8.png", "./images/champion9.png", "./images/champion10.png", "./images/champion11.png", "./images/champion12.png", "./images/champion1.png", "./images/champion2.png", "./images/champion3.png", "./images/champion4.png", "./images/champion5.png", "./images/champion6.png", "./images/champion7.png", "./images/champion8.png", "./images/champion9.png", "./images/champion10.png", "./images/champion11.png", "./images/champion12.png", "./images/champion1.png", "./images/champion2.png", "./images/champion3.png", "./images/champion4.png", "./images/champion5.png", "./images/champion6.png", "./images/champion7.png", "./images/champion8.png", "./images/champion9.png", "./images/champion10.png", "./images/champion11.png"]
    let selectedChampions = [];
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const championList = document.getElementById("championList");

        responseData.forEach((champion, index) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
          <div class="text-white">
            <div class="championCards glassmorphism-container1">
              <div class="championImage">
                <img class="img-fluid" src="${images[index]}" class="card-img-top" alt="...">
              </div>
              <div class="championBrief">
                <h5>${champion.champion_name}</h5>
                <p class="card-text">
                  Level: ${champion.basic_attack}
                </p>
              </div>
              <button id="championDetails" champion_id=${champion.champion_id} class="btn btn-primary">View Details</button>
            </div>
          </div>
        `;
            championList.appendChild(displayItem);

            const button = displayItem.querySelector("#championDetails");
            const champion_id = button.getAttribute("champion_id");

            button.addEventListener("click", function (event) {
                event.preventDefault();
                championDetails(champion_id);
            });
        });
    };

    const championDetails = (champion_id) => {
        const callback = (responseStatus, responseSpellData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseSpellData:", responseSpellData);

            const modal = document.getElementById("modal-body");

            if (responseStatus === 200) {
                modal.innerHTML = `
            <div class="spellCards">
              <div class="playerSpell text-center">
                <iframe src="https://giphy.com/embed/5QW0DElZKEAB3N25Qj" width="240" height="235" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <p>${responseSpellData.ability_one}</p>
              </div>
              <div class="playerSpell text-center">
                <iframe src="https://giphy.com/embed/MOZd7wfLidUze" width="240" height="162" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <p>${responseSpellData.ability_two}</p>
              </div>
              <div class="playerSpell text-center">
                <iframe src="https://giphy.com/embed/tZpTptlPy4aa0X6OBu" width="218" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <p>${responseSpellData.ability_three}</p>
              </div>
            </div>
          `;
            }

            const progressModal = new bootstrap.Modal(document.getElementById('spellModal'));
            progressModal.show();

            const chooseChampionButton = document.getElementById('chooseChampion');
            chooseChampionButton.addEventListener('click', function () {
                const basicAttack = responseSpellData.basic_attack;
                selectedChampions.push({ champion_id, basicAttack });
                progressModal.hide();

                const hiddenModal = new bootstrap.Modal(document.getElementById('hiddenModal'));
                hiddenModal.show();

                const startBattleButton = document.getElementById('startBattle');
                startBattleButton.addEventListener('click', function () {
                    hiddenModal.hide();

                    const battleModal = new bootstrap.Modal(document.getElementById('battleModal'));
                    battleModal.show();

                    const battleFieldData = {
                        champion_id: selectedChampions[0].champion_id,
                        basic_attack: selectedChampions[0].basicAttack,
                        value: parseInt(document.getElementById('chooseValue').value)
                    }

                    // This is where we add the fetchMethod for the battleField API call
                    const battleFieldCallback = (responseStatus, responseBattleFieldData) => {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseBattleFieldData:", responseBattleFieldData);

                        const battleField = document.getElementById("battleResult");

                        if (responseStatus === 201) {
                            if (responseBattleFieldData[0].champion_id == selectedChampions[0].champion_id) {
                                const increaseRankPoint = (responseStatus, responseData) => {
                                    console.log("responseStatus:", responseStatus);
                                    console.log("responseData:", responseData);
                                    if (responseStatus === 200) {
                                        battleField.innerHTML = `<h3 class="text-dark text-center mt-3">You won the battle!</h3>`;
                                    }
                                }
                                fetchMethod(currentUrl + `/api/players/updateRankPoints`, increaseRankPoint, "PUT", null, token);
                            } else {
                                const lostRankPoint = (responseStatus, responseData) => {
                                    console.log("responseStatus:", responseStatus);
                                    console.log("responseData:", responseData);
                                    if (responseStatus === 200) {
                                        battleField.innerHTML = `<h3 class="text-dark text-center mt-3">You lost the battle!</h3>`;
                                    }
                                }
                                fetchMethod(currentUrl + `/api/players/updateLostRankPoints`, lostRankPoint, "PUT", null, token);
                            }
                        } else if (responseStatus === 404) {
                            battleField.innerHTML = `<h3 class="text-dark text-center mt-3">We have released only 35 champions in total yet!</h3>`;
                        } else if (responseStatus === 400) {
                            battleField.innerHTML = `<h3 class="text-dark text-center mt-3">Your input must be integer value</h3>`;
                        } else {
                            battleField.innerHTML = `<h3 class="text-dark text-center mt-3">An unexpected error occurred!</h3>`;
                        }

                        selectedChampions = [];
                    };

                    fetchMethod(currentUrl + "/api/battleFields", battleFieldCallback, "POST", battleFieldData, token);
                    setTimeout(() => {
                        battleModal.hide();
                        window.location.reload();
                    }, 5000);
                });
            });
        };

        fetchMethod(currentUrl + `/api/champions/${champion_id}`, callback);
    };

    fetchMethod(currentUrl + "/api/champions", callback);
});
