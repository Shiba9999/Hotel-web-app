"use client";
import qs from "query-string";
import React, { useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountySelect, { CountrySelectValue } from "../inputs/CountySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  //   const onSubmit = useCallback(async () => {
  //     if (step !== STEPS.INFO) {
  //       if (!location) {
  //         return onNext();
  //       }
  //       let currentQuery = {};
  //       if (params) {
  //         currentQuery = qs.parse(params.toString());
  //       }
  //       const updatedQuery: any = {
  //         ...currentQuery,
  //         locationValue: location?.value,
  //         guestCount,
  //         roomCount,
  //         bathroomCount,
  //       };
  //       if (dateRange.startDate) {
  //         updatedQuery.startDate = formatISO(dateRange.startDate);
  //       }
  //       if (dateRange.endDate) {
  //         updatedQuery.endDate = formatISO(dateRange.endDate);
  //       }

  //       const url = qs.stringifyUrl(
  //         { url: "/", query: updatedQuery },
  //         { skipNull: true }
  //       );
  //       setStep(STEPS.LOCATION);
  //       searchModal.onClose();
  //       router.push(url);
  //     }
  //   }, [
  //     bathroomCount,
  //     dateRange,
  //     guestCount,
  //     location,
  //     onNext,
  //     params,
  //     roomCount,
  //     searchModal,
  //     step,
  //     router,
  //   ]);

  const onSubmit = useCallback(async () => {
    if (step === STEPS.INFO) {
      if (!location) {
        return onNext();
      }
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };
      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }
      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl(
        { url: "/", query: updatedQuery },
        { skipNull: true }
      );
      router.push(url);
      searchModal.onClose(); 
    } else {
      onNext(); 
    }
  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "search";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="where do you wanna go"
        subtitle="find the perfect location"
      />
      <CountySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="when do you wanna go"
          subtitle="find the perfect location"
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="more info" subtitle="find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many Rooms do you need"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Guests"
          subtitle="How many bathrooms do you need"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
