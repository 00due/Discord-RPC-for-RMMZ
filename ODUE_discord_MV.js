/*:
 * @plugindesc (Ver1.2.1) Discord Rich Presence integration to RPG Maker MV.
 * @author ODUE
 * @url https://github.com/00due/Discord-RPC-for-RMMZ
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
 * REQUIRED TO FILL:
 * Application ID, Large picture, Large picture text, Row 1
 * 
 * 
 * Plugin commands:
 *
 * rpc_replaceRow1 <text to replace with>   - Replaces row 1 (maximum 128 characters)
 * rpc_replaceRow2 <text to replace with>   - Replaces row 2 (maximum 128 characters)
 * rpc_saveRows   - Save both rows for later use
 * rpc_restore <row1 / row2>   – Restores a saved row
 * rpc_enable row2   - Enables the second row
 * rpc_disable row2   - Disables the second row
 * 
 * Examples:
 * // On battle start
 * rpc_saveRows
 * rpc_replaceRow1 Fighting a monster
 * rpc_disable row2
 * 
 * // On battle end
 * rpc_restore row1
 * rpc_enable row2
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
 */

if (typeof require !== 'function' || typeof process !== 'object' || !process.versions || !process.versions.nw) {
    console.warn('Warning: nwjs not found (running in browser?) - Discord Rich Presence disabled.');
}
else {
    let discordParameters = PluginManager.parameters('ODUE_discord_MV');

    const appId = discordParameters['Discord application ID'];
    if (appId.length < 10) {
        console.error("DISCORD ERROR: Invalid Application ID!");
    }

    let bigPicture = discordParameters['Large picture'];
    let bigPictureText = discordParameters['Large picture text'];
    let smallPictureEnabled;
    smallPictureEnabled = discordParameters['Enable small picture'] === "true";

    let smallPicture = discordParameters['Small picture'];
    let smallPictureText = discordParameters['Small picture text'];


    let firstRow = discordParameters['Row 1'];
    let secondRow = discordParameters['Row 2'];
    let firstRowSaved;
    let secondRowSaved;

    let row2Enabled;

    row2Enabled = discordParameters['Show row 2'] === "true";

    let playtime;
    if (discordParameters['Show playtime'] === "true") {
        playtime = Date.now();
    }

    let button1Url;
    let button1Text;
    let button2Url;
    let button2Text;

    let buttons = getButtons(discordParameters);

    function getButtons(discordParameters) {
        if (discordParameters['Enable button 1'] === "true") {
            button1Text = discordParameters['Button 1 text'];
            button1Url = discordParameters['Button 1 URL'];
            let buttonArr = [{ label: button1Text, url: button1Url }];
            if (discordParameters['Enable button 2'] === "true") {
                button2Text = discordParameters['Button 2 text'];
                button2Url = discordParameters['Button 2 URL'];
                buttonArr.push({ label: button2Text, url: button2Url });
            }
            return buttonArr;
        }
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
                if (['mhp', 'mmp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk', 'hp', 'mp', 'tp', 'level'].includes(stat)) {
                    return actor[stat];
                } else if (['name', 'nickname', 'profile'].includes(stat)) {
                    return actor[stat]();
                } else if (stat === 'class') {
                    return actor.currentClass().name;
                } else {
                    return '';
                }
            }
            else return '';
        });

        return text;
    }

    //Warnings

    function checkStringLength(text, maxLength, errorMessage) {
        if (text.length > maxLength) console.error(errorMessage)
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


    let pluginComm = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        pluginComm.call(this, command, args);
        if (command === 'rpc_replaceRow1') {
            if (args[0] != '') {
                combinedArgs = args.join(" ")
                replaceRow1(combinedArgs);
            }
        }

        if (command === 'rpc_replaceRow2') {
            if (args[0] != '') {
                combinedArgs = args.join(" ")
                replaceRow2(combinedArgs);
            }
        }

        if (command === 'rpc_saveRows') {
                saveRows();
        }

        if (command === 'rpc_restore') {
            switch (args[0]) {
                case 'row1': restoreRows(1); break;
                case 'row2': restoreRows(2); break;
            }
        }
        if (command === 'rpc_enable') {
            if (args[0] === "row2") enableSecondRow();
            
        }
        if (command === 'rpc_disable') {
            if (args[0] === "row2") disableSecondRow();
            
        }
    };


    const rpc = require("discord-rpc");
    const client = new rpc.Client({ transport: 'ipc' });
    client.login({ clientId: appId });

    const createActivityObject = (details, state) => ({
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
        console.log("RPC enabled")
    });

    saveRows = function () {
        firstRowSaved = firstRow;
        secondRowSaved = secondRow;
    };

    replaceRow1 = function (newRow) {
        let interpretedText = interpretText(newRow);
        if (interpretedText.length <= 128) {
            firstRow = interpretedText;
            if (row2Enabled) setPresence();
            else deleteRow2();
        }
        else console.error("DISCORD ERROR: The length of row 1 is over 128 characters.\nDiscord rich presence has been disabled.")
    };

    replaceRow2 = function (newRow) {
        let interpretedText = interpretText(newRow);
        if (interpretedText.length <= 128) {
            secondRow = interpretedText;
            if (row2Enabled) setPresence();
            else deleteRow2();
        }
        else console.error("DISCORD ERROR: The length of row 2 is over 128 characters.\nDiscord rich presence has been disabled.")
    };

    restoreRows = function (rowToRestore) {
        switch (rowToRestore) {
            case 1:
                firstRow = firstRowSaved;
                if (row2Enabled) setPresence();
                else deleteRow2();
                return;
            case 2:
                secondRow = secondRowSaved;
                if (row2Enabled) setPresence();
                else deleteRow2();
                return;
        }
    };

    disableSecondRow = function() {
        row2Enabled = false;
        deleteRow2();
    };

    enableSecondRow = function() {
        row2Enabled = true;
        setPresence();
    };
}
