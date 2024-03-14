let durationPressButton = 1600,
    success = button => {
        //Success function
        button.classList.add('success');

        holdFunctionSuccess(button.id)
    };



function startHoldButton() {
    document.querySelectorAll('.button-hold').forEach(button => {
        button.style.setProperty('--durationPressButton', durationPressButton + 'ms');
        ['mousedown', 'touchstart', 'keypress'].forEach(e => {
            button.addEventListener(e, ev => {
                if (e != 'keypress' || (e == 'keypress' && ev.which == 32 && !button
                        .classList.contains('process'))) {
                    button.classList.add('process');
                    button.timeout = setTimeout(success, durationPressButton, button);
                }
            });
        });
        ['mouseup', 'mouseout', 'touchend', 'keyup'].forEach(e => {
            button.addEventListener(e, ev => {
                if (e != 'keyup' || (e == 'keyup' && ev.which == 32)) {
                    button.classList.remove('process');
                    clearTimeout(button.timeout);
                }
            }, false);
        });
    });

}