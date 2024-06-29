// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

const SQLSTATEMENT = `
        DROP TABLE IF EXISTS battle_participants;
        DROP TABLE IF EXISTS challenge_progress;
        DROP TABLE IF EXISTS picked_champion;
        DROP TABLE IF EXISTS playeruserrel;
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS battle_field;
        DROP TABLE IF EXISTS teams;
        DROP TABLE IF EXISTS challenges;
        DROP TABLE IF EXISTS champions;
        DROP TABLE IF EXISTS battles;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS messages;
        DROP TABLE IF EXISTS players;

        CREATE TABLE players (
          player_id int NOT NULL AUTO_INCREMENT,
          player_name varchar(50) NOT NULL,
          email varchar(100) NOT NULL,
          password text NOT NULL,
          experience_points int DEFAULT NULL,
          level int DEFAULT NULL,
          rank_points int DEFAULT NULL,
          rank_status varchar(20) DEFAULT NULL,
          favourite_champion varchar(45) DEFAULT NULL,
          account_created_on timestamp NULL DEFAULT NULL,
          total_matches text,
          PRIMARY KEY (player_id)
        );

        CREATE TABLE champions (
          champion_id int NOT NULL AUTO_INCREMENT,
          champion_name varchar(50) NOT NULL,
          basic_attack int NOT NULL,
          ability_one varchar(45) NOT NULL,
          ability_two varchar(45) NOT NULL,
          ability_three varchar(45) NOT NULL,
          champion_type varchar(45) NOT NULL,
          PRIMARY KEY (champion_id)
        );

        CREATE TABLE challenges (
          challenge_id int NOT NULL AUTO_INCREMENT,
          challenge_name varchar(50) NOT NULL,
          challenge_description text NOT NULL,
          challenge_reward int NOT NULL,
          PRIMARY KEY (challenge_id)
        );

        CREATE TABLE battles (
          battle_id int NOT NULL AUTO_INCREMENT,
          start_time timestamp NOT NULL,
          end_time timestamp NOT NULL,
          winner_team_id int NOT NULL,
          loser_team_id int NOT NULL,
          PRIMARY KEY (battle_id)
        ); 

        CREATE TABLE User (
          user_id INT PRIMARY KEY AUTO_INCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE Task (
          task_id int NOT NULL AUTO_INCREMENT,
          title text,
          description text,
          points int DEFAULT NULL,
          PRIMARY KEY (task_id)
        );

        CREATE TABLE messages (
          id INT NOT NULL AUTO_INCREMENT,
          player_id INT NOT NULL,
          message TEXT NOT NULL,
          message_created_on TIMESTAMP NULL,
          PRIMARY KEY (id),
          KEY messages_player_id_players_player_id_idx (player_id),
          CONSTRAINT messages_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );



        CREATE TABLE playeruserrel (
          id int NOT NULL AUTO_INCREMENT,
          user_id int NOT NULL,
          player_id int NOT NULL,
          PRIMARY KEY (id),
          KEY playeruserrel_player_id_players_player_id_idx (player_id),
          KEY playeruserrel_user_id_user_user_id_idx (user_id),
          CONSTRAINT playeruserrel_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT playeruserrel_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE picked_champion (
          id int NOT NULL AUTO_INCREMENT,
          player_id int NOT NULL,
          champion_id int NOT NULL,
          PRIMARY KEY (id),
          KEY picked_champion_player_id_players_player_id_idx (player_id),
          KEY picked_champion_champion_id_champions_champion_id_idx (champion_id),
          CONSTRAINT picked_champion_champion_id_champions_champion_id FOREIGN KEY (champion_id) REFERENCES champions (champion_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT picked_champion_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE teams (
          team_id int NOT NULL AUTO_INCREMENT,
          team_name varchar(50) NOT NULL,
          player_one int NOT NULL,
          player_two int NOT NULL,
          player_three int NOT NULL,
          player_four int NOT NULL,
          player_five int NOT NULL,
          PRIMARY KEY (team_id)
        );

        CREATE TABLE battle_field (
          id int NOT NULL AUTO_INCREMENT,
          player_id int NOT NULL,
          first_champion_id int NOT NULL,
          second_champion_id int NOT NULL,
          winner_champion_id int NOT NULL,
          battle_started_time timestamp NOT NULL,
          battle_ended_time timestamp NOT NULL,
          PRIMARY KEY (id),
          KEY battle_field_first_champion_id_champions_champion_id_idx (first_champion_id),
          KEY battle_field_second_champion_id_champions_champion_id_idx (second_champion_id),
          KEY battle_field_winner_champion_id_champions_champion_id_idx (winner_champion_id),
          KEY battle_field_player_id_players_player_id_idx (player_id),
          CONSTRAINT battle_field_first_champion_id_champions_champion_id FOREIGN KEY (first_champion_id) REFERENCES champions (champion_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT battle_field_second_champion_id_champions_champion_id FOREIGN KEY (second_champion_id) REFERENCES champions (champion_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT battle_field_winner_champion_id_champions_champion_id FOREIGN KEY (winner_champion_id) REFERENCES champions (champion_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT battle_field_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE battle_participants (
          id int NOT NULL AUTO_INCREMENT,
          battle_id int NOT NULL,
          team_one int NOT NULL,
          team_two int NOT NULL,
          completed_on timestamp NOT NULL,
          PRIMARY KEY (id),
          KEY battle_participants_battle_id_battles_battle_id_idx (battle_id),
          KEY battle_participants_teams_team_id_idx (team_one),
          KEY battle_participants_team_two_teams_team_one_idx (team_two),
          CONSTRAINT battle_participants_battle_id_battles_battle_id FOREIGN KEY (battle_id) REFERENCES battles (battle_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT battle_participants_team_one_teams_team_one FOREIGN KEY (team_one) REFERENCES teams (team_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT battle_participants_team_two_teams_team_one FOREIGN KEY (team_two) REFERENCES teams (team_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE challenge_progress (
          id int NOT NULL AUTO_INCREMENT,
          player_id int NOT NULL,
          challenge_id int NOT NULL,
          completed_on timestamp NOT NULL,
          PRIMARY KEY (id),
          KEY challenge_progress_challenge_id_challenges_challenge_id_idx (challenge_id),
          KEY challenge_progress_player_id_players_player_id_idx (player_id),
          CONSTRAINT challenge_progress_challenge_id_challenges_challenge_id FOREIGN KEY (challenge_id) REFERENCES challenges (challenge_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT challenge_progress_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE TaskProgress (
          progress_id int NOT NULL AUTO_INCREMENT,
          user_id int NOT NULL,
          player_id int NOT NULL,
          task_id int NOT NULL,
          completion_date timestamp NULL DEFAULT NULL,
          notes text,
          PRIMARY KEY (progress_id),
          KEY tp_user_id_user_user_id_idx (user_id),
          KEY tp_task_id_task_task_id_idx (task_id),
          CONSTRAINT tp_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT tp_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT tp_player_id_players_player_id FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        INSERT INTO players VALUES
        (1, 'Admin', 'admin@gmail.com', '${hash}', 0, 0, 0, 'Admin', 'Admin', '2023-01-01 12:00:00', '0'),
        (2,'Elena', 'elena@example.com', 'password_1', 100, 1, 20, 'Bronze', 'Inferno Warden', '2023-01-01 12:00:00', '120'),
        (3,'Adrian', 'adrian@example.com', 'password_2', 150, 2, 40, 'Silver', 'Coral Guardian', '2023-02-02 14:30:00', '130'),
        (4,'Cynthia', 'cynthia@example.com', 'password_3', 200, 3, 60, 'Gold', 'Zephyr Sentinel', '2023-03-03 10:45:00', '40'),
        (5,'David', 'david@example.com', 'password_4', 250, 4, 80, 'Platinum', 'Stormrider', '2023-04-04 08:15:00', '500'),
        (6,'Sophia', 'sophia@example.com', 'password_5', 300, 5, 100, 'Diamond', 'Blaze Sorcerer', '2023-05-05 09:30:00', '230'),
        (7, 'Alex', 'alex@example.com', 'password_6', 120, 6, 25, 'Bronze', 'Aqua Enchantress', '2023-06-06 15:45:00', '75'),
        (8, 'Bella', 'bella@example.com', 'password_7', 140, 7, 45, 'Silver', 'Geode Guardian', '2023-07-07 11:00:00', '90'),
        (9, 'Chris', 'chris@example.com', 'password_8', 180, 8, 65, 'Gold', 'Gale Stalker', '2023-08-08 18:30:00', '110'),
        (10, 'Diana', 'diana@example.com', 'password_9', 220, 9, 85, 'Platinum', 'Frost Warden', '2023-09-09 22:15:00', '150'),
        (11, 'Evan', 'evan@example.com', 'password_10', 260, 10, 125, 'Diamond', 'Volt Sage', '2023-10-10 17:00:00', '200'),
        (12, 'Fiona', 'fiona@example.com', 'password_11', 150, 11, 43, 'Silver', 'Magma Warden', '2023-11-11 14:30:00', '80'),
        (13, 'George', 'george@example.com', 'password_12', 180, 12, 69, 'Gold', 'Aqua Mystic', '2023-12-12 10:45:00', '120'),
        (14, 'Hannah', 'hannah@example.com', 'password_13', 210, 13, 95, 'Platinum', 'Terra Sentinel', '2023-01-01 08:15:00', '160'),
        (15, 'Isaac', 'isaac@example.com', 'password_14', 240, 14, 130, 'Diamond', 'Zephyr Sorceress', '2023-02-02 09:30:00', '200'),
        (16, 'Jessica', 'jessica@example.com', 'password_15', 270, 15, 200, 'Challenger', 'Blizzard Master', '2023-03-03 15:45:00', '240'),
        (17, 'Kevin', 'kevin@example.com', 'password_16', 120, 16, 38, 'Bronze', 'Volt Adept', '2023-04-04 11:00:00', '60'),
        (18, 'Lily', 'lily@example.com', 'password_17', 140, 17, 55, 'Silver', 'Flame Conjurer', '2023-05-05 18:30:00', '90'),
        (19, 'Michael', 'michael@example.com', 'password_18', 180, 18, 75, 'Gold', 'Wave Tamer', '2023-06-06 22:15:00', '110'),
        (20, 'Natalie', 'natalie@example.com', 'password_19', 220, 19, 92, 'Platinum', 'Earthshaker', '2023-07-07 17:00:00', '140'),
        (21, 'Oliver', 'oliver@example.com', 'password_20', 260, 20, 169, 'Diamond', 'Windcaller', '2023-08-08 14:30:00', '180'),
        (22, 'Elijah', 'elijah@example.com', 'password_21', 120, 21, 54, 'Silver', 'Flora Mage', '2023-06-06 15:15:00', '78'),
        (23, 'Harper', 'harper@example.com', 'password_22', 80, 22, 61, 'Gold', 'Storm Guardian', '2023-07-07 13:45:00', '110'),
        (24, 'Benjamin', 'benjamin@example.com', 'password_23', 110, 23, 21, 'Bronze', 'Terra Explorer', '2023-08-08 16:30:00', '40'),
        (25, 'Aria', 'aria@example.com', 'password_24', 85, 24, 34, 'Bronze', 'Volt Knight', '2023-09-09 11:20:00', '95'),
        (26, 'Grayson', 'grayson@example.com', 'password_25', 150, 25, 48, 'Silver', 'Hydro Mage', '2023-10-10 14:10:00', '120'),
        (27, 'Scarlett', 'scarlett@example.com', 'password_26', 200, 26, 71, 'Gold', 'Ember Knight', '2023-11-11 10:05:00', '130'),
        (28, 'Leo', 'leo@example.com', 'password_27', 130, 27, 95, 'Platinum', 'Mist Weaver', '2023-12-12 12:45:00', '500'),
        (29, 'Luna', 'luna@example.com', 'password_28', 180, 28, 120, 'Diamond', 'Aero Scepter', '2023-01-01 08:30:00', '230'),
        (30, 'Mason', 'mason@example.com', 'password_29', 240, 29, 94, 'Platinum', 'Frozen Fury', '2023-02-02 09:15:00', '180'),
        (31, 'Aurora', 'aurora@example.com', 'password_30', 160, 30, 78, 'Gold', 'Thornweaver', '2023-03-03 07:20:00', '80'),
        (32, 'Carter', 'carter@example.com', 'password_31', 90, 31, 43, 'Silver', 'Sylvan Druid', '2023-04-04 10:30:00', '45'),
        (33, 'Nova', 'nova@example.com', 'password_32', 110, 32, 28, 'Bronze', 'Frostblade', '2023-05-05 14:50:00', '70'),
        (34, 'Ezra', 'ezra@example.com', 'password_33', 70, 33, 30, 'Bronze', 'Volt Surge', '2023-06-06 15:15:00', '78'),
        (35, 'Penelope', 'penelope@example.com', 'password_34', 80, 34, 69, 'Gold', 'Coral Guardian', '2023-07-07 13:45:00', '110'),
        (36, 'Milo', 'milo@example.com', 'password_35', 110, 35, 21, 'Bronze', 'Nature Defender', '2023-08-08 16:30:00', '40');

        INSERT INTO champions VALUES
        (1, 'Pyro Blaze', 30, 'Inferno Burst', 'Fire Dash', 'Flame Nova', 'Fire'),
        (2, 'Ember Knight', 35, 'Ember Slash', 'Blazing Charge', 'Infernal Shield', 'Fire'),
        (3, 'Magma Magus', 40, 'Molten Missiles', 'Lava Surge', 'Volcanic Eruption', 'Fire'),
        (4, 'Inferno Warden', 45, 'Scorching Whirl', 'Flame Strike', 'Inferno Barrier', 'Fire'),
        (5, 'Blaze Sorcerer', 50, 'Blazing Barrage', 'Firestorm', 'Pyroclasm', 'Fire'),
        (6, 'Aqua Torrent', 55, 'Tidal Wave', 'Aqua Shield', 'Whirlpool', 'Water'),
        (7, 'Hydro Blade', 60, 'Aqua Slash', 'Torrential Surge', 'Hydro Vortex', 'Water'),
        (8, 'Coral Guardian', 38, 'Aqua Spear', 'Reef Shield', 'Ocean Embrace', 'Water'),
        (9, 'Mist Weaver', 51, 'Mystic Mist', 'Ripple Dance', 'Abyssal Whirl', 'Water'),
        (10, 'Tsunami Warden', 42, 'Tidal Surge', 'Aqua Burst', 'Maelstrom Slam', 'Water'),
        (11, 'Terra Guardian', 20, 'Stone Slam', 'Earthquake', 'Rock Shield', 'Earth'),
        (12, 'Golem Crusher', 28, 'Boulder Toss', 'Quake Stomp', 'Tectonic Barrier', 'Earth'),
        (13, 'Nature Defender', 23, 'Gaia Wrath', 'Rooted Grasp', 'Earthen Shield', 'Earth'),
        (14, 'Crag Blaster', 25, 'Rock Barrage', 'Avalanche Rush', 'Molten Core', 'Earth'),
        (15, 'Geomancer', 33, 'Crushing Quake', 'Stone Shards', 'Seismic Slam', 'Earth'),
        (16, 'Gale Whisperer', 15, 'Cyclone Burst', 'Aerial Dash', 'Tempest Fury', 'Wind'),
        (17, 'Sky Dancer', 48, 'Aero Slice', 'Gust Swirl', 'Skyward Strike', 'Wind'),
        (18, 'Zephyr Sentinel', 54, 'Whirlwind Slash', 'Feather Gale', 'Zephyr Shield', 'Wind'),
        (19, 'Stormrider', 77, 'Lightning Lash', 'Gale Force', 'Thunderstorm', 'Wind'),
        (20, 'Aero Scepter', 73, 'Aero Wave', 'Cyclone Crush', 'Sonic Vortex', 'Wind'),
        (21, 'Frostblade', 32, 'Frozen Shards', 'Ice Barrier', 'Blizzard', 'Ice'),
        (22, 'Glacial Knight', 80, 'Ice Lance', 'Frost Nova', 'Glacier Shield', 'Ice'),
        (23, 'Snowstorm Sorcerer', 65, 'Icy Blast', 'Frostfall', 'Crystal Veil', 'Ice'),
        (24, 'Frozen Fury', 98, 'Frostbite Strike', 'Chill Zone', 'Avalanche', 'Ice'),
        (25, 'Arctic Guardian', 61, 'Arctic Slash', 'Ice Wall', 'Polar Vortex', 'Ice'),
        (26, 'Volt Surge', 31, 'Thunderstorm', 'Electro Charge', 'Volt Discharge', 'Lightning'),
        (27, 'Shockwave Warden', 37, 'Thunderstrike', 'Electro Blitz', 'Static Field', 'Lightning'),
        (28, 'Stormcaller', 58, 'Chain Lightning', 'Thunderclap', 'Cyclonic Surge', 'Lightning'),
        (29, 'Thunderlord', 53, 'Lightning Bolt', 'Thunder Dome', 'Plasma Burst', 'Lightning'),
        (30, 'Arcane Tempest', 52, 'Arcane Surge', 'Discharge', 'Storm Fury', 'Lightning'),
        (31, 'Flora Bloom', 70, 'Blossom Barrage', 'Thorny Entangle', 'Photosynthesis Boost', 'Plant'),
        (32, 'Verdant Guardian', 18, 'Nature Grasp', 'Leaf Shield', 'Floral Burst', 'Plant'),
        (33, 'Thornweaver', 29, 'Thorn Whip', 'Vine Lash', 'Thicket Barrier', 'Plant'),
        (34, 'Briar Sorceress', 39, 'Briarstorm', 'Photosynthesis Wave', 'Enchanted Roots', 'Plant'),
        (35, 'Sylvan Druid', 67, 'Sylvan Surge', 'Verdant Bloom', 'Nature Embrace', 'Plant');
        
        INSERT INTO battle_field VALUES
        (1, 1, 1, 2, 1, '2023-06-03 09:50:00', '2023-06-03 09:05:00'),
        (2, 2, 3, 4, 3, '2023-06-03 11:50:00', '2023-06-03 11:05:00'),
        (3, 3, 5, 2, 2, '2023-06-03 08:50:00', '2023-06-03 09:05:00'),
        (4, 3, 3, 7, 3, '2023-06-03 13:30:00', '2023-06-03 13:45:00'),
        (5, 4, 3, 6, 3, '2023-06-03 12:50:00', '2023-06-03 01:05:00');

        INSERT INTO teams VALUES
        (1, 'TeamFire', 1, 6, 7, 9, 12),
        (2, 'TeamWater', 2, 8, 10, 11, 13),
        (3, 'TeamEarth', 3, 14, 15, 16, 17),
        (4, 'TeamWind', 4, 18, 19, 20, 21),
        (5, 'TeamIce', 5, 22, 23, 24, 25),
        (6, 'TeamLightning', 34, 26, 27, 28, 29),
        (7, 'TeamPlant', 35, 30, 31, 32, 33);

        INSERT INTO challenges VALUES
        (1,'Plant Trees', 'Plant two trees in a designated green area in a game as a earth player.', 50),
        (2,'Conserve Water', 'Buy the water items for 5 times called Acqua Torrent in ranked mode.', 30),
        (3,'Promote Renewable Energy', 'Advocate for and support the use of renewable energy sources in Singapore.', 60),
        (4,'Waste Segregation', 'Implement proper waste segregation practices at home and in public places in Singapore.', 45),
        (5,'Earth Team Conqueror', 'Win 50 battles as a member of the Earth Team.', 75),
        (6,'Wind Team Champion', 'Achieve a 10-match win streak with Wind champions in battles.', 80),
        (7,'Ice Team Explorer', 'Discover and explore five new in-game locations as a member of the Ice Team.', 70);

        INSERT INTO Task VALUES 
        (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),
        (2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),
        (3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40),
        (4,'Energy Conservation','Turn off lights and appliances when not in use.',25),
        (5,'Composting ','Start composting kitchen scraps to create natural fertilizer.',35);

        INSERT INTO battles VALUES
        (1,'2023-06-01 15:00:00', '2023-06-01 15:15:00', 1, 2),
        (2,'2023-06-02 16:30:00', '2023-06-02 16:40:00', 3, 4),
        (3,'2023-06-03 14:45:00', '2023-06-03 15:00:00', 5, 2),
        (4,'2023-06-03 13:45:00', '2023-06-03 13:50:00', 3, 7),
        (5,'2023-06-03 11:45:00', '2023-06-03 11:50:00', 3, 6);

        INSERT INTO User (username, email, password) VALUES
        ('admin', 'admin@gmail.com', '${hash}'),
        ('user1', 'user1@gmail.com', '${hash}'),
        ('user2', 'user2@gmail.com', '${hash}'),
        ('user3', 'user3@gmail.com', '${hash}'),
        ('user4', 'user4@gmail.com', '${hash}'),
        ('user5', 'user5@gmail.com', '${hash}'),
        ('user6', 'user6@gmail.com', '${hash}'),
        ('user7', 'user7@gmail.com', '${hash}'),
        ('user8', 'user8@gmail.com', '${hash}'),
        ('user9', 'user9@gmail.com', '${hash}'),
        ('user10', 'user10@gmail.com', '${hash}'),
        ('user11', 'user11@gmail.com', '${hash}'),
        ('user12', 'user12@gmail.com', '${hash}'),
        ('user13', 'user13@gmail.com', '${hash}'),
        ('user14', 'user14@gmail.com', '${hash}'),
        ('user15', 'user15@gmail.com', '${hash}'),
        ('user16', 'user16@gmail.com', '${hash}'),
        ('user17', 'user17@gmail.com', '${hash}'),
        ('user18', 'user18@gmail.com', '${hash}'),
        ('user19', 'user19@gmail.com', '${hash}'),
        ('user20', 'user20@gmail.com', '${hash}'),
        ('user21', 'user21@gmail.com', '${hash}'),
        ('user22', 'user22@gmail.com', '${hash}'),
        ('user23', 'user23@gmail.com', '${hash}'),
        ('user24', 'user24@gmail.com', '${hash}'),
        ('user25', 'user25@gmail.com', '${hash}'),
        ('user26', 'user26@gmail.com', '${hash}'),
        ('user27', 'user27@gmail.com', '${hash}'),
        ('user28', 'user28@gmail.com', '${hash}'),
        ('user29', 'user29@gmail.com', '${hash}'),
        ('user30', 'user30@gmail.com', '${hash}'),
        ('user31', 'user31@gmail.com', '${hash}'),
        ('user32', 'user32@gmail.com', '${hash}'),
        ('user33', 'user33@gmail.com', '${hash}'),
        ('user34', 'user34@gmail.com', '${hash}'),
        ('user35', 'user35@gmail.com', '${hash}');

        INSERT INTO messages VALUES
        (1, 1, "hello, how are you?", '2023-06-01 15:00:00'),
        (2, 2, "hi, I am good, which school are you in SP?", '2023-06-01 15:00:00'),
        (3, 3, "hi,I am from SOC", '2023-06-01 15:00:00');

        INSERT INTO playeruserrel VALUES
        (1, 1, 1),
        (2, 2, 2),
        (3, 3, 3),
        (4, 4, 4),
        (5, 5, 5),
        (6, 6, 6),
        (7, 7, 7),
        (8, 8, 8),
        (9, 9, 9),
        (10, 10, 10),
        (11, 11, 11),
        (12, 12, 12),
        (13, 13, 13),
        (14, 14, 14),
        (15, 15, 15),
        (16, 16, 16),
        (17, 17, 17),
        (18, 18, 18),
        (19, 19, 19),
        (20, 20, 20),
        (21, 21, 21),
        (22, 22, 22),
        (23, 23, 23),
        (24, 24, 24),
        (25, 25, 25),
        (26, 26, 26),
        (27, 27, 27),
        (28, 28, 28),
        (29, 29, 29),
        (30, 30, 30),
        (31, 31, 31),
        (32, 32, 32),
        (33, 33, 33),
        (34, 34, 34),
        (35, 35, 35);

        INSERT INTO picked_champion VALUES
        (1, 1, 3),
        (2, 4, 20),
        (3, 3, 12),
        (4, 4, 20),
        (5, 5, 24),
        (6, 5, 24),
        (7, 4, 20);
        
        INSERT INTO battle_participants VALUES
        (1, 2, 3, 4, '2023-06-01 15:00:00'),
        (2, 3, 2, 5, '2023-12-01 23:00:00'),
        (3, 4, 3, 7, '2023-03-01 12:00:00');

        INSERT INTO challenge_progress VALUES
        (1, 1, 3, '2023-11-19 16:00:00'),
        (2, 2, 4, '2023-12-19 16:00:00'),
        (3, 3, 6, '2023-11-19 16:00:00'),
        (4, 2, 5, '2023-11-19 16:00:00'),
        (5, 3, 4, '2023-3-20 16:00:00'),
        (6, 2, 1, '2023-11-19 16:00:00'),
        (7, 4, 4, '2023-6-14 16:00:00');

        INSERT INTO TaskProgress VALUES 
        (1,2,2,2,'2023-11-18 16:00:00','started using mrt only'),
        (2,3,3,3,'2023-11-18 16:00:00','bringing own shopping bag'),
        (3,2,2,4,'2023-11-17 16:00:00','switch off lights when leaving room'),
        (4,5,5,1,'2023-11-19 16:00:00','planted a durian tree in SP'),
        (7,4,4,2,'2023-11-19 16:00:00','using bus to travel now ');
`;

pool.query(SQLSTATEMENT, callback);
}
});