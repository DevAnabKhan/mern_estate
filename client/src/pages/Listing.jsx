import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
  FaShare,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`/api/listing/get/${params.listingId}`);

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className=" text-red-700 text-center my-7 text-2xl">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <div className="relative">
            <Swiper navigation className="rounded-lg overflow-hidden">
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="w-full aspect-[16/9] max-h-[70vh] mx-auto bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share button on top-left of slider */}
            <div
              className="absolute top-3 right-3 z-10 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <FaShare className="text-green-700 text-lg" />
            </div>

            {copied && (
              <p className="absolute top-14 right-3 z-10 bg-white p-2 rounded shadow text-sm text-green-700">
                Link copied!
              </p>
            )}
          </div>

          <div className="w-full flex justify-center">
            <div className="flex flex-col max-w-8xl mx-auto p-3 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} - $
                {listing.offer
                  ? listing.discountedPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>

              <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>

              <div className="flex gap-4">
                <p
                  className="bg-red-900 w-full max-w-[200px] text-white text-center
p-1 rounded-md"
                >
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p
                    className="bg-red-900 w-full max-w-[200px] text-white text-center
p-1 rounded-md"
                  >
                    ${+listing.regularPrice - +listing.discountedPrice}
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listing.description}
              </p>
              <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-sm">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking ? `Parking spot` : `No Parking`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaChair className="text-lg" />
                  {listing.furnished ? `Furnished` : `Unfurnished`}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
