# Diet Dot
Diet dot is a fork of [doT.js](https://github.com/olado/doT), a "[fast] and concise JavaScript templating function".
There are 2 goals of this fork:

1. To make this ignore things in mustache-style curly braces like `{{blah}}` because I wanted those curly braces to be reserved by [AngularJS](http://angularjs.org/)
2. To be faster and even more concise/lightweight by removing functionality that I personally didn't need at the time of writing this.

I intend to use this on the server side, but it also works in the browser.

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
