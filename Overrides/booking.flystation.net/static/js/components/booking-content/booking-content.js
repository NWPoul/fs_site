import React from "react";
import { useSelector } from "react-redux";

import SlotTimes from '../slot-times';
import Bookings from '../bookings';
import BookingPanel from '../booking-panel';
import './styles.css';

export default function BookingContent(){
    const isOpen = useSelector((state) => state.bookingPanel.isOpen); 
    const date = useSelector((state) => state.pageBooking.date);
    const isSearch = useSelector((state) => state.pageBooking.isSearch);
    return <div className="booking-content">
        <p>TEST</p>
        <div className={(!isOpen) ? "booking-content__left width-full" : "booking-content__left"}>
            {(isSearch)? 
                <Bookings date={date}/>
                :
                <SlotTimes 
                    date={date}
                />
            }
        </div>
        {(isOpen || 1) ? 
            <div className="booking-content__right">
                <BookingPanel />
            </div>    
        : ''}
    </div>
}