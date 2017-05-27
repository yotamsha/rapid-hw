import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';


const Dashboard = ({user, elementsPos, onDrag}) => (
  <div className="user-profile-container">
    {elementsPos.fullName &&
    <Draggable
      onStop={(e,ui) => onDrag('fullName',e,ui)}>
      <div className="draggable-item full-name-text" style={{
      left : elementsPos.fullName.x,
      top : elementsPos.fullName.y}}>
        {user.fullName}</div>
    </Draggable>}
    {elementsPos.profileImage &&
    <Draggable
      onStop={(e,ui) => onDrag('profileImage',e,ui)}>
      <div className="draggable-item profile-image" style={{
       left : elementsPos.profileImage.x,
       top : elementsPos.profileImage.y,
       backgroundImage: 'url(' + user.profileImage + ')'}}>
      </div>
    </Draggable>}
  </div>
);
/*
 <img  src={user.profileImage} style={{left : elementsPos.profileImage.x, top : elementsPos.profileImage.y}}/>
 */

Dashboard.propTypes = {
  onDrag: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  elementsPos: PropTypes.object.isRequired,
};

export default Dashboard;
