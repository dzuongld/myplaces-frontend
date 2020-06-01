import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formValid = true
            for (const input in state.inputs) {
                if (!state.inputs[input]) continue
                if (input === action.input) {
                    formValid = formValid && action.isValid
                } else {
                    formValid = formValid && state.inputs[input].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.input]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formValid,
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formValid,
            }
        default:
            return state
    }
}

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    })

    // function is stored to be reused so it wont cause infinite loop
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            input: id,
        })
    }, [])

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formValid: formValidity,
        })
    }, [])

    return [formState, inputHandler, setFormData]
}
