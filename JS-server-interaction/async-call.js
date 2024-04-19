function setMessageVisibility(isVisible) {
    const message = $("#message");
    const clName = "show";
    if (isVisible) {
        message.addClass(clName);
    } else {
        message.removeClass(clName);
    }
}

function submitAsync() {
    //NOTE: uses id, not name
    const login = $("#login").val();
    const password = $("#password").val();
    const data = {login: login, password: password};
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then((res) => res.text(), (reason) => console.log(reason)).then(
        (html) => {
            $("#messagePlaceholder").html(html);
            setMessageVisibility(true);
        }
    );
}