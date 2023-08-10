# Discord Rich Presence for RPG Maker MZ / MV

This plugin for RPG Maker MZ and MV allows your game to show a rich presence in Discord.
![Image](https://cdn.discordapp.com/attachments/728203713893892227/1137797848763728022/image.png)

# Download
https://github.com/00due/Discord-RPC-for-RMMZ/archive/refs/heads/mv-beta.zip

After downloading, extract the `ODUE_discord.js` (or the MV version if you're using RMMV) file into `<your project's folder>/js/plugins`

# Initial setup:

0.If you don't have Node.js installed, install it from https://nodejs.org/en/download

1.Open the folder of your game (where you have your game.rmmzproject / Game.rpgproject in) and open CMD or powershell there.

2.Run the command `npm install discord-rpc`

---If you're getting an error Command not found or something like that, make sure you have Node.js installed!---

3.Go to https://discord.com/developers/applications and create your application. Click 'New application' and give it your game's name.
After creating it, open the Rich Presence --> Art assets tab, and upload the large and small images.

---Recommendation: The large image is typically the logo of your game.---

---WARNING: The art assets have about 10-15 minutes delay until they become visible.---


4.Copy the Application ID from the 'General information' tab, and paste it into the 'Discord application ID on this plugin.

5.Fill the other plugin parameters with anything you want.

# WARNING: After exporting for MV:

Move the folder `node_modules` from `www/` folder to the folder where the executable is. Otherwise it can't find the node module. 




# (MZ) Plugin commands

1. Open Plugin commands --> ODUE_discord

2. Select either Edit row 1 or 2

3. Type the new value of it.

You can also save the current values for later use.


# (MV) Plugin commands

`replaceRow1 <text to replace with>`   - Replaces row 1

`replaceRow2 <text to replace with>`   - Replaces row 2

`save rows`   - Save both rows for later use

`restore <row1 / row2>`   – Restores a saved row


Examples:

// On battle start

`save rows`

`replaceRow1 Fighting a monster`

// On battle end

`restore row1`

# Terms of use:

 1. You must give credit to ODUE
 2. You can freely edit this plugin to your needs. However, you must still credit me.
 3. This plugin is free for commercial and non-commercial projects.
 4. This plugin is provided as is. I'm not responsible for anything you make with this plugin.
 5. You can send feature requests to me on platforms such as Reddit (to u/SanttuPOIKA----).
    However, I have no obligation to fulfill your requests.
