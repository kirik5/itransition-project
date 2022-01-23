import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import Loader from '../loader/Loader'
import Box from '@mui/material/Box'
import MainFields from '../addCollection/MainFields'
import AuthContext from '../../context/AuthContext'

const ChangeCurrentCollectionPage = () => {
    const { collectionId } = useParams()

    const { request, loading, requestImg } = useHttp()

    const [collectionTypes, setCollectionTypes] = useState(null)
    const [fieldsValues, setFieldsValues] = useState({
        id: null,
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

    const auth = useContext(AuthContext)

    const handleChangeCollection = async () => {
        const data = new FormData()
        data.append('name', fieldsValues.name)
        data.append('description', fieldsValues.description)
        data.append('theme', fieldsValues.theme)
        data.append('image', fieldsValues.image)

        console.log('name = ', fieldsValues.name)

        console.log('data get name= ', data.get('name'))

        try {
            await requestImg(
                `/api/collections/update/${collectionId}`,
                'PUT',
                data,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            navigate('/my-collections')
        } catch (error) {}
    }

    useEffect(async () => {
        const collectionTypes = await request('/api/collections/types', 'GET')
        setCollectionTypes(collectionTypes.map(el => el.type))
    }, [request, setCollectionTypes])

    useEffect(async () => {
        try {
            const collection = await request(
                `/api/collections/${collectionId}`,
                'GET'
            )
            console.log('collection = ', collection)
            setFieldsValues(prev => ({
                ...prev,
                ...collection,
                imagePreview: '/' + collection.image,
            }))
        } catch (error) {}
    }, [request, collectionId, setFieldsValues])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
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
                            createCollection={handleChangeCollection}
                            createButtonName={'Изменить коллекцию'}
                        />
                    </Box>
                </Box>
            )}
        </>
    )
}

export default ChangeCurrentCollectionPage
