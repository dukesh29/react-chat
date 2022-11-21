import React from 'react';

interface Props {
  message:string;
  datetime:string;
  author:string;
}

const MessageCarts:React.FC<Props> = ({message,datetime,author}) => {
  return (
    <div className="col-8 card mx-auto my-1 bg-primary bg-gradient rounded rounded-4">
      <div className="card-body d-flex  justify-content-center">
        <p className="card-text fw-bold fs-4 text-white">{message}</p>
      </div>
      <div className="bg-white bg-gradient text-black rounded-pill d-flex mb-2 gap-3 py-2 px-4 mx-auto">
        <h5 className="card-title fs-6 m-0">Author:{author}</h5>
        <h6 className="card-subtitle fs-6 m-0">{datetime}</h6>
      </div>
    </div>
  );
};

export default MessageCarts;