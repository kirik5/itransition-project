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
        id: 'owner',
        numeric: false,
        disablePadding: false,
        label: 'Создатель',
        sorting: true,
    },
    {
        id: 'change',
        numeric: false,
        disablePadding: false,
        label: '',
        sorting: false,
    },
    {
        id: 'delete',
        numeric: false,
        disablePadding: false,
        label: '',
        sorting: false,
    },
]

export default headCells
