import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdditionalFields from '../addCollection/AdditionalFields'
import MainFields from '../addCollection/MainFields'
import { Container } from '@mui/material'

const AddCollectionPage = () => {
    const [collectionTypes, setCollectionTypes] = useState(null)
    const [fieldsValues, setFieldsValues] = useState({
        name: '',
        description: '',
        theme: '',
        image: '',
        imagePreview: '',
    })

    const navigate = useNavigate()

    const isButtonCreateDisabled =
        fieldsValues.name === '' ||
        fieldsValues.description === '' ||
        fieldsValues.theme === ''

    const handleChangeFieldValue = name => event => {
        setFieldsValues(prev => ({ ...prev, [name]: event.target.value }))
    }

    const mainFields = {
        name: {
            type: 'String',
            required: true,
        },
        tags: {
            type: 'String',
            required: true,
        },
    }

    const [collectionFields, setCollectionFields] = useState([])

    const { request, requestImg } = useHttp()

    const auth = useContext(AuthContext)

    const handleCreateCollection = async () => {
        const additionalFields = {}
        collectionFields.forEach(elem => {
            if (
                elem.name !== '' &&
                elem.name !== 'name' &&
                elem.name !== 'tags' &&
                elem.type !== ''
            ) {
                additionalFields[elem.name] = {}
                additionalFields[elem.name].type = elem.type
                additionalFields[elem.name].required = elem.required
            }
        })

        const data = new FormData()
        data.append('name', fieldsValues.name)
        data.append('description', fieldsValues.description)
        data.append('theme', fieldsValues.theme)
        data.append('image', fieldsValues.image)
        data.append(
            'collectionschema',
            JSON.stringify({ ...mainFields, ...additionalFields })
        )

        try {
            await requestImg('/api/collections/create', 'POST', data, {
                Authorization: `Bearer ${auth.token}`,
            })
            navigate('/my-collections')
        } catch (error) {}
    }

    useEffect(async () => {
        const collectionTypes = await request('/api/collections/types', 'GET')
        setCollectionTypes(collectionTypes.map(el => el.type))
    }, [request, setCollectionTypes])

    return (
        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '10px',
                alignSelf: 'center',
            }}
        >
            <Box
                component="form"
                sx={{
                    marginTop: '20px',
                }}
                noValidate
                autoComplete="off"
            >
                <Container>
                    <MainFields
                        name={fieldsValues.name}
                        description={fieldsValues.description}
                        theme={fieldsValues.theme}
                        image={fieldsValues.image}
                        imagePreview={fieldsValues.imagePreview}
                        changeFieldValue={handleChangeFieldValue}
                        collectionTypes={collectionTypes}
                        isButtonCreateDisabled={isButtonCreateDisabled}
                        setFieldsValues={setFieldsValues}
                        createCollection={handleCreateCollection}
                    />
                    <AdditionalFields
                        collectionFields={collectionFields}
                        setCollectionFields={setCollectionFields}
                    />
                </Container>
            </Box>
        </Box>
    )
}

export default AddCollectionPage
