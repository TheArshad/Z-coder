import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar } from '@mui/material';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Header() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    }

    return (
        <header>
            <div className='header-container'>
                <div className='header-left'>
                    <p onClick={handleLogoClick}>
                        <img
                            src="/zcoder-logo.png" // from public folder
                            alt="ZCoder Logo"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '10px',
                                objectFit: 'contain',
                                cursor: 'pointer',
                                marginRight: '10px'
                            }}
                        />
                    </p>
                    <h3 onClick={handleLogoClick}>Back to Home</h3>
                </div>
                <div className='header-middle'>
                    <div className='header-search-container'>
                        <SearchIcon />
                        <input type='text' placeholder='Search' />
                    </div>
                </div>
                <div className='header-right'>
                    <div className='header-right-container'>
                        <Link to='/profile'>
                            <Avatar src={user?.photo} className="avatar2" />
                        </Link>
                        <Link to='/calendar'>
                            <InboxIcon className='calendar' />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header