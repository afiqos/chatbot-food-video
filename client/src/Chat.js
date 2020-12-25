import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import chatboticon from './resources/chatboticon.png'
import './Chat.css';

function Chat() {

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();
  const [input, setInput] = useState("");
  const [botOutput, setBotOutput] = useState("");


  useEffect(()=> {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({messageInput: input})
      };

      fetch('localhost:8000/sendMessage/', requestOptions).then(response => response.json()).then(data => setBotOutput(data.id));

  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    
        
    // message return { "botOutput" : "______data_____" }
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
            className={classes.button}
            startIcon={<ChatIcon />}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message chat__receiver`}>
          <span className="chat__name"> You </span>
          send from user
          <span className="chat__timestamp">Timestamp</span>
        </p>

        <p className={`chat__message `}>
          <span className="chat__name"> Bot </span>
          {botOutput}
          <span className="chat__timestamp">Timestamp</span>
        </p>

        <p className={`chat__message `}>
          <span className="chat__name"> Bot </span>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Video Title
              </Typography>

              <iframe
                src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />

              <Typography variant="body2" component="p">
                Video description or anything
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Link to go to page </Button>
            </CardActions>
          </Card>
          <span className="chat__timestamp">Timestamp</span>
        </p>
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
          <SendIcon onClick={sendMessage}/>
        </IconButton>
      </div>
    </div>
  );
}

export default Chat
