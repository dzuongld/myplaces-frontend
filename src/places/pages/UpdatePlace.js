import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'

const UpdatePlace = (props) => {
    const placeId = useParams().placeId
    const auth = useContext(AuthContext)

    const [place, setPlace] = useState()

    const { loading, error, sendRequest, clearError } = useHttpClient()

    const history = useHistory()

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
        },
        false
    )

    const submitHandler = async (event) => {
        event.preventDefault()
        // console.log(formState.inputs)

        try {
            const url = process.env.REACT_APP_BACKEND_URL
            await sendRequest(
                url + '/api/places/' + placeId,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            )

            // redirect
            history.push('/' + auth.userId + '/places')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getPlace = async () => {
            try {
                const url = process.env.REACT_APP_BACKEND_URL
                const data = await sendRequest(url + '/api/places/' + placeId)

                setPlace(data.place)
                setFormData(
                    {
                        title: {
                            value: data.place.title,
                            isValid: true,
                        },
                        description: {
                            value: data.place.description,
                            isValid: true,
                        },
                    },
                    true
                )
            } catch (error) {
                console.log(error)
            }
        }
        getPlace()
    }, [setFormData, sendRequest, placeId])

    if (loading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loading && !place)
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!loading && place && (
                <form className="place-form" onSubmit={submitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter valid title"
                        onInput={inputHandler}
                        value={place.title}
                        valid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter valid description (at least 5 characters)"
                        onInput={inputHandler}
                        value={place.description}
                        valid={true}
                    />

                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    )
}

export default UpdatePlace
