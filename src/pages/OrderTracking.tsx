import React from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    StepIconProps
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardNavbar from "../components/DashboardNavbar";
import './OrderTracking.css';

interface TimelineStep {
    id: number;
    label: string;
    date: string;
    completed: boolean;
    isCurrent: boolean;
}

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'var(--primary-dark-green)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'var(--primary-dark-green)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 3,
        borderColor: 'var(--primary-dark-green)',
        borderRadius: 1,
    },
}));

const CustomStepIcon = styled('div')<{ ownerState: { completed?: boolean; active?: boolean } }>(
    ({ ownerState }) => ({
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '3px solid var(--primary-dark-green)',
        backgroundColor: ownerState.completed || ownerState.active
            ? 'var(--primary-dark-green)'
            : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        '@media (min-width: 768px)': {
            width: '32px',
            height: '32px',
        },
    })
);

function StepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
        <CustomStepIcon
            ownerState={{ completed, active }}
            className={className}
        />
    );
}

const OrderTracking: React.FC = () => {
    const timelineSteps: TimelineStep[] = [
        {
            id: 1,
            label: "Pickup Scheduled",
            date: "Sun, 21st Sept",
            completed: true,
            isCurrent: true,
        },
        {
            id: 2,
            label: "Picked Up",
            date: "Sun, 21st Sept",
            completed: false,
            isCurrent: false,
        },
        {
            id: 3,
            label: "In Process",
            date: "Mon, 22nd Sept",
            completed: false,
            isCurrent: false,
        },
        {
            id: 4,
            label: "Out For Delivery",
            date: "Tue, 23rd Sept",
            completed: false,
            isCurrent: false,
        },
        {
            id: 5,
            label: "Delivered",
            date: "Tue, 23rd Sept",
            completed: false,
            isCurrent: false,
        },
    ];

    const activeStep = timelineSteps.findIndex(step => step.isCurrent || step.completed);

    return (
        <Box className="order-tracking-page">
            <DashboardNavbar />
            <main className="order-tracking-content">
                <Container maxWidth="lg">
                    <Paper
                        elevation={0}
                        className="order-tracking-card"
                        sx={{
                            backgroundColor: 'rgba(201, 248, 186, 1)',
                            borderRadius: '24px',
                            padding: { xs: '24px', md: '48px' },
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                color: 'var(--primary-dark-green)',
                                fontWeight: 700,
                                mb: { xs: 4, md: 6 },
                                fontSize: { xs: '1.75rem', md: '2.5rem' }
                            }}
                        >
                            Order Tracking
                        </Typography>

                        <Box className="stepper-container">
                            <Stepper
                                activeStep={activeStep}
                                connector={<CustomStepConnector />}
                                sx={{
                                    '& .MuiStep-root': {
                                        position: 'relative',
                                        flex: 1,
                                        padding: 0,
                                    },
                                    '& .MuiStepLabel-root': {
                                        padding: 0,
                                    },
                                    '& .MuiStepLabel-label': {
                                        display: 'none',
                                    },
                                    '& .MuiStepConnector-root': {
                                        top: { xs: '12px', md: '16px' },
                                        left: 'calc(-50% + 20px)',
                                        right: 'calc(50% + 20px)',
                                    },
                                }}
                            >
                                {timelineSteps.map((step, index) => {
                                    // Exact positioning based on screenshot:
                                    // Step 1 (index 0): date above, label below
                                    // Step 2 (index 1): date below, label below (date further from timeline)
                                    // Step 3 (index 2): date above, label above (date further from timeline)
                                    // Step 4 (index 3): date below, label below (date further from timeline)
                                    // Step 5 (index 4): date above, label above (date further from timeline)
                                    
                                    const isDateAbove = index === 0 || index === 2 || index === 4;
                                    const isLabelAbove = index === 2 || index === 4;
                                    const sameSide = (isDateAbove && isLabelAbove) || (!isDateAbove && !isLabelAbove);
                                    
                                    return (
                                        <Box key={step.id} sx={{ position: 'relative', flex: 1 }}>
                                            <Step completed={step.completed} active={step.isCurrent}>
                                                <StepLabel StepIconComponent={StepIcon} />
                                            </Step>
                                            
                                            {/* Date - always further from timeline when on same side as label */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: { xs: '120px', md: '150px' },
                                                    textAlign: 'center',
                                                    zIndex: 2,
                                                    pointerEvents: 'none',
                                                    top: isDateAbove ? { xs: '-50px', md: '-60px' } : 'auto',
                                                    bottom: !isDateAbove ? { xs: '-50px', md: '-60px' } : 'auto',
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--primary-dark-green)',
                                                        fontWeight: 600,
                                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                                        mb: sameSide ? 0.5 : 0,
                                                    }}
                                                >
                                                    {step.date}
                                                </Typography>
                                            </Box>
                                            
                                            {/* Label - closer to timeline when on same side as date */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: { xs: '120px', md: '150px' },
                                                    textAlign: 'center',
                                                    zIndex: 2,
                                                    pointerEvents: 'none',
                                                    top: isLabelAbove 
                                                        ? (sameSide ? { xs: '-30px', md: '-35px' } : { xs: '-50px', md: '-60px' })
                                                        : 'auto',
                                                    bottom: !isLabelAbove 
                                                        ? (sameSide ? { xs: '-30px', md: '-35px' } : { xs: '-50px', md: '-60px' })
                                                        : 'auto',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: 'var(--primary-dark-green)',
                                                        fontWeight: 600,
                                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                                    }}
                                                >
                                                    {step.label}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Stepper>
                        </Box>
                    </Paper>
                </Container>
            </main>
        </Box>
    );
};

export default OrderTracking;
