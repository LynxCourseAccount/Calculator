/**
 * Plugin Name: Calculator
 * Author: Orischenko Alexander
 * Reviewers: Mikhail Grinko
 */

'use strict';

function CalculatorConstructor() {}

/**
 * create DOM element
 * privat variables
 */
CalculatorConstructor.calculator = document.querySelector('#calculator');
CalculatorConstructor.sectionNum = document.createElement('section');
CalculatorConstructor.sectionMethods = document.createElement('section');
CalculatorConstructor.sectionMethodsMath = document.createElement('section');
CalculatorConstructor.screen = document.createElement('div');
CalculatorConstructor.num = document.createElement('div');
CalculatorConstructor.solution = [];
CalculatorConstructor.capacity = 12;
CalculatorConstructor.isNumber = false;
CalculatorConstructor.blockAfterEq = false;

/**
 * function append DOM numbers
 */
CalculatorConstructor.prototype._appendDomElementNumbers = function () {

    CalculatorConstructor.calculator.appendChild(CalculatorConstructor.screen).classList.add('screen');
    CalculatorConstructor.calculator.appendChild(CalculatorConstructor.sectionNum).classList.add('section_numbers');

    for (let i = 9; i >= 0; i--) {
        CalculatorConstructor.num.textContent = i;
        CalculatorConstructor.sectionNum.appendChild(CalculatorConstructor.num.cloneNode(true)).classList.add('method');
    }

    CalculatorConstructor.sectionNum.appendChild(CalculatorConstructor.num.cloneNode(true)).classList.add('method');
    CalculatorConstructor.sectionNum.lastElementChild.classList.add('dot');

    CalculatorConstructor.sectionNum.appendChild(CalculatorConstructor.num.cloneNode(true)).classList.add('method');
    CalculatorConstructor.sectionNum.lastElementChild.classList.add('eq');
    CalculatorConstructor.sectionNum.lastElementChild.textContent = '=';

    CalculatorConstructor.sectionNum.lastElementChild.previousElementSibling.textContent = '.';
    CalculatorConstructor.sectionNum.lastElementChild.previousElementSibling.style.cssFloat = 'left';
    CalculatorConstructor.sectionNum.lastElementChild.previousElementSibling.previousElementSibling.style.cssFloat = 'none';

};

/**
 * function append DOM operators
 */
CalculatorConstructor.prototype._appendDomElementOperators = function () {

    CalculatorConstructor.calculator.appendChild(CalculatorConstructor.sectionMethods).classList.add('section_methods');

    for (let i = 0; i < 5; i++) {
        CalculatorConstructor.num.textContent = '';
        CalculatorConstructor.sectionMethods.appendChild(CalculatorConstructor.num.cloneNode(true)).setAttribute( 'class', 'method' );
    }

    CalculatorConstructor.sectionMethods.firstElementChild.textContent = String.fromCodePoint(67);
    CalculatorConstructor.sectionMethods.firstElementChild.nextSibling.textContent = String.fromCodePoint(47);
    CalculatorConstructor.sectionMethods.firstElementChild.nextSibling.nextSibling.textContent = String.fromCodePoint(42);
    CalculatorConstructor.sectionMethods.firstElementChild.nextSibling.nextSibling.nextSibling.textContent = String.fromCodePoint(45);
    CalculatorConstructor.sectionMethods.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.textContent = String.fromCodePoint(43);

};

/**
 * function append DOM special math operators
 */
CalculatorConstructor.prototype._appendDomElementMathOperators = function () {

    CalculatorConstructor.calculator.appendChild(CalculatorConstructor.sectionMethodsMath).classList.add('section_methods_math');

    for (let i = 0; i < 4; i++) {
        CalculatorConstructor.sectionMethodsMath.appendChild(CalculatorConstructor.num.cloneNode(true)).setAttribute( 'class', 'method' );
    }

    CalculatorConstructor.sectionMethodsMath.firstElementChild.textContent = 'sin';
    CalculatorConstructor.sectionMethodsMath.firstElementChild.nextSibling.textContent = 'cos';
    CalculatorConstructor.sectionMethodsMath.firstElementChild.nextSibling.nextSibling.textContent = 'tan';
    CalculatorConstructor.sectionMethodsMath.firstElementChild.nextSibling.nextSibling.nextSibling.textContent = 'sqrt';

};

/**
 * function click on methods
 * ( 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 )
 * ( . + - * / = )
 * ( sin cos tag sqrt )
 */
