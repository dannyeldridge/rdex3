import React, { useReducer } from 'react';
import { items } from '../stitch';
import { ObjectId } from 'mongodb';

const contactReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'setContacts': {
      return {
        ...state,
        contacts: payload.contacts || [],
        isLoading: false,
      };
    }
    case 'addContact': {
      const newContact = {
        ...payload,
      };
      return {
        ...state,
        contacts: [...state.contacts, newContact],
        isLoading: false,
      };
    }
    case 'setContact': {
      return {
        ...state,
        contact: payload.contact,
        interactions: payload.interactions,
        isLoading: false,
      };
    }
    case 'deleteInteraction':
    case 'addInteraction': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'deleteContact':
      return {
        ...state,
        contact: null,
        interactions: [],
        isLoading: false,
      };
    default: {
      console.error(`Received invalid contact action type: ${type}`);
    }
  }
};

const initialState = {
  contacts: [],
  contact: null,
  isLoading: true,
  interactions: [],
};

// ACTIONS
export function useContactItems(userId) {
  //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // get the contacts
  const loadContacts = async () => {
    const contacts = await items.find({}, { limit: 1000 }).asArray();
    dispatch({
      type: 'setContacts',
      payload: { contacts },
    });
  };

  // add a contact
  const addContact = async ({ name }) => {
    const contact = { name, owner_id: userId, interactions: [] };
    const result = await items.insertOne(contact);
    dispatch({
      type: 'addContact',
      payload: { ...contact, _id: result.insertedId },
    });
  };

  // delete a contact
  const deleteContact = async (id) => {
    const query = { _id: ObjectId(id) };
    const contact = await items
      .deleteOne(query)
      .then((result) => console.log(`Deleted ${result.deletedCount} item.`))
      .catch((err) => console.error(`Delete failed with error: ${err}`));
    dispatch({
      type: 'deleteContact',
    });
  };

  // get a single contact
  const getContact = async (id) => {
    const contact = await items.find({ _id: ObjectId(id) }).toArray();
    dispatch({
      type: 'setContact',
      payload: {
        contact: contact[0],
        interactions: contact[0].interactions,
      },
    });
  };

  // add interaction for a contact
  const addInteraction = async ({ note, id }) => {
    const date = new Date();
    const update = {
      $push: {
        interactions: {
          note: note,
          date: date,
          _id: ObjectId(),
        },
      },
    };
    items
      .updateOne({ _id: ObjectId(id) }, update)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(`Successfully added an interaction.`);
        }
      })
      .then((result) => getContact(id))
      .catch((err) => console.error(`Failed to update the item: ${err}`));
    dispatch({
      type: 'addInteraction',
    });
  };

  // delete an interaction for a contact
  const deleteInteraction = async ({ id, interaction }) => {
    const update = {
      $pull: {
        interactions: {
          _id: interaction._id,
        },
      },
    };
    items
      .updateOne({ _id: ObjectId(id) }, update)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(`Successfully deleted an interaction.`);
        }
      })
      .then((result) => getContact(id))
      .catch((err) => console.error(`Failed to update the item: ${err}`));
    dispatch({
      type: 'deleteInteraction',
    });
  };

  React.useEffect(() => {
    loadContacts();
  }, [state.isLoading]);

  return {
    contacts: state.contacts,
    contact: state.contact,
    isLoading: state.isLoading,
    interactions: state.interactions,
    actions: {
      addContact,
      getContact,
      addInteraction,
      loadContacts,
      deleteInteraction,
      deleteContact,
    },
  };
}
