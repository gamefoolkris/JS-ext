/* ~~~ Settings ~~~ */
var protoPlusFlags = [];
protoPlusFlags.push("enforceUTF"); // Enforces that the document is the correct encoding. Comment out to disable.


/* ~~~ Enforce UTF ~~~ */
if(document.characterSet.toUpperCase() != "UTF-8") {
  if(protoPlusFlags?.includes("enforceUTF")) {
    alert(`Your page is using ${document.characterSet.format(1)} instead of ${'UTF-8'.format(1)}. Please for the love of god put ${'<meta charset="UTF-8" />'.format(1)} somewhere in the ${'<head>'.format(1)} section of your document, otherwise there could be some errors caused by difference in the encoding of the file and the page.`);
  }
}


/* ~~~ HTMLElement ~~~ */
HTMLElement.prototype.ancestors = function(searchNodes = false) {
  let ancestors = [];
  let current = searchNodes ? this.parentNode : this.parentElement;
  while(current) {
    ancestors.push(current);
    current = searchNodes ? current.parentNode : current.parentElement;
  }
  return ancestors;
}
HTMLElement.prototype.getElementById = function(elementId) {
  let elem = document.getElementById(elementId);
  return this.contains(elem) ? elem : null;
}
HTMLElement.prototype.getElementsByName = function(elementName) {
  let elems = document.getElementsByName(elementName);
  let output = [];
  for(let elem of elems) {
    if(this.contains(elem)) {
      output.push(elem);
    }
  }
  return output;
}


/* ~~~ String ~~~ */
String.prototype.format = function(...options) {
  let format = {}
  let alias = (x) => {
    if([0, false, "0"].includes(x)) return 0;
    if([1, true, "1"].includes(x)) return 1;
    return -1;
  }
  format.b = alias(options[0]);
  format.i = alias(options[1]);
  let getRange = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => `\\u{${(start + i).toString(16)}}`);
  let sets = {
    norm: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
    bold: getRange(120276, 120327).map(char => eval(`"${char}"`)),
    italic: getRange(120328, 120379).map(char => eval(`"${char}"`)),
    boldItalic: getRange(120380, 120431).map(char => eval(`"${char}"`)),
    normNums: Array.from("0123456789"),
    boldNums: getRange(120812, 120821).map(char => eval(`"${char}"`))
  }
  let maps = {
    bold: new Map([...sets.norm, ...sets.italic, ...sets.normNums].map((key, i) => [key, [...sets.bold, ...sets.boldItalic, ...sets.boldNums][i]])),
    italic: new Map([...sets.norm, ...sets.bold].map((key, i) => [key, [...sets.italic, ...sets.boldItalic][i]])),
    notItalic: new Map([...sets.italic, ...sets.boldItalic].map((key, i) => [key, [...sets.norm, ...sets.bold][i]])),
    notBold: new Map([...sets.bold, ...sets.boldItalic, ...sets.boldNums].map((key, i) => [key, [...sets.norm, ...sets.italic, ...sets.normNums][i]]))
  }
  let output = Array.from(this);
  let bold = () => output.map(char => maps.bold.get(char) || char);
  let italic = () => output.map(char => maps.italic.get(char) || char);
  let notBold = () => output.map(char => maps.notBold.get(char) || char);
  let notItalic = () => output.map(char => maps.notItalic.get(char) || char);
  if(format?.b === 1 || format?.b === true) output = bold();
  if(format?.b === 0 || format?.b === false) output = notBold();
  if(format?.i === 1 || format?.i === true) output = italic();
  if(format?.i === 0 || format?.i === false) output = notItalic();
  return output.join('');
}
String.prototype.color = function(col) {
  let txt = `${this}`;
  return `<a style="color: ${col}">${txt}</a>`;
}
String.prototype.titleCase = function() {
  let norm = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
  let bold = Array.from('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵');
  let wordChars = new Set([...norm, ...bold]);
  let wordStart = [];
  let onWord = false;
  let output = Array.from(this);
  for(let i = 0; i < output.length; i++) {
    if(!wordChars.has(output[i])) {
      onWord = false;
      continue;
    }
    if(!onWord) wordStart.push(i);
    onWord = true;
  }
  if(wordStart.length < 1) return this;
  for(let i of wordStart) output[i] = output[i].toUpperCase();
  return output.join('');
}
String.prototype.toUpperCase = function() {
  let lower = Array.from('abcdefghijklmnopqrstuvwxyz𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇');
  let upper = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭');
  let output = this;
  for (let i in lower) {
    output = output.replaceAll(lower[i], upper[i]);
  }
  return output;
}
String.prototype.toLowerCase = function() {
  let lower = Array.from('abcdefghijklmnopqrstuvwxyz𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇');
  let upper = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭');
  let output = this;
  for (let i in upper) {
    output = output.replaceAll(upper[i], lower[i]);
  }
  return output;
}
String.prototype.shuffle = function() {
  return Array.from(this).shuffle().join(``);
}
String.prototype.reverse = function() {
  return Array.from(this).reverse().join(``);
}
String.prototype.replaceLast = function(searchValue, replaceValue) {
  return this.reverse().replace(searchValue, replaceValue).reverse();
}
String.prototype.randomCase = function() {
  let output = "";
  for(let i of this) {
    output += Math.round(Math.random()) ? i.toUpperCase() : i.toLowerCase();
  }
  return output;
}


