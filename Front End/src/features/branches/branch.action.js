import { store } from "../../store/store";
import { createBranch, removeBranch, updateBranch } from "./branchSlice";

export const branchAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const rawData = Object.fromEntries(formData);
    const phones = formData.getAll("phones").filter((p) => p.trim() !== "");
    const workingDays = formData.getAll("workingDays").map(Number);

    const newBranchData = {
      name: { ar: rawData.nameAr, en: rawData.nameEn },
      address: { ar: rawData.addressAr, en: rawData.addressEn },
      locationUrl: rawData.locationUrl,
      email: rawData.email,
      phones,
      openTime: rawData.openTime,
      closeTime: rawData.closeTime,
      workingDays,
    };

    try {
      const result = await store.dispatch(createBranch(newBranchData)).unwrap();
      return { success: true, message: "Branch added successfully!" };
    } catch (error) {
      return { error: error };
    }
  }

  if (intent === "delete") {
    const id = formData.get("id");
    try {
      await store.dispatch(removeBranch(id)).unwrap();
      return { success: true, message: "Branch deleted!" };
    } catch (error) {
      return { error: error };
    }
  }

  return null;
};
