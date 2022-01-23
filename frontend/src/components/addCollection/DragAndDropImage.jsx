import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'

const DragAndDropImage = ({ image, imagePreview, setFieldsValues }) => {
    const [drag, setDrag] = useState(false)

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
        let image
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            setFieldsValues(prev => ({ ...prev, image: file }))
            image = file
        }
        setDrag(false)

        const reader = new FileReader()

        reader.onload = () => {
            setFieldsValues(prev => ({
                ...prev,
                imagePreview: reader.result,
            }))
            reader.onload = null
        }

        reader.readAsDataURL(image)
    }

    const handleDeleteImage = () => {
        setFieldsValues(prev => ({ ...prev, image: '', imagePreview: '' }))
    }

    return (
        <Box
            component={'div'}
            sx={{
                display: 'flex',
                border: drag ? '2px dashed red' : '2px dashed grey',
                color: drag ? 'red' : 'grey',
                padding: '5px',
                borderRadius: '5px',
                margin: '10px 0 10px 0',
                lineHeight: '1.5',
                width: '31ch',
                height: '31ch',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragStart}
            onDrop={handleDrop}
        >
            {imagePreview ? (
                <img
                    src={imagePreview}
                    alt=""
                    style={{
                        maxWidth: '100%',
                        borderRadius: '5px',
                    }}
                />
            ) : null}
            <Typography
                component={'div'}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: drag
                        ? 'rgba(255, 0, 0, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            >
                {drag ? 'Отпустите изображение' : 'Перетащите сюда изображение'}
            </Typography>

            {image ? (
                <IconButton
                    aria-label="delete"
                    onClick={handleDeleteImage}
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                    }}
                >
                    <DeleteIcon color={'error'} />
                </IconButton>
            ) : null}
        </Box>
    )
}

export default DragAndDropImage
