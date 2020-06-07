import React, { useState, useContext } from 'react'

import './Auth.css'
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Input from '../../shared/components/FormElements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)

    const [loginMode, setLoginMode] = useState(true)
    const { loading, error, sendRequest, clearError } = useHttpClient()

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    )

    const authSubmit = async (event) => {
        event.preventDefault()

        try {
            const url = process.env.REACT_APP_BACKEND_URL

            let data
            if (loginMode) {
                data = await sendRequest(
                    url + '/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    { 'Content-Type': 'application/json' }
                )
            } else {
                data = await sendRequest(
                    url + '/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                )
            }

            auth.login(data.user.id)
        } catch (error) {
            console.log(error)
        }
    }

    const switchMode = () => {
        // update form correctly depending on mode
        if (!loginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                false
            )
        }

        setLoginMode((loginMode) => !loginMode)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {loading && <LoadingSpinner asOverlay />}

                <h2>Login required</h2>
                <hr />
                {!loginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />
                )}
                <form onSubmit={authSubmit}>
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL]}
                        errorText="Please enter a valid email"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password with at least 6 characters"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        SUBMIT
                    </Button>
                </form>
                <Button inverse onClick={switchMode}>
                    SWITCH TO {loginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth
