import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

const links = {
    private: [
        {
            icon: <LibraryBooksIcon />,
            title: 'Все коллекции',
            link: '/all-collections',
        },
        {
            icon: <LibraryBooksIcon />,
            title: 'Мои коллекции',
            link: '/my-collections',
        },
        {
            icon: <BookmarkAddIcon />,
            title: 'Добавить коллекцию',
            link: '/add-collection',
        },
    ],
    public: [
        {
            icon: <LibraryBooksIcon />,
            title: 'Все коллекции',
            link: '/all-collections',
        },
    ],
}

export default links
