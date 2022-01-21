import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Service } from './service';
type Props = {
  service: Service;
};

export const Form = ({ service }: Props): JSX.Element => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    service.addMessage(message);
    setMessage('');
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Type a message" type="text" value={message} onChange={handleInput} />
      <button type="submit">Send</button>
    </form>
  );
};
