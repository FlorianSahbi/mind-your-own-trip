import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "./App.css";
import { default_map_pos } from "./Constants";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GET_PLACES } from "./GraphQl/places";
import CardPlace from "./Card";
import ButtonAppBar from "./Header";
import CircularProgress from "@material-ui/core/CircularProgress";

function Home() {
  const { data, loading, error } = useQuery(GET_PLACES);
  const [position, setPostion] = useState(default_map_pos);

  if (error) {
    return <p>Error...</p>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div style={{ height: "64px" }} />
      <ButtonAppBar />
      <div style={{ height: "70vh", width: "100%" }}>
        <MapContainer
          center={position}
          zoom={5}
          // scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.getPlaces?.map(
            ({
              _id,
              name,
              location: {
                coordinates: [lng, lat],
              },
            }) => {
              return (
                <Marker key={_id} position={[lat, lng]}>
                  <Popup>{name}</Popup>
                </Marker>
              );
            }
          )}
        </MapContainer>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
          gap: "1rem",
          justifyItems: "center",
          padding: "1rem",
        }}
      >
        {data.getPlaces?.map(
          ({
            _id,
            name,
            preview,
            code,
            country,
            addedBy,
            location: {
              coordinates: [lng, lat],
            },
          }) => (
            <CardPlace
              key={_id}
              onClick={() => setPostion([lng, lat])}
              name={name}
              src={preview}
              country={country}
              code={code}
              profilePicture={addedBy?.profilePicture}
            />
          )
        )}
      </div>
    </>
  );
}

export default Home;
