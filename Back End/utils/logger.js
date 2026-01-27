// utils/logger.js
const AuditLog = require("../models/auditLog.Models");

const logAction = async (
  action,
  performedBy,
  targetEntity,
  targetId,
  details,
) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetEntity,
      targetId,
      details,
    });
    console.log(`✅ Audit Log saved: ${action}`);
  } catch (err) {
    console.error("❌ Failed to save audit log:", err);
  }
};

module.exports = logAction;
