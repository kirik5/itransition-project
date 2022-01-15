import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ImageIcon from '@mui/icons-material/Image'
import { useNavigate } from 'react-router-dom'

const types = ['String', 'Boolean', 'Date', 'Integer']

const AddCollection = () => {
    const [collectionTypes, setCollectionTypes] = useState(null)
    const [fieldsValues, setFieldsValues] = useState({
        name: '',
        description: '',
        theme: '',
        image: '',
    })
    const [drag, setDrag] = useState(false)

    const navigate = useNavigate()

    const handleDragStart = event => {
        event.preventDefault()
        setDrag(true)
    }

    const handleDragLeave = event => {
        event.preventDefault()
        setDrag(false)
    }

    const handleDrop = event => {
        event.preventDefault()
        const file = [...event.dataTransfer.files][0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            fieldsValues.image = file
        }
        setDrag(false)
    }

    const handleDeleteImage = () => {
        setFieldsValues(prev => ({ ...prev, image: '' }))
    }

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

    const handleAddAdditionField = () => {
        setCollectionFields([
            ...collectionFields,
            { name: '', type: '', required: false },
        ])
    }

    const handleChangeAdditionField = (name, index) => event => {
        if (name === 'required') {
            const newCollectionFields = [...collectionFields]
            newCollectionFields[index][name] = !newCollectionFields[index][name]
            setCollectionFields(newCollectionFields)
            return
        }

        const newCollectionFields = [...collectionFields]
        newCollectionFields[index][name] = event.target.value
        setCollectionFields(newCollectionFields)
    }

    const isAddFieldButtonDisabled = collectionFields.length >= 12

    const handleDeleteField = index => () => {
        const newCollectionFields = [...collectionFields]
        newCollectionFields.splice(index, 1)
        setCollectionFields(newCollectionFields)
    }

    const allowedFieldsTypes = index => {
        let newTypes = [...types]
        const fields = [...collectionFields]

        const allowedTypes = (type, types, newTypes, fields) => {
            const countOfType = fields.reduce(
                (count, field) => (field.type === type ? count + 1 : count),
                0
            )
            if (countOfType >= 3 && fields[index].type !== type) {
                const index = newTypes.indexOf(type)
                newTypes.splice(index, 1)
            }
        }

        allowedTypes('String', types, newTypes, fields)
        allowedTypes('Date', types, newTypes, fields)
        allowedTypes('Integer', types, newTypes, fields)
        allowedTypes('Boolean', types, newTypes, fields)

        return newTypes
    }

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
            component="form"
            sx={{
                '& .MuiFormControl-root': { m: 1, width: '25ch' },
                margin: '10px',
                marginTop: '20px',
            }}
            noValidate
            autoComplete="off"
        >
            <Box component={'div'}>
                <Typography variant="h5" component="h2">
                    Создание коллекции
                </Typography>
                <Box
                    component={'div'}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="collection-name"
                        label="Имя"
                        variant="outlined"
                        value={fieldsValues.name}
                        onChange={handleChangeFieldValue('name')}
                    />
                    <TextField
                        id="collection-description"
                        label="Описание"
                        variant="outlined"
                        value={fieldsValues.description}
                        onChange={handleChangeFieldValue('description')}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="theme">Тема</InputLabel>
                        <Select
                            labelId="theme"
                            id="theme"
                            label="theme"
                            value={fieldsValues.theme}
                            onChange={handleChangeFieldValue('theme')}
                        >
                            {collectionTypes
                                ? collectionTypes.map(el => (
                                      <MenuItem value={el} key={el}>
                                          {el}
                                      </MenuItem>
                                  ))
                                : null}
                        </Select>
                    </FormControl>
                    <Typography
                        component={'div'}
                        sx={{
                            display: 'inline-flex',
                            border: drag ? '2px dashed red' : '2px dashed grey',
                            color: drag ? 'red' : 'grey',
                            padding: fieldsValues.image
                                ? '6px 15px'
                                : '14px 15px',
                            borderRadius: '5px',
                            margin: '8px',
                            lineHeight: '1.5',
                            width: '31ch',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onDragStart={handleDragStart}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragStart}
                        onDrop={handleDrop}
                    >
                        {fieldsValues.image ? (
                            <ImageIcon sx={{ marginRight: '10px' }} />
                        ) : null}
                        {drag
                            ? 'Отпустите изображение'
                            : 'Перетащите изображение'}
                        {fieldsValues.image ? (
                            <IconButton
                                aria-label="delete"
                                onClick={handleDeleteImage}
                            >
                                <DeleteIcon />
                            </IconButton>
                        ) : null}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateCollection}
                        disabled={isButtonCreateDisabled}
                        sx={{
                            padding: '18px',
                            lineHeight: '1.5',
                            margin: '8px',
                        }}
                    >
                        Создать коллекцию
                    </Button>
                </Box>
            </Box>
            <Box component={'div'}>
                <Typography variant="h6" component="h3">
                    Дополнительные поля
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddAdditionField}
                    disabled={isAddFieldButtonDisabled}
                >
                    Добавить поле
                </Button>

                {collectionFields
                    ? collectionFields.map((field, index) => {
                          return (
                              <Box
                                  component={'div'}
                                  sx={{
                                      '& .MuiFormControl-root': {
                                          m: 1,
                                          width: '25ch',
                                      },
                                      display: 'flex',
                                      alignItems: 'center',
                                  }}
                                  key={index}
                              >
                                  <Typography sx={{ display: 'inline-block' }}>
                                      {index + 1}
                                  </Typography>
                                  <TextField
                                      id={`Addition field ${index}`}
                                      label="Название поля"
                                      variant="outlined"
                                      value={field.name}
                                      onChange={handleChangeAdditionField(
                                          'name',
                                          index
                                      )}
                                  />
                                  <FormControl fullWidth>
                                      <InputLabel id={`field-type ${index}`}>
                                          Тип поля
                                      </InputLabel>
                                      <Select
                                          labelId={`field-type ${index}`}
                                          id={`field-type ${index}`}
                                          label="Тип поля"
                                          value={field.type}
                                          onChange={handleChangeAdditionField(
                                              'type',
                                              index
                                          )}
                                      >
                                          {allowedFieldsTypes(index)
                                              ? allowedFieldsTypes(index).map(
                                                    el => (
                                                        <MenuItem
                                                            value={el}
                                                            key={el}
                                                        >
                                                            {el}
                                                        </MenuItem>
                                                    )
                                                )
                                              : null}
                                      </Select>
                                  </FormControl>
                                  <FormControlLabel
                                      control={
                                          <Checkbox
                                              checked={field.required}
                                              onChange={handleChangeAdditionField(
                                                  'required',
                                                  index
                                              )}
                                          />
                                      }
                                      label="Обязательное"
                                  />
                                  <IconButton
                                      aria-label="delete"
                                      onClick={handleDeleteField(index)}
                                  >
                                      <DeleteIcon />
                                  </IconButton>
                              </Box>
                          )
                      })
                    : null}
            </Box>
        </Box>
    )
}

export default AddCollection
