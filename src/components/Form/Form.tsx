import React from 'react';

interface Props {
  onChangeInput: React.ChangeEventHandler;
  text: string;
  onFormSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<Props> = ({onChangeInput, text, onFormSubmit}) => {
  return (
    <form onSubmit={onFormSubmit} className="d-flex justify-content-center flex-column align-items-center">
      <h1>Messenger</h1>
      <div>
        <input type="text" onChange={onChangeInput} value={text}/>
        <button type="submit" className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default Form;