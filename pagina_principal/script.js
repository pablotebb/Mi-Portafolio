/* ********** Menu ********** */

((d) => {
    // we distinguish parts of the web
    const $btnMenuHamburger = d.querySelector('#hamburger_o_cross-btn'),
          $menuThrower = d.querySelector('#menu_thrower'),
          $linkHere = d.querySelectorAll('#here'),
          $questions = d.querySelectorAll('.questions_about_me');
          
    // click hamburger menu
    $btnMenuHamburger.addEventListener('click', (e) => {
        $btnMenuHamburger.firstElementChild.classList.toggle('not_visualize');
        $btnMenuHamburger.lastElementChild.classList.toggle('not_visualize');
        $menuThrower.classList.toggle('is-active');
    });

    $linkHere.forEach(link => {
        link.addEventListener('click', () => {
            $questions.forEach(question => {
                question.classList.remove('is-active');
                question.classList.toggle('is-active');
            })
        })
    })


    
    // when everything is loaded
    d.addEventListener('click', e => {
        if(!e.target.matches('#menu_thrower a')) return false;

        $btnMenuHamburger.firstElementChild.classList.remove('not_visualize');
        $btnMenuHamburger.lastElementChild.classList.add('not_visualize');
        $menuThrower.classList.remove('is-active');
        $questions.classList.remove('is-active');
    });
})(document);


