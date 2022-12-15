import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { translate } from 'react-jhipster';

const MultipleErrorMessage = ({ name, errors }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages && Object.entries(messages).map(([type, message]) => <p key={type}>{translate(message as string)}</p>)
      }
    />
  );
};

const SingleErrorMessage = ({ name, errors }) => {
  return <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{translate(message)}</p>} />;
};

export { MultipleErrorMessage, SingleErrorMessage };
