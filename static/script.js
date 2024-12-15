const input = document.querySelector(".input textarea");
const send_button = document.querySelector(".input span");

let userMessage;

const handlechat = () => {
    userMessage = input.value.trim();
    console.log(userMessage);
}

send_button.addEventListener("click", handlechat);