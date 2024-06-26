"use client";
import React from "react";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import Button from "../Button";
interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
  bg-white
  rounded-2xl

  border-neutral-200
  overflow-hidden
  
  
  "
    >
      <div
        className="
    
    flex
    flex-row
    items-center
    gap-1
    p-4
    "
      >
        <div className="text-2xl font-semibold">{price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <Calender
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} onClick={onSubmit} label="Reserve" />
      </div>
      <div className="p-4 flex flex-row justify-between items-center font-semibold text-lg">
        <div>Total</div>
        <div> ${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
