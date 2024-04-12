import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser=await getCurrentUser()
  const reservations=await getReservations(params)
  console.log("listing", params);
  if(!listing){
    return (
    <EmptyState/>
    )
  }

  

  return (
   <ListingClient
   listing={listing}
   reservations={reservations}
   currentUser={currentUser}
   
   
   />
  )
};

export default ListingPage;
