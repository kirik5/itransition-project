import React from 'react'
import { useParams } from 'react-router-dom'

const CurrentCollectionPage = () => {
    const { collectionId } = useParams()

    console.log('collectionId = ', collectionId)

    return <div>Current collection page</div>
}

export default CurrentCollectionPage
