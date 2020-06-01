import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './MainNavigation.css'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true)
    }

    return (
        <React.Fragment>
            {drawerOpen && <Backdrop onClick={toggleDrawer} />}

            <SideDrawer show={drawerOpen} onClick={toggleDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={toggleDrawer}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation
