/*:
 * @plugindesc (Ver 1.2) Discord Rich Presence integration to RPG Maker MZ.  | Extended by: Maxii1996
 * @author ODUE
 * @url https://github.com/00due/Discord-RPC-for-RMMZ
 * @target MZ
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
 * REQUIRED TO FILL:
 * Application ID, Large picture, Large picture text, Row 1
 * 
 * 
 * 
 * Changing the details after the initial setup:
 *
 * 1. Open Plugin commands --> ODUE_discord
 *
 * 2. Select either Edit row 1 or 2
 *
 * 3. Type the new value of it.
 *
 * You can also save the current values for later use.
 * As of ver1.1, deleting the second row is also possible.
 *
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
 * 
 * Plugins Commands (v1.2 Extended by Maxii1996)
 * 
 * You can use: 
 * 
 * \partyX[stat] or \v[x]
 * 
 * Inside a plugin command to return that stat or variables 
 * inside command plugins.
 * 
 * Example:
 * 
 * \party1[name] will return Party 1 position Name.
 * 
 * @param Discord application ID
 * @desc Type here your game's application ID
 * @type text
 * 
 * @param
 * 
 * @param Large picture
 * @desc Enter the name of the large picture you want to use.
 * @type text
 * 
 * @param Large picture text
 * @desc Enter the text when hovering the large picture with your cursor. (Max 128 characters)
 * @type text
 * @default Playing a game
 * 
 * @param Enable small picture
 * @desc Enables the small picture shown in the rich presence.
 * @type boolean
 * @default false
 * @on yes
 * @off no
 * 
 * @param Small picture
 * @desc Enter the name of the small picture you want to use.
 * @parent Enable small picture
 * @type text
 * 
 * @param Small picture text
 * @desc Enter the text when hovering the small picture with your cursor. (Max 128 characters)
 * @parent Enable small picture
 * @type text
 * @default Developed by someone
 * 
 * @param
 * 
 * @param Row 1
 * @desc The first row of text in Discord. (Max 128 characters)
 * @type text
 * @default Playing a cool game!
 * 
 * @param Show row 2
 * @desc Disable if you don't want the second row to be visible.
 * @type boolean
 * @default true
 * @on yes
 * @off no
 * 
 * @param Row 2
 * @desc The second row of text in Discord. (Max 128 characters)
 * @parent Show row 2
 * @type text
 * @default Exploring a cool world!
 * 
 * @param
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
 * @desc The text on the button. (Max 32 characters)
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
 * @desc The text on the button. (Max 32 characters)
 * @type text
 * @default Visit the game's website!
 * 
 * @param Show playtime
 * @desc Shows how long has been played
 * @type boolean
 * @default true
 * @on Show
 * @off Don't show
 *
 * 
 * @command Edit row 1
 * @desc Edit the row 1 of Discord status
 * 
 * @arg row1
 * @text New value
 * @desc Max 128 characters
 * @type text
 *
 * @command Edit row 2
 * @desc Edit the row 2 of Discord status
 *
 * @arg row2
 * @text New value
 * @desc Max 128 characters
 * @type text
 * 
 * @command Disable row 2
 * @desc Disable the row 2 of Discord status
 * 
 * @command Enable row 2
 * @desc Enable the row 2 of Discord status
 *
 * @command Save values
 * @desc Saves the current values of row 1 and 2
 *
 * @command Restore values
 * @desc Restores the saved values of the rows
 *
 * @arg restoreRow1
 * @text First row
 * @type boolean
 * @on Restore
 * @off Don't restore
 * @default true
 *
 * @arg restoreRow2
 * @text Second row
 * @type boolean
 * @on Restore
 * @off Don't restore
 * @default true
 * 
 * 
 * @command ChangeSmallPicture
 * @desc Change the Discord's small picture.
 * 
 * @arg newSmallPicture
 * @text New Small Picture
 * @desc Name of the new small picture.
 * @type text
 *
 * @command ChangeSmallPictureText
 * @desc Change the text of Discord's small picture.
 * 
 * @arg newSmallPictureText
 * @text New Small Picture Text
 * @desc Text for the new small picture.
 * @type text
 * 
 */



let parameters = PluginManager.parameters('ODUE_discord');

let appId = parameters['Discord application ID'];
if (appId.length < 10) {
    console.error("DISCORD ERROR: Invalid Application ID!");
}

let bigPicture = parameters['Large picture'];
let bigPictureText = parameters['Large picture text'];
let smallPictureEnabled;
smallPictureEnabled = parameters['Enable small picture'] === "true";

let smallPicture = parameters['Small picture'];
let smallPictureText = parameters['Small picture text'];


let firstRow = parameters['Row 1'];
let secondRow = parameters['Row 2'];
let firstRowSaved;
let secondRowSaved;

let row2Enabled;

row2Enabled = parameters['Show row 2'] === "true";

let playtime;
if (parameters['Show playtime'] === "true") {
    playtime = Date.now();
}

let button1Url;
let button1Text;
let button2Url;
let button2Text;

let buttons = getButtons(parameters);

function getButtons(parameters) {
    if (parameters['Enable button 1'] === "true") {
        button1Text = parameters['Button 1 text'];
        button1Url = parameters['Button 1 URL'];
        let buttonArr = [{ label: button1Text, url: button1Url }];
        if (parameters['Enable button 2'] === "true") {
            button2Text = parameters['Button 2 text'];
            button2Url = parameters['Button 2 URL'];
            buttonArr.push({ label: button2Text, url: button2Url });
        }
        return buttonArr;
    }
}

