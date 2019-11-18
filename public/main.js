// select Element, listening for events, manipulating elements

//when we click on list item
const listItem = document.querySelector("ul");
 
listItem.addEventListener("click", function(event) {
    console.log(event.target);
    fetch("/delete/" + event.target.id, {method: "delete"}).then(function(res) {
            res.json();
        })
        .then( function() {
            window.location.href = "/home";
            event.target.parentNode.removeChild(event.target);

        })
});

// fire an event
// the event hits our Server