import Image from "next/image";
import Carousel from "react-multi-carousel";

function MenuCarousel() {
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
      <div className="w-full flex flex-col justify-center items-center py-4">
        <div className="w-48 h-60 rounded-xl relative overflow-hidden mb-5">
          <Image
            src={"https://source.unsplash.com/random/?americano"}
            alt="Menu Image"
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover h-full w-full"
          />
        </div>
        <h3 className="text-2xl text-gray-900 font-medium mb-1">Americano</h3>
        <p className="mb-1 text-gray-800">1,3RB terjual</p>
        <p className="text-2xl text-secondary">
          <span>Rp</span>14.000
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center py-4">
        <div className="w-48 h-60 rounded-xl relative overflow-hidden mb-5">
          <Image
            src={"https://source.unsplash.com/random/?latte"}
            alt="Menu Image"
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover h-full w-full"
          />
        </div>
        <h3 className="text-2xl text-gray-900 font-medium mb-1">Latte</h3>
        <p className="mb-1 text-gray-800">2,1RB terjual</p>
        <p className="text-2xl text-secondary">
          <span>Rp</span>14.000
        </p>
      </div>
    </Carousel>
  );
}

export default MenuCarousel;
