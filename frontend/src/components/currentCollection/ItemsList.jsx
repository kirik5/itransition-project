import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EnhancedTableHead from '../allCollections/EnhancedTableHead'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
} from '@mui/material'
import { getComparator, stableSort } from '../allCollections/sortingFunctions'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

const ItemsList = ({ items, fieldsTypes, deleteItem }) => {
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('name')

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleDeleteItem = itemId => () => {
        if (items.length - 1 === page * rowsPerPage) {
            setPage(prev => prev - 1)
        }
        deleteItem(itemId)()
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const fieldNames = Object.keys(items[0]).slice(1)

    const headCells = [
        {
            id: 'number',
            numeric: true,
            disablePadding: false,
            label: '№',
            sorting: false,
        },
        ...fieldNames.map((name, index) => {
            return {
                id: name,
                numeric: fieldsTypes[index] === 'Integer',
                disablePadding: false,
                label: name,
                sorting: fieldsTypes[index] !== 'Boolean',
            }
        }),
        {
            id: 'delete',
            numeric: false,
            disablePadding: false,
            label: '',
            sorting: false,
        },
    ]

    const transformedItems = items.map(item => {
        let newItem = { ...item }
        Object.keys(item)
            .slice(1)
            .forEach((key, index) => {
                if (fieldsTypes[index] === 'Integer') {
                    newItem[key] = parseInt(newItem[key])
                }
            })
        return newItem
    })

    return (
        <Box>
            <Typography
                variant={'h6'}
                component={'h2'}
                sx={{ marginTop: '20px' }}
            >
                Записи коллекции
            </Typography>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(
                                transformedItems,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell align="right">
                                                {index + 1 + page * rowsPerPage}
                                            </TableCell>

                                            {fieldNames.map((cell, index) => {
                                                return (
                                                    <TableCell
                                                        align={
                                                            fieldsTypes[
                                                                index
                                                            ] === 'Integer'
                                                                ? 'right'
                                                                : 'left'
                                                        }
                                                        key={index}
                                                    >
                                                        {fieldsTypes[index] ===
                                                        'Boolean' ? (
                                                            row[cell] ? (
                                                                <CheckCircleOutlineIcon />
                                                            ) : (
                                                                <RadioButtonUncheckedIcon />
                                                            )
                                                        ) : (
                                                            row[cell]
                                                        )}
                                                    </TableCell>
                                                )
                                            })}

                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={handleDeleteItem(
                                                        row.id
                                                    )}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default ItemsList
