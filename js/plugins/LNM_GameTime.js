//=============================================================================
// LNM_GameTime.js
//=============================================================================

GameEditor.TOOLS.Time = false;
let $gameTime = null;

//=============================================================================
/*:
 * @plugindesc v1.2.3 Adds control of time to the game, and night / day
 * cycle. Requires LNM_GameEditorCore.js
 * @author Sebastián Cámara, continued by FeelZoR
 *
 * @requiredAssets img/editor/Time.png
 *
 * @param Enabled
 * @desc Set to false if you want to disable the time.
 * @default true
 *
 * @param Default Time
 * @desc Sets the default time when the game start.
 * Use this format: hour:minutes. eg: 14:05 to start at 2:05pm.
 * @default 6:00
 *
 * @param Time Lapse Speed
 * @desc Number of frames it takes for one second to pass, in frames
 * @default 60
 *
 * @param ---Clock Settings---
 * @default
 *
 * @param Show Clock in Menu
 * @desc Shows the current time in the main menu (true / false)
 * @default true
 *
 * @param Show Clock on Map
 * @desc Shows the current time on the map (true / false)
 * @default false
 *
 * @param ---Tints by time---
 * @default
 *
 * @param 00:00
 * @desc [R, G, B]
 * @default [15, 20, 170]
 *
 * @param 01:00
 * @desc [R, G, B]
 * @default [9, 14, 150]
 *
 * @param 02:00
 * @desc [R, G, B]
 * @default [5, 9, 129]
 *
 * @param 03:00
 * @desc [R, G, B]
 * @default [0, 4, 111]
 *
 * @param 04:00
 * @desc [R, G, B]
 * @default [0, 3, 96]
 *
 * @param 05:00
 * @desc [R, G, B]
 * @default [0, 48, 93]
 *
 * @param 06:00
 * @desc [R, G, B]
 * @default [135, 183, 192]
 *
 * @param 07:00
 * @desc [R, G, B]
 * @default [189, 235, 242]
 *
 * @param 08:00
 * @desc [R, G, B]
 * @default [217, 255, 243]
 *
 * @param 09:00
 * @desc [R, G, B]
 * @default [206, 255, 216]
 *
 * @param 10:00
 * @desc [R, G, B]
 * @default [218, 255, 206]
 *
 * @param 11:00
 * @desc [R, G, B]
 * @default [224, 255, 222]
 *
 * @param 12:00
 * @desc [R, G, B]
 * @default [255, 255, 255]
 *
 * @param 13:00
 * @desc [R, G, B]
 * @default [254, 255, 255]
 *
 * @param 14:00
 * @desc [R, G, B]
 * @default [254, 255, 210]
 *
 * @param 15:00
 * @desc [R, G, B]
 * @default [254, 255, 170]
 *
 * @param 16:00
 * @desc [R, G, B]
 * @default [255, 251, 156]
 *
 * @param 17:00
 * @desc [R, G, B]
 * @default [255, 221, 155]
 *
 * @param 18:00
 * @desc [R, G, B]
 * @default [255, 201, 157]
 *
 * @param 19:00
 * @desc [R, G, B]
 * @default [255, 148, 148]
 *
 * @param 20:00
 * @desc [R, G, B]
 * @default [247, 123, 168]
 *
 * @param 21:00
 * @desc [R, G, B]
 * @default [162, 91, 243]
 *
 * @param 22:00
 * @desc [R, G, B]
 * @default [90, 69, 220]
 *
 * @param 23:00
 * @desc [R, G, B]
 * @default [49, 42, 198]
 *
 * @param ---Custom tints---
 * @default
 *
 * @param Custom Tint 1
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 2
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 3
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 4
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 5
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 6
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 7
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 8
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 9
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @param Custom Tint 10
 * @desc [R, G, B]
 * @default [0, 0, 0]
 *
 * @help
 * 
 * Disable the system time by changing the "Enabled" parameter.
 * 
 * ============================================================================
 * Plugin commands
 * ============================================================================
 *
 * Time PAUSE
 * Stops time. This is useful for cutscenes.
 *
 * Time PLAY
 * Reactivates time.
 *
 * Time SET hour minutes
 * Sets game’s time to a specific time.
 * -- Example:
 * Time SET 15 0
 * Sets game’s time to three in the afternoon.
 *
 * Time ADD hours minutes
 * Advances time.
 * -- Example:
 * Time ADD 2 15
 * Advances time by two hours and fifteen minutes.
 *
 * Time SAVE hour_var minutes_var
 * Saves the values of hour and minutes to the specified variable numbers.
 * -- Example:
 * Time SAVE 2 3
 * Saves the hours in the variable #0002 and the minutes in the variable #0003
 *
 * Time LIMIT time_begin time_end self_switch
 * Activates the specified switch only between time_begin and time_end.
 * -- Example:
 * Time LIMIT 6:00 13:40 A
 * Activates the self-switch A between 6am and 1:40pm.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * These must be set in the field Note in Map Properties.
 *
 * <Tint: R, G, B>
 * Ignores time and sets the screen tone specified in RGB color (Red, Green,
 * Blue). This is useful for darker dungeons or zones in which lighting is not
 * time dependant.
 * -- Example:
 * <Tint: 0, 0, 0>
 * Ignores time and sets the screen tone to black.
 *
 * <Tint: CustomTintID>
 * Ignores time and sets the screen tone to a Custom Tint from the Plugin
 * Manager.
 * -- Example:
 * <Tint: 8>
 * Sets the screen tone of Custom Tint 8.
 *
 * ============================================================================
 * Special thanks
 * ============================================================================
 *
 * Xelion for helping me with the translations.
 * Vlue for making the “Game Time MV” plugin. I learned from his source code.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.2.3:
 * * Corrected a bug where using the "Used with MV" plugin would make the game
 *   crash. Corrected the same bug for all other "splash screen" plugins.
 *
 * Version 1.2.2:
 * + Added the possibility to activate the time window on the map.
 * * Modified the parameter that shows the time clock into the menu.
 *
 * Version 1.2.1:
 * * Fixed a bug where deactivating time would make a black screen. 
 * * Fixed a bug where spaces in the <Tint> note were mandatory.
 * 
 * Version 1.2.0:
 * + Added the possibility to store current time into variables.
 * + Added a default time value when starting a new game.
 * + Added the possibility to change an event's self switch based on time.
 *
 * Version 1.1.0:
 * -- FeelZoR continues development
 * + Added the possibility to disable the time system.
 * * Corrected a bug where the custom tint set to the map would reset after
 *      closing a menu.
 *
 * Version 1.00:
 * -- Plugin published.
 */
