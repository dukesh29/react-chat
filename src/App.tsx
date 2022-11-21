import React, {useEffect, useState} from 'react';
import Form from "./components/Form/Form";
import MessageCarts from "./components/MessageCarts/MessageCarts";
import {Post} from "./type";

let baseUrl = 'http://146.185.154.90:8000/messages';

function App() {

  const [value, setValue] = useState('');

  const [messages, setMessages] = useState([{
    message: '',
    _id: '',
    datetime: '',
    author: '',
  }]);

  const goOn = async () => {
    let lastDate = '';
    let url = '';
    const response = await fetch(baseUrl);
    const theFirstPosts = await response.json();
    url = baseUrl + '?datetime=' + theFirstPosts[theFirstPosts.length - 1].datetime;
    setInterval(async () => {
      const response = await fetch(url);
      const posts: Post[] = await response.json();

      if (posts.length > 0) {
        lastDate = posts[posts.length - 1].datetime;
        url = baseUrl + '?datetime=' + lastDate;
        setMessages(prevState => [...posts, ...prevState]);
      }
    }, 3000);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.set('message', value);
    data.set('author', 'THE GOAT');

    await fetch(baseUrl, {
      method: 'POST',
      body: data,
    });
  };

  const fetchData = async () => {
    const response = await fetch(baseUrl);
    if (response.ok) {
      setMessages((await response.json()).reverse());
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
    goOn();
  }, []);


  const allMessages = messages.map(message => {
    return (
      <MessageCarts message={message.message} datetime={message.datetime} author={message.author} key={message._id}/>
    )
  });


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };


  return (
    <div className="App">
      <Form onFormSubmit={onFormSubmit} onChangeInput={onChange} text={value}/>
      <div>
        {allMessages}
      </div>
    </div>
  );
}

export default App;
