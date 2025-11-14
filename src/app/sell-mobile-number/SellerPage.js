"use client"
import React from 'react';
import "./seller.css";
import OurCustomers from '../Shared/OurCustomers/OurCustomers';
import VideoTestimonial from '../Shared/VideoTestimonial/VideoTestimonial';
import QRVipApp from '../Shared/QRVipApp/QRVipApp';
import FAQs from '../Shared/FAQs/FAQs';
import { SellNumber } from './SellNumber';
import { ResponsiveFooter } from '../ResponsiveModule';

const SellerPage = () => {
    return (
        <div>
            <SellNumber />
            <OurCustomers />
            <VideoTestimonial />
            <FAQs />
            <QRVipApp />
            
        </div>
    );
}

export default SellerPage;