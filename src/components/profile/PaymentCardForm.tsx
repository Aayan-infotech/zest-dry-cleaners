import React from "react";
import { Box, Typography, Card, CardContent, Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "../ui";
import type { CardData } from "../dialogs/PaymentMethodDialog";
import AddIcon from '@mui/icons-material/Add';

interface PaymentCardFormProps {
  savedCards: CardData[];
  onAddCard: () => void;
  onEditCard?: (card: CardData) => void;
  onDeleteCard?: (cardId: string) => void;
}

const maskCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cardNumber;
  const last4 = cleaned.slice(-4);
  const first4 = cleaned.slice(0, 4);
  return `${first4} – XXXX – XXXX – ${last4}`;
};

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
  savedCards,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) => {
  return (
    <Box>
      <Card sx={{ backgroundColor: "rgba(201, 248, 186, 1)", borderRadius: { xs: "12px", sm: "16px" } }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 2, sm: 0 }, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#336B3F", fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" } }}>My Cards</Typography>
            <Button
              onClick={onAddCard}
              type="button"
              size="small"
              style={{
                backgroundColor: "#C9F8BA",
                border: "1px solid #336B3F",
                color: "#336B3F",
                borderRadius: "12px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 12px"
              }}
            >
              <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
              Add New
            </Button>
          </Box>
          <Divider sx={{ my: 2, backgroundColor: "rgba(143, 146, 161, 0.1)" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {savedCards.length === 0 ? (
              <Typography sx={{ color: "rgba(51, 107, 63, 0.7)", textAlign: "center", py: 4 }}>
                No cards added yet. Click "Add New" to add a card.
              </Typography>
            ) : (
              savedCards.map((card) => (
                <Box
                  key={card.id}
                  sx={{
                    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7b4397 100%)",
                    borderRadius: { xs: "12px", sm: "16px" },
                    padding: { xs: "16px", sm: "20px", md: "24px" },
                    color: "white",
                    position: "relative",
                    minHeight: { xs: "180px", sm: "200px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "#EB001B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            backgroundColor: "#F79E1B",
                            marginLeft: "-15px",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      {onEditCard && (
                        <IconButton
                          onClick={() => onEditCard(card)}
                          size="small"
                          sx={{
                            color: "white",
                             backgroundColor: "rgb(223 163 163 / 90%)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.3)",
                            },
                            padding: "6px",
                          }}
                        >
                          <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                        </IconButton>
                      )}
                      {onDeleteCard && (
                        <IconButton
                          onClick={() => onDeleteCard(card.id)}
                          size="small"
                          sx={{
                            color: "#ffebee",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 0, 0, 0.3)",
                            },
                            padding: "6px",
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                        </IconButton>
                      )}
                      <Box
                        sx={{
                          width: 40,
                          height: 30,
                          backgroundColor: "#FFD700",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "80%",
                            height: "60%",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            borderRadius: "2px",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "20px",
                        letterSpacing: "2px",
                        fontFamily: "monospace",
                        mb: 3,
                      }}
                    >
                      {maskCardNumber(card.cardNumber)}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "10px" }}>
                          CARDHOLDER NAME
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                          {card.cardHolderName}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "10px" }}>
                          VALID THRU
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                          {card.expiryDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentCardForm;

