/**
 * @version 20170520
 * @author moto1101
 * @description A NodeJS application. Prints out a locale menu on console to load and run external methods.
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
   * @param {object} data_in
   * @returns {boolean}
   */
  main(data_in)
  {
    try {
      var class_name = process.argv[2];

      if (class_name === undefined || class_name.length === 0)
      {
        APP.Main.ConsoleLog('ERROR. Run node node_app.js <your_file> where your_file must be the class name. Bye.');
        return(false);
      }

      try {
        var new_func = require('./' + class_name + '.js');
      } catch (error) {
        APP.Main.ConsoleLog('ERROR. File not found. Same directory?');
        return(false);
      }

      APP[class_name] = new new_func();

      APP.main_menu = JSON.parse(APP.Main.getFile({filename: 'menu_config.json'})).menu;
      APP.Main.MainMenu({});
    } catch (error) {
      APP.Main.ConsoleLog(error);
    }
  }
  /**
   * @description get content from local file
   * @param {object} data_in 
   * @returns {object}
   */
  getFile(data_in)
  {
    try {
      var fs = require('fs');
      var filename = data_in.filename;
      var file = fs.readFileSync(filename); // fs.readFile('/dir/file', 'utf8', callback);
      return(file);
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
       * @param {object} data_in
       * @returns {undefined}
       */
      var f_selection = function (data_in)
      {
        try
        {
          cin.close();
          if (data_in === 'q')
          {
            APP.Main.Exit();
          }
          if (data_in.match(/[0-9]/g) && parseInt(data_in) <= menu.length)
          {
            let function_a = (menu[parseInt(data_in) - 1].exec).split('.');

            if (typeof APP[function_a[0]][function_a[1]] === 'function')
            {
              APP[function_a[0]][function_a[1]]();
            } else {
              APP.Main.ConsoleLog('ERROR. exec parameter has to be ClassName.MethodName');
            }

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
 * @description Starting point
 */
try
{
  var APP = {};
  APP.Main = new C_Main();
  APP.Main.main();
} catch (error)
{
  console.log(error);
}
