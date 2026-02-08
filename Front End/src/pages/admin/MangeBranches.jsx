import React from "react";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import BranchesForm from "../../features/branches/BranchesForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MangeBranches = () => {
  const stateData = useSelector((state) => state.branches);
  console.log("Redux State Data:", stateData);
  const { branches } = stateData || {};
  const fetcher = useFetcher();

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Manage Branches
      </Typography>

      <BranchesForm />

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#eae9e9" }}>
            <TableRow
              sx={{ fontWeight: "bold", fontSize: "16px", color: "#230f0f" }}
            >
              <TableCell>الاسم (AR)</TableCell>
              <TableCell>English Name</TableCell>
              <TableCell>العنوان</TableCell>
              <TableCell>العمليات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch._id}>
                <TableCell>{branch.name.ar}</TableCell>
                <TableCell>{branch.name.en}</TableCell>
                <TableCell>{branch.address.ar}</TableCell>
                <TableCell>
                  <fetcher.Form method="post">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={branch._id} />
                    <IconButton
                      type="submit"
                      color="error"
                      onClick={(e) => {
                        if (!window.confirm("حذف الفرع؟")) e.preventDefault();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </fetcher.Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MangeBranches;
