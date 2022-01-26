import React, { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
} from '@mui/material'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import headCells from './headCells'
import EnhancedTableHead from '../allCollections/EnhancedTableHead'
import { getComparator, stableSort } from '../allCollections/sortingFunctions'
import IconButton from '@mui/material/IconButton'
import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MyCollections = ({ myCollections, setFilteredCollections }) => {
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('name')
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const { request } = useHttp()
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleDeleteCollection = id => async event => {
        event.stopPropagation()
        try {
            await request(`/api/collections/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`,
            })
            if (myCollections.length - 1 === page * rowsPerPage) {
                setPage(prev => prev - 1)
            }
            const withoutDeleted = myCollections.filter(coll => coll.id !== id)
            setFilteredCollections(withoutDeleted)
        } catch (error) {}
    }

    const handleChangeCollection = id => event => {
        event.stopPropagation()
        navigate(`/my-collections/change/${id}`)
    }

    const handleClickCollection = id => event => {
        event.stopPropagation()
        navigate(`/my-collections/${id}`)
    }

    return (
        <Box sx={{ width: '100%' }}>
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
                                myCollections,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            sx={{ cursor: 'pointer' }}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            onClick={handleClickCollection(
                                                row.id
                                            )}
                                        >
                                            <TableCell align="center">
                                                {index + 1 + page * rowsPerPage}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align={'center'}
                                            >
                                                {row.image ? (
                                                    <img
                                                        src={row.image}
                                                        width={'100'}
                                                        alt={
                                                            !row.image
                                                                ? 'without image'
                                                                : row.image
                                                        }
                                                        style={{
                                                            display: 'block',
                                                            margin: '0 auto',
                                                        }}
                                                    />
                                                ) : (
                                                    <ImageNotSupportedIcon />
                                                )}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.description}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.theme}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.ownerEmail}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={handleChangeCollection(
                                                        row.id
                                                    )}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={handleDeleteCollection(
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
                    count={myCollections.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default MyCollections
