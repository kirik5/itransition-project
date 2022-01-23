import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import DragAndDropImage from './DragAndDropImage'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

const MainFields = ({
    name,
    description,
    theme,
    image,
    imagePreview,
    changeFieldValue,
    collectionTypes,
    isButtonCreateDisabled,
    setFieldsValues,
    createCollection,
}) => {
    return (
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
                    justifyContent: 'space-between',
                    margin: '0 -10px 0 -10px',
                }}
            >
                <Box
                    sx={{
                        width: '33.33%',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <TextField
                        id="collection-name"
                        label="Имя"
                        variant="outlined"
                        value={name}
                        onChange={changeFieldValue('name')}
                        fullWidth
                    />
                </Box>
                <Box
                    sx={{
                        width: '33.33%',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <TextField
                        id="collection-description"
                        label="Описание"
                        variant="outlined"
                        value={description}
                        onChange={changeFieldValue('description')}
                        fullWidth
                    />
                </Box>
                <Box
                    sx={{
                        width: '33.33%',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="theme">Тема</InputLabel>
                        <Select
                            labelId="theme"
                            id="theme"
                            label="theme"
                            value={theme}
                            onChange={changeFieldValue('theme')}
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
                </Box>
            </Box>
            <DragAndDropImage
                image={image}
                imagePreview={imagePreview}
                setFieldsValues={setFieldsValues}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={createCollection}
                disabled={isButtonCreateDisabled}
            >
                Создать коллекцию
            </Button>
        </Box>
    )
}

export default MainFields
