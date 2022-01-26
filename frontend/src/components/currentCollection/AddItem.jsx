import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'

const AddItem = ({
    title = null,
    fields,
    fieldsValues,
    collection,
    onChangeFieldsValues,
    onChangeCheckbox,
    saveNewItem,
    isSaveEditedItemButtonDisabled,
}) => {
    const isCreateItemButtonDisabled = fields.reduce((acc, current) => {
        if (collection.collectionschema[current].required) {
            if (
                collection.collectionschema[current].type === 'String' ||
                collection.collectionschema[current].type === 'Integer' ||
                collection.collectionschema[current].type === 'Date'
            ) {
                return acc || !fieldsValues[current]
            }
            if (collection.collectionschema[current].type === 'Boolean') {
                return (
                    acc ||
                    fieldsValues[current] === null ||
                    fieldsValues[current] === undefined
                )
            }
        }
        return acc
    }, false)

    const handleChangeNumberField = name => event => {
        if (/^[0-9]*$/.test(event.target.value)) {
            onChangeFieldsValues(name)(event)
        }
    }

    return (
        <Box>
            <Typography
                variant={'h6'}
                component={'h2'}
                sx={{ marginTop: '20px' }}
            >
                {title || 'Добавление новой записи в коллекцию'}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    margin: '0 -10px 10px -10px',
                    flexWrap: 'wrap',
                }}
            >
                {fields &&
                    fieldsValues &&
                    fields.map((field, index) => (
                        <Box
                            key={index}
                            sx={{
                                boxSizing: 'border-box',
                                padding: '10px',
                                width: '33.33%',
                            }}
                        >
                            {collection.collectionschema[field].type ===
                                'String' && (
                                <TextField
                                    fullWidth
                                    label={
                                        collection.collectionschema[field]
                                            .required
                                            ? field + '*'
                                            : field
                                    }
                                    value={fieldsValues[field]}
                                    onChange={onChangeFieldsValues(field)}
                                />
                            )}
                            {collection.collectionschema[field].type ===
                                'Date' && (
                                <TextField
                                    type={'date'}
                                    fullWidth
                                    value={fieldsValues[field]}
                                    onChange={onChangeFieldsValues(field)}
                                />
                            )}
                            {collection.collectionschema[field].type ===
                                'Integer' && (
                                <TextField
                                    label={
                                        collection.collectionschema[field]
                                            .required
                                            ? field + '*'
                                            : field
                                    }
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                    fullWidth
                                    value={fieldsValues[field]}
                                    onChange={handleChangeNumberField(field)}
                                />
                            )}
                            {collection.collectionschema[field].type ===
                                'Boolean' && (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={fieldsValues[field]}
                                            onChange={onChangeCheckbox(field)}
                                        />
                                    }
                                    label={field}
                                />
                            )}
                        </Box>
                    ))}
            </Box>
            <Button
                variant={'contained'}
                onClick={saveNewItem}
                disabled={
                    isSaveEditedItemButtonDisabled || isCreateItemButtonDisabled
                }
            >
                Сохранить запись
            </Button>
        </Box>
    )
}

export default AddItem
