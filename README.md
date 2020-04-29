# Easy RichTextarea

A textarea element that handles and hands off events well.

This element enshrines the concept of being active, that is being both visible *and* hogging the user input. Hogging the user input means that several event handlers are registered to handle user input events when the element is activated. These handlers are then unregistered when the element is deactivated. Using it will take some of the headache out of having multiple textareas in one application because only the active rich textarea will invoke its handlers. It also provides better event handling. For example, the change handler will be invoked whenever the content or selection changes, no matter how often, rather then just, say, when the focus is lost.

### JSX support

There is now support for JSX in the form of [Juxtapose](https://github.com/djalbat/Juxtapose). JSX brings with it [several benefits](http://djalbat.com/juxtapose#jsxIsGreat). So although you will always be able to call constructors directly if you wish, creating Easy elements by way of JSX is *highly recommended*. The contents of this readme file will stay as a reference, however a much better place to start from now on is the online documentation for Juxtapose. The section dealing directly with this project is here:

* [Juxtapose online documentation - Easy-RichTextarea](http://juxtapose.info#easyRichTextarea)

From there you can easily navigate to get an overview of Juxtapose.

### Related projects

- [Easy](https://github.com/djalbat/easy) Elements that abstract away from the DOM.
- [Easy Layout](https://github.com/djalbat/easy-layout) Layout elements that work with CSS flexbox.
- [Easy DragAndDrop](https://github.com/djalbat/easy-draganddrop) Drag and drop elements including an explorer and a rubbish bin.

## Installation

You can install Easy-RichTextarea with [npm](https://www.npmjs.com/):

    npm install easy-richtextarea

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/easy-richtextarea.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

## Usage

```
import { RichTextarea, Selection } from "easy-richtextarea"

const richTextarea =

        <RichTextarea onChange={changeHandler}
                      onScroll={scrollHandler}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
        />

      ;

function changeHandler(event, element) {
  const contentChanged = element.hasContentChanged(),
        selectionChanged = element.hasSelectionChanged();

  console.log(contentChanged, selectionChanged)
}

function scrollHandler(event, element) {
  const scrollTop = element.getScrollTop(),
        scrollLeft = element.getScrollLeft();

  console.log(scrollTop, scrollLeft)
}

function focusHandler(event, element) {
  console.log("focus")
}

function blurHandler(event, element) {
  console.log("blur")
}
```

Activating and deactivating the element couldn't be simpler:

```
richTextarea.activate();

richTextarea.deactivate();
```

## Focus and selection

It is important to note that being active and having the focus are not the same thing for a rich textarea element. The former is a concept defined here, the latter is a native property of the underlying DOM element. This is worth mentioning because the concepts of being active and being focused are often used interchangeably elsewhere.

Also, note that the `getSelection()` method will always return a selection even when the underlying DOM element has none. This is because the native `startPosition` and `endPosition` properties of the DOM element, on which the `getSelection()` method ultimately relies, always return values regardless of the presence or otherwise of a selection. If there is no selection, they will both return zero. A textarea element does not always have a selection, however. This can occur before it receives the focus, or if the selection is cleared programmatically by way of the native `removeAllRanges()` method. Despite this, there currently appears to be no reliable way to discern when the underlying selection is present, and so the `getSelection()` method will always return a selection object.

Some good news is that the selection is unaffected by focus. Bear in mind, however, that a selection is not updated until the tick after a DOM element in question receives the focus. For this reason, the rich textarea element will defer the handing off of a 'focus' event for a tick so as to be able to provide the updated selection as one of the arguments to its focus handler.

## Styles

By default the rich textarea will be hidden when inactive and displayed when active. To override this behaviour, use [Easy with Style](https://github.com/djalbat/easy-with-style):

```
import withStyle from "easy-with-style";

export default (RichTextarea)`

  ...

  .active {

    ...

  }

`;
```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

- james.smith@djalbat.com
- http://djalbat.com