CalculatorConstructor.prototype._clickMethod = function () {

    let obj = {
        methods: {
            'sin': function (a) {
                return Math.round(Math.sin(a) * 1000) / 1000;
            },
            'cos': function (a) {
                return Math.round(Math.cos(a) * 1000) / 1000;
            },
            'tan': function (a) {
                return Math.round(Math.tan(a) * 1000) / 1000;
            },
            'sqrt': function (a) {
                return Math.round(Math.sqrt(a) * 1000) / 1000;
            }
        }
    };

    function clickNum() {
        CalculatorConstructor.isNumber = true;

        if (CalculatorConstructor.solution.length < CalculatorConstructor.capacity && CalculatorConstructor.blockAfterEq === false) {
            CalculatorConstructor.screen.textContent += Number(this.textContent);
            CalculatorConstructor.solution.push(this.textContent);
        }
    }

    function dotClick() {
        if (CalculatorConstructor.solution.length < CalculatorConstructor.capacity + 1 && CalculatorConstructor.isNumber === true && CalculatorConstructor.blockAfterEq === false) {
            CalculatorConstructor.screen.textContent += this.textContent;
            CalculatorConstructor.solution.push(this.textContent);
            CalculatorConstructor.isNumber = false;
        }
    }

    function eqClick() {
        if (CalculatorConstructor.solution.length < CalculatorConstructor.capacity + 1 && CalculatorConstructor.isNumber === true && CalculatorConstructor.blockAfterEq === false) {
            let result = new Function('return ' + CalculatorConstructor.screen.textContent)();

            CalculatorConstructor.screen.innerHTML = CalculatorConstructor.screen.textContent + this.textContent + '<span>' + ( Math.round(result * 1000) / 1000 ) + '</span>';
            CalculatorConstructor.isNumber = false;
            CalculatorConstructor.blockAfterEq = true;
        }
    }

    function setMethod() {
        if (CalculatorConstructor.solution.length < CalculatorConstructor.capacity + 1 && CalculatorConstructor.isNumber === true && CalculatorConstructor.blockAfterEq === false) {
            CalculatorConstructor.screen.textContent += ' '+ this.textContent + ' ';

            if (CalculatorConstructor.solution.length === CalculatorConstructor.capacity) {
                CalculatorConstructor.screen.style.fontSize = '35px';
            }

            CalculatorConstructor.isNumber = false;
            CalculatorConstructor.solution.splice(0);
        }
    }

    function setSpecialMethod() {
        if (CalculatorConstructor.solution.length < CalculatorConstructor.capacity + 1 && CalculatorConstructor.isNumber === true && CalculatorConstructor.blockAfterEq === false) {
            CalculatorConstructor.screen.textContent += this.textContent;

            let a = CalculatorConstructor.screen.textContent.split(''),
                b = [], //numbers
                c = []; //operator

            a.forEach(function (i) {
                if (!isNaN(i)) {
                    b.push(i);
                } else {
                    c.push(i);
                }
            });

            CalculatorConstructor.screen.innerHTML = '<div>' + c.join('') + '(' + ( b.join('') || 0 ) + ')' + '</div>' + '<span>' + obj.methods[c.join('')]( b.join('') || 0 ) + '</span>';
            CalculatorConstructor.isNumber = false;
            CalculatorConstructor.blockAfterEq = true;
        }
    }

    function deleteClick() {
        CalculatorConstructor.screen.textContent = '';
        CalculatorConstructor.solution.splice(0);
        CalculatorConstructor.isNumber = false;
        CalculatorConstructor.blockAfterEq = false;
    }

    //click all operators
    let elem = Array.prototype.slice.call(CalculatorConstructor.calculator.querySelectorAll('.method'));

    elem.forEach(function(item) {

        if (item.closest('.section_methods_math')) {
            item.addEventListener('click', setSpecialMethod, false);

        }else if(item.closest('.section_numbers') && !item.classList.contains('eq') && !item.classList.contains('dot')) {
            item.addEventListener('click', clickNum, false);

        }else if(item.closest('.section_methods')) {
            item.addEventListener('click', setMethod, false);

        }else if (item.classList.contains('dot')) {
            item.addEventListener('click', dotClick, false);

        }else if(item.classList.contains('eq')) {
            item.addEventListener('click', eqClick, false);
        }

    });

    //click DELETE ( C )
    CalculatorConstructor.sectionMethods.firstElementChild.addEventListener('click', deleteClick, false);

};

/**
 * function click on special math methods panel
 */
CalculatorConstructor.prototype._clickMathMethodsPanel = function () {

    function specialMethodsPanel() {
        this.classList.toggle('open');

        if (this.classList.contains('open')) {
            this.style.bottom = '-220px';
        }else {
            this.style.bottom = '-320px';
        }
    }

    CalculatorConstructor.sectionMethodsMath.addEventListener('click', specialMethodsPanel, false);

};

/**
 * public method
 */
CalculatorConstructor.prototype.init = function () {

    this._appendDomElementNumbers();
    this._appendDomElementOperators();
    this._appendDomElementMathOperators();
    this._clickMethod();
    this._clickMathMethodsPanel();

};

let calc = new CalculatorConstructor();
calc.init();