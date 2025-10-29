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
String.prototype.b = function() {
  let norm = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
  let bold = Array.from('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵');
  let output = this;
  for (let i in norm) {
    output = output.replaceAll(norm[i], bold[i]);
  }
  return output;
};
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
