# Diet Dot
Diet dot is a fork of [doT.js](https://github.com/olado/doT), a "[fast] and concise JavaScript templating function".
There are 2 goals of this fork:

1. To make this use `<%blah%>` instead of `{{blah}}` because I wanted the curly braces to be reserved by [AngularJS](http://angularjs.org/)
2. To be faster and even more concise/lightweight by removing functionality that I personally didn't need at the time of writing this

I intend to use this on the server side, but it also works in the browser.

## doT, doU, and Diet Dot
I'm not sure what the story is about doT and doU, but from what I understand, doT is the newer and better version of doU.
In the root dir (the one that this file is in), I've removed doU and the minified version of doT, and I've made the `doT.js` file the place where I put diet dot's code.

In the benchmarks dir, I've put the source code from doT in the `doU.js` file, and I've made the `doT.js` file execute the code in `doT.js` so when you run the benchmarks, just keep that in mind.

## Features
    custom delimiters
    runtime evaluation
    runtime interpolation
    compile-time evaluation
    partials support
    conditionals support
    array iterators
    encoding
    control whitespace - strip or preserve
    streaming friendly
    use it as logic-less or with logic, it is up to you

## Original Author
Laura Doktorova @olado

## License
doT and diet dot are both licensed under the MIT License. (See LICENSE-DOT)
