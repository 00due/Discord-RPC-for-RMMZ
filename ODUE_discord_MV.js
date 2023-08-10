/*:
 * @plugindesc Discord Rich Presence integration to RPG Maker MV.
 * @author ODUE
 * @url http://fsorsat.com/
 * @target MV
 * 
 * @help
 * Initial setup:
 * 
 * 0. If you don't have Node.js installed, install it from https://nodejs.org/en/download
 * 
 * 1. Open the folder of your game (where you have your game.rmmzproject in) and open CMD or powershell there.
 * 
 * 2. Run the command 'npm install discord-rpc' (without the '' symbols)
 * ---If you're getting an error Command not found or something like that, make sure you have Node.js installed!---
 * 
 * 3. Go to https://discord.com/developers/applications and create your application. Click 'New application' and give it your game's name.
 * After creating it, open the Rich Presence --> Art assets tab, and upload the large and small images.
 * ---Recommendation: The large image is typically the logo of your game.---
 * ---WARNING: The art assets have about 10-15 minutes delay until they become visible.---
 * 
 * 4. Copy the Application ID from the 'General information' tab, and paste it into the 'Discord application ID' on this plugin.
 * 
 * 5. Fill the other plugin parameters with anything you want.
 * 
 * 
 * 
 * Plugin commands:
 *
 * replaceRow1 <text to replace with>   - Replaces row 1
 * replaceRow2 <text to replace with>   - Replaces row 2
 * save rows   - Save both rows for later use
 * restore <row1 / row2>   – Restores a saved row
 *
 * Examples:
 * // On battle start
 * save rows
 * replaceRow1 Fighting a monster
 * // On battle end
 * restore row1
 *
 *
 * Terms of use:
 *
 * 1. You must give credit to ODUE
 * 2. You can freely edit this plugin to your needs. However, you must still credit me.
 * 3. This plugin is free for commercial and non-commercial projects.
 * 4. This plugin is provided as is. I'm not responsible for anything you make with this plugin.
 * 5. You can send feature requests to me on platforms such as Reddit (to u/SanttuPOIKA----).
 *    However, I have no obligation to fulfill your requests.
 * 
 * 
 * 
 * @param Discord application ID
 * @desc Type here your game's application ID
 * @type text
 * 
 * 
 * @param Large picture
 * @desc Enter the name of the large picture you want to use.
 * @type text
 * 
 * @param Large picture text
 * @desc Enter the text when hovering the large picture with your cursor.
 * @type text
 * @default Playing a game
 * 
 * @param Small picture
 * @desc Enter the name of the small picture you want to use.
 * @type text
 * 
 * @param Small picture text
 * @desc Enter the text when hovering the small picture with your cursor.
 * @type text
 * @default Developed by someone
 * 
 * 
 * @param Row 1
 * @desc The first row of text in Discord.
 * @type text
 * @default Playing a cool game!
 * 
 * @param Row 2
 * @desc The second row of text in Discord.
 * @type text
 * @default Exploring a cool world!
 * 
 * 
 * @param Enable button 1
 * @desc Enable the first button
 * @type boolean
 * @default true
 * @on Enabled
 * @off Disabled
 * 
 * @param Button 1 URL
 * @parent Enable button 1
 * @desc Where should the first button lead to?
 * @type text
 * @default https://yourname.itch.io/your-game/
 * 
 * @param Button 1 text
 * @parent Enable button 1
 * @desc The text on the button.
 * @type text
 * @default Download this game!
 * 
 * @param Enable button 2
 * @desc Enable the second button (WARNING: You must enable Button 1 for this to work.)
 * @type boolean
 * @default false
 * @on Enabled
 * @off Disabled
 * 
 * @param Button 2 URL
 * @parent Enable button 2
 * @desc Where should the first button lead to?
 * @type text
 * @default https://your-website.com/
 * 
 * @param Button 2 text
 * @parent Enable button 2
 * @desc The text on the button.
 * @type text
 * @default Visit the game's website!
 * 
 * @param Show playtime
 * @desc Shows how long has been played
 * @type boolean
 * @default true
 * @on Show
 * @off Don't show
 */

let discordParameters = PluginManager.parameters('ODUE_discord_MV');

const appId = discordParameters['Discord application ID'];
if (appId.length < 10) {
    console.log("ERROR: Invalid Application ID!");
    process.exit(1);
}

const bigPicture = discordParameters['Large picture'];
const bigPictureText = discordParameters['Large picture text'];
const smallPicture = discordParameters['Small picture'];
const smallPictureText = discordParameters['Small picture text'];

let firstRow = discordParameters['Row 1'];
let secondRow = discordParameters['Row 2'];
let firstRowSaved;
let secondRowSaved;

let playtime;
if (discordParameters['Show playtime'] === "true") {
    playtime = Date.now();
}

let button1Url;
let button1Text;
let button2Url;
let button2Text;
let buttons;

if (discordParameters['Enable button 1'] === "true") {
    button1Text = discordParameters['Button 1 text'];
    button1Url = discordParameters['Button 1 URL'];
    buttons = [
        { label: button1Text, url: button1Url },
    ];
    if (discordParameters['Enable button 2'] === "true") {
        button2Text = discordParameters['Button 2 text'];
        button2Url = discordParameters['Button 2 URL'];
        buttons = [
            { label: button1Text, url: button1Url },
            { label: button2Text, url: button2Url },
        ];
    }
}


let pluginComm = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    pluginComm.call(this, command, args);
    if (command === 'replaceRow1') {

        replaceRow1(args[0]);

    }

    if (command === 'replaceRow2') {
        if (args[0] !== '') {
            replaceRow2(args[0]);
        }
    }

    if (command === 'save') {
        if (args[0] === 'rows') {
            saveRows();
        }
    }

    if (command === 'restore') {
        switch (args[0]) {
            case 'row1': restoreRows(1); break;
            case 'row2': restoreRows(2); break;
        }
    }
};


const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: appId });

setPresence = function () {
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: firstRow,
            state: secondRow,
            timestamps: {
                start: playtime,

            },
            assets: {
                large_image: bigPicture,
                large_text: bigPictureText,
                small_image: smallPicture,
                small_text: smallPictureText,
            },
            buttons: buttons
        }
    })
}

client.on('ready', () => {
    setPresence();
})

saveRows = function () {
    firstRowSaved = firstRow;
    secondRowSaved = secondRow;
}

replaceRow1 = function (newRow) {
    firstRow = newRow;
    setPresence();
};

replaceRow2 = function (newRow) {
    secondRow = newRow;
    setPresence();
};

restoreRows = function (rowToRestore) {
    switch (rowToRestore) {
        case 1:
            firstRow = firstRowSaved;
            setPresence();
            return;
        case 2:
            secondRow = secondRowSaved;
            setPresence();
            return;
    }
}