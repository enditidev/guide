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

    var wordIndices = [];
    var wordIndex = tempNodeVal.indexOf(tempWordVal);
    while (wordIndex !== -1) {
      wordIndices.push(wordIndex);
      wordIndex = tempNodeVal.indexOf(tempWordVal, wordIndex + 1);
    }

    var offset = 0;
    for (var i = 0; i < wordIndices.length; i++) {
      wordIndex = wordIndices[i];
      var pn = node.parentNode;
      if (pn.className !== "searchword") {
        // Split the text node at the word position
        var before = node.splitText(wordIndex + offset);
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

        // Adjust the offset to account for the added span nodes
        offset += word.length - 1;
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

  if (node.nodeType === Node.TEXT_NODE) {
    var pn = node.parentNode;
    if (pn.className === "searchword") {
      var prevSib = pn.previousSibling;
      var nextSib = pn.nextSibling;
      nextSib.textContent = prevSib.textContent + node.textContent + nextSib.textContent;
      prevSib.textContent = '';
      node.textContent = '';
    }
  }
}

function localSearchHighlight(searchStr, doc) {
  doc = typeof doc !== 'undefined' ? doc : document;

  if (!doc.createElement) return;
  if (searchStr === '') {
    unhighlight(doc.body); // Bỏ highlight nếu search-input rỗng
    return;
  }

  var searchstr = unescape(searchStr).replace(/^\s+|\s+$/g, "");
  if (searchstr === '') return;

  var bodyElement = doc.getElementsByTagName("body")[0]; // Cache the body element
  unhighlight(bodyElement); // Bỏ highlight tìm kiếm trước đó

  highlightWord(bodyElement, searchstr, doc);
}

var searchTimeout;

function handleSearchInput(value) {
  clearTimeout(searchTimeout);

  const searchStr = stripVowelAccent(value.trim());

  searchTimeout = setTimeout(function() {
    localSearchHighlight(searchStr);
  }, 400); // Thời gian chờ để highlight (giảm độ trễ)
}