//=============================================================================

//=============================================================================
// Parameter variables
//=============================================================================
GameEditor.Parameters = PluginManager.parameters('LNM_GameTime');
GameEditor.TOOLS.TimeEnabled = String(GameEditor.Parameters['Enabled'] || true);
GameEditor.TOOLS.DefaultStartTimeStringList = String(GameEditor.Parameters['Default Time'] || '6:00').split(':');
GameEditor.TOOLS.TimeLapse = Number(GameEditor.Parameters['Time Lapse Speed'] || 60);
GameEditor.TOOLS.TimeShowClockMenu = String(GameEditor.Parameters['Show Clock in Menu'] || true);
GameEditor.TOOLS.TimeShowClockMap = String(GameEditor.Parameters['Show Clock on Map'] || false);
GameEditor.TOOLS.TimeTint = [];
GameEditor.TOOLS.TimeTint[0] = JSON.parse(String(GameEditor.Parameters['00.00'] || '[15, 20, 170]'));
GameEditor.TOOLS.TimeTint[1] = JSON.parse(String(GameEditor.Parameters['01:00'] || '[9, 14, 150]'));
GameEditor.TOOLS.TimeTint[2] = JSON.parse(String(GameEditor.Parameters['02:00'] || '[5, 9, 129]'));
GameEditor.TOOLS.TimeTint[3] = JSON.parse(String(GameEditor.Parameters['03:00'] || '[0, 4, 111]'));
GameEditor.TOOLS.TimeTint[4] = JSON.parse(String(GameEditor.Parameters['04:00'] || '[0, 3, 96]'));
GameEditor.TOOLS.TimeTint[5] = JSON.parse(String(GameEditor.Parameters['05:00'] || '[0, 48, 93]'));
GameEditor.TOOLS.TimeTint[6] = JSON.parse(String(GameEditor.Parameters['06:00'] || '[135, 183, 192]'));
GameEditor.TOOLS.TimeTint[7] = JSON.parse(String(GameEditor.Parameters['07:00'] || '[189, 235, 242]'));
GameEditor.TOOLS.TimeTint[8] = JSON.parse(String(GameEditor.Parameters['08:00'] || '[217, 255, 243]'));
GameEditor.TOOLS.TimeTint[9] = JSON.parse(String(GameEditor.Parameters['09:00'] || '[206, 255, 216]'));
GameEditor.TOOLS.TimeTint[10] = JSON.parse(String(GameEditor.Parameters['10:00'] || '[218, 255, 206]'));
GameEditor.TOOLS.TimeTint[11] = JSON.parse(String(GameEditor.Parameters['11:00'] || '[224, 255, 222]'));
GameEditor.TOOLS.TimeTint[12] = JSON.parse(String(GameEditor.Parameters['12:00'] || '[255, 255, 255]'));
GameEditor.TOOLS.TimeTint[13] = JSON.parse(String(GameEditor.Parameters['13:00'] || '[254, 255, 255]'));
GameEditor.TOOLS.TimeTint[14] = JSON.parse(String(GameEditor.Parameters['14:00'] || '[254, 255, 210]'));
GameEditor.TOOLS.TimeTint[15] = JSON.parse(String(GameEditor.Parameters['15:00'] || '[254, 255, 170]'));
GameEditor.TOOLS.TimeTint[16] = JSON.parse(String(GameEditor.Parameters['16:00'] || '[255, 251, 156]'));
GameEditor.TOOLS.TimeTint[17] = JSON.parse(String(GameEditor.Parameters['17:00'] || '[255, 221, 155]'));
GameEditor.TOOLS.TimeTint[18] = JSON.parse(String(GameEditor.Parameters['18:00'] || '[255, 201, 157]'));
GameEditor.TOOLS.TimeTint[19] = JSON.parse(String(GameEditor.Parameters['19:00'] || '[255, 148, 148]'));
GameEditor.TOOLS.TimeTint[20] = JSON.parse(String(GameEditor.Parameters['20:00'] || '[247, 123, 168]'));
GameEditor.TOOLS.TimeTint[21] = JSON.parse(String(GameEditor.Parameters['21:00'] || '[162, 91, 243]'));
GameEditor.TOOLS.TimeTint[22] = JSON.parse(String(GameEditor.Parameters['22:00'] || '[90, 69, 220]'));
GameEditor.TOOLS.TimeTint[23] = JSON.parse(String(GameEditor.Parameters['23:00'] || '[49, 42, 198]'));
GameEditor.TOOLS.TimeCustomTint = [];
GameEditor.TOOLS.TimeCustomTint[1] = JSON.parse(String(GameEditor.Parameters['Custom Tint 1'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[2] = JSON.parse(String(GameEditor.Parameters['Custom Tint 2'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[3] = JSON.parse(String(GameEditor.Parameters['Custom Tint 3'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[4] = JSON.parse(String(GameEditor.Parameters['Custom Tint 4'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[5] = JSON.parse(String(GameEditor.Parameters['Custom Tint 5'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[6] = JSON.parse(String(GameEditor.Parameters['Custom Tint 6'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[7] = JSON.parse(String(GameEditor.Parameters['Custom Tint 7'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[8] = JSON.parse(String(GameEditor.Parameters['Custom Tint 8'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[9] = JSON.parse(String(GameEditor.Parameters['Custom Tint 9'] || '[0, 0, 0]'));
GameEditor.TOOLS.TimeCustomTint[10] = JSON.parse(String(GameEditor.Parameters['Custom Tint 10'] || '[0, 0, 0]'));


//-----------------------------------------------------------------------------
// GameTime
//
//

function GameTime() {
    this.initialize.apply(this, arguments);
}

GameTime.prototype.initialize = function() {
    this._tint = [255, 255, 255];
    this._pause = false;
    this._pauseTint = false;
    this.time = new Time();
    this.switchLimits = [];
};

GameTime.prototype.update = function() {
    if (GameEditor.TOOLS.TimeEnabled === 'true') {
        if (!this._pause) {
            this.time.update();
            for (let index in this.switchLimits) {
                this.switchLimits[index].update(this.time);
            }
        }
        if (!this._pauseTint) {
            this.updateTint();
        }
    }
};

GameTime.prototype.updateTint = function() {
    if (!this._pauseTint && GameEditor.TOOLS.TimeEnabled === 'true') {
        const minute = this.getTime('minute');
        const rgb = this.getNewTint(minute);
        if (rgb === this._tint) return;
        this._tint = rgb;
    }
};

GameTime.prototype.getNewTint = function(minute) {
    const hour = this.getTime('hour');
    const ctint = GameEditor.TOOLS.TimeTint[hour];
    let ntint = null;
    if (hour + 1 !== 24) {
        ntint = GameEditor.TOOLS.TimeTint[hour + 1];
    } else {
        ntint = GameEditor.TOOLS.TimeTint[0];
    }
    const r = ctint[0] - ((ctint[0] - ntint[0]) * (minute / 60));
    const g = ctint[1] - ((ctint[1] - ntint[1]) * (minute / 60));
    const b = ctint[2] - ((ctint[2] - ntint[2]) * (minute / 60));
    return [r, g, b];
};

GameTime.prototype.setTime = function(hour, minute) {
    this.time.hour = hour;
    this.time.minute = minute;
    this.time.update();
};

GameTime.prototype.addTime = function(hours, minutes) {
    if (hours) this.time.addHour(hours);
    if (minutes) this.time.addMinute(minutes);
};

GameTime.prototype.getTime = function(type) {
    return this.time.getTime(type);
};

GameTime.prototype.tint = function(index) {
    return this._tint[index];
};

GameTime.prototype.play = function() {
    this._pause = false;
    this._pauseTint = false;
};

GameTime.prototype.pause = function() {
    this._pause = true;
};

GameTime.prototype.getClock = function() {
    let temp;
    temp = "0" + this.time.hour;
    const hour = temp.slice(-2);
    temp = "0" + this.time.minute;
    const minutes = temp.slice(-2);
    return hour + ":" + minutes;

};

GameTime.prototype.addNewSwitchLimit = function(switchLimit) {
    if (this.switchLimits == null) { // Assures compatibility with v1.1.0 and older
        this.switchLimits = [];
    }
    
    if (switchLimit) {
        this.switchLimits.push(switchLimit);
    }
};

//-----------------------------------------------------------------------------
// Time
//
//

function Time() {
    this.minute = 0;
    this.hour = 0;
    this.day = 0;
}

Time.prototype.update = function() {
    if (Graphics.frameCount % GameEditor.TOOLS.TimeLapse === 0) {
        if ($gameMessage.isBusy()) {
            return;
        }
        if (SceneManager._scene.inMenu()) {
            return;
        }
        if (SceneManager._scene.inBattle()) {
            return;
        }
        this.addMinute();
    }
};

Time.prototype.addMinute = function() {
    this.minute++;
    if (this.minute === 60) {
        this.minute = 0;
        this.addHour();
    }
};

Time.prototype.addHour = function() {
    this.hour++;
    if (this.hour === 24) {
        this.hour = 0;
        this.addDay();
    }
};

Time.prototype.addDay = function() {
    this.day++;
};

Time.prototype.getTime = function(string) {
    switch (string) {
        case 'minute':
            return this.minute;
        case 'hour':
            return this.hour;
        case 'day':
            return this.day;
        default: // for debug purposes.
            return 'Day ' + this.day.toString() + ', Time ' +
                this.hour.toString() + ':' + this.minute.toString();
    }
};

//-----------------------------------------------------------------------------
// Time_Limit
//
// Limits the activation of something depending to the time.
function Time_Limit() {
    this.initialize.apply(this, arguments);
}

Time_Limit.prototype.initialize = function(timeBeginIn, timeEndIn) {
    this.hourBegin = Number(timeBeginIn[0]);
    this.minutesBegin = Number(timeBeginIn[1]);
    
    this.hourEnd = Number(timeEndIn[0]);
    this.minutesEnd = Number(timeEndIn[1]);
};

Time_Limit.prototype.update = function(time) {
    if (this.hourBegin < this.hourEnd || (this.hourBegin === this.hourEnd && this.minutesBegin < this.minutesEnd)) {
        this.updateSameDay(time);
    } else {
        this.updateDifferentDay(time);
    }
};

Time_Limit.prototype.updateSameDay = function(time) {
    const currentHour = time.getTime('hour');
    const currentMinutes = time.getTime('minute');
    if (currentHour > this.hourBegin || (currentHour === this.hourBegin && currentMinutes >= this.minutesBegin)) {
        if (currentHour < this.hourEnd || (currentHour === this.hourEnd && currentMinutes <= this.minutesEnd)) {
            this.updateValue(true);
        }
        
        else {
            this.updateValue(false);
        }
    } else {
        this.updateValue(false);
    }
};

Time_Limit.prototype.updateDifferentDay = function(time) {
    const currentHour = time.getTime('hour');
    const currentMinutes = time.getTime('minute');
    if (currentHour > this.hourBegin || currentHour < this.hourEnd || (currentHour === this.hourBegin && currentMinutes >= this.minutesBegin) || (currentHour === this.hourEnd && currentMinutes <= this.minutesEnd)) {
        this.updateValue(true);
    } else {
        this.updateValue(false);
    }
};

Time_Limit.prototype.updateValue = function(value) {};


//-----------------------------------------------------------------------------
// Switch_Limit
//
// Limits the activation of a self switch of an event to a specified time.
function Switch_Limit() {
    this.initialize.apply(this, arguments);
}

Switch_Limit.prototype = Object.create(Time_Limit.prototype);
Switch_Limit.prototype.constructor = Switch_Limit;

Switch_Limit.prototype.initialize = function(timeBeginIn, timeEndIn, eventIdIn, mapIdIn, selfSwitchIn) {
    Time_Limit.prototype.initialize.call(this, timeBeginIn, timeEndIn);
    this.eventId = eventIdIn;
    this.mapId = mapIdIn;
    
    switch (selfSwitchIn) {
        case 'A': case 'B': case 'C': case 'D':
            this.selfSwitch = selfSwitchIn;
            break;
        default:
            this.selfSwitch = 'A';
            break;
    }
    
    this.lastValue = null;
};

Switch_Limit.prototype.updateValue = function(value) {
    if (this.lastValue !== value) {
        const key = [this.mapId, this.eventId, this.selfSwitch];
        $gameSelfSwitches.setValue(key, value);
        this.lastValue = value;
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

const LNM_GameTime_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    LNM_GameTime_Game_Map_setup.call(this, mapId);
    this.processTintNotes();
};

Game_Map.prototype.processTintNotes = function() {
    if (!$dataMap.note) return;
    const notetags = this.notetags();
    for (let i = 0; i < notetags.length; i++) {
        const line = notetags[i];
        if (line.match(/<(?:Tint:)\s*(\d+)>/i)) {
            $gameScreen.customTint(RegExp.$1);
        }
        if (line.match(/<(?:Tint:)\s*(\d+),\s*(\d+),\s*(\d+)>/i)) {
            $gameScreen.setTint(RegExp.$1, RegExp.$2, RegExp.$3);
        }
    }
};

Game_Map.prototype.notetags = function() {
    return $dataMap.note.split(/[\r\n]+/);
};

//-----------------------------------------------------------------------------
// Game_Screen
//
// The game object class for screen effect data, such as changes in color tone
// and flashes.

Game_Screen.prototype.setTint = function(r, g, b) {
    $gameTime._pauseTint = true;
    $gameTime._tint = [r, g, b];
};

Game_Screen.prototype.customTint = function(index) {
    $gameTime._pauseTint = true;
    $gameTime._tint = GameEditor.TOOLS.TimeCustomTint[index];
};

//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.

const gameTime_Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    gameTime_Scene_Map_create.call(this);
    $gameTime.updateTint();
};

//-----------------------------------------------------------------------------
// Scene_Base
//
// The superclass of all scenes within the game.

const gameTime_Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    gameTime_Scene_Base_update.call(this);
    if ($gameTime) { $gameTime.update(); }
};

Scene_Base.prototype.inMenu = function() {
    return false;
};

Scene_Base.prototype.inBattle = function() {
    return false;
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Scene_Battle.prototype.inBattle = function() {
    return true;
};

//-----------------------------------------------------------------------------
// Scene_MenuBase
//
// The superclass of all the menu-type scenes.

Scene_MenuBase.prototype.inMenu = function() {
    return true;
};

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

const LNM_GameTime_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    LNM_GameTime_DataManager_createGameObjects.call(this);
    $gameTime = new GameTime();
};

const LNM_GameTime_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    let contents = LNM_GameTime_DataManager_makeSaveContents.call(this);
    contents.time = $gameTime;
    return contents;
};

const LNM_GameTime_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    LNM_GameTime_DataManager_extractSaveContents.call(this, contents);
    $gameTime = contents.time;
    const gt = new GameTime();
    const ct = new Time();
    $gameTime.__proto__ = gt.__proto__;
    $gameTime.time.__proto__ = ct.__proto__;
};

const FLZ_GameTime_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    FLZ_GameTime_DataManager_setupNewGame.call(this);
    $gameTime.setTime(Number(GameEditor.TOOLS.DefaultStartTimeStringList[0]),Number(GameEditor.TOOLS.DefaultStartTimeStringList[1]));
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

const LNM_GameTime_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LNM_GameTime_Game_Interpreter_pluginCommand.call(this, command, args);
    if (GameEditor.TOOLS.TimeEnabled === 'true') {
        if (command === 'Time') {
            switch (args[0].toLowerCase()) {
                case 'pause':
                    if (args[1] && args[2]) {
                        const hour = Number(args[1]);
                        const minute = Number(args[2]);
                        $gameTime.setTime(hour, minute);
                    }
                    $gameTime.pause();
                    break;
                case 'play':
                    $gameTime.play();
                    break;
                case 'set':
                    const hour = Number(args[1]);
                    const minute = Number(args[2]);
                    $gameTime.setTime(hour, minute);
                    $gameTime._pauseTint = false;
                    break;
                case 'add':
                    const hours = Number(args[1]);
                    const minutes = Number(args[2]);
                    $gameTime.addTime(hours, minutes);
                    break;
                case 'save':
                    $gameVariables.setValue(Number(args[1]), $gameTime.getTime('hour'));
                    $gameVariables.setValue(Number(args[2]), $gameTime.getTime('minute'));
                    break;
                case 'limit':
                    const timeBegin = String(args[1]).split(':');
                    const timeEnd = String(args[2]).split(':');
                    const selfSwitch = String(args[3])[0].toUpperCase();
                    $gameTime.addNewSwitchLimit(new Switch_Limit(timeBegin, timeEnd, this.eventId(), this._mapId, selfSwitch));
                    break;
            }
        }
    }
};

if (GameEditor.TOOLS.TimeEnabled === 'true') {
    
if (GameEditor.TOOLS.TimeShowClockMenu === 'true') {
//-----------------------------------------------------------------------------
// Scene_Menu
//
// The scene class of the menu screen.

const LNM_GameTime_Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    LNM_GameTime_Scene_Menu_create.call(this);
    this.createTimeWindow();
};

Scene_Menu.prototype.createTimeWindow = function() {
    this._timeWindow = new Window_Time();
    this._timeWindow.y = Graphics.boxHeight - this._timeWindow.height - this._goldWindow.height;
    this.addWindow(this._timeWindow);
}
} // endif

if (GameEditor.TOOLS.TimeShowClockMap === 'true') {
//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.

const FLZ_GameTime_Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    FLZ_GameTime_Scene_Map_create.call(this);
    this._timeWindowShown = null;
};

const FLZ_GameTime_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
    FLZ_GameTime_Scene_Map_callMenu.call(this);
    this._timeWindow.hide();
    this._timeWindowShown = false;
};

const FLZ_GameTime_Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    FLZ_GameTime_Scene_Map_update.call(this);
    if (this._timeWindowShown != null) {
        if (this.isActive() && !this._timeWindowShown) {
            this._timeWindow.show();
            this._timeWindowShown = true;
        }
        
        else if (!this.isActive() && this._timeWindowShown) {
            this._timeWindow.hide();
            this._timeWindowShown = false;
        }
    }
};

const FLZ_GameTime_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    FLZ_GameTime_Scene_Map_createAllWindows.call(this);
    this.createTimeWindow();
};

Scene_Map.prototype.createTimeWindow = function() {
    this._timeWindow = new Window_Time();
    this._timeWindow.x = 0; // You can remove it, or change the 0 to change the top left position on the x axis.
    this._timeWindow.y = 0; // You can remove it, or change the 0 to change the top left position on the y axis.
    this.addWindow(this._timeWindow);
}
} // endif

//-----------------------------------------------------------------------------
// Window_Time
//
//

function Window_Time() {
    this.initialize.apply(this);
}

Window_Time.prototype = Object.create(Window_Base.prototype);
Window_Time.prototype.constructor = Window_Time;
Window_Time.prototype.initialize = function() {
    const width = this.windowWidth();
    const height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
};

Window_Time.prototype.windowWidth = function() {
    return 240;
};

Window_Time.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Time.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.visible) this.refresh();
};

Window_Time.prototype.refresh = function() {
    this.contents.clear();
    this.drawText($gameTime.getClock(), 67, 0, this.contents.width, 0);
};

//=============================================================================
// Editor
//=============================================================================

const LNM_GameTime_GameEditor_initialize = Game_Editor.prototype.initialize;
Game_Editor.prototype.initialize = function() {
    PIXI.Container.call(this);
    LNM_GameTime_GameEditor_initialize.call(this);
    this._setupTimeEditor();
};

Game_Editor.prototype._setupTimeEditor = function() {
    const x = Graphics.width;
    const y = Graphics.height;
    this.addButton('Time', function() {
        $gameEditor.toggleTimeEditor();
    });
    this.labelClock = new Label(x / 2 - 5, y - 60, $gameTime.getClock());
    this.sliderTime = new ButtonSlider(x / 2 - 279, y - 30, 558, 0, 1440, function(value) {
        const calcHour = value / 60;
        const hour = Math.min(Math.floor(calcHour), 23);
        const calcMinute = calcHour - hour;
        const minute = Math.min(Math.floor(calcMinute * 60), 59);
        $gameTime.setTime(hour, minute);
        $gameEditor.updateClock();
    });
    this.addChild(this.labelClock);
    this.addChild(this.sliderTime);
    this.labelClock.visible = false;
    this.sliderTime.visible = false;
};

Game_Editor.prototype.toggleTimeEditor = function() {
    if (GameEditor.TOOLS.Lighting === true) this.toggleLightingEditor();
    GameEditor.TOOLS.Time = !GameEditor.TOOLS.Time;
    this.updateClock();
    this.updateSlider();
    this.labelClock.visible = !this.labelClock.visible;
    this.sliderTime.visible = !this.sliderTime.visible;
};

Game_Editor.prototype.updateClock = function() {
    this.labelClock.setText($gameTime.getClock());
};

Game_Editor.prototype.updateSlider = function() {
    const value = $gameTime.getTime('hour') * 60 + $gameTime.getTime('minute');
    this.sliderTime.setValue(value);
};

const LNM_GameTime_Game_Editor_toggle = Game_Editor.prototype.toggle;
Game_Editor.prototype.toggle = function() {
    LNM_GameTime_Game_Editor_toggle.call(this);
    if (GameEditor.ACTIVE) {
        $gameTime.pause();
        this.updateClock();
        this.updateSlider();
    } else {
        $gameTime.play();
    }
}

} // endif