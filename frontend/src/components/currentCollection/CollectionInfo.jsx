import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

const CollectionInfo = ({ collection, onChangeAddItemMode }) => {
    return (
        <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Box
                sx={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {collection.image ? (
                    <img
                        src={'/' + collection.image}
                        alt="Theme avatar"
                        style={{
                            display: 'block',
                            width: '100%',
                            border: '2px solid #1976d2',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                        }}
                    />
                ) : (
                    <ImageNotSupportedIcon
                        sx={{
                            display: 'block',
                        }}
                    />
                )}
            </Box>
            <Box sx={{ paddingLeft: '20px' }}>
                <Typography variant={'h5'} component={'h2'}>
                    О коллекции
                </Typography>
                <Typography sx={{ marginTop: '10px' }}>
                    Название: {collection.name}
                </Typography>
                <Typography>Описание: {collection.description}</Typography>
                <Typography>Тема: {collection.theme}</Typography>
                <Button
                    variant={'outlined'}
                    sx={{ marginTop: '20px' }}
                    onClick={onChangeAddItemMode}
                >
                    Добавить запись в коллекцию
                </Button>
            </Box>
        </Box>
    )
}

export default CollectionInfo
