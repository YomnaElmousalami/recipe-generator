const input = document.querySelector(".input textarea");
const send_button = document.querySelector(".input span");
const chatbox = document.querySelector(".chatbox");
const outputText = document.querySelector(".recipe_text");

let userMessage;

//this function creates a list item element and adds it based on the html tag
const inputListener = (message, class_name) =>{
    const chatListener = document.createElement("li");
    chatListener.classList.add(class_name);

    //before colon: appends user message 
    //after colon: generates bot's response

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

let full = false;
const generateMessage = async (thinking) =>{
    if (full)
    {
        outputText.querySelector("p").remove();
    }
    const newText = document.createElement("p");
    const responseElement = thinking.querySelector("p.entry_message span.entry_text");
    const response = await fetch("/generateText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userMessage })
    });
    
    const result = await response.json();

    if (!response.ok) 
    {
        throw new Error(data.error.message);
    }

    responseElement.textContent = result.response;
    newText.innerHTML = result.response;
    outputText.appendChild(newText);
    full = true;
}

const handle_chatbot = () => {
    userMessage = input.value.trim();

    //when user does not enter a valid message in chatbox, it displays an  alert message
    if(!userMessage)
    {
        alert('Please enter a valid message!');
        return;
    }

    //when the user enters a message, the inputListener will be run and whatever is returned
    //gets appended to the chatbox
    chatbox.appendChild(inputListener(userMessage, "begin_chat"));

    //the AI bot will display "Thinking" before generating message
    setTimeout(() => {
        const thinking = inputListener("Thinking...", "automatic_message");
        chatbox.appendChild(thinking);
        generateMessage(thinking);
    }, 200);
}

//when the send button is clicked, handle_chatbot function will be run
send_button.addEventListener("click", handle_chatbot);

document.getElementById("enter").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
});