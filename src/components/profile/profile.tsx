import { useState } from 'react';
import './profile.css'

interface ProfileProps {
    user: any
    onClick: () => void
}

export default function Profile ({ user, onClick }: ProfileProps) {
    const [openedProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

    const profileContainerStyles = [
        openedProfileMenu ? 'opened' : '',
        user ? '' : 'login',
    ].join(' ');

    function toggleProfileMenu() {
        setOpenProfileMenu(!openedProfileMenu);
    }

    function handleProfileClick() {
        if (user) {
            toggleProfileMenu();
        }
    }

    return (
        <>
            <div className='profile-icon-box btn'>
                <div
                    className={`profile-container ${profileContainerStyles}`}
                    onClick={onClick}
                >
                    {user ?
                        (
                            <img
                                className='profile-image'
                                src={user.image}
                            />
                        ) : (
                            <i className='ri-login-box-line login-icon' />
                        )
                    }
                </div>
            </div>
            <div
                className={
                    `profile-menu-container${openedProfileMenu ? ' opened' : ''}`
                }
            >

            </div>
        </>
    );
}