const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapters = new FileSync('database.json');
const db = low(adapters);
const userUsed = new Set();

let talkedRecently = new Set();


var bot = new Discord.Client();
var prefix = ("!");
var prEnt = ("!entrainement");

db.defaults({ xp: []}).write()
db.defaults({ Inventaire: []}).write()


bot.on('ready', function () {
  console.log("Je suis connecté !");
  bot.user.setActivity("Dev" , {type: "STREAMING"});
});



bot.on('message', message => {


    var msgauthor = message.author.id;

  
    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp: ${userxp[1]}`);
        }
    
    var nbInventaire = 0

    if(!db.get("inventaire").find({user: msgauthor}).value()){
        var nbInventaire = nbInventaire + 1
        db.get("inventaire").push({user: msgauthor,}).write();
        db.get("inventaire").push({nbInventaire}).write();
    }else{
        var userInventaire = db.get("Inventaire").filter({user: msgauthor}).find("Inventaire").value();
        console.log(userObject)
        var userObject = Object.values(userInventaire);
        console.log(userObject);
        for(var i=0; i = nbInventaire; i++){
            console.log( `${nbInventaire[1]}`)
        }
    }



    if(message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value();
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`XP de ${message.author.username}`)
            .setDescription("Voici ton XP")
            .addField("XP: ", `${xpfinal[1]} xp`);
        message.channel.send({embed: xp_embed});
    }

    
    if(message.content === prefix + "entrainement"){
        if(userUsed.has(message.author.id)){
            message.channel.send("Vous étes épuiser retenter dans 1h");
            return;
        }else{
            var Chance = Math.floor(Math.random() * 1001);
            var Ent = Math.floor(Math.random() * 20 + 1);
              if(Chance > 50){
                 message.channel.send(`Vous Reussisez cette Entrainement vous obtenez donc un nombre d'xp de `+ Ent);
                 db.get("xp").find({user:msgauthor}).assign({user : msgauthor, xp: userxp[1] +=Ent}).write();
                  console.log("+" + Ent);
            } else{
                message.channel.send("Vous avec échouer votre entrainement");
                console.log("Echec");
            }
        userUsed.add(message.author.id);
        setTimeout(() => {
            userUsed.delete(message.author.id);
        }, 1000 * 60 * 60 * 1); 




        }
    }
});



bot.login('NTQ0NjEwNzgyMDM0MjY0MDY2.D0hItQ.f5KxYe3CMnewpcmyEI969vrkWhA');