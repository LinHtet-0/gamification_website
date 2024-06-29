# The Program Instructions

This repository contains the source code and assets for a game included the functionalities for both "User" and "Admin" side
# User Side
    1. User can view their acutal battle results, 
    2. User can choose their favourite champions and battle with secret champions (Battle results' will affect on the user rank points and total matches)
    3. User can see data of leaderboard ordered by the users' rank points (The more rank points the user has, the nearer to get to the first place on leaderboard)
    4. User can interact with other users on messaging tab globally. (User can edit or delete his/her own messages.)
    5. User will be having their own personal profile where user can view his/her completed challenges, rank points, experience points, total matches, favourite champions, rank status, username, account age and level after logging in.
    6. User can do in game challenges and tasks related to sustainability goals that will affect on users' statistic (experience points and rank points) 

# Admin Side 
    1. Admin can create, retrieve, update, delete every single challenges and tasks.

## User side page details
# Leaderboard Page
The leaderboard page allows users to see their current position based on their current rank points. The more rank points a user has, the closer to the top spot on the leaderboard.

# Champion Page
The Champion Page allows users to study each champion's talents and choose them for combat against hidden champions based on basic attack damage. In this instance, the user will not know how many basic attacks each champion has. Every round of combat, all champions will be randomized to reveal a mystery champion, who will also be determined by user input value. I hope you win the game.

# Progress Tracker Page.
The progress tracker page lets players complete in-game challenges and activities. After successfully completing the tasks, experience points will be added to the user's existing experience points. For in-game challenges, users may only complete the challenge once.To accomplish the challenge for second time, the user must wait until the next or fresh challenges become available. For the tasks, users can add notes, while completing the tasks.

# Battle Results Page
This page allows users to check their own combat results after dueling with a hidden champion. In this fight results page, users may see combat data such as when the battle began and finished, whether the user's selected champion was defeated or won versus the hidden champion, and, most importantly, how many rank points the user earned in each individual match. This rank point will be added to the user's current rank points as well as total matches.

# Messaging Page 
The messaging page enables worldwide communication between users. Users may send, modify, and delete their own messages, but cannot edit or remove messages from other users.

# Profile Page.
After logging in to their own accounts, users may access the profile page to check information such as completed challenges, rank points, experience points, total matches, favourite champions, rank status, username, account age, and level. All actions taken by the Champion page and Progress Tracker page will alter and update user information.

## Admin side details
# Challenges statistic pages
In this page, admin can create, retrieve, update, delete challenges.

# Tasks statistic pages
In this page, admin can create, retrieve, update, delete tasks.

## Folder Structure
```
bed-ca1-LinHtet-0  
├─ public  
│  ├─ css
│  │  ├─color.css
│  │  ├─profile.css
│  │  └─ style.css
│  │
│  ├─ images
│  │  ├─ challenges.png
│  │  ├─ champion1.png 
│  │  ├─ champion2.png 
│  │  ├─ champion3.png  
│  │  ├─ champion3.png  
│  │  ├─ champion4.png  
│  │  ├─ champion5.png 
│  │  ├─ champion6.png  
│  │  ├─ champion7.png 
│  │  ├─ champion8.png 
│  │  ├─ champion9.png
│  │  ├─ champion10.png
│  │  ├─ champion11.png 
│  │  ├─ champion12.png 
│  │  ├─ cosmic.jpg 
│  │  ├─ cosmo.png 
│  │  ├─ favChampion.png 
│  │  ├─ fire.png 
│  │  ├─ fire1.png  
│  │  ├─ fire2.png  
│  │  ├─ king.png
│  │  ├─ logo.png
│  │  ├─ messageProfile.png 
│  │  ├─ newHero.png 
│  │  ├─ profile.png
│  │  ├─ profileBg.png
│  │  ├─ rankStatus.png 
│  │  ├─ send.png 
│  │  ├─ totalMatches.jpg 
│  │  └─ userProfile.png 
│  │
│  │
│  ├─ js
│  │  ├─ battleResult.js
│  │  ├─ challengeStatistic.js
│  │  ├─ champion.js 
│  │  ├─ getCurrentURL.js  
│  │  ├─ getSinglePlayerInfo.js  
│  │  ├─ loginUser.js  
│  │  ├─ message.js 
│  │  ├─ progress.js  
│  │  ├─ queryCmds.js 
│  │  ├─ ranking.js 
│  │  ├─ register.js
│  │  ├─ taskStatistic.js
│  │  ├─ userNavbarToggle.js 
│  │  └─ userProfile.js 
│  │  
│  │  
│  ├─ html
│  │  ├─ battleResult.html
│  │  ├─ challengeStatistic.html
│  │  ├─ champion.html
│  │  ├─ getCurrentURL.html  
│  │  ├─ getSinglePlayerInfo.html  
│  │  ├─ loginUser.html
│  │  ├─ message.html
│  │  ├─ progress.html 
│  │  ├─ queryCmds.html
│  │  ├─ ranking.html
│  │  ├─ register.html
│  │  ├─ taskStatistic.html
│  │  ├─ userNavbarToggle.html 
│  │  └─ userProfile.html
│  │
│  │
├─ src                       
│  ├─ configs                
│  │  └─ initTables.js     
│  │        
│  ├─ controllers            
│  │  ├─ battle_participantsController.js  
│  │  ├─ battleFieldCotroller.js
│  │  ├─ battlesController.js  
│  │  ├─ challenge_progressController.js  
│  │  ├─ challengesController.js  
│  │  ├─ championsController.js  
│  │  ├─ exampleController.js
│  │  ├─ messageController.js
│  │  ├─ picked_championController.js  
│  │  ├─ playersController.js  
│  │  ├─ playerUserRelController.js  
│  │  ├─ taskController.js  
│  │  ├─ taskProgressController.js  
│  │  ├─ teamsController.js  
│  │  └─ userController.js  
│  │
│  ├─ models                 
│  │  ├─ battle_participantsModel.js  
│  │  ├─ battleFieldModel.js  
│  │  ├─ battlesModel.js  
│  │  ├─ challenge_progressModel.js  
│  │  ├─ challengesModel.js  
│  │  ├─ championsModel.js  
│  │  ├─ messageModel.js  
│  │  ├─ picked_championModel.js  
│  │  ├─ playersModel.js  
│  │  ├─ playerUserRelModel.js  
│  │  ├─ taskModel.js  
│  │  ├─ taskProgressModel.js  
│  │  ├─ teamsModel.js  
│  │  └─ userModel.js  
│  │     
│  ├─ routes                 
│  │  ├─ battle_participantsRoutes.js  
│  │  ├─ battleFieldRoutes.js  
│  │  ├─ battlesRoutes.js  
│  │  ├─ challenge_progressRoutes.js  
│  │  ├─ challengesRoutes.js  
│  │  ├─ championsRoutes.js  
│  │  ├─ mainRoutes.js  
│  │  ├─ messageRoutes.js  
│  │  ├─ picked_championRoutes.js  
│  │  ├─ playersRoutes.js  
│  │  ├─ taskRoutes.js  
│  │  ├─ taskProgressRoutes.js  
│  │  ├─ teamsRoutes.js  
│  │  └─ userRoutes.js  
│  │     
│  ├─ services               
│  │  └─ db.js               
│  └─ app.js   
├─ .env                
├─ .gitignore                 
├─ ca2_database.sql               
├─ index.js                  
├─ package-lock.json             
├─ package.json             
└─ Readme.md                 
```


# Insrtuctions
To run the first functionality:

1. Set up your MySQL database using the provided ca2_database.sql file.
2. Update the database configurations in the .env file.
3. Run npm install to install the required dependencies.(You may require these dependencies -- dotenv, express, mysql2, nodemon.jsonwebtoken,bcrypt)
4. Execute npm run dev (which I assigned "dev" as nodemon index.js) or you can manually execute index.js file to start the server.
5. Use postman window application or VScode postman extension to see the every single result of the related URL link you type in.


# Functionalities
# Overview

~How the game works?

As soon as the users log in to their respective accounts, the website will directly leads to the user profile with the newish information.

To increase the experience points, user can claim or do either in-game challenges or tasks to earn experience points.In-game challenges, the rewards can be claimed once until the new challenge will be released or refreshed by the admin side.

To increase the rank points , user can directly go to the "Champion" Page. In the "Champion" page, user can view every single champions' skills. In this case, user are supposed not to know the basic_attack damage of every single champions because the battle results is determined by the champions' basic attack damage.


~What is the battle experience?

After the user has chosen the favourite champion to start the battle, the user is allowed to type in the number which is used to affect on the secret champion which is always behind the user number. (Favourite Champion Vs Secret Champion). The battle results will be released after comparing their basic attack damage.
If the user chosen champion's basic attack is greater than the sercret champion's basic attack, the user will win the battle.Otherwise, the user will lose.


~ What is secret champion?

Every round of combat, after the user chose his/her favourite champion, all the champions will be randomized. After that, the user has to choose by typing number to get the secret champion to fight against with his/her favourite champion.It is blindly picked and based on your luck.


# Implementation Details
# Database Initialization
the initTables.js script initializes tables for the whole functionality.

# Controllers
taskController.js: Handles CRUD operations related to tasks.
taskProgressController.js: Manages the progress of tasks.
userController.js: Handles user-related operations.
battle_participantsController.js: Manages participants in battles to get which participants or teams involved in this battle.
battlesController.js: Handles battle-related operations.
battleFieldController.js : Handles battle-fields to determine who is winner or loser.
exampleController.js: Handles token generating results.
playerUserRelController.js : Handles player and user relation data.
challenge_progressController.js: Manages challenges and player progress.
challengesController.js: Handles operations related to challenges.
championsController.js: Manages information about champions.
picked_championController.js: Handles operations related to champions picked by players.
playersController.js: Manages player data.
teamsController.js: Handles operations related to teams.
messageController.js: Handles operations for the users messages.

# Models
Each controller has a corresponding model file, implementing queries related to the respective functionality.

# Routes
taskRoutes.js: Defines API routes for task-related operations.
taskProgressRoutes.js: Defines API routes for task progress-related operations.
userRoutes.js: Defines API routes for user-related operations.
battle_participantsRoutes.js: Defines API routes for battle participants.
battlesRoutes.js: Defines API routes for battles.
challenge_progressRoutes.js: Defines API routes for challenges and player progress.
challengesRoutes.js: Defines API routes for challenges.
championsRoutes.js: Defines API routes for champions.
mainRoutes.js: Main entry point for the application.
picked_championRoutes.js: Defines API routes for picked champions.
playersRoutes.js: Defines API routes for player-related operations.
teamsRoutes.js: Defines API routes for teams.
messageRoutes.js: Defines API routes for messages.
battleFieldRoutes.js: Defines API routes for battle field results.

# API endpoints for this game

~ Get All Tasks                     : GET /api/tasks
~ Get Task by task_id               : GET /api/tasks/task_id
~ Create New Task                   : POST /api/tasks
~ Update a specific task            : PUT /api/tasks/:task_id
~ Delete a specific Task            : DELETE /api/tasks/:task_id
~ Get a specific Task Progress      : GET /api/task_progress/progress_id
~ Create a new Task Progress        : POST /api/task_progress
~ Update a specific Task Progress   : PUT /api/task_progress/:progress_id
~ Delete a specific Task Progress   : DELETE /api/task_progress/:progress_id
~ Get All Users                     : GET /api/users
~ Get a specific user               : GET /api/users/:user_id
~ Create a new user                 : POST /api/users
~ Update information about user     : PUT /api/users/user_id
~ Delete a specific user            : DELETE /api/users/user_id
~ Get All Players                   : GET /api/players
~ Get player info by Id             : GET /api/players/:player_id
~ Delete player by id               : DELETE /api/players/:player_id
~ Update player by id               : PUT /api/players/:player_id
~ Create player by id               : POST /api/players/:player_id
~ Get all challenges                : GET /api/challenges
~ Get challenges by id              : GET /api/challenges/:challenge_id
~ Get players completed challenge   : GET /api/challenges/:challenge_id/completed-players
~ Delete a specific challenge       : DELETE /api/challenges/:challenge_id
~ Create new challenge              : POST /api/challenges
~ Update an existing challenge      : GET /api/challenges/:challenge_id
~ Get all champion information      : GET /api/champions
~ Get champion information by id    : GET /api/champions/:champion_id
~ Delete champion information by id : DELETE /api/champions/:champion_id
~ Create a new champion             : POST /api/champions
~ Update a existing champion info   : UPDATE /api/champions/:champion_id
~ Get player details in team        : GET /api/teams/playerDetails-inTeam/:teamName/players/:player_id
~ Get player details by teamName    : GET /api/teams/team-name/:teamName
~ Get player by teamId              : GET /api/teams/:team_id
~ Get all teams                     : GET /api/teams
~ Delete team by id                 : DELETE /api/teams/:team_id
~ Create team                       : CREATE /api/teams
~ Get team details by team id       : GET /api/battle-participants/teamDetails/:team_id
~ Get battleResults by battle id    : GET /api/battle-participants/battleResults/:battle_id
~ Get all battle participants       : GET /api/battle-participants
~ Get all challenges done by players: GET /api/challenge_progress
~ Get challenges completed by player: GET /api/challenge_progress/players/:player_id/completed-challenge
~ Delete all challenge-progress     : DELETE /api/challenge_progress/players/:player_id/challenges/:challenge_id
~ Create a new challenge_progress   : POST /api/challenge_progress
~ Get champions picked by players   : GET /api/picked_champion/:player_id/pickedCHampionDetail
~ Get all picked_champions data     : GET /api/picked_champion
~ Delete by player id and champ id  : DELETE /api/picked_champion/:player_id/champion/:champion_id
~ Create new picked_champion        : GET /api/picked_champion
~ Get all battles data              : GET /api/battles
~ Create new battle results data    : POST /api/battles
~ Get all battle field history      : GET /api/battleFields

# Contact Informtaion

This database is in the progress.Users can contact me for support or inquiries.

GitHub Link : https://github.com/LinHtet-0
WhatsApp    : +65 8462 6339

# Contribution

Contributing
Fork the repository.
Create a new branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature
Submit a pull request.

# Common Errors you might encounter

In this database system, I created total of 14 tables.

1. users table
2. taskProgress table
3. tasks table
4. players table
5. battles table
6. challenges table
7. champions table
8. teams table
9. battle_participants table
10. challenge_progress table
11. picked_champion table

You might encounter some errors when you try to UPDATE and CREATE the information related to these above tables.

~~~Error (input field in body)

To update, you need to input the correct dataset related to the existing table column.

To encounter the error, I provide the response message that user can understand to encounter errors.
For example, for user table (Required Input Fileds to update[username, email]). 






