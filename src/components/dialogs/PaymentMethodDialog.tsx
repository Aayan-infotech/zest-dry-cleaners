import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldComponent from "../ui/TextField";
import { Button } from "../ui";

export interface CardData {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentMethodDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCard?: (card: CardData) => void;
  onPaymentComplete?: (card?: CardData) => void;
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onClose,
  onAddCard,
  onPaymentComplete,
}) => {
  const [activeTab, setActiveTab] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "card") {
      if (onAddCard && cardNumber && cardHolderName && expiryDate && cvv) {
        const newCard: CardData = {
          id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          cardNumber,
          cardHolderName,
          expiryDate,
          cvv,
        };
        onAddCard(newCard);
        // Call payment complete callback
        if (onPaymentComplete) {
          onPaymentComplete(newCard);
        }
      }
      setCardNumber("");
      setCardHolderName("");
      setExpiryDate("");
      setCvv("");
    } else {
      console.log("Linked PayPal:", paypalEmail);
      // Call payment complete callback for PayPal
      if (onPaymentComplete) {
        onPaymentComplete();
      }
      setPaypalEmail("");
    }
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ").substring(0, 19);
    } else {
      return v.substring(0, 16);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCvv(value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "rgba(201, 248, 186, 1)",
          borderRadius: { xs: "20px", sm: "24px", md: "28px" },
          margin: { xs: 1, sm: 2 },
        }
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" }, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5, md: 3 } }}>
        Payment Methods
        <IconButton onClick={onClose} sx={{ position: "absolute", right: { xs: 4, sm: 8 }, top: { xs: 4, sm: 8 }, color: "#336B3F", }}>
          <CloseIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
            "& .MuiTab-root": {
              color: "#336B3F",
              fontWeight: "bold",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
              mr: 1,
              minHeight: "38px",
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#FFFFFF", 
              color: "#336B3F !important",
              borderRadius: "28px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },

            // Remove bottom bar
            "& .MuiTabs-indicator": {
              display: "none",
            },

            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Tab label="Credit Card" value="card" />
          <Tab label="PayPal" value="paypal" />
        </Tabs>

        {activeTab === "card" ? (
          <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)", mb: { xs: 2, sm: 2.5, md: 3 }, fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" } }}>
            Add credit & debit cards
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)", mb: { xs: 2, sm: 2.5, md: 3 }, fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" } }}>
            Link your PayPal account for faster checkout
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 2.5, md: 3 } }}>
          {activeTab === "card" ? (
            <>
              <TextFieldComponent
                label="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                borderColor="#336B3F"
                labelColor="#336B3F"
                textColor="#336B3F"
                required
              />
              <TextFieldComponent
                label="Card Holder Name"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                borderColor="#336B3F"
                labelColor="#336B3F"
                textColor="#336B3F"
                required
              />
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 2 } }}>
                <TextFieldComponent
                  label="Expiry Date"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  borderColor="#336B3F"
                  labelColor="#336B3F"
                  textColor="#336B3F"
                  required
                />
                <TextFieldComponent
                  label="CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  borderColor="#336B3F"
                  labelColor="#336B3F"
                  textColor="#336B3F"
                  required
                />
              </Box>
              <Button type="submit" variant="primary" size="large" style={{ backgroundColor: "#336B3F", color: "white", borderRadius: "12px", fontWeight: "bold", marginTop: 2 }}>
                Add Card
              </Button>
            </>
          ) : (
            <>
              <TextFieldComponent
                label="PayPal Email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                borderColor="#336B3F"
                labelColor="#336B3F"
                textColor="#336B3F"
                required
              />
              <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.8)" }}>
                We will redirect you to PayPal to confirm this account on your next checkout.
              </Typography>
              <Button type="submit" variant="primary" size="large" style={{ backgroundColor: "#336B3F", color: "white", borderRadius: "12px", fontWeight: "bold", marginTop: 2 }}>
                Link PayPal
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;

