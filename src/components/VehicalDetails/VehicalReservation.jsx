import { formatDistance } from "date-fns";
import Button from "../Button/Button";
import Calender from "./Calender";
import { useState } from "react";
import BookingModal from "../Modal/BookingModal";
import useAuth from "../../hooks/useAuth";



const VehicalReservation = ({ vehicle }) => {
    const { user } = useAuth();
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    const [value, setValue] = useState({
        startDate: new Date(vehicle?.from),
        endDate: new Date(vehicle?.to),
        key: 'selection',
    })
    const totalDays = Math.ceil((new Date(vehicle?.to) - new Date(vehicle?.from)) / (1000 * 60 * 60 * 24))
    // const totalDays = parseInt(
    //     formatDistance(new Date(vehicle?.to), new Date(vehicle?.from)).split(' ')[0]
    // )
    //     const totalDays = parseInt(
    //     formatDistance(new Date(vehicle?.to), new Date(vehicle?.from)).split(' ')[0]
    // )
    // console.log(totalDays);

    // Total Price Calculation 
    const totalPrice = totalDays * vehicle?.price
    // console.log(totalPrice);
    const handleDateChange = ranges => {
        console.log(ranges) // ranges parameter is logged but not used
        setValue({
            startDate: new Date(vehicle?.from), // Hardcoded values instead of using ranges
            endDate: new Date(vehicle?.to),
            key: 'selection',
        })
    }

    // const handleDateChange = ranges => {
    //     console.log(ranges)
    //     setValue({
    //         startDate: new Date(vehicle?.from),
    //         endDate: new Date(vehicle?.to),
    //         key: 'selection',
    //     })
    // }

    const [bookingInfo, setBookingInfo] = useState({
        guest: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        },
        host: vehicle?.host?.email,
        location: vehicle?.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: vehicle?.title,
        vehicleId: vehicle?._id,
        image: vehicle?.image,
    })


    return (
        <div className="rounded-xl border-[1px] border-blue-400 overflow-hidden bg-white">
            <div className="flex items-center gap-1 p-4">
                <div className="text-2xl font-semibold">$ {vehicle?.price} </div>
                <div className="font-light text-neutral-600"> Per day</div>
            </div>
            <hr />
            <div className="flex justify-center"><Calender handleDateChange={handleDateChange} value={value} /></div>
            <hr />
            <div className="p-4">
                <Button
                    disabled={vehicle.host.email === user.email || vehicle.booked}
                    onClick={() => setIsOpen(true)}
                    label={'Reserve'} /></div>
            <hr />
            <div className="p-4 flex items-center justify-between font-semibold text-lg">
                <div>Total :</div>
                <div>$ {totalPrice} </div>
            </div>
            <BookingModal
                closeModal={closeModal}
                isOpen={isOpen}
                bookingInfo={bookingInfo}
            />
        </div>
    );
};

export default VehicalReservation;