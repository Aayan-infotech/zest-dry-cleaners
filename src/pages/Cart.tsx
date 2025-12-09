import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    IconButton,
    Button,
    CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import DateTimeDialog from "../components/dialogs/DateTimeDialog";
import defaultImage from "../../src/assets/default-image_450.png";
import { getCart, removeCartItem, updateCartQuantity } from "../utils/auth";
import Loader from "../components/ui/Loader";
import { useCart } from "../hooks/useCart.tsx";
import { DeleteOutline } from "@mui/icons-material";
import { showSuccessToast } from "../utils/toast.ts";

interface CartItem {
    categoryId: {
        _id: string;
        categoryName: string;
        profileImage?: string;
        pricePerPiece?: number;
        estimatedDeliveryTime?: string;
    };
    quantity: number;
    _id: string;
}

const Cart = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const navigate = useNavigate();
    const [openDateTimeDialog, setOpenDateTimeDialog] = useState(false);

    const { loadCartCount } = useCart();

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCartItems(data.cart.selectedCategories);
            setTotalAmount(data.totalAmount);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const updateLocalQty = (id: string, qty: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.categoryId._id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const increaseQty = async (id: string, qty: number) => {
        updateLocalQty(id, qty + 1);
        await updateCartQuantity(id, qty + 1);
        fetchCartData();
        loadCartCount();
    };

    const decreaseQty = async (id: string, qty: number) => {
        if (qty <= 1) return;
        updateLocalQty(id, qty - 1);
        await updateCartQuantity(id, qty - 1);
        fetchCartData();
        loadCartCount();
    };

    const handleRemoveItem = async (id: string) => {
        try {
            const response = await removeCartItem(id);
            showSuccessToast(response?.message || "Removed Successfully!");
            setCartItems(prev => prev.filter(item => item.categoryId._id !== id));
            loadCartCount();
            fetchCartData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleContinue = (date: Date, time: string, instructions: string) => {
        sessionStorage.setItem("selectedDate", date.toISOString());
        sessionStorage.setItem("selectedTime", time);
        sessionStorage.setItem("specialInstructions", instructions);
        navigate("/route-selection");
    };

    const calculatedTotal = cartItems.reduce(
        (sum, item) => sum + (item.categoryId.pricePerPiece ?? 0) * item.quantity,
        0
    );

    return (
        <Box sx={{ background: "#336B3F", minHeight: "100vh" }}>
            <DashboardNavbar />
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                </div>
            ) : (
                <div className="container py-5 mt-5">
                    <div className="row g-4">

                        {/* Left Side Items */}
                        <div className="col-md-6">
                            {cartItems.map((item) => (
                                <Card key={item?._id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                        p: 1.5,
                                        background: "rgba(201,248,186,1)",
                                        borderRadius: 3
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item?.categoryId?.profileImage || defaultImage}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 2,
                                            objectFit: "cover",
                                            mr: 2
                                        }}
                                    />

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                                            {item?.categoryId?.categoryName}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                                            <StarIcon sx={{ color: "#ffbf00", fontSize: 18 }} />
                                            <Typography sx={{ fontSize: 14 }}>4.5</Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                                            ${item?.categoryId?.pricePerPiece ?? 0}
                                        </Typography>
                                    </Box>

                                    {/* Quantity Buttons */}
                                    <Box sx={{ textAlign: 'end' }}>
                                        <IconButton color="error" onClick={() => handleRemoveItem(item?.categoryId?._id)}>
                                            <DeleteOutline />
                                        </IconButton>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            border: "1px solid #3d8b65",
                                            borderRadius: 2,
                                            px: 1,
                                            background: "#e0ffe8"
                                        }}>
                                            <IconButton size="small"
                                                onClick={() => decreaseQty(item?.categoryId?._id, item?.quantity)}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ mx: 1, fontWeight: 600 }}>
                                                {item?.quantity}
                                            </Typography>
                                            <IconButton size="small"
                                                onClick={() => increaseQty(item.categoryId?._id, item?.quantity)}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="col-md-1 d-flex justify-content-center">
                            <div style={{ width: "3px", height: "90%", background: "#ECECEC", margin: "auto" }}></div>
                        </div>

                        {/* Right Side Bill Summary */}
                        <div className="col-md-5">
                            <Card sx={{ p: 4, background: "rgba(201,248,186,0.37)", borderRadius: 3, color: "#fff" }}>
                                <Typography sx={{ fontSize: "1.6rem", fontWeight: 700, textAlign: "center", mb: 3 }}>
                                    Total Bill
                                </Typography>

                                {cartItems.map((item) => (
                                    <Box key={item?._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography>{item?.categoryId?.categoryName}</Typography>
                                        <Typography>${(item?.categoryId?.pricePerPiece ?? 0) * item?.quantity}</Typography>
                                    </Box>
                                ))}

                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 3, fontWeight: 700 }}>
                                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 'bold' }}>TOTAL</Typography>
                                    <Typography sx={{ fontSize: "1.8rem", fontWeight: 'bold' }}>
                                        ${totalAmount || calculatedTotal}
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    onClick={() => navigate("/services-list")}
                                    sx={{
                                        background: "#fff",
                                        color: "#336B3F",
                                        borderRadius: "20px",
                                        py: 1,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        mb: 2,
                                        "&:hover": { background: "#f2ffe9" },
                                    }}
                                >
                                    ➕ Add More Product
                                </Button>
                                <Button fullWidth onClick={() => setOpenDateTimeDialog(true)}
                                    sx={{
                                        background: "#d6ffcd",
                                        color: "#000",
                                        borderRadius: "20px",
                                        py: 1.2,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "1rem"
                                    }}>
                                    Continue
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
            <DateTimeDialog
                open={openDateTimeDialog}
                onClose={() => setOpenDateTimeDialog(false)}
                onContinue={handleContinue}
            />
        </Box>
    );
};

export default Cart;
