import {
  SELECT_GROUP
} from '../constants/ActionTypes';

const activeGroup = (state = null, action) => {
  switch (action.type) {
  case SELECT_GROUP: {
    return action.groupId;
  }
  default:
    return state;
  }
};

export default activeGroup;
