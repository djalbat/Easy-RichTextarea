# EasyUI-RichTextArea

A textarea component that handles and hands off events well.

The `RichTextArea` component enshrines the concept of being active, that is visible (presumably) *and* hogging the user input. Hogging the user input means that several event handlers are registered to handle user input events when the component is activated. These handlers are then unregistered when the component is deactivated. Using it will take some of the headache out of having multiple textareas in one application because only an active component will invoke its handlers.

It also provides better event handling. For example, its captures the `focus` event but defers passing it on for a tick so as to be able to provide both the content and selection values as arguments to its focus handler. Similarly, the change handler will be invoked whenever the content or selection changes, no matter how often, rather then just when the enter key is pressed (say) or when the focus is lost.

## Related projects

- [EasyUI](https://github.com/djalbat/EasyUI) A V-framework.
- [EasyUI-Layout](https://github.com/djalbat/EasyUI-Layout) Layout elements that work with CSS flexbox.
- [EasyUI-DragAndDrop](https://github.com/djalbat/EasyUI-DragAndDrop) Drag and drop elements including a file explorer and a rubbish bin.

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

### Creating the component

Aside from the usual selector, the constructor takes four additional and optional arguments for the handlers:

```js
var richTextArea = new RichTextArea('#richTextArea', changeHandler, scrollHandler, focusHandler, blurHandler);

richTextArea.activate();

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

Note the arguments passed to the handlers.

It also has the usual `clone()` methods, both static and instance.

Activating and deactivating the component couldn't be simpler:

```js
richTextArea.activate();

richTextArea.deactivate();
```

### CSS

Bear in mind that all the `activate()` and `deactivate()` methods do is add and remove an `active` class. If you want the component to be hidden or shown depending on whether or not it is active (which is recommended), you need to define this class accordingly. Look at the `easyui-richtextarea.css` file in the `dist` directory to see how.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
