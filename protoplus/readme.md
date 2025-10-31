# ProtoPlus
Adds a bunch of prototype methods.
## How to Use
1. Place this line in the `<head>` section of your document:
```html
<script src="https://raw.githubusercontent.com/gamefoolkris/JSext/refs/heads/main/protoPlus/protoplus.js"></script>
```
2. Download [protoplus.min.js](https://raw.githubusercontent.com/gamefoolkris/JSext/refs/heads/main/protoPlus/protoplus.min.js) and add this line in the `<head>` section of your document:
```html
<script src="/path/to/lib/protoplus.min.js"></script>
```
3. Copy the contents of [protoplus.min.js](https://raw.githubusercontent.com/gamefoolkris/JSext/refs/heads/main/protoPlus/protoplus.min.js) and paste the code into a `<script>` tag in the `<head>` section of your document.
## Methods
### HTMLElement
* `HTMLElement.prototype.ancestors()` - Returns a list of an element's ancestors
* `HTMLElement.prototype.getElementById(elementId)` - Behaves the same as `document.getElementById()` but only returns if the target element is a descendant of `HTMLElement`
* `HTMLElement.prototype.getElementsByName(elementName)` - Ditto, returns a list of all descendants with the given name.
### String
* `String.prototype.format(bold, italic)` - Returns the string, but **bold**, *italic*, or ***both***, using a unicode character set (Must use UTF-8 because it uses characters outside of the BMP)
* `String.prototype.titleCase()` - Capitalizes the first letter of each word.
* `String.prototype.shuffle()` - Self-explanatory.
* `String.prototype.reverse()` - Self-explanatory.
* `String.prototype.randomCase()` - Randomly capitalizes letters in the string.
* `String.prototype.replaceLast(searchValue, replaceValue)` - Replaces the last instance of `searchValue` in a string with `replaceValue`.
### Array
* `Array.prototype.replace(searchValue, replaceValue)`, `Array.prototype.replaceAll(searchValue, replaceValue)`, `Array.prototype.replaceLast(searchValue, replaceValue)` - Works the same as the `String.prototype.replace*()` methods.
* `Array.prototype.shuffle()` - Randomly shuffles the elements in the array.
* `Array.prototype.unique()` - Removes duplicate values in an Array.
* `Array.prototype.last()` - Returns the last item in an Array.
* `Array.prototype.sum()` - Returns the sum of each number in an Array.
* `Array.prototype.randomItem()` - Returns a random item from an Array.
### Number
* `Number.prototype.closest(...values)` - Returns the number closest to the initial number.
## Configuration
There's currently only one flag, but since i made the system might as well document it.
### Usage
Place a `<script>` tag before importing `protoplus`, define `protoPlusFlags` using `var` in said `<script>` tag, and list the flags.
```html
<script>var protoPlusFlags = [/* flags */];</script>
<script src="protoplus.js"></script>
```
### Flags
* `"enforceUTF"` - Makes the script "politely" remind you to set the page to UTF-8 so things like `String.prototype.format()` work. (Recommended, Default)