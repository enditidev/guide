function stripVowelAccent(str) {
  var rExps = [
    /[\xC0-\xC2]/g, /[\xE0-\xE2]/g,
    /[\xC8-\xCA]/g, /[\xE8-\xEB]/g,
    /[\xCC-\xCE]/g, /[\xEC-\xEE]/g,
    /[\xD2-\xD4]/g, /[\xF2-\xF4]/g,
    /[\xD9-\xDB]/g, /[\xF9-\xFB]/g
  ];

  var repChar = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'];

  for (var i = 0; i < rExps.length; ++i)
    str = str.replace(rExps[i], repChar[i]);

  return str;
}

function highlightWord(node, word, doc, resultContainer) {
  doc = typeof doc !== 'undefined' ? doc : document;
  if (node === resultContainer) {
    return;
  }

  // Iterate into this node's childNodes
  if (node.hasChildNodes()) {
    for (var hi_cn = 0; hi_cn < node.childNodes.length; hi_cn++) {
      highlightWord(node.childNodes[hi_cn], word, doc);
    }
  }

  if (node.nodeType === Node.TEXT_NODE) {
    var tempNodeVal = stripVowelAccent(node.textContent.toLowerCase());
    var tempWordVal = stripVowelAccent(word.toLowerCase());
    var nodeValue = node.nodeValue;

    var wordIndex = tempNodeVal.indexOf(tempWordVal);
    while (wordIndex !== -1) {
      var pn = node.parentNode;
      if (pn.className !== "searchword") {
        // Split the text node at the word position
        var before = node.splitText(wordIndex);
        var after = before.splitText(word.length);

        // Create the highlighted span node
        var hiword = doc.createElement("span");
        hiword.className = "searchword";
        hiword.textContent = before.nodeValue;

        // Replace the original text node with the highlighted span node
        pn.replaceChild(hiword, before);

        // Update the node and word values for the next iteration
        node = after;
        tempNodeVal = stripVowelAccent(node.textContent.toLowerCase());
        wordIndex = tempNodeVal.indexOf(tempWordVal);
      } else {
        // Skip if the node is already highlighted
        node = node.nextSibling;
        tempNodeVal = stripVowelAccent(node.textContent.toLowerCase());
        wordIndex = tempNodeVal.indexOf(tempWordVal);
      }
    }
  }
}

function unhighlight(node) {
  if (node.hasChildNodes()) {
    for (var hi_cn = 0; hi_cn < node.childNodes.length; hi_cn++) {
      unhighlight(node.childNodes[hi_cn]);
    }
  }

  if (node.nodeType == Node.TEXT_NODE) {
    var pn = node.parentNode;
    if (pn.className == "searchword") {
      var prevSib = pn.previousSibling;
      var nextSib = pn.nextSibling;
      nextSib.textContent = prevSib.textContent + node.textContent + nextSib.textContent;
      prevSib.textContent = '';
      node.textContent = '';
    }
  }
}

function localSearchHighlight(searchStr, doc) {
  doc = typeof (doc) != 'undefined' ? doc : document;

  if (!doc.createElement) return;
  if (searchStr == '') return;

  var searchstr = unescape(searchStr).replace(/^\s+|\s+$/g, "");
  if (searchstr == '') return;

  var phrases = searchstr.replace(/\+/g, ' ').split(/\"/);
  var bodyElement = doc.getElementsByTagName("body")[0]; // Cache the body element

  for (var p = 0; p < phrases.length; p++) {
    var phrase = unescape(phrases[p]).replace(/^\s+|\s+$/g, "");
    if (phrase == '') continue;

    var words = (p % 2 == 0) ? phrase.replace(/([+,()]|%(29|28)|\W+(AND|OR)\W+)/g, ' ').split(/\s+/) : [phrase];

    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      if (word == '') continue;
      highlightWord(bodyElement, word, doc);
    }
  }
}

var searchTimeout;

function handleSearchInput(value) {
  clearTimeout(searchTimeout);

  const searchStr = stripVowelAccent(value.trim());
  unhighlight(document.getElementsByTagName('body')[0]); // Bỏhighlight

  if (searchStr !== '') {
    searchTimeout = setTimeout(function() {
      localSearchHighlight(searchStr);
    }, 400); // thời gian delay highlight để bớt lag
  }
}