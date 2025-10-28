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
  let norm = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  let bold = ['𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝', '𝗞', '𝗟', '𝗠', '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧', '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭', '𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺', '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇', '𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'];
  let output = this;
  for (let i in norm) {
    output = output.replaceAll(norm[i], bold[i]);
  }
  return output;
};
String.prototype.color = function(col, extra) {
  let txt = `${this}`;
  if(extra?.bold) txt = txt.b();
  return `<a style="color: ${col}">${txt}</a>`;
}
String.prototype.titleCase = function() {
  return this.replace(/\b\w/g, (char) => char.toUpperCase());
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
  return this.split(``).shuffle().join(``);
}
String.prototype.reverse = function() {
  return this.split(``).reverse().join(``);
}
String.prototype.replaceLast = function(searchValue, replaceValue) {
  return this.reverse().replace(searchValue, replaceValue).reverse();
}
String.prototype.titleCase = function() {
  return this.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};
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
  for(let i of this) {
    if(typeof(i) !== "number" && parseFloat(i).toString() !== i) return NaN;
  }
  let sum = 0;
  for(let i of this) {
    sum += parseFloat(i);
  }
  return sum;
}
