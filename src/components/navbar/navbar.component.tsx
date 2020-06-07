import React from 'react'
import logo from '../../assets/img/antara-logo.png';
import styles from './navbar.component.css';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from '@material-ui/core/IconButton';

const NavBar = () => {

    return (
        <div className={styles.navbar}>
            <div>
                <img src={logo} className={styles.navbarLogo}/>
            </div>
            <div>
                <IconButton>
                    <AccountCircleOutlinedIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default NavBar