//Warnings

function checkStringLength(text, maxLength, errorMessage) {
    if (text.length > maxLength) console.error(errorMessage)
}


function interpretText(text) {

    text = text.replace(/\\v\[(\d+)\]/gi, function(match, p1) {
        return $gameVariables.value(Number(p1));
    });

    text = text.replace(/\\party(\d+)\[(\w+)\]/gi, function(match, p1, p2) {
        const memberIndex = Number(p1) - 1;
        const stat = p2.toLowerCase();
        const actor = $gameParty.members()[memberIndex];
        if (actor) {
            switch (stat) {
                case 'mhp':
                    return actor.mhp;
                case 'mmp':
                    return actor.mmp;
                case 'atk':
                    return actor.atk;
                case 'def':
                    return actor.def;
                case 'mat':
                    return actor.mat;
                case 'mdf':
                    return actor.mdf;
                case 'agi':
                    return actor.agi;
                case 'luk':
                    return actor.luk;
                case 'hp':
                    return actor.hp;
                case 'mp':
                    return actor.mp;
                case 'tp':
                    return actor.tp;
                case 'level':
                    return actor.level;
                case 'name':
                    return actor.name();
                case 'class':
                    return actor.currentClass().name;
                case 'nickname':
                    return actor.nickname();
                case 'profile':
                    return actor.profile();
                default:
                    return '';
            }
        } else {
            return '';
        }
    });

    return text;
}



let stringsToCheck = [
    {string: firstRow, length: 128, error: "DISCORD ERROR: The length of row 1 is over 128 characters.\nDiscord rich presence has been disabled."},
    {string: secondRow, length: 128, error: "DISCORD ERROR: The length of row 2 is over 128 characters.\nDiscord rich presence has been disabled."},
    {string: button1Text, length: 32, error: "DISCORD ERROR: The length of button 1 text is over 32 characters.\nDiscord rich presence has been disabled."},
    {string: button2Text, length: 32, error: "DISCORD ERROR: The length of button 2 text is over 32 characters.\nDiscord rich presence has been disabled."},
    {string: bigPictureText, length: 128, error: "DISCORD ERROR: The length of large picture text is over 32 characters.\nDiscord rich presence has been disabled."},
    {string: smallPictureText, length: 128, error: "DISCORD ERROR: The length of small picture text is over 32 characters.\nDiscord rich presence has been disabled."}
]

for (let {string, length, error} of stringsToCheck) {
    try {
        checkStringLength(string, length, error);
    }
    catch (TypeError) {
        console.warn("WARNING: Length check failed. Don't worry, this shouldn't matter.");
    }
}

let rpc = require("discord-rpc");
let client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: appId });

let createActivityObject = (details, state) => ({
    pid: process.pid,
    activity: {
        details,
        ...(state && {state}),
        timestamps: { start: playtime },
        assets: {
            large_image: bigPicture,
            large_text: bigPictureText,
            ...(smallPictureEnabled && {
                small_image: smallPicture,
                small_text: smallPictureText
            }),
        },
        buttons,
    }
});

let setPresence = function () {
    let activity = createActivityObject(firstRow, secondRow);
    client.request('SET_ACTIVITY', activity);
};

let deleteRow2 = function () {
    let activity = createActivityObject(firstRow);
    client.request('SET_ACTIVITY', activity);
};


client.on('ready', () => {
    if (row2Enabled) setPresence();
    else deleteRow2();
});

PluginManager.registerCommand("ODUE_discord", 'Save values', () => {
    firstRowSaved = firstRow;
    secondRowSaved = secondRow;
});

PluginManager.registerCommand("ODUE_discord", 'Edit row 1', args => {
    let interpretedText = interpretText(args.row1);
    if (interpretedText.length <= 128) {
        firstRow = interpretedText;
        if (row2Enabled) setPresence();
        else deleteRow2();
    }
    else console.error("DISCORD ERROR: The length of row 1 is over 128 characters.\nDiscord rich presence has been disabled.")
});

PluginManager.registerCommand("ODUE_discord", 'Edit row 2', args => {
    let interpretedText = interpretText(args.row2);
    if (interpretedText.length <= 128) {
        secondRow = interpretedText;
        if (row2Enabled) setPresence();
        else deleteRow2();
    }
    else console.error("DISCORD ERROR: The length of row 2 is over 128 characters.\nDiscord rich presence has not been updated.")
});

PluginManager.registerCommand("ODUE_discord", 'Restore values', args => {
    if (args.restoreRow1 === "true" && firstRowSaved.length !== 0) firstRow = firstRowSaved;
    if (args.restoreRow2 === "true" && secondRowSaved.length !== 0) secondRow = secondRowSaved;

    if (row2Enabled) setPresence();
    else deleteRow2();
});

PluginManager.registerCommand("ODUE_discord", 'Disable row 2', () => {
    row2Enabled = false;
    deleteRow2();
});

PluginManager.registerCommand("ODUE_discord", 'Enable row 2', () => {
    row2Enabled = true;
    setPresence();
});

PluginManager.registerCommand("ODUE_discord", 'ChangeSmallPicture', args => {
    smallPicture = interpretText(String(args.newSmallPicture));
    setPresence();
});

PluginManager.registerCommand("ODUE_discord", 'ChangeSmallPictureText', args => {
    smallPictureText = interpretText(String(args.newSmallPictureText));
    setPresence();
});
