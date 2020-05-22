import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, IconButton, Pane } from 'evergreen-ui';

const AddContactForm = ({ actions: { addContact } }) => {
  //
  const [formData, setFormData] = useState({
    name: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { name } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(formData);
    setFormData({ name: '' });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Pane
          display='flex'
          marginBottom={16}
          padding={5}
          background='blueTint'
          borderRadius={3}
        >
          <TextInput
            name='name'
            placeholder='Add a new contact...'
            value={name}
            onChange={(e) => onChange(e)}
            margin={5}
          />
          <IconButton value='submit' type='submit' icon='plus' margin={5} />
        </Pane>
      </form>
    </Fragment>
  );
};
AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default AddContactForm;
