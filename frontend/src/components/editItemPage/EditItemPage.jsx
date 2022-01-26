import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import Loader from '../loader/Loader'
import Box from '@mui/material/Box'
import AddItem from '../currentCollection/AddItem'
import AuthContext from '../../context/AuthContext'

const EditItemPage = () => {
    const { itemId } = useParams()
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()

    const [collection, setCollection] = useState(null)
    const [fields, setFields] = useState(null)
    const [fieldsValues, setFieldsValues] = useState(null)
    const [startFieldsValues, setStartFieldsValues] = useState(null)

    const getCollectionByItemId = useCallback(async () => {
        try {
            const collection = await request(
                `/api/collections/getCollectionByItemId/${itemId}`,
                'GET'
            )
            setCollection(collection)
        } catch (error) {}
    }, [request, setCollection])

    const getItem = useCallback(async () => {
        try {
            const item = await request(`/api/collections/item/${itemId}`, 'GET')
            const fieldsValues = {
                name: item.name,
                tags: item.tags,
                ...item.additionalFields,
            }
            setFieldsValues(fieldsValues)
            setStartFieldsValues(fieldsValues)
        } catch (error) {}
    }, [request, setFields])

    useEffect(() => {
        getCollectionByItemId()
    }, [getCollectionByItemId])

    useEffect(() => {
        if (collection) {
            getItem()
        }
    }, [collection, getItem])

    useEffect(() => {
        if (collection?.collectionschema) {
            setFields(Object.keys(collection.collectionschema))
        }
    }, [collection, setFields])

    useEffect(() => {
        if (!fields) return

        const startFieldsValues = {}
        fields.forEach(field => {
            if (
                collection.collectionschema[field].type === 'String' ||
                collection.collectionschema[field].type === 'Date' ||
                collection.collectionschema[field].type === 'Integer'
            ) {
                startFieldsValues[field] = ''
                return
            }
            if (collection.collectionschema[field].type === 'Boolean') {
                startFieldsValues[field] = false
            }
        })
        setStartFieldsValues(startFieldsValues)
    }, [fields, setStartFieldsValues])

    useEffect(() => {
        if (!startFieldsValues) return

        setFieldsValues(startFieldsValues)
    }, [startFieldsValues, setFieldsValues])

    const handleChangeFieldsValues = name => event => {
        setFieldsValues(prev => ({ ...prev, [name]: event.target.value }))
    }

    const handleChangeCheckbox = name => () => {
        setFieldsValues(prev => ({ ...prev, [name]: !prev[name] }))
    }

    const navigate = useNavigate()

    const handleSaveEditedItem = async () => {
        try {
            await request(
                `/api/collections/items/item/edit/${itemId}`,
                'PATCH',
                { ...fieldsValues },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
        } catch (error) {}
        navigate(-1)
    }

    const isAddItemEnabled = fields && fieldsValues && collection

    const isSaveEditedItemButtonDisabled =
        fields &&
        fieldsValues &&
        startFieldsValues &&
        fields.reduce(
            (acc, current) =>
                fieldsValues[current] === startFieldsValues[current] && acc,
            true
        )

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
                    {isAddItemEnabled && (
                        <AddItem
                            title={'Изменение записи коллекции'}
                            fields={fields}
                            fieldsValues={fieldsValues}
                            collection={collection}
                            onChangeFieldsValues={handleChangeFieldsValues}
                            onChangeCheckbox={handleChangeCheckbox}
                            saveNewItem={handleSaveEditedItem}
                            isSaveEditedItemButtonDisabled={
                                isSaveEditedItemButtonDisabled
                            }
                        />
                    )}
                </Box>
            )}
        </>
    )
}

export default EditItemPage
