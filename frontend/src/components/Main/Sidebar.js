import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // New icon
import LinkIcon from '@mui/icons-material/Link'; // New icon
import CodeIcon from '@mui/icons-material/Code'; // New icon
import ForumIcon from '@mui/icons-material/Forum'; // New icon

import { Link } from 'react-router-dom';
import './sidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Sidebar() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successfully signed out
      })
      .catch((error) => {
        // An error happened
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='sidebar-options'>

          <div className='link-tag'>
            <CalendarMonthIcon />
            <Link to='/calendar'>Upcoming Contests!</Link>
          </div>

          <div className='sidebar-option'>
            <div className='sidebar-option-name'>
              <LinkIcon />
              <p>IMPORTANT LINKS</p>
            </div>
            <div className='link'>
              <div className='link-tag'>
                <Link to="/">All Questions</Link>
              </div>
              <div className='link-tag'>
                <Link to="/profile">User Profile</Link>
              </div>
              <div className='link-tag'>
                <Link onClick={handleSignOut}>Sign Out</Link>
              </div>
            </div>
          </div>

          <div className='sidebar-option'>
            <div className='sidebar-option-name'>
              <CodeIcon />
              <p>CODE EDITOR</p>
            </div>
            <div className='link'>
              <div className='link-tag'>
                <Link to="/zcoderIDE">ZCoder Online IDE</Link>
              </div>
            </div>
          </div>

          <div className='sidebar-option'>
            <div className='sidebar-option-name'>
              <ForumIcon />
              <p>CHAT ROOM</p>
            </div>
            <div className='link'>
              <div className='link-tag'>
                <Link to='/chatRoom'>Join a room</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;