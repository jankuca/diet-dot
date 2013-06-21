# Diet Dot
Diet dot is a fork of [doT.js](https://github.com/olado/doT), a "[fast] and concise JavaScript templating function".
Although doT is fast and lightweight, diet dot *insanely* fast and lightweight.
There are 4 goals of this fork:

1. To make this ignore things in mustache-style curly braces like `{{=blah}}` because I wanted those curly braces to be transformed by [AngularJS](http://angularjs.org/), so instead diet dot uses `<%=blah%>`
2. To be faster and even more concise/lightweight by removing functionality that I personally didn't need at the time of writing this.
3. To rid this repo of dependencies (just like the original version of this). In fact, I even removed the dev dependencies like mocha and commander that doT had.

This might not work in browsers. IDK - I don't test for browser support because I don't need it, but I think that it will work in browsers.

## Features
The original doT had many more features than this, but these are the features that I left in:

+ Compile templates
+ Interpolation (evaluate and "print")
+ Conditionals
+ Array iteration

## Getting Started
Install this module with `npm install diet-dot` and then you can use it like so:
```js
var dietDot = require('diet-dot'), // Require diet dot
    template = 'Hi!!! I am using <%=data.technology%>', // Just a template
    dataSet = {technology: 'diet dot'}, // Our data set that we will inject into the template
    compiledTemplate = new dietDot(template), // Compile the template
    rendition = compiledTemplate({technology: 'diet dot'}) // Run the compiled template with our data set

console.log(rendition) // Tell the work what you got in the rendition
// From here, you can even make a new rendition by calling compiledTemplate with a new data set.
```

## Testing
There is no testing suite because there are no dependencies.
If you want to test, run `node test.js` and that will test to see if this module is working and report back.

## Benchmarking
To benchmark this project, run `node benchmark/runme.js` and you'll get results like the ones I got:
```
Testing doT...
Testing diet dot...
Results:

========================================
Test: createTemplate x 1
========================================
Name      Time ms
doT       2.245817
diet dot  0.791441

========================================
Test: render x 999
========================================
Name      Time ms   Avg ms
doT       0.734171  0.000735
diet dot  0.056990  0.000057

========================================
Conclusion
========================================
Creating Templates:
    diet dot is 283.763% faster
Rendering:
    diet dot is 1288.245306% faster
```

## Original Author
Laura Doktorova @olado

## License
doT and diet dot are both licensed under the MIT License. (See LICENSE-DOT)