/* ~~~ Array ~~~ */
Array.prototype.shuffle = function() {
  let output = [...this];
  let currentIndex = output.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [output[currentIndex], output[randomIndex]] = [output[randomIndex], output[currentIndex]];
  }
  return output;
}
Array.prototype.randomItem = function() {
  return this.shuffle()[0];
}
Array.prototype.unique = function() {
  return [...new Set(this)];
}
Array.prototype.last = function() {
  return this[this.length - 1];
}
Array.prototype.sum = function() {
  let sum = 0;
  for(let i of this) {
    if(!isNaN(parseFloat(i))) sum += parseFloat(i);
  }
  return sum;
}
Array.prototype.replace = function(searchValue, replaceValue) {
  const breakers = [
    '\u0003', // ETX
    '\u0004', // EOT
    '\u0005', // ENQ
    '\u001F', // Unit Separator
    '\u009F', // Application Program Command
    '\u0378', // Unassigned (safe for strings, rarely used)
    '\uFFFF', // Noncharacter
  ];
  let breaker = breakers.find(ch => !(searchValue + replaceValue).includes(ch));
  return this.join(breaker).replace(searchValue, replaceValue).split(breaker);
}
Array.prototype.replaceAll = function(searchValue, replaceValue) {
  const breakers = [
    '\u0003', // ETX
    '\u0004', // EOT
    '\u0005', // ENQ
    '\u001F', // Unit Separator
    '\u009F', // Application Program Command
    '\u0378', // Unassigned (safe for strings, rarely used)
    '\uFFFF', // Noncharacter
  ];
  let breaker = breakers.find(ch => !(searchValue + replaceValue).includes(ch));
  return this.join(breaker).replaceAll(searchValue, replaceValue).split(breaker);
}
Array.prototype.replaceLast = function(searchValue, replaceValue) {
  return this.reverse().replace(searchValue, replaceValue).reverse();
}


/* ~~~ Number ~~~ */
Number.prototype.closest = function(...values) {
  let init = this.valueOf();
  if(init === Infinity) return Math.max(...values);
  if(init === -Infinity) return Math.min(...values);
  let dists = values.map(num => Math.abs(init - num));
  let nonNaN = dists.filter(num => !Number.isNaN(num));
  let closest = Math.min(...nonNaN);
  if(nonNaN.length === 0) return init;
  closest = values.filter(num => Math.abs(init - num) === closest);
  let posVals = closest.filter(num => num >= 0);
  if(posVals.length) closest = posVals;

  return closest.randomItem();
};