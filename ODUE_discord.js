/*:
 * @plugindesc Discord Rich Presence integration to RPG Maker MZ.
 * @author ODUE
 * @url http://fsorsat.com/
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
 * @param
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
 *
 *
 *
 * @command Edit row 1
 * @desc Edit the row 1 of Discord status
 * 
 * @arg row1
 * @text New value
 * @desc Edit the first row of Discord status
 * @type text
 *
 * @command Edit row 2
 * @desc Edit the row 2 of Discord status
 *
 * @arg row2
 * @text New value
 * @desc Edit the second row of Discord status
 * @type text
 *
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
 */

let parameters = PluginManager.parameters('ODUE_discord');

const appId = parameters['Discord application ID'];
if (appId.length < 10) {
    console.log("ERROR: Invalid Application ID!");
    process.exit(1);
}

const bigPicture = parameters['Large picture'];
const bigPictureText = parameters['Large picture text'];
const smallPicture = parameters['Small picture'];
const smallPictureText = parameters['Small picture text'];

let firstRow = parameters['Row 1'];
let secondRow = parameters['Row 2'];
let firstRowSaved;
let secondRowSaved;

let playtime;
if (parameters['Show playtime'] === "true") {
    playtime = Date.now();
}

let button1Url;
let button1Text;
let button2Url;
let button2Text;
let buttons;

if (parameters['Enable button 1'] === "true") {
    button1Text = parameters['Button 1 text'];
    button1Url = parameters['Button 1 URL'];
    buttons = [
        { label: button1Text, url: button1Url },
    ];
    if (parameters['Enable button 2'] === "true") {
        button2Text = parameters['Button 2 text'];
        button2Url = parameters['Button 2 URL'];
        buttons = [
            { label: button1Text, url: button1Url },
            { label: button2Text, url: button2Url },
        ];
    }
}


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

PluginManager.registerCommand("ODUE_discord", 'Save values', () => {
    firstRowSaved = firstRow;
    secondRowSaved = secondRow;
})

PluginManager.registerCommand("ODUE_discord", 'Edit row 1', args => {
    firstRow = String(args.row1);
    setPresence();
});

PluginManager.registerCommand("ODUE_discord", 'Edit row 2', args => {
    secondRow = String(args.row2);
    setPresence();
});

PluginManager.registerCommand("ODUE_discord", 'Restore values', args => {
    if (args.restoreRow1 === "true" && firstRowSaved.length !== 0) firstRow = firstRowSaved;
    if (args.restoreRow2 === "true" && secondRowSaved.length !== 0) secondRow = secondRowSaved;
    setPresence();
})