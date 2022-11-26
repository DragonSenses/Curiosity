/* Replace Function Expressions with arrow functions in the code below */
function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
}

/*  
ask(
    "Do you agree?",
    function () { alert("You agreed."); },
    function () { alert("You canceled the execution."); }
);
*/

ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);

/* Another Solution */
let ask = (question, yes, no) => confirm(question) ? yes() : no();
ask(
    'Do you agree?',
    () => console.log('You agreed'),
    () => console.log('You interrupted execution'),
);