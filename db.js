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
        character text not null);
    `,()=>{
        sixthQuery(newdb);
    })
}

function sixthQuery(newdb){
    newdb.exec(
     `insert into characters (superhero, publisher, alter_ego, first_appearance, character)
        values ('Batman', 'DC Comics' , 'Bruce Wayne', 'Detective Comics #27', 'Bruce Wayne'),
               ('Superman', 'DC Comics', 'Kal-El', 'Action Comics #1', 'Kal-El'),
               ('Flash', 'DC Comics', 'Jay Garrick', 'Flash Comics #1','Jay Garrick, Barry Allen, Wally West, Bart Allen'),
               ('Green Lantern', 'DC Comics', 'Alan Scott', 'All-American Comics #16', 'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz'),
               ('Green Arrow', 'DC Comics', 'Oliver Queen', 'More Fun Comics #73', 'Oliver Queen'),
               ('Wonder Woman', 'DC Comics', 'Princess Diana','All Star Comics #8', 'Princess Diana'),
               ('Martian Manhunter', 'DC Comics', 'J onn J onzz','Detective Comics #225','Martian Manhunter'),
               ('Robin/Nightwing', 'DC Comics', 'Dick Grayson', 'Detective Comics #38', 'Dick Grayson'),
               ('Blue Beetle', 'DC Comics', 'Dan Garret', 'Mystery Men Comics #1', 'Dan Garret, Ted Kord, Jaime Reyes'),
               ('Black Canary', 'DC Comics', 'Dinah Drake', 'Flash Comics #86', 'Dinah Drake, Dinah Lance'),
               ('Spider Man', 'Marvel Comics', 'Peter Parker', 'Amazing Fantasy #15', 'Peter Parker'),
               ('Captain America', 'Marvel Comics', 'Steve Rogers', 'Captain America Comics #1', 'Steve Rogers'),
               ('Iron Man', 'Marvel Comics', 'Tony Stark', 'Tales of Suspense #39', 'Tony Stark'),
               ('Thor', 'Marvel Comics', 'Thor Odinson', 'Journey into Myster #83', 'Thor Odinson'),
               ('Hulk', 'Marvel Comics', 'Bruce Banner', 'The Incredible Hulk #1', 'Bruce Banner'),
               ('Wolverine', 'Marvel Comics', 'James Howlett', 'The Incredible Hulk #180', 'James Howlett'),
               ('Daredevil', 'Marvel Comics', 'Matthew Michael Murdock', 'Daredevil #1', 'Matthew Michael Murdock'),
               ('Hawkeye', 'Marvel Comics', 'Clinton Francis Barton', 'Tales of Suspense #57', 'Clinton Francis Barton'),
               ('Cyclops', 'Marvel Comics', 'Scott Summers', 'X-Men #1', 'Scott Summers'),
               ('Silver Surfer', 'Marvel Comics', 'Norrin Radd', 'The Fantastic Four #48', 'Norrin Radd');
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