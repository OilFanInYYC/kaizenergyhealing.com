/*!
* Start Bootstrap - Kaizenergy Healing v6.0.6 (https://kaizenergyhealing.com/)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    var bookingType = document.getElementById('bookingtype');
    bookingType.addEventListener('change', (e) => {
        var url = e.target.value
        var bookingInputs = document.querySelectorAll('#bookingform input');
        var bookingButton = document.querySelectorAll('#bookingform button');
        if(isValidURL(url)) {
            window.open(url, '_blank');
            bookingInputs.forEach((element) => {
                element.disabled = true;
            });
            bookingButton.forEach((element) => {
                element.disabled = true;
            });
        } else {
            bookingInputs.forEach((element) => {
                element.disabled = false;
            });
            bookingButton.forEach((element) => {
                element.disabled = false;
            });
        }
    });

    var bookingForm = document.getElementById('bookingform');
    bookingForm.addEventListener('submit', (e) => {
        var submitButton = document.getElementById('bookingsubmit');
        var bookingInputs = document.querySelectorAll('#bookingform input');
        var bookingButton = document.querySelectorAll('#bookingform button');
        var requestBooking = async () => {
            bookingInputs.forEach((element) => {
                element.disabled = true;
            });
            bookingButton.forEach((element) => {
                element.disabled = true;
            });
            submitButton.innerHTML = 'Requesting...';
            await sleep(4000);
            submitButton.innerHTML = 'Submitted!';
        }
        requestBooking();
        //e.preventDefault();
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}