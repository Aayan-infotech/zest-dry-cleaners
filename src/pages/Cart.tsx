import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    IconButton,
    Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import cartimg from "../../src/assets/1ec7ed57120be5a76dab177938cb26bb22971505.jpg";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
const Cart = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Shirts", price: 20, rating: 4.5, img: cartimg, qty: 1 },
        { id: 2, name: "Shirts", price: 20, rating: 4.5, img: cartimg, qty: 1 },
        { id: 3, name: "Shirts", price: 20, rating: 4.5, img: cartimg, qty: 1 },
    ]);
    const [open, setOpen] = useState(false);

    // Increase quantity
    const increaseQty = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    // Decrease quantity
    const decreaseQty = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
        );
    };

    // Total Bill
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
            <DashboardNavbar />

            <div className="container py-5 mt-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        {items?.map((item) => (
                            <Card
                                key={item.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    p: 1.5,
                                    background: "rgba(201, 248, 186, 1)",
                                    borderRadius: 3,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.img}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 2,
                                        objectFit: "cover",
                                        mr: 2,
                                    }}
                                />

                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                                        {item.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                                        <StarIcon sx={{ color: "#ffbf00", fontSize: 18 }} />
                                        <Typography sx={{ fontSize: 14 }}>{item.rating}</Typography>
                                    </Box>

                                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                                        ${item.price}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #3d8b65",
                                        borderRadius: 2,
                                        px: 1,
                                        py: 0.4,
                                        background: "#e0ffe8",
                                    }}
                                >
                                    <IconButton size="small" onClick={() => decreaseQty(item.id)}>
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>

                                    <Typography sx={{ mx: 1, fontWeight: 600 }}>
                                        {item.qty}
                                    </Typography>

                                    <IconButton size="small" onClick={() => increaseQty(item.id)}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Card>
                        ))}
                    </div>

                    {/* CENTER DIVIDER */}
                    <div className="col-md-1 d-flex justify-content-center">
                        <div
                            style={{
                                width: "3px",
                                height: "90%",
                                background: "rgba(236, 236, 236, 1)",
                                margin: "auto",
                            }}
                        ></div>
                    </div>

                    {/* RIGHT SIDE TOTAL BILL */}
                    <div className="col-md-5">
                        <Card
                            sx={{
                                p: 4,
                                background: "rgba(201, 248, 186, 0.37)",
                                borderRadius: 3,
                                color: "#fff",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    textAlign: "center",
                                    mb: 3,
                                }}
                            >
                                Total Bill
                            </Typography>

                            {/* Bill Details */}
                            {items.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    <Typography>{item.name}</Typography>
                                    <Typography>${item.price * item.qty}</Typography>
                                </Box>
                            ))}

                            {/* Total */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 3,
                                    mb: 3,
                                    fontWeight: 700,
                                }}
                            >
                                <Typography>TOTAL</Typography>
                                <Typography sx={{ fontSize: "1.8rem" }}>
                                    ${total}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                onClick={handleOpen}
                                sx={{
                                    background: "#d6ffcd",
                                    color: "#000",
                                    borderRadius: "20px",
                                    py: 1.2,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                }}
                            >
                                Continue
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Cart;
