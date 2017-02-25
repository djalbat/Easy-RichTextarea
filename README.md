# EasyUI-RichTextArea

A textarea element that handles and hands off events well.

This element enshrines the concept of being active, that is being both visible *and* hogging the user input. Hogging the user input means that several event handlers are registered to handle user input events when the element is activated. These handlers are then unregistered when the element is deactivated. Using it will take some of the headache out of having multiple textareas in one application because only the active rich textarea will invoke its handlers.

It also provides better event handling. For example, the change handler will be invoked whenever the content or selection changes, no matter how often, rather then just when the enter key is pressed, say, or when the focus is lost.

## Related projects

- [EasyUI](https://github.com/djalbat/EasyUI) A V-framework.
- [EasyUI-Layout](https://github.com/djalbat/EasyUI-Layout) Layout elements that work with CSS flexbox.
- [EasyUI-DragAndDrop](https://github.com/djalbat/EasyUI-DragAndDrop) Drag and drop elements including an explorer and a rubbish bin.

### Are these projects actually used anywhere?

Actually they are, here:

- [Occam Proof Assistant](http://djalbat.com/occam)

## Installation

You can install EasyUI-RichTextArea with [npm](https://www.npmjs.com/):

    npm install easyui-richtextarea

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/EasyUI-RichTextArea.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the examples.A

## Usage

If you're building with [Node.js](http://nodejs.org) the usage is as follows:

```js
var easyuirichtextarea = require('easyui-richtextarea'),
    Selection = easyuirichtextarea.Selection,
    RichTextArea = easyuirichtextarea.RichTextArea;  ///
```

To use EasyUI-RichTextArea in the browser, take the `easyui-richtextarea.js` file from the project's `dist/` directory and put it somewhere such as a `public/scripts/lib` directory. Referencing this distribution file from a `script` element...

```html
<script src="scripts/lib/easyui-richtextarea.js"> </script>
```

...will give you a global `easyuirichtextarea` variable which can be used directly:

```js
var RichTextArea = easyuirichtextarea;
```

Alternatively, if you're using an AMD style `require` the usage is similar to the Node.js case, only make sure that the path to the distribution file is correct. The following script should work, assuming it lives in the the `public/scripts/` directory:

```js
var easyuirichtextarea = require('easyui-richtextarea'),
    Selection = easyuirichtextarea.Selection,
    RichTextArea = easyuirichtextarea.RichTextArea;  ///
```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Example

See the `example.html` file in the project's root directory, or read on.

### Creating the element

Aside from the usual selector, the constructor takes four additional and optional arguments for the handlers:

```js
var richTextArea = new RichTextArea('#richTextArea', changeHandler, scrollHandler, focusHandler, blurHandler);

function changeHandler(content, selection, contentChanged, selectionChanged) {
  if (contentChanged) {
    console.log('content changed')
  }

  if (selectionChanged) {
    console.log('selection changed')
  }
}

function scrollHandler(scrollTop, scrollLeft) {
  console.log('scrolled')
}

function focusHandler(content, selection) {
  console.log('focused')
}

function blurHandler() {
  console.log('blurred')
}
```

Note the arguments passed to the handlers. It also has the usual `clone()` methods.

Activating and deactivating the element couldn't be simpler:

```js
richTextArea.activate();

richTextArea.deactivate();
```

### Focus and selection

It is important to note that being active and having the focus are not the same thing for a rich textarea element. The former is a concept defined here, the latter is a native property of the underlying DOM element. This is worth mentioning because the concepts of being active and being focused are often used interchangeably elsewhere.

Also, note that the `getSelection()` method will always return a selection even when the underlying DOM element has none. This is because the native `startPosition` and `endPosition` properties of the DOM element, on which the `getSelection()` method ultimately relies, always return values regardless of the presence or otherwise of a selection. If there is no selection, they will both return zero. A textarea element does not always have a selection, however. This can occur before it receives the focus, or if the selection is cleared programmatically by way of the native `removeAllRanges()` method. Despite this, there currently appears to be no reliable way to discern when the underlying selection is present, and so the `getSelection()` method will always return a selection object.

Some good news is that the selection is unaffected by focus. Bear in mind, however, that a selection is not updated until the tick after a DOM element in question receives the focus. For this reason, the rich textarea element will defer the handing off of a 'focus' event for a tick so as to be able to provide the updated selection as one of the arguments to its focus handler.

### CSS

All the `activate()` and `deactivate()` methods do is add and remove an `active` class from the element. If you want that element to be hidden or shown depending on whether or not it is active, which is part of the idea, you need to define this class accordingly. Look at the `easyui-richtextarea.css` file in the `dist` directory to see how this is easily done.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
