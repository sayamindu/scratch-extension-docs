/* Extension using the JavaScript Speech API for text to speech */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, April 2014 */

new(function() {
   var ext = this;
   var TRANSLATE_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
   var LANG_CODES = {
      'Portuguese (Brazil)': 'pt-BR',
      'English (U.K)': 'en-GB',
      'Turkish': 'tr-TR',
      'Romanian': 'ro-RO',
      'French (Canada)': 'fr-CA',
      'Korean': 'ko-KR',
      'Dutch (Netherlands)': 'nl-NL',
      'Danish': 'da-DK',
      'Indonesian': 'id-ID',
      'Hungarian': 'hu-HU',
      'Portuguese (Portugal)': 'pt-PT',
      'Chinese (Hong Kong)': 'zh-HK',
      'French': 'fr-FR',
      'Russian': 'ru-RU',
      'Chinese (Traditional)': 'zh-TW',
      'Thai': 'th-TH',
      'Japaneese': 'ja-JP',
      'Dutch (Belgium)': 'nl-BE',
      'Swedish (Sweden)': 'sv-SE',
      'Finnish': 'fi-FI',
      'Greek': 'el-GR',
      'Spanish (Mexico)': 'es-MX',
      'Arabic (Saudi Arabia)': 'ar-SA',
      'English': 'en',
      'Italian': 'it-IT',
      'English (South Africa)': 'en-ZA',
      'German': 'de-DE',
      'English (Ireland)': 'en-IE',
      'Spanish (Spain)': 'es-ES',
      'Czech': 'cs-CZ',
      'Slovak': 'sk-SK',
      'English (U.S.)': 'en-US',
      'Hebrew': 'he-IL',
      'English (Australia)': 'en-AU',
      'Polish': 'pl-PL',
      'Chinese (Simplified)': 'zh-CN',
      'Spanish (Argentina)': 'es-AR'
   };
   /*function _get_voices() {
       var ret = [];
       var voices = speechSynthesis.getVoices();
       
       for(var i = 0; i < voices.length; i++ ) {
           ret.push(voices[i].name);
           console.log(voices.toString());
       }

       return ret;
   }

   ext.set_voice = function() {
   };*/

   ext.speak_text = function(text, callback) {
      var u = new SpeechSynthesisUtterance(text.toString());
      u.onend = function(event) {
         if (typeof callback == "function") callback();
      };

      speechSynthesis.speak(u);
   };

   ext.read_tweet = function(text, callback){
        var tweet = text.replace(/\#/g, "hashtag ").replace(/http(.*?\s|.*)/g, "");
        ext.speak_text(tweet, callback);
   }

   ext.speak_text_in = function(text, lang, callback) {
      var u = new SpeechSynthesisUtterance(text.toString());
      u.lang = LANG_CODES[lang];
      u.onend = function(event) {
         if (typeof callback == "function") callback();
      };

      speechSynthesis.speak(u);
   };

   ext.translate_and_speak = function(text, from, to, callback) {
      var lang_string =
         LANG_CODES[from].split("-")[0] + "-" + LANG_CODES[to].split("-")[0];

      request_params = {
         key: "trnsl.1.1.20150719T213116Z.9d1a6c4db0a68adf.c2688fc8127578ba87a4f0f8ff0543d2aede2f21",
         lang: lang_string,
         text: text
      };
      $.ajax({
         url: TRANSLATE_URL,
         data: request_params,
         success: function(data, tStatus, xhr) {
            console.log(data + " " + ":: DATA");
            ext.speak_text_in(data.text[0], to, callback);
         },
         error: function(xhr, tStatus, error) {
            console.log(data.message);
            callback("ERROR");
         },
         complete: function(xhr, tStatus) {
            console.log(tStatus);
         }

      });

   };

   ext._shutdown = function() {};

   ext._getStatus = function() {
      if (window.SpeechSynthesisUtterance === undefined) {
         return {
            status: 1,
            msg: 'Your browser does not support text to speech. Try using Google Chrome or Safari.'
         };
      }
      return {
         status: 2,
         msg: 'Ready'
      };
   };

   var descriptor = {
      blocks: [
         //['', 'set voice to %m.voices', 'set_voice', ''],
         ['w', 'speak %s', 'speak_text', 'Hello!'],
         ['w', 'read %s as a tweet', 'read_tweet', 'Hello!'],
         ['w', 'say %s in a %m.lang accent', 'speak_text_in', 'Hello!', 'English (U.K)'],
         ['w', 'translate %s from %m.lang to %m.lang', 'translate_and_speak', 'Hello!', 'English', 'Spanish (Spain)']
      ],
      menus: {
         lang: Object.keys(LANG_CODES).sort()
      }
   };

   ScratchExtensions.register('Text to Speech', descriptor, ext);
})();
