# Diet Dot
Diet dot is a fork of [doT.js](https://github.com/olado/doT), a "[fast] and concise JavaScript templating function".
Diet dot is ~20% faster and more lightweight, and its syntax differs from doT's so that it can parse the `[[ ]]` tags on the server and [AngularJS](http://angularjs.org) can run on the client and parse the mustache-style `{{ }}`

There are 3 goals of this fork:

1. To make this ignore things in mustache-style curly braces like `{{=blah}}` because I wanted those curly braces to be transformed by [AngularJS](http://angularjs.org/), so instead diet dot uses `[[=blah]]`
2. To be faster and even more concise/lightweight by removing functionality that I personally didn't need at the time of writing this. In fact, this is so lightweight that this whole package is less than 10kb!
3. To rid this repo of as many dependencies as possible (just like the original doT). In fact, I even removed the all of the dev dependencies that doT had.

NB: This might not work in browsers. I don't test for browser support because I don't need it, but I think that it will work in browsers.

## Diet Dot Features
+ Your templates can make use of data sets, which are JS objects that are given to them upon rendering
+ Interpolation (evaluate and print) with `[[= evaluateThis() + ' and then print it!' ]]`
+ If-ElseIf-Else with `[[? ifConditionalHere === true ]]` for if, `[[?? elseIfConditionalsHere === true ]]` for else if, `[[??]]` for else, and `[[?]]` to close the open if/elseif/else
+ Array iteration with `[[~yourArray :value:index]]` to start the while block and `[[~]]` to close that block. In the example `[[~yourArray :value:index]]` we loop through the array `yourArray` and anything between that and the closing `[[~]]` will be able to access a variable called `index` which will have the index of the current part of the array that we're in and you'll also get a variable called `value` which will have the value of the array at that index.

## Diet Dot Lingo
+ **Templates** are things written in diet dot syntax. They must be strings when given to diet dot.
+ **Data sets** are JS objects that can be passed to templates.
+ **Compiling** is converting a template to a function. You will then be able to call that function to render the compiled template.
+ **Rendering** is getting a string from a compiled template (which is just a function). You can call that function with 1 argument (the data set) and then the compiled template will return a string that is the end result.

## Getting Started
Install this module with `npm install diet-dot` and then you can use it like so:
```js
var dietDot = require('diet-dot'), // Require diet dot
    template = 'Hi!!! I am using [[=data.technology]]', // Just a template
    dataSet = {technology: 'diet dot'}, // Our data set that we will inject into the template
    compiledTemplate = dietDot(template), // Compile the template
    rendition = compiledTemplate({technology: 'diet dot'}) // Run the compiled template with our data set

console.log(rendition) // Tell the work what you got in the rendition
// From here, you can even make a new rendition by calling compiledTemplate with a new data set.
```

## Testing
There is no testing suite because there are no dependencies.
If you want to test, run `node test.js` and that will test to see if this module is working and report back.

## Benchmarking
To benchmark diet dot against doT, run the benchmarks in [this project](https://github.com/jamescostian/templating-engine-benchmarks). In general, diet dot is ~20% faster.

## Original Author
Laura Doktorova @olado

## License
doT and diet dot are both licensed under the MIT License. (See LICENSE-DOT)
