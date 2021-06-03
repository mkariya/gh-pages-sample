var ua_obj = {};

(function() {

  var ua = window.navigator.userAgent.toLowerCase();
  var ver = window.navigator.appVersion.toLowerCase();

  ua_obj.browser_name = 'unknown';
  ua_obj.agent_name = 'unknown';
  ua_obj.user_name = 'unknown';
  ua_obj.canvas_flag = false;
  ua_obj.cssanime_flag = false;
  ua_obj.ie_flag = false;
  ua_obj.mac_flag = false;

  if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
    //SP
    ua_obj.user_name = "SP";

    if (ua.search(/iphone/) != -1) {

      ua_obj.agent_name = "iphone";

    } else if (ua.search(/ipod/) != -1) {

      ua_obj.agent_name = "ipod";

    } else if (ua.search(/android/) != -1) {

      ua_obj.agent_name = "android";

      if (ua.search(/android 4/) != -1) {}

    }


    document.write('<meta name="viewport" content="width=device-width">');

  } else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
    //TABLET
    ua_obj.user_name = "TAB";

    if (ua.search(/ipad/) != -1) {
      ua_obj.agent_name = "ipad";
    } else {
      ua_obj.agent_name = "android";
    }

    // document.write('<meta name="viewport" content="width=900">');

  } else {

    //PC

    ua_obj.user_name = "PC";
    if (ua.indexOf("msie") != -1) {
      if (ver.indexOf("msie 6.") != -1) {
        ua_obj.browser_name = 'ie6';
      } else if (ver.indexOf("msie 7.") != -1) {
        ua_obj.browser_name = 'ie7';
      } else if (ver.indexOf("msie 8.") != -1) {
        ua_obj.browser_name = 'ie8';
      } else if (ver.indexOf("msie 9.") != -1) {
        ua_obj.browser_name = 'ie9';
      } else if (ver.indexOf("msie 10.") != -1) {
        ua_obj.browser_name = 'ie10';
      } else {
        ua_obj.browser_name = 'ie';
      }
      ua_obj.ie_flag = true;
    } else if (ua.indexOf('trident/7') != -1) {
      ua_obj.browser_name = 'ie11';
      ua_obj.ie_flag = true;
    } else if (ua.indexOf('chrome') != -1) {
      ua_obj.browser_name = 'chrome';
    } else if (ua.indexOf('safari') != -1) {
      ua_obj.browser_name = 'safari';
    } else if (ua.indexOf('opera') != -1) {
      ua_obj.browser_name = 'opera';
    } else if (ua.indexOf('firefox') != -1) {
      ua_obj.browser_name = 'firefox';
    }

    var isMac = ((ua.indexOf('mac') > -1) && (ua.indexOf('os') > -1)) && !((ua.indexOf('iphone') > -1) || (ua.indexOf('ipad') > -1) || (ua.indexOf('windows') > -1));

    if (isMac) ua_obj.mac_flag = true;

  }

})(this);
