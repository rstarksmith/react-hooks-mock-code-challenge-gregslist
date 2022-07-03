import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";


function ListingsContainer({ search }) {
  const [listings, setListings] = useState([])
  const [sortBy, setSortBy] = useState("id")

  useEffect(() => {
    fetch('http://localhost:6001/listings')
    .then(resp => resp.json())
    .then(resp => setListings(resp))
  }, [])

  const handleDeleteListing = (id) => {
    const updatedListings = listings.filter(listing => listing.id !== id)
    setListings(updatedListings)
  }
  
  const filteredListings = listings.filter(listing => {
    return listing.description.toLowerCase().includes(search)
  })

  const sortedListings = filteredListings.sort((listingA, listingB) => {
    if(sortBy === "id") {
      return listingA.id - listingB.id 
    } else {
      return listingA.location.localeCompare(listingB.location)
    }
  })
  
  const listingCards = sortedListings.map((listing) => {
    return (
      <ListingCard 
        key={listing.id} 
        listing={listing} 
        handleDeleteListing={handleDeleteListing}
      />
    )
  })

  // const filteredListings = listings.filter(listing => {
  //   return listing.description.toLowerCase().includes(search)
  // }).sort((listingA, listingB) => {
  //   if(sortBy === "id") {
  //     return listingA.id - listingB.id 
  //   } else {
  //     return listingA.location.localeCompare(listingB.location)
  //   }
  // }).map((listing) => {
  //   return (
  //     <ListingCard 
  //       key={listing.id} 
  //       listing={listing} 
  //       handleDeleteListing={handleDeleteListing}
  //     />
  //   )
  // })

  function handleAddListing(newListing) {
    const updatedListingsArray = [...listings, newListing]
    setListings(updatedListingsArray)

  }

  return (
    <main>
      <NewListingForm handleAddListing={handleAddListing} />
      <button onClick={() => setSortBy("id")}>Sort by Default</button>
      <button onClick={() => setSortBy("location")}>Sort by Location</button>
      <ul className="cards">
        {/* {filteredListings} */}
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
