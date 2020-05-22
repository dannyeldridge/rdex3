import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, IconButton, Pane, Spinner } from 'evergreen-ui';

const AddInteractionForm = ({ addInteraction, id }) => {
  const [formData, setFormData] = useState({ note: '' });
  const { note } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addInteraction({ note, id });
    setFormData({ note: '' });
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
            name='note'
            placeholder='Add a new interaction...'
            value={note}
            onChange={(e) => onChange(e)}
            margin={5}
          />
          <IconButton value='submit' type='submit' icon='plus' margin={5} />
        </Pane>
      </form>
    </Fragment>
  );
};
AddInteractionForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default AddInteractionForm;
