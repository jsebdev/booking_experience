import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BookingsSection } from "../../components/bookingsSection";
import BookSection from "../../components/bookSection";
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
            <Image
              className={spaceDetailsStyles.image}
              src={imageSrc(space.image, space.test)}
              fill
              alt="space"
            />
          </div>
          {space.description
            ?.split(/[\n\r]/)
            .filter((p) => p !== "")
            .map((p, i) => (
              <div className={spaceDetailsStyles.description} key={i}>
                {p}
              </div>
            ))}
          <h3 className={spaceDetailsStyles.sectionTitle}>Current Bookings:</h3>
          <BookingsSection bookings={Object.values(space.bookings)} />
          <h3 className={spaceDetailsStyles.sectionTitle}>Make new booking:</h3>
          <BookSection
            bookings={Object.values(space.bookings)}
            spaceId={spaceId as string}
          />
        </>
      ) : (
        <p>space not found</p>
      )}
    </Layout>
  );
};

export default SpaceDetails;
