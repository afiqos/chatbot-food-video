import React, {useState} from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import chatboticon from './resources/chatboticon.png'
import './Chat.css';

function Chat() {

  const [input, setInput] = useState("");

  let chatState = 0;
  let botOutput = "";
  let chatMessages = [{
    "message":"How are you feeling today?",
    "user": "Bot",
    "type":"normal", // link
    "state": chatState
  }]

  const [messages, setMessages] = useState(chatMessages);
  
  //getYoutubeVideo

  const request = async (methodName) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({messageInput: input})
    };

    const response = await fetch(`http://localhost:8000/${methodName}`, requestOptions);
    const json = await response.json();
    botOutput = json.botOutput;
    
    console.log("Output of botOutput:" )
    if (botOutput === "success"){
      chatState = 1;
      let botMessage = {
        "message": `You are currently ${input}! What are you eating?`,
        "user": "Bot",
        "type":"normal",
        "state": chatState
      };
      setMessages(messages => [...messages, botMessage]);
      
    }else{
      // remain state and reprompt message from bot 
      let botMessage = {
        "message": `Are you dumb, enter the correct emotion!`,
        "user": "Bot",
        "type":"normal",
        "state": chatState
      };
      setMessages(messages => [...messages, botMessage]);
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input)
    
    let userMessage = {
      "message": input,
      "user": "You",
      "type":"normal",
      "state": chatState
    };
    setMessages(messages => [...messages, userMessage]);
    
    switch(chatState){
      case 0:
        // emotions
        request('sendEmotion');

        break;
      case 1:
        // food 
        break;
      case 2:
        // ....
        break;
      default:
        // ....
        break; 
    }

    setInput("");
  };

  const exportChat = (e) => {
    console.log("Exporting Chat");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={chatboticon} />

        <div className="chat__headerInfo">
          <h3>What to watch ?</h3>
          <p>Your personal video recommendation bot</p>
        </div>

        <div className="chat__headerRight">
          <Button
            variant="contained"
            startIcon={<ChatIcon />}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="chat__body">

        {messages.map((messages) => (
          <p className={`chat__message ${messages.user === "You" && "chat__receiver"}`}>
            <span className="chat__name"> {messages.user} </span>
            {messages.message}
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}

      </div>

      <div className="chat__footer">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <SendIcon onClick={sendMessage} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat
