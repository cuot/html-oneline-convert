var level = 0;
var LOOP_SIZE = 100;

function entry() {
  var code = document.getElementById("HTML_TextArea").value;
  cleanHTML(code);
}

// function showProgress(done, total) {
//   var perc = Math.floor((100 * done) / total);

//   var bar = document.getElementById("bar");
//   bar.innerHTML = perc + "%\u00A0";
//   bar.style.width = perc + "%";
//   bar.style.visibility = "visible";
// }
// function hideProgress() {
//   var bar = document.getElementById("bar");
//   bar.style.visibility = "hidden";
// }
function cleanHTML(code) {
  var i = 0;
  var t = "";
  function cleanAsync() {
    var iStart = i;
    for (; i < code.length && i < iStart + LOOP_SIZE; i++) {
      point = i;

      //if no more tags, copy and exit
      if (-1 == code.substr(i).indexOf("<")) {
        out += code.substr(i);
        finishTabifier(out);
        return;
      }

      //copy verbatim until a tag
      while (point < code.length && "<" != code.charAt(point)) point++;
      if (i != point) {
        cont = code.substr(i, point - i);
        if (!cont.match(/^\s+$/)) {
          if ("\n" == out.charAt(out.length - 1)) {
            out += tabs();
          } else if ("\n" == cont.charAt(0)) {
            out += "\n" + tabs();
            cont = cont.replace(/^\s+/, "");
          }
          cont = cont.replace(/\s+/g, " ");
          out += cont;
        }
        if (cont.match(/\n/)) {
          out += "\n" + tabs();
        }
      }
      start = point;

      //find the end of the tag
      while (point < code.length && ">" != code.charAt(point)) point++;
      tag = code.substr(start, point - start);
      i = point;

      //if this is a special tag, deal with it!
      if ("!--" == tag.substr(1, 3)) {
        if (!tag.match(/--$/)) {
          while ("-->" != code.substr(point, 3)) point++;
          point += 2;
          tag = code.substr(start, point - start);
          i = point;
        }
        if ("\n" != out.charAt(out.length - 1)) out += "\n";
        out += tabs();
        out += tag + ">\n";
      } else if ("!" == tag[1]) {
        out = placeTag(tag + ">", out);
      } else if ("?" == tag[1]) {
        out += tag + ">\n";
      } else if ((t = tag.match(/^<(script|style)/i))) {
        t[1] = t[1].toLowerCase();
        tag = cleanTag(tag);
        out = placeTag(tag, out);
        end = String(code.substr(i + 1))
          .toLowerCase()
          .indexOf("</" + t[1]);
        if (end) {
          cont = code.substr(i + 1, end);
          i += end;
          out += cont;
        }
      } else {
        tag = cleanTag(tag);
        out = placeTag(tag, out);
      }
    }

    // showProgress(i, code.length);
    if (i < code.length) {
      setTimeout(cleanAsync, 0);
    } else {
      finishTabifier(out);
    }
  }
  var point = 0,
    start = null,
    end = null,
    tag = "",
    out = "",
    cont = "";
  cleanAsync();
}
function finishTabifier(code) {
  code = code.replace(/\n\s*\n/g, "\n"); //blank lines
  code = code.replace(/^[\s\n]*/, ""); //leading space
  code = code.replace(/[\s\n]*$/, ""); //trailing space

  document.getElementById("HTML_ConvertArea").value = code;
  level = 0;

  // hideProgress();
}
function tabs() {
  var s = "";
  for (var j = 0; j < level; j++) s += "\t";
  return s;
}
function cleanTag(tag) {
  var tagout = "";
  tag = tag.replace(/\n/g, " "); //remove newlines
  tag = tag.replace(/\s*=\s*/g, "="); //remove spaces around =
  tag = tag.replace(/[\s]{2,}/g, " "); //collapse whitespace
  tag = tag.replace(/^\s+|\s+$/g, " "); //collapse whitespace
  var suffix = "";
  if (tag.match(/\/$/)) {
    suffix = "/";
    tag = tag.replace(/\/+$/, "");
  }
  var m,
    partRe = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/;
  while ((m = partRe.exec(tag))) {
    if (m[2]) {
      tagout += m[1].toLowerCase() + "=" + m[2];
    } else if (m[1]) {
      tagout += m[1].toLowerCase();
    }
    tagout += " ";

    // Why is this necessary?  I thought .exec() went from where it left off.
    tag = tag.substr(m[0].length);
  }
  return tagout.replace(/\s*$/, "") + suffix + ">";
}
var ownLine = ["area", "body", "head", "hr", "i?frame", "link", "meta", "noscript", "style", "table", "tbody", "thead", "tfoot"];
var contOwnLine = ["li", "dt", "dt", "h[1-6]", "option", "script"];
var lineBefore = new RegExp("^<(/?" + ownLine.join("|/?") + "|" + contOwnLine.join("|") + ")[ >]");
var newLevel = ["blockquote", "div", "dl", "fieldset", "form", "frameset", "map", "ol", "p", "pre", "select", "td", "th", "tr", "ul"];
newLevel = new RegExp("^</?(" + newLevel.join("|") + ")[ >]");
function placeTag(tag, out) {
  var nl = tag.match(newLevel);
  if (tag.match(lineBefore) || nl) {
    out = out.replace(/\s*$/, "");
    out += "\n";
  }
}
