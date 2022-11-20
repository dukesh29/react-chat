import React, {useEffect, useState} from 'react';
import './App.css';
import Form from "./components/Form/Form";

const url = 'http://146.185.154.90:8000/messages';

function App() {

  const [value, setValue] = useState('');

  const fetchData = async () => {
    let allMessages;
    const response = await fetch(url);
    if (response.ok) {
      allMessages = await response.json();
    }
    return allMessages;
  };

  const [messages, setMessages] = useState(fetchData());

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.set('message', value);
    data.set('author', 'Hulk');

    await fetch(url, {
      method: 'POST',
      body: data,
    });
  };

  console.log(messages);


  useEffect(() => {
    fetchData().catch(console.error);

  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };


  return (
    <div className="App">
      <Form onFormSubmit={onFormSubmit} onChangeInput={onChange} text={value}/>
    </div>
  );
}

export default App;
