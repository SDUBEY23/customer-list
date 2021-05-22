import React, { useState } from "react";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  makeStyles,
  TableSortLabel,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";
import TablePagination from "@material-ui/core/TablePagination";
import CheckIcon from "@material-ui/icons/Check";
import { ToggleButton } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#e5e5e5",
      cursor: "pointer",
    },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "premium", label: "Premium" },
  { id: "bid", label: "max/min Bid" },
];

const Customers = ({ customers, loading }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bid");
  const [isByMinimum, setIsByMinimum] = useState(false);

  const history = useHistory();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);
  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => {
            if (headCell.id === "bid") {
              return (
                <TableCell key={headCell.id}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                  <ToggleButton
                    value="check"
                    selected={isByMinimum}
                    onChange={() => {
                      setIsByMinimum(!isByMinimum);
                    }}
                  >
                    <CheckIcon />
                  </ToggleButton>
                </TableCell>
              );
            } else {
              return <TableCell key={headCell.id}>{headCell.label}</TableCell>;
            }
          })}
        </TableRow>
      </TableHead>
    );
  };

  if (loading) {
    return <h2>Loading.....</h2>;
  }

  return (
    <Container fixed>
      <TableContainer className={classes.table}>
        <Table>
          <TblHead />
          <TableBody>
            {stableSort(customers, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => (
                <TableRow
                  key={customer.id}
                  onClick={() => history.push(`/${customer.id}`)}
                >
                  <TableCell>
                    <Avatar alt="userImage" src={customer.avatarUrl} />
                    {customer.firstname + " " + customer.lastname}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {`${customer.hasPremium}` ? "Yes" : "No"}
                  </TableCell>

                  <TableCell>
                    {isByMinimum
                      ? Math.min.apply(
                          null,
                          customer.bids.map((item) => item.amount)
                        )
                      : Math.max.apply(
                          null,
                          customer.bids.map((item) => item.amount)
                        )}
                    {/* {customer.bids.reduce(
                      (prev, bid) =>
                        (prev = prev > bid.amount ? prev : bid.amount),
                      0
                    )} */}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={customers.length}
          page={page}
          onChangePage={handlePageChange}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      </TableContainer>
    </Container>
  );
};
export default Customers;
