import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const AdditionalFields = ({ collectionFields, setCollectionFields }) => {
    const types = ['String', 'Boolean', 'Date', 'Integer']

    const isAddFieldButtonDisabled = collectionFields.length >= 12

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

    return (
        <Box component={'div'} sx={{ marginTop: '20px' }}>
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
    )
}

export default AdditionalFields
