!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_pluralGetSet=t()}(this,function(){"use strict";return function(e,t){var n=t.prototype;["milliseconds","seconds","minutes","hours","days","weeks","isoWeeks","months","quarters","years","dates"].forEach(function(e){n[e]=n[e.replace(/s$/,"")]})}});
