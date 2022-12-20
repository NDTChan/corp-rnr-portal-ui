import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { translate } from 'react-jhipster';
import './error-validation.scss';

const MultipleErrorMessage = ({ name, errors }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className="error-message" key={type}>
            {translate(message as string)}
          </p>
        ))
      }
    />
  );
};

const SingleErrorMessage = ({ name, errors }) => {
  return <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="error-message">{translate(message)}</p>} />;
};

export { MultipleErrorMessage, SingleErrorMessage };
