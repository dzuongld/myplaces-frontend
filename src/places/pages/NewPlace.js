import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import './NewPlace.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'

const NewPlace = () => {
    const auth = useContext(AuthContext)
    const [formState, inputHandler] = useForm({}, false)

    const { loading, error, sendRequest, clearError } = useHttpClient()

    const history = useHistory()

    const submitHandler = async (event) => {
        event.preventDefault()
        // console.log(formState.inputs)

        try {
            const url = process.env.REACT_APP_BACKEND_URL
            await sendRequest(
                url + '/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId,
                }),
                { 'Content-Type': 'application/json' }
            )

            // redirect
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={submitHandler}>
                {loading && <LoadingSpinner asOverlay />}

                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter valid title"
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter valid description (at least 5 characters)"
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    type="text"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter valid address"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    )
}

export default NewPlace
