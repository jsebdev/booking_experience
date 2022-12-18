import { format, formatRelative } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import BookSection from "../../components/bookSection";
import { Button } from "../../components/button";
import Layout from "../../components/Layout";
import { imageSrc } from "../../helpers/utils";
import { selectSpace } from "../../store/slices/spacesSlice";
import { useAppSelector } from "../../store/store.hooks";
import spaceDetailsStyles from "../../styles/spaceDetails.module.scss";

const SpaceDetails = () => {
  const router = useRouter();
  const { spaceId } = router.query;
  const space = useAppSelector(selectSpace(spaceId as string));
  return (
    <Layout home={false}>
      {space ? (
        <>
          <h2 className={spaceDetailsStyles.title}>{space.name}</h2>
          <div className={spaceDetailsStyles.imageContainer}>
            <img src={imageSrc(space.image, space.test)} />
          </div>
          <h3 className={spaceDetailsStyles.sectionTitle}>Current Bookings:</h3>
          <div className={spaceDetailsStyles.bookings}>
            {Object.keys(space.bookings).length > 0 ? (
              <>
                {Object.values(space.bookings)
                  .sort(
                    (bA, bB) =>
                      bA.start_date.getTime() - bB.start_date.getTime()
                  )
                  .map((booking) => (
                    <div
                      className={spaceDetailsStyles.booking}
                      key={booking.id}
                    >
                      {format(booking.start_date, "yyyy/MM/dd")} ..{" "}
                      {format(booking.end_date, "yyyy/MM/dd")}
                    </div>
                  ))}
              </>
            ) : (
              <div className={spaceDetailsStyles.noBooking}>
                No bookings yet for this space
              </div>
            )}
          </div>
          <h3 className={spaceDetailsStyles.sectionTitle}>
            Book a new booking:
          </h3>
          <BookSection />
        </>
      ) : (
        <p>space not found</p>
      )}
    </Layout>
  );
};

export default SpaceDetails;
