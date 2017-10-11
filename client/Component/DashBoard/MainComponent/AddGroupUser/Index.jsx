import React from 'react';
import PropTypes from 'prop-types';

const AddGroupUser = () =>
 (
   <div>
     <div className="fixed-action-btn vertical">
       <a
         href="#add-user"
         className="btn-floating blue btn tooltipped modal-trigger"
         data-position="left"
         data-delay="50"
         data-tooltip="Add user"
       >
         <i className="material-icons">group_add</i>
       </a>
     </div>
   </div>
  );


export default AddGroupUser;
