# EasyUI-RichTextArea

A textarea component that handles and hands off events well.

The `RichTextArea` component enshrines the concept of something being active, that is visible (presumably) *and* hogging the user input. Hogging means that several event handlers are registered to handle user interface events, these handlers are then unregistered when the component is deactivated. It take some of the headache out of having multiple textareas in one application because it guarantees that only the active component will invoke its handlers.

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

You will need to do this if you want to look at the examples.

## Usage

If you're building with [Node.js](http://nodejs.org) the usage is as follows:

```js
var easyuirichtextarea = require('easyui-richtextarea'),
    Selection = easyuirichtextarea.Selection,
    RichTextArea = easyuirichtextarea.RichTextArea;  ///
```

To use EasyUI-RichTextArea in the browser, take the `easyui-richtextarea.js` file from the project's `dist/` folder and put it somewhere such as a `public/scripts/lib` directory. Referencing this distribution file from a `script` element...

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

## Examples

See the `examples.html` file in the project's root directory, or read on.

TODO

## Contact

- james.smith@djalbat.com
- http://djalbat.com
