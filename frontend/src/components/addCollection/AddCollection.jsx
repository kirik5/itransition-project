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

const types = ['String', 'Boolean', 'Date', 'Integer']

const AddCollection = () => {
    const [collectionTypes, setCollectionTypes] = useState(null)
    const [fieldsValues, setFieldsValues] = useState({
        name: '',
        description: '',
        theme: '',
        image: '',
    })

    const isButtonCreateDisabled = fieldsValues.name === ''

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

    useEffect(() => {
        console.log('component did update')
    })

    const { request } = useHttp()

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

        console.log(additionalFields)

        try {
            const data = await request(
                '/api/collections/create',
                'POST',
                {
                    ...fieldsValues,
                    collectionschema: { ...mainFields, ...additionalFields },
                },
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )
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
                <TextField
                    id="collection-image"
                    label="Изображение"
                    variant="outlined"
                    value={fieldsValues.image}
                    onChange={handleChangeFieldValue('image')}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateCollection}
                    disabled={isButtonCreateDisabled}
                >
                    Создать коллекцию
                </Button>
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
