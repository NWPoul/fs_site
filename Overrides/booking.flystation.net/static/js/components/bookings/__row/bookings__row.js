import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TableRow, TableCell } from "@mui/material";
import openBookingPanel from "../../booking-panel/actions/openBookingPanel";
import DateLib from "../../../inc/DateLib";
import './styles.css';

var testFn = () => console.log("TEST FN")

export default function BookingRow({booking, isSlotTimeDateTime = false, slotTime}){
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.profile.roles);
    const stateList = useSelector((state) => state.list);
    const bookingId = useSelector((state) => state.bookingPanel.bookingId);
    const user = (booking.userId in stateList.users) ? stateList.users[booking.userId] : null;
    const type = (booking.typeId in stateList.bookingTypes)? stateList.bookingTypes[booking.typeId] : null;
    const order = (booking.orderId in stateList.orders)? stateList.orders[booking.orderId] : null;
    const paymentType = (order && order.paymentTypeId in stateList.paymentTypes) 
        ? stateList.paymentTypes[order.paymentTypeId] : null;
    const paymentStatus = (order && order.paymentStatusId in stateList.paymentStatuses) 
        ? stateList.paymentStatuses[order.paymentStatusId] : null;
    const product = (order && order.productId in stateList.products) 
        ? stateList.products[order.productId] : null;
    const userBalance = (user && booking.time && booking.time.userBalanceId in user.userBalances)
        ? user.userBalances[booking.time.userBalanceId] : null;
    let name = (user) ? user.surnameNM : '';
    let email = (user && roles.includes('admin')) ? user.email : '';
    let phone = (user && roles.includes('admin')) ? user.phone : '';
    const actionEditItem = () => {
        console.log(booking);
        let params = {};
        if(type){
            if(type.slug === 'certificate'){
                params.orderId = (booking.orderId) ? booking.orderId : null;
            }else if(type.slug === 'balance'){
                params.userBalanceId = (booking.time) ? booking.time.userBalanceId : null;
            }else if(type.slug === 'booking'){
                params.orderId = (booking.orderId) ? booking.orderId : null;
                params.productId = (order) ? order.productId : null;
                params.paymentTypeId = (order) ? order.paymentTypeId : null;
                params.paymentStatusId = (order) ? order.paymentStatusId : null;
            }
        }
        openBookingPanel({dispatch, stateList,
            bookingId: booking.id,
            typeId: booking.typeId, 
            slotTimeId: booking.slotTimeId, 
            date: booking.slotTimeDate, 
            minutes: booking.minutes, 
            comment: booking.comment, 
            userId: booking.userId,
            ...params
        });
        
    }
    let _minutes = 17//booking.minutes;
    /*
    if(slotTime){
        let thisMinutes = 0;

        _minutes = 20;
    }
    */
    return <TableRow
        hover
        tyle={{ borderRadius: 20, marginBottom: 20 }} 
        className={(bookingId && bookingId === booking.id) ? "bookings__row active" : "bookings__row"}
        onClick={(roles.includes('admin')) ? actionEditItem : null}
    >
        {isSlotTimeDateTime ? 
            <TableCell>{DateLib.formatterDateTime(booking.slotTimeDateTimeStart)}</TableCell>
        : null }
        
{/*         <TableCell>{_minutes}</TableCell> */}
        <TableCell><p>TEST</p></TableCell>
{/*         <TableCell>{booking.id}</TableCell> */}
        <TableCell>{(type) ? type.name : ''}</TableCell>
        {(type.slug === 'certificate') ?
            <TableCell>
                {(order && order.certificate) ? order.certificate.code : ''}
            </TableCell>
        :(type.slug === 'balance')? 
            <TableCell>
                {(userBalance) ? userBalance.type : ''}
            </TableCell>
        :
            <TableCell>
                {(product && product.category) ? product.category.name : ''}
            </TableCell>
        }
        {(type.slug === 'booking') ?
            <TableCell>
                {(paymentStatus)? paymentStatus.name : ''} {(paymentType)? paymentType.name : ''} {(order) ? order.total : ''}
            </TableCell>
        :
            <TableCell>
                
            </TableCell>
        }
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{booking.comment}</TableCell>
    </TableRow>
}
