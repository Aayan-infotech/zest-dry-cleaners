import React, { useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Button } from "../ui";

interface ChatMessage {
  id: string;
  from: "user" | "assistant";
  text: string;
  time: string;
}

interface ContactFormProps {
  supportView: "menu" | "chat" | "call" | "faq";
  setSupportView: (view: "menu" | "chat" | "call" | "faq") => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  onSendChatMessage: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  supportView,
  setSupportView,
  chatMessages,
  chatInput,
  setChatInput,
  onSendChatMessage,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {supportView === "menu" && (
        <>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: "bold", mb: 1 }}>
            Please choose what types of support do you need and let us know.
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 2 }}>
            {[
              { title: "Support Chat", subtitle: "24x7 Online Support", color: "#336B3F", icon: <ChatBubbleOutlineIcon sx={{ color: "#C9F8BA", fontSize: { xs: 24, sm: 28, md: 30 } }} />, view: "chat" },
              { title: "Call Center", subtitle: "24x7 Customer Service", color: "#FF6B35", icon: <PhoneIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28, md: 30 } }} />, view: "call" },
              { title: "Email", subtitle: "admin@shifty.com", color: "#9B59B6", icon: <EmailIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28, md: 30 } }} />, view: "chat" },
              { title: "FAQ", subtitle: "+50 Answers", color: "#F1C40F", icon: <HelpOutlineIcon sx={{ color: "#336B3F", fontSize: { xs: 24, sm: 28, md: 30 } }} />, view: "faq" },
            ].map((card) => (
              <Grid key={card.title} size={{ xs: 12, sm: 6 }}>
                <Box
                  onClick={() => setSupportView(card.view as any)}
                  sx={{
                    backgroundColor: "#C9F8BA",
                    borderRadius: { xs: "12px", sm: "16px" },
                    padding: { xs: "16px", sm: "20px", md: "24px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 50, sm: 55, md: 60 },
                      height: { xs: 50, sm: 55, md: 60 },
                      borderRadius: "50%",
                      backgroundColor: card.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: { xs: 1.5, sm: 2 },
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: "#336B3F", fontWeight: "bold", mb: 1, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#336B3F", opacity: 0.7, fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" } }}>
                    {card.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {supportView === "chat" && (
        <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: { xs: "20px", sm: "24px", md: "28px" }, overflow: "hidden", border: '1px solid #C9F8BA' }}>
          <Box sx={{ display: "flex", alignItems: "center", p: { xs: 1.5, sm: 2 }, borderBottom: "1px solid rgba(201, 248, 186, 0.2)" }}>
            <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA", mr: 1 }}>
              <ArrowBackIosNewOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ flexGrow: 1, color: "#C9F8BA", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>Assistant</Typography>
            <Typography sx={{ color: "rgba(201, 248, 186, 0.6)", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>Online</Typography>
          </Box>
          <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 }, display: "flex", flexDirection: "column", gap: 2, minHeight: { xs: 300, sm: 400, md: 450 } }}>
            {chatMessages?.map((message) => (
              <Box
                key={message.id}
                sx={{
                  alignSelf: message.from === "user" ? "flex-end" : "flex-start",
                  backgroundColor: message.from === "user" ? "#C9F8BA" : "rgba(255,255,255,0.08)",
                  color: message.from === "user" ? "#336B3F" : "rgba(201, 248, 186, 0.8)",
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "24px",
                  maxWidth: "60%",
                }}
              >
                <Typography sx={{ fontSize: "0.95rem" }}>{message.text}</Typography>
                <Typography sx={{ fontSize: "0.7rem", opacity: 0.6, mt: 0.5, textAlign: "right" }}>
                  {message.time}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ backgroundColor: "#C9F8BA", display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, p: { xs: 1.5, sm: 2 }, flexWrap: "nowrap" }}>
            <IconButton sx={{ color: "#336B3F", padding: { xs: "6px", sm: "8px" } }}>
              <ImageOutlinedIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
            </IconButton>
            <IconButton sx={{ color: "#336B3F", padding: { xs: "6px", sm: "8px" } }}>
              <MicNoneOutlinedIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, backgroundColor: "rgba(51, 107, 63, 0.1)", borderRadius: { xs: "20px", sm: "24px" }, display: "flex", alignItems: "center", px: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Aa"
                style={{ flexGrow: 1, border: "none", background: "transparent", outline: "none", color: "#336B3F", fontSize: "0.875rem", minWidth: 0 }}
              />
              <IconButton sx={{ color: "#336B3F", padding: { xs: "4px", sm: "8px" } }}>
                <EmojiEmotionsOutlinedIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />
              </IconButton>
            </Box>
            <IconButton
              onClick={onSendChatMessage}
              sx={{ backgroundColor: "#336B3F", color: "#C9F8BA", "&:hover": { backgroundColor: "#285230" }, padding: { xs: "6px", sm: "8px" } }}
            >
              <SendRoundedIcon sx={{ fontSize: { xs: "18px", sm: "24px" } }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {supportView === "call" && (
        <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: { xs: "20px", sm: "24px", md: "28px" }, p: { xs: 2.5, sm: 3, md: 4 }, color: "#C9F8BA" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 2.5, md: 3 }, gap: 2 }}>
            <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA" }}>
              <ArrowBackIosNewOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}>Call Center</Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" } }}>
            Speak directly with our specialists for instant resolution.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: { xs: 2, sm: 2.5, md: 3 }, "& > button": { width: { xs: "100%", sm: "auto" } } }}>
            <Button size="large" style={{ backgroundColor: "#C9F8BA", color: "#336B3F", borderRadius: "16px", fontWeight: "bold" }}>
              Call Now
            </Button>
            <Button size="large" style={{ backgroundColor: "transparent", border: "1px solid rgba(201,248,186,0.4)", color: "#C9F8BA", borderRadius: "16px" }}>
              Schedule Callback
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2">Hotline: +1 800 223 8899</Typography>
            <Typography variant="body2">Support PIN: 9835</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Average wait time: less than 2 mins</Typography>
          </Box>
        </Box>
      )}

      {supportView === "faq" && (
        <Box sx={{ backgroundColor: "#2F6B3C", borderRadius: { xs: "20px", sm: "24px", md: "28px" }, p: { xs: 2.5, sm: 3, md: 4 }, color: "#C9F8BA" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 2.5, md: 3 }, gap: 2 }}>
            <IconButton onClick={() => setSupportView("menu")} sx={{ color: "#C9F8BA" }}>
              <ArrowBackIosNewOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}>Frequently Asked Questions</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
            {[
              { q: "How do I reschedule my pickup?", a: "Go to Orders > Select order > Reschedule." },
              { q: "Where can I track my order?", a: "Open Order History and tap on the order status card." },
              { q: "How do I update my payment method?", a: "Navigate to Profile > Payment Method > Add card." },
              { q: "Do you offer express service?", a: "Yes, choose Express at checkout for next-day delivery." },
            ].map((faq) => (
              <Box key={faq.q} sx={{ backgroundColor: "rgba(201,248,186,0.1)", borderRadius: { xs: "16px", sm: "20px" }, p: { xs: 2, sm: 2.5, md: 3 } }}>
                <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}>{faq.q}</Typography>
                <Typography sx={{ opacity: 0.8, fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.95rem" } }}>{faq.a}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContactForm;

