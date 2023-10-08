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
                runQueries(newdb);
               });
}


function runQueries(db) {

    
    db.serialize(()=>{
        const statemnt=db.prepare("select * from characters")
        statemnt.all((err,tables)=>{
            console.log(tables);
            console.log(err);
        });
    });


}

exports.db = db;