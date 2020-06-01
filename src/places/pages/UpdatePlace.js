import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../shared/hooks/form-hook'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Trump Tower',
        description: "Orange-faced's residence",
        imageUrl:
            'https://i.insider.com/5d5b3aeacd9784667b78e332?width=1136&format=jpeg',
        address: '725 5th Ave, New York, NY 10022, United States',
        location: {
            lat: 40.7624284,
            lng: -73.9759827,
        },
        creator: '1',
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'Historical landmark',
        imageUrl:
            'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: '2',
    },
]

const UpdatePlace = (props) => {
    const [loading, setLoading] = useState(true)
    const placeId = useParams().placeId
    const place = DUMMY_PLACES.find((place) => place.id === placeId)

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

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    useEffect(() => {
        if (place) {
            setFormData(
                {
                    title: {
                        value: place.title,
                        isValid: true,
                    },
                    description: {
                        value: place.description,
                        isValid: true,
                    },
                },
                true
            )
        }
        setLoading(false)
    }, [setFormData, place])

    if (!place)
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )

    if (loading) return <div>Loading...</div>

    return (
        <form className="place-form" onSubmit={submitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter valid title"
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description (at least 5 characters)"
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />

            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    )
}

export default UpdatePlace
