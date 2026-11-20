// -------JAVASCRIPT-------
// The page now reacts to what the visitor does:
// "choose this" fills in the form and scrolls to it
//  The summary and the highlighted card update live
// past dates can't be picked

// -------Grab the elements we need (by their id or class in index.html)

alert("script.js is running");

const form = document.getElementById("bookingForm");
const message = document.getElementById("message");
const summary = document.getElementById("summary");
const nameInput = document.getElementById("name");
const treatmentSelect = document.getElementById("treatment");
const dateInput = document.getElementById("date");
const themeButton = document.getElementById("themeToggle");
const cards = document.querySelectorAll(".card");


// ---- light / dark mode -----
function isDarkNow() {
    const chosen = document.documentElement.getAttribute("data-theme");
    if(chosen) return chosen === "dark"; 
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateThemeButton() {
    themeButton.textContent = isDarkNow() ? "Light mode" : "Dark mode";
}

themeButton.addEventListener("click", function () {
    const next = isDarkNow() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    updateThemeButton();

});

// -----Don't allow dates in the past-----
const now = new Date();
const today =
now.getFullYear() + "-" +
String(now.getMonth() + 1).padStart(2, "0") + "-" +
String(now.getDate()).padStart(2, "0");
dateInput.min = today;

// -----update the summary and highlighted card--------\
function updatePage() {
    const chosenOption = treatmentSelect.options[treatmentSelect.selectedIndex];
    const price = chosenOption.dataset.price;

    cards.forEach(function (card) {
        card.classList.toggle("selected", card.dataset.name === treatmentSelect.value);

    });
    updateSummary();
}


// Write the live summary
function updateSummary() {
    const chosenOption = treatmentSelect.options[treatmentSelect.selectedIndex];
    const price = chosenOption.dataset.price;

    if (dateInput.value) {
        summary.textContent = treatmentSelect.value + " on " + dateInput.value + ": $" + price + " total.";
    } else {
        summary.textContent = treatmentSelect.value + ": $" + price + ". Pick a date to finish."
    }
}

treatmentSelect.addEventListener("change", updatePage);
dateInput.addEventListener("change", updatePage);
updatePage();

// -------"choose this" button on cards------
cards.forEach(function(card){
    const button = card.querySelector(".choose");
    button.addEventListener("click", function () {
        treatmentSelect.value = card.dataset.name;
        updatePage();
        document.getElementById("book").scrollIntoView();
        nameInput.focus({ preventScroll: true });
    });
});

// -----submitting the for------
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const name = nameInput.value;
    const treatment = treatmentSelect.value;
    const date = dateInput.value;

    message.textContent = "Thank you, " + name + "! We'll confirm your " + treatment + " on " + date + ".";
    form.reset();
    updatePage();
});

// Clear the thank-you message as soon as the visitor starts a new booking  
form.addEventListener("input", function () {
    message.textContent = "";
});

