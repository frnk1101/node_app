'use strict';

/**
 * @description NodeJS process information [example]
 * @type class
 */

class C_ProcessInformation
{

  getPlatform()
  {
    try {
      console.log(process.platform);
    } catch (error)
    {
      console.log(error);
    }
  }

  getVersion() {
    try
    {
      console.log(process.version);
    } catch (error)
    {
      console.log(error);
    }
  }

  getVersions()
  {
    try
    {
      console.log(process.versions);
    } catch (error)
    {
      console.log(error);
    }
  }

  getVariousInformation()
  {
    try
    {
      console.log([process.pid, process.execPath, process.connected, process.release, process.mainModule]);
    } catch (error)
    {
      console.log(error);
    }
  }

}

module.exports = C_ProcessInformation;
