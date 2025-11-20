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
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  open,
  onClose,
  onAddCard,
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
      if (onAddCard) {
        const newCard: CardData = {
          id: Date.now().toString(),
          cardNumber,
          cardHolderName,
          expiryDate,
          cvv,
        };
        onAddCard(newCard);
      }
      setCardNumber("");
      setCardHolderName("");
      setExpiryDate("");
      setCvv("");
    } else {
      console.log("Linked PayPal:", paypalEmail);
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
          borderRadius: "28px",
        }
      }}
    >
      <DialogTitle sx={{ color: "#336B3F", fontWeight: "bold", fontSize: "1.5rem" }}>
        Payment Methods
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: "#336B3F", }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            "& .MuiTab-root": { color: "#336B3F", fontWeight: "bold" },
            "& .Mui-selected": { color: "#336B3F !important" },
            mb: 2,
          }}
        >
          <Tab label="Credit Card" value="card" />
          <Tab label="PayPal" value="paypal" />
        </Tabs>
        {activeTab === "card" ? (
          <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)", mb: 3 }}>
            Add credit & debit cards
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "rgba(51, 107, 63, 0.7)", mb: 3 }}>
            Link your PayPal account for faster checkout
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
              <Box sx={{ display: "flex", gap: 2 }}>
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

