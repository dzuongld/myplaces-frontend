import React, { useState, useContext } from 'react'

import './Auth.css'
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)

    const [loginMode, setLoginMode] = useState(true)

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

    const authSubmit = (event) => {
        event.preventDefault()
        // console.log(formState.inputs)
        auth.login()
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
        <Card className="authentication">
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
    )
}

export default Auth
