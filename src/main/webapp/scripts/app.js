jQuery(window).load(function() {
    console.log("My WordPress plugin initialized.");

    function clickButton() {
        alert("Hello world!");
    }

    jQuery("#my-button").on('click', clickButton);
});