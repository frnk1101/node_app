/**
 * @version 20170502
 * @author moto1101
 * @description A NodeJS application. Prints out a locale menu on console.
 *
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';
/**
 * @description Main class
 * @type type
 */
class C_Main
{
  /**
   * @description main function
   * @param {type} data_in
   * @returns {undefined}
   */
  main(data_in)
  {
    try {
      APP.Configuration.MenuConfiguration(); // load menu configuration
      APP.Main.MainMenu({}); // print main menu
    } catch (error) {
      APP.Main.ConsoleLog(error);
    }
  }
  /**
   * @description Main Menu
   * @param {type} data_in
   * @returns {C_Main.MainMenu.node_appAnonym$2}
   */
  MainMenu(data_in)
  {
    try {
      var readline = require('readline');
      var cin = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      let menu = APP.main_menu;

      let menu_ = 'WELCOME \n=======\n';
      for (let i = 0; i < menu.length; i++)
      {
        menu_ += (i + 1) + ' - ' + menu[i].name + '\n';
      }
      menu_ += 'q - exit\n';
      APP.Main.ConsoleLog(menu_);
      /**
       * @description inline function to handle menu selection
       * @param {type} data_in
       * @returns {undefined}
       */
      var f_selection = function(data_in)
      {
        try
        {
          cin.close(); //
          if (data_in === 'q')
          {
            APP.Main.Exit();
          }
          if (data_in.match(/[0-9]/g) && parseInt(data_in) <= menu.length)
          {
            menu[parseInt(data_in) - 1].exec();
          }
          APP.Main.MainMenu({});
        } catch (error) {
          APP.Main.ConsoleLog(error);
        }
      };
      cin.question("Your selection: ", f_selection);
      return ({
        menu: menu
      });
    } catch (error) {
      APP.Main.ConsoleLog(error);
    }
  }
  /**
   * @description console output
   * @param {string} data_in
   * @returns {undefined}
   */
  ConsoleLog(data_in) {
    try {
      console.log(data_in);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description exit application
   * @returns {undefined}
   */
  Exit()
  {
    try
    {
      APP.Main.ConsoleLog('Bye.');
      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  }
}
/**
 * @description program configuration
 * @type type
 */
class C_Configuration
{
  /**
   * @description menu configuration object
   * @returns {undefined}
   */
  MenuConfiguration()
  {
    try
    {
      APP.main_menu = [{
        name: 'platform name',
        exec: APP.ProcessInformation.getPlatform
      }, {
        name: 'NodeJS version',
        exec: APP.ProcessInformation.getVersion
      }, {
        name: 'NodeJS versions',
        exec: APP.ProcessInformation.getVersions
      }, {
        name: 'different process information',
        exec: APP.ProcessInformation.getVariousInformation
      }];
    } catch (error)
    {
      APP.Main.ConsoleLog(error);
    }
  }
}
/**
 * @description NodeJS process information
 * @type type
 */
class C_ProcessInformation
{

  getPlatform()
  {
    try {
      APP.Main.ConsoleLog(process.platform);
    } catch (error)
    {
      APP.Main.ConsoleLog(error);
    }
  }

  getVersion() {
    try
    {
      APP.Main.ConsoleLog(process.version);
    } catch (error)
    {
      APP.Main.ConsoleLog(error);
    }
  }

  getVersions()
  {
    try
    {
      APP.Main.ConsoleLog(process.versions);
    } catch (error)
    {
      APP.Main.ConsoleLog(error);
    }
  }

  getVariousInformation()
  {
    try
    {
      APP.Main.ConsoleLog([process.pid, process.execPath, process.connected, process.release, process.mainModule]);
    } catch (error)
    {
      APP.Main.ConsoleLog(error);
    }
  }

}

/**
 * @description Starting point
 */
try
{
  var APP = {};
  APP.Main = new C_Main();
  APP.Configuration = new C_Configuration();
  APP.ProcessInformation = new C_ProcessInformation();
  APP.Main.main();
} catch (error)
{
  console.log(error);
}
