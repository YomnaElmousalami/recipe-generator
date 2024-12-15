const input = document.querySelector(".input textarea");
const send_button = document.querySelector(".input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const inputListener = (message, class_name) =>{
    const chatListener = document.createElement("li");
    chatListener.classList.add(class_name);
    let content = class_name === "begin_chat" ? `<p>${message}</p>` : `<img src = "https://attic.sh/iiq017aushlxw6gd3e2mqziazci2" class = "icon_entry" alt = "Logo"><p>${message}</p>`;
    chatListener.innerHTML = content;
    return chatListener;
}

const handle_input = () => {
    userMessage = input.value.trim();
    if(!userMessage)
    {
        alert('Please enter a valid message!');
        return;
    }

    chatbox.appendChild(inputListener(userMessage, "begin_chat"));
}

send_button.addEventListener("click", handle_input);