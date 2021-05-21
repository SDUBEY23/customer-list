import React from "react";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";

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

const headCells = [
  { id: "fullName", label: "Full Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "premium", label: "Premium" },
  { id: "bid", label: "max/min Bid" },
];

const Customers = ({ customers, loading }) => {
  const classes = useStyles();
  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
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
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Avatar alt="userImage" src={customer.avatarUrl} />
                  {customer.firstname + " " + customer.lastname}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{`${customer.hasPremium}` ? "Yes" : "No"}</TableCell>

                <TableCell>
                  {customer.bids.reduce(
                    (prev, bid) =>
                      (prev = prev > bid.amount ? prev : bid.amount),
                    0
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Customers;
