import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import './App.css'
import Users from './user/pages/Users'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import { AuthContext } from './shared/context/auth-context'
import { useAuth } from './shared/hooks/auth-hook'

const App = () => {
    const { token, userId, login, logout } = useAuth()

    let routes
    if (token) {
        routes = (
            <Switch>
                {/* stop when found a match */}
                <Route path="/" exact>
                    <Users />
                </Route>
                {/* dynamic part */}
                <Route path="/:userId/places">
                    <UserPlaces />
                </Route>
                <Route path="/places/new">
                    <NewPlace />
                </Route>
                {/* must come after new */}
                <Route path="/places/:placeId">
                    <UpdatePlace />
                </Route>
                <Redirect to="/" /> {/* fall back */}
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                {/* stop when found a match */}
                <Route path="/" exact>
                    <Users />
                </Route>
                {/* dynamic part */}
                <Route path="/:userId/places">
                    <UserPlaces />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                login: login,
                logout: logout,
                userId: userId,
            }}
        >
            <Router>
                <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
