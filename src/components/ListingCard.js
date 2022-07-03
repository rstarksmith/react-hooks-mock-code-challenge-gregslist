import React, { useState } from "react";

function ListingCard({ listing, handleDeleteListing}) {
  const { description, image, location, id } = listing

  const [favorite, setFavorite] = useState(false)

  const handleFavorite = () => {
    setFavorite(!favorite)
  }

  // alternate way to handle favorite toggle
  //  const handleFavorite = () => {
  //   setFavorite(true)
  // }
  
  // const handleUnfavorite = () => {
  //   setFavorite(false)
  // }

  const handleDelete = () => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(() => { 
        handleDeleteListing(id)
      }) 
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        {favorite ? (
          <button className="emoji-button favorite active" onClick={handleFavorite}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleFavorite}>☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
