import React, { useState, useContext } from 'react'

import './PlaceItem.css'
import Card from '../../shared/components/UIElements/Card'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const PlaceItem = (props) => {
    const auth = useContext(AuthContext)

    const [showMap, setShowMap] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const toggleMap = () => {
        setShowMap(showMap ? false : true)
    }

    const toggleWarning = () => {
        setShowConfirm(showConfirm ? false : true)
    }

    const confirmDelete = () => {
        setShowConfirm(false)
        console.log('DELETING...')
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={toggleMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={toggleMap}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>

            <Modal
                show={showConfirm}
                onCancel={toggleWarning}
                header="Deleting place"
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={toggleWarning}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDelete}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>Are you sure? This action cannot be undone!</p>
            </Modal>

            <Card className="place-item__content">
                <li className="place-item">
                    <div className="place-item__image">
                        <img src={props.image} alt="props.title" />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={toggleMap}>
                            VIEW ON MAP
                        </Button>
                        {auth.isLoggedIn && (
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={toggleWarning}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </li>
            </Card>
        </React.Fragment>
    )
}

export default PlaceItem
