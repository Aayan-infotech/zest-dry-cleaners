import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import {
  Container,
  Box,
  Typography,
  Chip,
  Rating,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './ServiceDetails.css';
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { addToCart, getServiceCategoryById } from '../utils/auth';
import { useCategoryServices } from '../hooks/useCategoryServices';
import Loader from '../components/ui/Loader';
import defaultImage from "../../src/assets/default-image_450.png"
import { showSuccessToast } from '../utils/toast';
import { useCart } from '../hooks/useCart.tsx';

export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  profileImage?: string;
  pricePerPiece?: number;
  estimatedDeliveryTime?: string;
  createdAt: string;
  updatedAt?: string;
  __v: number;
}

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const serviceId = id;
  const [category, setCategory] = useState(serviceId || "");
  const [serviceDetials, setServiceDetails] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const navigate = useNavigate();
  const { loadCartCount } = useCart();
  const { categories } = useCategoryServices();

  const quantityList = Array.from({ length: 10 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  }));

  const categoryOptions = useMemo(() => {
    return categories.map((c: Category) => ({
      value: c._id,
      label: c.categoryName,
    }));
  }, [categories]);

  useEffect(() => {
    const fetchCategory = async () => {
       if (serviceId) setCategory(serviceId);
      try {
        setLoading(true);
        const data = await getServiceCategoryById(serviceId as string);
        setServiceDetails(data?.category);
      } catch (err: any) {
        console.log(err.message || 'Failed to fetch category');
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [serviceId]);

  const handleCategoryChange = (e: any) => {
    const newCategoryId = e.target.value;
    setCategory(newCategoryId);
    navigate(`/services/${newCategoryId}`);
  };

  const computedPrice =
    (serviceDetials?.pricePerPiece || 0) * (Number(quantity) || 1);

  const service = {
    id: 1,
    iconBgColor: '#FAC7C7',
    bgColor: 'rgb(255 207 207)',
    iconColor: '#f44336',
    suitableFor: ['Cotton', 'Linen', 'Polyster Blend', 'Denim', 'Formal Wear'],
    notRecommended: '*Not recommended for delicate fabrics like silk or chiffon.',
    rating: 4.8,
    reviewsCount: 240,
    reviews: [
      'Perfect pressing every time — worth it!',
      'Fast and neatly done.',
    ],
  };

  const handleAddToCart = async () => {
    if (!serviceDetials?._id) return console.error("Category ID missing!");
    try {
      setAddToCartLoading(true);
      const res = await addToCart(serviceDetials._id, Number(quantity) || 1);
      showSuccessToast(res?.message || "Product Added Sussessfully...!")
      loadCartCount();
    } catch (err) {
      console.error("Add to Cart Error:", err);
    } finally {
      setAddToCartLoading(false);
    }
  };

  return (
    <div className="service-details-page">
      <DashboardNavbar />
      {loading ? (
        <div className='text-center'>
          <Loader />
        </div>
      ) : (
        <main className="service-details-content">
          <Container maxWidth="xl">
            <Box className="service-selection-section" sx={{ backgroundColor: 'var(--primary-dark-green)', borderRadius: '24px', marginBottom: '24px', }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '32px', alignItems: { xs: 'center', md: 'flex-start' }, }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: '24px', flex: 1, }} className="animate-slide-left">
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, alignItems: 'center', flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box
                      sx={{
                        backgroundColor: service.bgColor,
                        width: { xs: '100px', sm: '120px', md: '150px' },
                        height: { xs: '100px', sm: '120px', md: '150px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      className='rounded-pill hover-scale smooth-transition'
                    >
                      <img src={serviceDetials?.profileImage || defaultImage} onError={(e) => (e.currentTarget.src = defaultImage)} alt={serviceDetials?.categoryName} style={{ width: '100px', height: '100px', borderRadius: "50px" }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, fontWeight: 700, color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
                      {serviceDetials?.categoryName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: { xs: '100%', md: '400px' } }}>
                    <Select label="Category" options={categoryOptions} value={category} onChange={handleCategoryChange} variant="dark" placeholder="Select Category" />
                    <Select label="Quantity" options={quantityList} value={quantity} onChange={(e) => setQuantity(e.target.value)} variant="dark" placeholder="Select Quantity" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', fontSize: { xs: '1.25rem', md: '1.5rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                    Price: <strong className='fs-1 fw-bold'>${computedPrice}</strong>/Item
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "16px", width: { xs: '100%', md: '250px' }, backgroundColor: 'rgb(247 196 196)', padding: { xs: "16px 24px", md: "23px 33px" }, borderRadius: "50px", justifyContent: { xs: 'center', md: 'flex-start' } }} className="hover-lift smooth-transition">
                    <AccessTimeIcon sx={{ fontSize: { xs: "28px", md: "30px" }, color: service.iconColor, }} />
                    <Typography sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 'bold', color: service.iconColor, }}>
                      {serviceDetials?.estimatedDeliveryTime}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="animate-slide-right hover-scale smooth-transition"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', md: '500px' },
                    height: { xs: '250px', sm: '300px', md: '400px' },
                    borderRadius: '20px',
                    backgroundColor: '#D4A574',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginTop: { xs: '24px', md: 0 },
                  }}
                >
                  <img src={serviceDetials?.profileImage || defaultImage} onError={(e) => (e.currentTarget.src = defaultImage)} alt={serviceDetials?.categoryName} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ backgroundColor: 'rgba(201, 248, 186, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-1 hover-lift smooth-transition">
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#336B3F', marginBottom: '16px', }}>
                Service Overview
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#336B3F', lineHeight: 1.6, }}>
                {serviceDetials?.description}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'rgba(252, 233, 233, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-2 hover-lift smooth-transition">
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#d32f2f', marginBottom: '16px', }}>
                Suitable For
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', }}>
                {service.suitableFor.map((item, index) => (
                  <Chip key={index} label={item} className="hover-scale smooth-transition" sx={{ backgroundColor: '#FAC7C7', color: '#d32f2f', fontWeight: 600, borderRadius: '20px', }} />
                ))}
              </Box>
              <Typography sx={{ fontSize: { xs: '0.85rem', md: '0.9rem' }, color: '#d32f2f', fontStyle: 'italic', }}>
                {service.notRecommended}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'rgba(201, 248, 186, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-3 hover-lift smooth-transition">
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#336B3F', marginBottom: '16px', }}>
                Turnaround & Delivery
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#336B3F', fontWeight: 'bold' }}>
                Pickup & Delivery: {serviceDetials?.estimatedDeliveryTime}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: 'rgba(252, 233, 233, 1)', borderRadius: '24px', padding: { xs: '24px', md: '32px' }, marginBottom: '24px', }} className="animate-slide-up animate-delay-4 hover-lift smooth-transition">
              <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, color: '#d32f2f', marginBottom: '16px', }}>
                Customer Reviews
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <Rating value={service.rating} precision={0.1} readOnly sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#d32f2f', fontWeight: 600, }}>
                  ({service.rating}/5, {service.reviewsCount} reviews)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {service.reviews.map((review, index) => (
                  <Typography key={index} sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: '#d32f2f', }}>
                    "{review}"
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px', }} className="animate-fade-in">
              <Button variant="primary" onClick={handleAddToCart} disabled={addToCartLoading}  type="submit" size="large" className="custom-button--green hover-lift button-pulse" >
                {addToCartLoading ? "Adding..." : "Add To Cart"}
              </Button>
            </Box>
          </Container>
        </main>
      )}
    </div>
  );
};

export default ServiceDetails;

