import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../loader/Loader'
import Box from '@mui/material/Box'
import AuthContext from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'
import AddItem from '../currentCollection/AddItem'
import CollectionInfo from '../currentCollection/CollectionInfo'
import ItemsList from '../currentCollection/ItemsList'

const CurrentCollectionPage = () => {
    const { collectionId } = useParams()
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [collection, setCollection] = useState(null)
    const [fields, setFields] = useState(null)
    const [startFieldsValues, setStartFieldsValues] = useState(null)
    const [fieldsValues, setFieldsValues] = useState(null)
    const [addItemMode, setAddItemMode] = useState(false)
    const [items, setItems] = useState(null)

    const getCollection = useCallback(async () => {
        try {
            const collections = await request(
                `/api/collections/${collectionId}`,
                'GET'
            )
            setCollection(prev => ({
                ...prev,
                ...collections,
            }))
        } catch (error) {}
    }, [request, setCollection])

    const getItems = useCallback(async () => {
        try {
            const items = await request(
                `/api/collections/items/${collectionId}`,
                'GET'
            )
            setItems(items)
        } catch (error) {}
    }, [setItems, request])

    useEffect(() => {
        getCollection()
    }, [getCollection])

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

    useEffect(() => {
        getItems()
    }, [getItems])

    const handleChangeFieldsValues = name => event => {
        setFieldsValues(prev => ({ ...prev, [name]: event.target.value }))
    }

    const handleChangeCheckbox = name => () => {
        setFieldsValues(prev => ({ ...prev, [name]: !prev[name] }))
    }

    const handleChangeAddItemMode = () => {
        setAddItemMode(prev => !prev)
        setFieldsValues(startFieldsValues)
    }

    const handleSaveNewItem = async () => {
        try {
            const response = await request(
                '/api/collections/items/create',
                'POST',
                { ...fieldsValues, collectionId: collectionId },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
            setAddItemMode(false)
            setItems(prev => [...prev, response])
        } catch (error) {}
    }

    const handleDeleteItem = itemId => async () => {
        try {
            await request(
                `/api/collections/items/delete/${itemId}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
        } catch (error) {}
        setItems(prev => {
            const newItems = [...prev]
            const index = newItems.findIndex(item => item.id === itemId)
            newItems.splice(index, 1)
            return newItems
        })
    }

    return (
        <>
            {loading && <Loader />}
            {collection && (
                <Box
                    element={'div'}
                    sx={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '10px',
                    }}
                >
                    <CollectionInfo
                        collection={collection}
                        onChangeAddItemMode={handleChangeAddItemMode}
                    />
                    {addItemMode && (
                        <AddItem
                            fields={fields}
                            fieldsValues={fieldsValues}
                            collection={collection}
                            onChangeFieldsValues={handleChangeFieldsValues}
                            onChangeCheckbox={handleChangeCheckbox}
                            saveNewItem={handleSaveNewItem}
                        />
                    )}
                    {!!items?.length && (
                        <ItemsList
                            items={items}
                            fieldsTypes={Object.keys(
                                collection.collectionschema
                            ).map(key => collection.collectionschema[key].type)}
                            deleteItem={handleDeleteItem}
                        />
                    )}
                </Box>
            )}
        </>
    )
}

export default CurrentCollectionPage
