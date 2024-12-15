const input = document.querySelector(".input textarea");
const send_button = document.querySelector(".input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const inputListener = (message, class_name) =>{
    const chatListener = document.createElement("li");
    chatListener.classList.add(class_name);
    let content = class_name === "begin_chat" ? `<p>${message}</p>` :  
    `<span id = "query" class = "logo"> 
    <p class = "entry_message"> 
        <img src = "https://attic.sh/iiq017aushlxw6gd3e2mqziazci2" class = "icon_entry" alt = "Logo"> 
        <span class = "entry_text">${message}</span>
    </p>
   </span>`;
    chatListener.innerHTML = content;
    return chatListener;
}

const handle_chatbot = () => {
    userMessage = input.value.trim();
    if(!userMessage)
    {
        alert('Please enter a valid message!');
        return;
    }

    chatbox.appendChild(inputListener(userMessage, "begin_chat"));

    setTimeout(() => {
        chatbox.appendChild(inputListener("Thinking...", "automatic_message"));
    }, 600);
}

send_button.addEventListener("click", handle_chatbot);