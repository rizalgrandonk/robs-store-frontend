import Image from "next/image";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { getAllMenu } from "../lib/api";
import LoadingSpinner from "./LoadingSpinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function MenuCarousel() {
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: daftarMenu,
  } = useQuery("allMenu", () => getAllMenu(user.token));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="px-4 pt-20">
        <div className="w-full px-2 py-3 bg-red-100">
          <p className="text-red-500">Service Error</p>
        </div>
      </div>
    );
  }

  if (daftarMenu) {
    return (
      <Carousel
        draggable
        swipeable
        responsive={responsive}
        showDots={false}
        autoPlay={false}
        arrows={false}
        infinite
      >
        {daftarMenu.map((menu) => (
          <div
            key={menu.id}
            className="w-full flex flex-col justify-center items-center py-4"
          >
            <div className="w-48 h-60 rounded-xl relative overflow-hidden mb-5">
              <Image
                src={menu.img}
                alt={menu.name}
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover h-full w-full"
              />
            </div>
            <h3 className="text-2xl text-gray-900 font-medium mb-1">
              {menu.name}
            </h3>
            <p className="text-2xl text-secondary">
              {"Rp " + menu.price.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default MenuCarousel;
