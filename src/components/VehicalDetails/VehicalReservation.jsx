import { formatDistance } from "date-fns";
import Button from "../Button/Button";
import Calender from "./Calender";
import { useState } from "react";



const VehicalReservation = ({ vehicle }) => {
    const [value, setValue] = useState({
        startDate: new Date(vehicle?.from),
        endDate: new Date(vehicle?.to),
        key: 'selection',
    })


    const totalDays = parseInt(
        formatDistance(new Date(vehicle?.to), new Date(vehicle?.from)).split(' ')[0]
    )
    // console.log(totalDays);

    // Total Price Calculation 
    const totalPrice = totalDays * vehicle?.price
    // console.log(totalPrice);


    return (
        <div className="rounded-xl border-[1px] border-blue-400 overflow-hidden bg-white">
            <div className="flex items-center gap-1 p-4">
                <div className="text-2xl font-semibold">$ {vehicle?.price} </div>
                <div className="font-light text-neutral-600"> Per day</div>
            </div>
            <hr />
            <div className="flex justify-center"><Calender value={value} /></div>
            <hr />
            <div className="p-4"><Button label={'Reserve'} /></div>
            <hr />
            <div className="p-4 flex items-center justify-between font-semibold text-lg">
                <div>Total :</div>
                <div>$ {totalPrice} </div>
            </div>
        </div>
    );
};

export default VehicalReservation;