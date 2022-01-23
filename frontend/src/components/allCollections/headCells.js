const headCells = [
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: '№',
        sorting: false,
    },
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Изображение',
        sorting: false,
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Название',
        sorting: true,
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Описание',
        sorting: true,
    },
    {
        id: 'theme',
        numeric: false,
        disablePadding: false,
        label: 'Тема',
        sorting: true,
    },
    {
        id: 'ownerEmail',
        numeric: false,
        disablePadding: false,
        label: 'Создатель',
        sorting: true,
    },
]

export default headCells
