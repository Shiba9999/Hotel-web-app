

import EmptyState from '@/components/EmptyState'
import React from 'react'
import getFavoriteListings from '../actions/getFavoriteListings'
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';

const ListingPage =async () => {

    const listings=await getFavoriteListings();

    
    const currentUser=await getCurrentUser()

    if(listings.length===0) return <EmptyState title="No Favourites found" subtitle='Looks like you have no fav listings'/>

  return (
    <FavoritesClient
    listings={listings}
    currentUser={currentUser}
    
    />
  )
}

export default ListingPage