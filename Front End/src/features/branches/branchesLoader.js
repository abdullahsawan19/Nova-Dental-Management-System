import { store } from "../../store/store";
import { getAllBranches, getBranch } from "./branchSlice";

export const branchesLoader = async () => {
  await store.dispatch(getAllBranches());
  return null;
};

export const activeBranchLoader = async () => {
  await store.dispatch(getBranch());
  return null;
};
