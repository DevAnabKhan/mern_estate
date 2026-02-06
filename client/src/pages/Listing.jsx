import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
        <Swiper navigation className="rounded-lg overflow-hidden">
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="
      w-full
      aspect-[16/9]
      max-h-[70vh]
      mx-auto
      bg-center
      bg-no-repeat
    "
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}
