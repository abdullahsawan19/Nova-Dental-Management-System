import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomAlert from "../feedback/Alert";

const PaymentAlert = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const alertShown = useRef(false);

  const [alertConfig, setAlertConfig] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (searchParams.get("payment") === "success" && !alertShown.current) {
      alertShown.current = true;
      setAlertConfig({
        open: true,
        message: "Payment Successful! Your appointment is confirmed ✅",
        severity: "success",
      });
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("payment");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleClose = () => {
    setAlertConfig((prev) => ({ ...prev, open: false }));
  };

  return (
    <CustomAlert
      open={alertConfig.open}
      onClose={handleClose}
      message={alertConfig.message}
      severity={alertConfig.severity}
    />
  );
};

export default PaymentAlert;
