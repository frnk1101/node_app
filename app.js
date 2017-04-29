 /**
   * @version 20170429
   * @author moto1101
   * @description A NodeJS application. Prints out a locale menu on console.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

 'use strict';

 var APP = {};

 /**
  * @description Main class
  * @type type
  */
 class C_Main {
   /**
    * @description Starting point
    * @param {type} data_in
    * @returns {undefined}
    */
   main(data_in) {
     try {
       var rl = require('readline');
       var read = rl.createInterface({
         input: process.stdin,
         output: process.stdout
       });
       APP.Main.ConsoleLog('WELCOME \n=======\n');
       APP.Main.ConsoleLog('1 - topic1\n2 - topic2\n3 - topic3\n');
       read.question("Your choice: ", function(data_in) {
         read.close(); //

         switch (data_in) {
           case "1":
             APP.Main.ConsoleLog('topic1');
             break;
           case "2":
             APP.Main.ConsoleLog('topic2');
             break;
           case "3":
             APP.Main.ConsoleLog('topic3');
             break;
           default:
             APP.Main.ConsoleLog('DONE.');
         }

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

 }
 APP.Main = new C_Main();
 /**
  * Start
  */
 APP.Main.main();
