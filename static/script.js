const input = document.querySelector(".input textarea");
const send_button = document.querySelector(".input span");
const ai_chat = document.querySelector(".ai_chat");
const outputText = document.querySelector(".recipe_text");
const audio_button = document.querySelector(".audio_button");

let userMessage;
let recipeElement;

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
const generateMessage = async (newMessage) =>{
    if (full)
    {
        outputText.querySelector("p").remove();
    }
    const newText = document.createElement("p");
    const responseElement = newMessage.querySelector("p.entry_message span.entry_text");
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
    recipeElement = outputText.outerHTML;
    full = true;
}

const handle_chatbot = () => {
    userMessage = input.value.trim();
    input.value = '';

    //when user does not enter a valid message in chatbox, it displays an  alert message
    if(!userMessage)
    {
        alert('Please enter a valid message!');
        return;
    }

    //when the user enters a message, the inputListener will be run and whatever is returned
    //gets appended to the chatbox
    ai_chat.appendChild(inputListener(userMessage, "begin_chat"));

    //the AI bot will display an empty message before generating a new message
    const newMessage = inputListener("", "automatic_message");
    ai_chat.appendChild(newMessage);
    generateMessage(newMessage);
}

const handle_audio = async() =>{
    const response = await fetch("/retrieveText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: recipeElement })
    });
    
    const result = await response.blob(); //OpenAI(2024), blob is a binary object, which can be used for html files
    if (!response.ok) 
    {
        throw new Error(data.error.message);
    }

    //lines 96-99 with OpenAI(2024) assistance
    const audio = URL.createObjectURL(result); //create audio url
    document.getElementById('audio_file').src = audio;
    document.getElementById('audio_file').controls = true;
    document.getElementById('audio_file').href = document.getElementById('audio_file').src;
}

//when the send button is clicked, handle_chatbot function will be run
send_button.addEventListener("click", handle_chatbot);

//when the audio button is clicked, the handle_audio function will be run
audio_button.addEventListener("click", handle_audio); 

//when enter button is clicked after user types message in the text box, it will be as if the send 
//logo is clicked
document.getElementById("enter").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
});