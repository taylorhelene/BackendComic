var sqlite3 = require('sqlite3');

let db= new sqlite3.Database('./mu.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
    createDatabase();
});

function createDatabase() {
    var newdb = new sqlite3.Database('mu.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(newdb) {
    newdb.exec(`
    create table hero (
        hero_id int primary key not null,
        hero_name text not null,
        is_xman text not null,
        was_snapped text not null,
        image text not null,
        views int not null
    );
        `, ()  => {
            secondQuery(newdb);
    });
}

function secondQuery(newdb){
    newdb.exec(`
    insert into hero (hero_id, hero_name, is_xman, was_snapped, image , views)
    values (1, 'Spiderman', 'N', 'Y', 'https://www.transparentpng.com/thumb/spiderman/ld3cDH-countdown-launch-marvelu-spider-man-playstation.png', 0),
           (2, 'Tony Stark', 'N', 'N', 'https://www.transparentpng.com/thumb/iron-man/b4NpBS-iron-man-clipart-png-file.png', 0),
           (3, 'Jean Grey', 'Y', 'N', 'https://www.transparentpng.com/thumb/phoenix/1zlrBH-phoenix-picture.png', 0);
    `,()=>{
        thirdQuery(newdb);
    })
}

function thirdQuery(newdb){
    newdb.exec(`
    create table hero_power (
        hero_id int not null,
        hero_power text not null);
    `,()=>{
        fourthQuery(newdb);
    })
}

function fourthQuery(newdb){
    newdb.exec(
     `insert into hero_power (hero_id, hero_power)
        values (1, 'Web Slinging , Super Strength and Total Nerd'),
               (2, 'Total Nerd'),
               (3, 'Telepathic Manipulation and Astral Projection');
               ` ,()=>{
               fifthQuery(newdb);
               });
}

function fifthQuery(newdb){
    newdb.exec(`
    create table characters (
        superhero text not null,
        publisher text not null,
        alter_ego text not null,
        first_appearance text not null,
        character text not null,
        url text not null);
    `,()=>{
        sixthQuery(newdb);
    })
}

function sixthQuery(newdb){
    newdb.exec(
     `insert into characters (superhero, publisher, alter_ego, first_appearance, character, url)
        values ('Batman', 'DC Comics' , 'Bruce Wayne', 'Detective Comics #27', 'Bruce Wayne', 'https://static.dc.com/dc/files/default_images/Char_Thumb_Batman_20190116_5c3fc4b40fae42.85141247.jpg?w=160'),
               ('Superman', 'DC Comics', 'Kal-El', 'Action Comics #1', 'Kal-El', 'https://static.dc.com/2023-02/Char_WhosWho_Superman_20190116_5c3fc71f524f38.28405711.jpg?w=160'),
               ('Flash', 'DC Comics', 'Jay Garrick', 'Flash Comics #1','Jay Garrick, Barry Allen, Wally West, Bart Allen', 'https://static.dc.com/2023-02/Char_WhosWho_Flash_20190116_5c3fcadbc6a963.74676553.jpg?w=160'),
               ('Green Lantern', 'DC Comics', 'Alan Scott', 'All-American Comics #16', 'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz', 'https://static.dc.com/2023-02/Char_WhosWho_GreenLantern20200721_5f173adcedb982.94529743.jpg?w=160'),
               ('Green Arrow', 'DC Comics', 'Oliver Queen', 'More Fun Comics #73', 'Oliver Queen', 'https://static.dc.com/dc/files/default_images/Char_Thumb_GreenArrow_5c4915494b3fb9.17530021.jpg?w=160'),
               ('Wonder Woman', 'DC Comics', 'Princess Diana','All Star Comics #8', 'Princess Diana', 'https://static.dc.com/2023-02/Char_WhosWho_WonderWoman_20190116_5c3fc6aa51d124.25659603.jpg?w=160'),
               ('Martian Manhunter', 'DC Comics', 'J onn J onzz','Detective Comics #225','Martian Manhunter', 'https://static.dc.com/dc/files/default_images/Char_Thumb_MartianManhunter_20190116_5c3fd5c45bcd52.92066763.jpg?w=640'),
               ('Robin/Nightwing', 'DC Comics', 'Dick Grayson', 'Detective Comics #38', 'Dick Grayson', 'https://static.dc.com/dc/files/default_images/Char_Thumb_Nightwing_2_5c50fa380942a3.78305981.jpg?w=384'),
               ('Blue Beetle', 'DC Comics', 'Dan Garret', 'Mystery Men Comics #1', 'Dan Garret, Ted Kord, Jaime Reyes', 'https://static.dc.com/dc/files/default_images/Char_Thumb_BlueBeetle_5c4118a71474e2.43949452.jpg?w=160'),
               ('Black Canary', 'DC Comics', 'Dinah Drake', 'Flash Comics #86', 'Dinah Drake, Dinah Lance', 'https://static.dc.com/dc/files/default_images/Char_Thumb_BlackCanary_5c41184e20ee69.98463239.jpg?w=160'),
               ('Spider Man', 'Marvel Comics', 'Peter Parker', 'Amazing Fantasy #15', 'Peter Parker', 'https://cdn.marvel.com/content/1x/037smm_com_crd_01.jpg'),
               ('Captain America', 'Marvel Comics', 'Steve Rogers', 'Captain America Comics #1', 'Steve Rogers', 'https://cdn.marvel.com/content/1x/ultimate_cap_hed.jpg'),
               ('Iron Man', 'Marvel Comics', 'Tony Stark', 'Tales of Suspense #39', 'Tony Stark', 'https://cdn.marvel.com/content/1x/002irm_ons_crd_03.jpg'),
               ('Thor', 'Marvel Comics', 'Thor Odinson', 'Journey into Myster #83', 'Thor Odinson', 'https://cdn.marvel.com/content/1x/thorult01.jpg'),
               ('Hulk', 'Marvel Comics', 'Bruce Banner', 'The Incredible Hulk #1', 'Bruce Banner', 'https://cdn.marvel.com/content/1x/349red_com_crd_01.png'),
               ('Wolverine', 'Marvel Comics', 'James Howlett', 'The Incredible Hulk #180', 'James Howlett','https://cdn.marvel.com/content/1x/ultwolv.jpg'),
               ('Daredevil', 'Marvel Comics', 'Matthew Michael Murdock', 'Daredevil #1', 'Matthew Michael Murdock', 'https://cdn.marvel.com/content/1x/daredevilult_head.jpg'),
               ('Hawkeye', 'Marvel Comics', 'Clinton Francis Barton', 'Tales of Suspense #57', 'Clinton Francis Barton', 'https://cdn.marvel.com/content/1x/hawkeyeult_head.jpg'),
               ('Cyclops', 'Marvel Comics', 'Scott Summers', 'X-Men #1', 'Scott Summers','https://cdn.marvel.com/content/1x/cyclopsaoa.jpg'),
               ('Silver Surfer', 'Marvel Comics', 'Norrin Radd', 'The Fantastic Four #48', 'Norrin Radd', 'https://cdn.marvel.com/content/1x/21_ba97.jpg');
               ` ,()=>{
                seventhQuery(newdb);
               });
}

function seventhQuery(newdb){
    newdb.exec(`
    create table comics (
        name text not null,
        date text not null,
        rating text not null,
        writer text not null,
        cover_artist text not null,
        editor text not null,
        digital text not null,
        link text null,
        price text not null,
        url text not null);
    `,()=>{
        eighthQuery(newdb);
    })
}

function eighthQuery(newdb){
    newdb.exec(
        `insert into comics (name, date , rating, writer, cover_artist, editor, digital, link, price, url)
           values ('I Am Groot Infinity Comic #6', '2023-10-13' , 'All Ages', 'Chiya', 'Chiya', 'Darren Shan' ,'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/00/64f9e0e83cfb6/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #12', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free','https://cdn.marvel.com/u/prod/marvel/i/mg/2/f0/65020e61f319b/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #11', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/c0/65020e53a8026/portrait_uncanny.jpg' ),
                  ('Amazing Spider-Man: Hunted Infinity Comic #10', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/d0/65020e450337d/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #9',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/20/65020e2c327e9/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #8',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/8/d0/65020e191feac/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #7',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/30/65020e07032a3/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #6',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/70/65020deb7783e/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #5',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/2/a0/65020ea47a631/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #4',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/5/d0/65020daee5731/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #3',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/03/65020d966e845/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #2',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/2/50/65020d840b1a3/portrait_uncanny.jpg'),
                  ('G.O.D.S. First Look Infinity Comic #1', '2023-10-4',' Rated T+', 'Tim Smith' , 'Tim Smith', 'Tim Smith', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64482' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/50/651b158643236/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #1', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64190' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/a0/65031795bf64c/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #2', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64282' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/90/65031795b7f0e/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #3', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'Digital issue is not currently available' , '' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/10/65031795bd9d9/portrait_uncanny.jpg'), 
                  ('Loki: Agent of Asgard Infinity Comic #4', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64284' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/10/65031795bbd2b/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #5', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64285' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/40/65031795b1c4e/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #6', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64286' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/80/650317af80c69/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #7', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64287' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/b0/650317afae0eb/portrait_uncanny.jpg');
                  ` ,()=>{
                   ninthQuery(newdb);
                  });
}

function ninthQuery(newdb){
    newdb.exec(`
    create table games (
        name text not null,
        date text not null,
        developer text not null,
        publisher text not null,
        available_on text not null,
        overview text not null,
        src text not null,
        extras text null,
        video text not null);
    `,()=>{
        tenthQuery(newdb);
    })
}

function tenthQuery(newdb){
    newdb.exec(
        `insert into games (name , date, developer , publisher , available_on, overview, src , extras, video)
           values ('Marvels Wolverine', 'not released', 'Insomniac Games', 'PlayStation','PS5' , 'Marvels Wolverine is currently in development by Insomniac Games for PlayStation 5.','https://cdn.marvel.com/content/1x/bacon_lob_crd_01.jpg','Marvel s Wolverine : Announcement Teaser | PS5. Marvels Wolverine is currently in development by Insomniac Games for PlayStation 5. Created in collaboration with Marvel Games and PlayStation.', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6271804019001&brand=marvel'),
                  ('Marvels Spider-Man 2', 'October 20, 2023' , 'Insomniac Games', 'PlayStation','PS5' , 'MARVELS SPIDER-MAN 2 Marvels Spider-Man 2 swings to PS5 on October 20, 2023.', 'https://cdn.marvel.com/content/1x/marvelsspiderman2_lob_crd_02.jpg', 'Marvels Spider-Man 2 | Gameplay Reveal:The Great Hunt Begins. We are thrilled to reveal the first-ever gameplay of Marvels Spider-Man 2, coming fall 2023 on PlayStation 5!', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6328145514112&brand=marvel' ),
                  ('Marvels Midnight Suns', 'December 2, 2022', 'Firaxis Games & 2K','PlayStation, Xbox, Nintendo',  'PlayStation®5, PlayStation®4, Xbox Series X|S, Xbox One, Nintendo™ Switch, and Windows PC via Steam and Epic Games Store', 'A new tactical RPG set in the darker side of the Marvel Universe, Marvels Midnight Suns brings players face-to-face against supernatural forces as they team up with and live among the Midnight Suns, Earths last line of defense against the underworld', 'https://cdn.marvel.com/content/1x/marvelsmidnightsuns_lob_crd_03.jpg' , 'Blood Storm - Storm DLC Trailer | Marvels Midnight Suns: Theres a Storm coming. Get ready to rain down pain when Storm arrives in Midnight Suns on May 11!', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6326578503112&brand=marvel'),
                  ('Marvels Snap', 'October 18, 2022', 'Second Dinner', 'Nuverse', 'iOS / Android / Windows PC' , 'The fastest card battler in the Multiverse is here! Assemble your Marvel dream team from a super roster of your favorite heroes and villains—then make your move. MARVEL SNAP unleashes the entire Marvel Universe into a fast-paced, adrenaline-pumping, strategic card battler.', 'https://cdn.marvel.com/content/1x/marvelsnap_lob_crd_01.png', 'MARVEL SNAP is officially on PC | OFFICIAL PC LAUNCH TRAILER', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6335260622112&brand=marvel'),
                  ('Marvels Guardians of the Galaxy', 'October 26, 2021', 'Eidos-Montréal', 'Square Enix', 'PS4, PS5, Xbox One, Xbox Series X/S, PC, Nintendo Switch : Cloud Version', 'Fire up Star-Lords jet boots for a wild ride across the cosmos in this third-person action-adventure game, a fresh take on Marvels Guardians of the Galaxy. With the unpredictable Guardians at your side, blast your way from one explosive situation to another, with original and iconic Marvel characters caught in a struggle for the fate of the universe. You got this. Probably.','https://cdn.marvel.com/content/1x/marvelsguardiansofthegalaxy_lob_crd_02.jpg', 'Marvels Guardians of the Galaxy on the Red Carpet Ready to lead the Guardians of the Galaxy? Become Star-Lord in Marvels Guardians of the Galaxy available now for PlayStation, Xbox, and PC!', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6326404498112&brand=marvel'),
                  ('MARVEL Future Revolution', 'August 25, 2021', 'Netmarble Monster','Netmarble', 'iOS / Android', 'MARVEL Future Revolution is Marvels first Open World Action RPG mobile game. As members of the Omega Flight team, players will work together to battle an onslaught of Super Villains, confront their nefarious behaviors and defend the universe.', 'https://cdn.marvel.com/content/1x/futurerevolution_lob_crd_01.jpg', 'Scarlet Witch Gameplay | MARVEL Future Revolution : Scarlet Witch has arrived in MARVEL Future Revolution! Will this sorceress and her chaos magic be enough to keep Primary Earth safe and save Vision at the same time?', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6305904914112&brand=marvel'),
                  ('Fortnite: Marvel Season', 'August 27, 2020', 'Epic Games','Epic Games','PC, PS4, Xbox One, Android, Nintendo Switch', 'The lore, legends, and heroes from Marvel have arrived in Fortnite. Join the fight and take on Galactus to save all of Reality. Our greatest war, the Fortnite Nexus War, begins now.', 'https://cdn.marvel.com/content/1x/donut_lob_crd_01_1.jpg','Miles Morales and Spider-Man 2099 Swing Into Fortnite :Spider-Man may be no stranger to Fortnite, but theres more to the Spider-Verse to be uncovered.', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6328076769112&brand=marvel'),
                  ('Marvels Spider-Man: Miles Morales', 'November 12, 2020', 'Insomniac Games', 'Sony Interactive Entertainment', 'PlayStation 5', 'The latest adventure in the Spider-Man universe will build on and expand Marvels Spider-Man through an all-new story. Players will experience the rise of Miles Morales as he masters new powers to become his own Spider-Man.','https://cdn.marvel.com/content/1x/msmmm_lob_crd_02.jpg', 'Marvels Spider-Man: Miles Morales | PC Launch Trailer : Marvels Spider-Man: Miles Morales is out now on PC! Swing over to Steam or the Epic Games Store to grab your copy today','https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6315745106112&brand=marvel'),
                  ('Marvels Avengers','September 4, 2020', 'Crystal Dynamics in collaboration with Eidos-Montréal', 'Square Enix', 'PlayStation 4, Xbox One, Stadia, Steam', 'Marvels Avengers combines an original story with single-player and co-operative gameplay in the definitive Avengers gaming experience. Assemble into teams of up to four players online, master extraordinary abilities, customize a growing roster of Heroes, and defend the Earth from escalating threats.', 'https://cdn.marvel.com/content/1x/marvelsavengers_lob_crd_01.jpg', 'Marvels Avengers: The MODOK Threat Trailer :People around the world have turned their backs on the Avengers. Ms. Marvel must reassemble her idols while facing AIMs leader, George Tarleton, who has his own vision for the future.','https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6166954241001&brand=marvel'),
                  ('Marvels Iron Man VR', 'July 3, 2020', 'Camouflaj', 'Sony Interactive Entertainment', 'PlayStation VR, Meta Quest 2', 'In Marvels Iron Man VR the player, who suits up as the genius inventor Tony Stark, aka Iron Man, confronts ghosts from his past—powerful forces who seek to ruin him and everything he stands for. By fully embracing the magic of PlayStation VR, players will come face-to-face with iconic allies and Super Villains as they jet around the globe on a heroic mission to save not only Stark Industries, but the world itself.','https://cdn.marvel.com/content/1x/marvelsironmanvr_lob_crd_02.jpg', 'Marvels Iron Man VR Launch Trailer | PS VR : Years after retiring from his role as a weapons maker, Tony Stark must now suit up to fight against Ghost and Living Laser, who have joined forces in attempt to take him and Stark Industries down once and for all.', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6168349620001&brand=marvel'),
                  ('LEGO® Marvel Collection Bundle', 'March 12, 2019', 'Warner Bros. Interactive Entertainment', 'Warner Bros. Interactive Entertainment', 'Playstation 4, Xbox One', 'LEGO® Marvel Super Heroes, LEGO® Marvel Super Heroes 2, LEGO® Marvel Avengers all come together in this super-sized collection bundle!', 'https://cdn.marvel.com/content/1x/legomarvelcollectionbundle_lob_crd_01.jpg', 'LEGO Marvel Collection Available Now | Launch Trailer : LEGO Marvel Collections brings three LEGO Marvel adventures LEGO Marvel Super Heroes, LEGO Marvel Avengers, and LEGO Marvel Super Heroes 2 together in one exciting collection! Available now on PS4, Xbox One and PC!', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=6012753666001&brand=marvel'),
                  ('Marvel Ultimate Alliance 3: The Black Order', 'July 19, 2019', 'Koei Tecmo/Team Ninja', 'Nintendo', 'Nintendo Switch™', 'Coming Summer 2019. The MARVEL ULTIMATE ALLIANCE series returns for the first time in 10 years—with a new action RPG—exclusively on the Nintendo Switch™ system! Assemble your ultimate team of Marvel Super Heroes from a huge cast including the Avengers, the Guardians of the Galaxy, the X-Men, and more! Team up with friends to prevent galactic devastation at the hands of the mad cosmic tyrant Thanos and his ruthless warmasters, The Black Order.', 'https://cdn.marvel.com/content/1x/marvelultimatealliance3_lob_crd_02.jpg', 'MARVEL ULTIMATE ALLIANCE 3: The Black Order - Announcement Trailer : The MARVEL ULTIMATE ALLIANCE series returns for the first time in 10 years—with a new action RPG—exclusively on the Nintendo Switch™ system!', 'https://assets.espn.go.com/players/web-player-bundle/next/embed/share.html#id=5976516798001&brand=marvel');
                  ` ,()=>{
                  runQueries(newdb);
                  });
}

function runQueries(db) {

    
    db.serialize(()=>{
        const statemnt=db.prepare("select * from comics")
        statemnt.all((err,tables)=>{
            console.log(tables);
            console.log(err);
        });
    });


}

exports.db = db;