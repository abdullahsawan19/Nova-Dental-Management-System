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
      await store.dispatch(createBranch(newBranchData)).unwrap();
      return { success: true, message: "Branch added successfully!" };
    } catch (error) {
      return { error: error };
    }
  }

  if (intent === "update") {
    const id = formData.get("id");
    const updates = {};
    const rawData = Object.fromEntries(formData);

    if (rawData.nameAr || rawData.nameEn) {
      updates.name = {};
      if (rawData.nameAr) updates.name.ar = rawData.nameAr;
      if (rawData.nameEn) updates.name.en = rawData.nameEn;
    }

    if (rawData.addressAr || rawData.addressEn) {
      updates.address = {};
      if (rawData.addressAr) updates.address.ar = rawData.addressAr;
      if (rawData.addressEn) updates.address.en = rawData.addressEn;
    }

    if (rawData.locationUrl) updates.locationUrl = rawData.locationUrl;
    if (rawData.email) updates.email = rawData.email;
    if (rawData.openTime) updates.openTime = rawData.openTime;
    if (rawData.closeTime) updates.closeTime = rawData.closeTime;

    if (formData.has("phones")) {
      const phones = formData.getAll("phones").filter((p) => p.trim() !== "");
      updates.phones = phones;
    } else if (rawData.nameAr) {
      updates.phones = [];
    }

    if (rawData.nameAr) {
      const workingDays = formData.getAll("workingDays").map(Number);
      updates.workingDays = workingDays;
    }

    if (formData.has("isActive")) {
      updates.isActive = formData.get("isActive") === "true";
    }

    try {
      await store.dispatch(updateBranch({ id, data: updates })).unwrap();
      return { success: true, message: "Branch updated successfully!" };
    } catch (error) {
      console.error("Update failed:", error);
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
