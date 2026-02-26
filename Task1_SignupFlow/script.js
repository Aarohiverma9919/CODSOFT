// script.js — used only on signup.html (3-step form)

// This function switches between form steps (1, 2, or 3)
function nextStep(stepNumber) {

    // Hide all steps
    var allSteps = document.querySelectorAll('.form-step');
    for (var i = 0; i < allSteps.length; i++) {
        allSteps[i].classList.remove('active');
    }

    // Show the step we want
    document.getElementById('step' + stepNumber).classList.add('active');

    // Update the progress dots
    var dots = document.querySelectorAll('.step-dot');
    for (var j = 0; j < dots.length; j++) {
        if (j < stepNumber) {
            dots[j].classList.add('active');
        } else {
            dots[j].classList.remove('active');
        }
    }

    // Change the heading text for each step
    var titleEl = document.getElementById('form-title');
    var subtitleEl = document.getElementById('form-subtitle');

    if (stepNumber === 1) {
        titleEl.innerText = 'Create Account';
        subtitleEl.innerText = 'Join us today — it only takes a minute.';
    } else if (stepNumber === 2) {
        titleEl.innerText = 'Set a Password';
        subtitleEl.innerText = 'Pick something strong and memorable.';
    } else if (stepNumber === 3) {
        titleEl.innerText = 'Your Interests';
        subtitleEl.innerText = 'Select at least one topic you care about.';
    }
}

// Toggle interest chip on or off
function toggleChip(chip) {
    if (chip.classList.contains('selected')) {
        chip.classList.remove('selected');
    } else {
        chip.classList.add('selected');
    }
}

// Handle sign up form submission
var form = document.getElementById('signup-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = form.querySelector('[type="submit"]');
        submitBtn.innerText = 'Creating Account...';
        submitBtn.disabled = true;

        // After a short delay, go to the welcome page
        setTimeout(function () {
            window.location.href = 'welcome.html';
        }, 1500);
    });
}
