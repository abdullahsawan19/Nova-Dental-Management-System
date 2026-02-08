import { store } from "../../store/store";
import { getAllBranches } from "./branchSlice";

export const branchesLoader = async () => {
  await store.dispatch(getAllBranches());
  return null;
};
export default branchesLoader;
