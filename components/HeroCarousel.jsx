import Image from "next/image";
import Carousel from "react-multi-carousel";

function HeroCarousel() {
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
      autoPlay={true}
      autoPlaySpeed={2000}
      arrows={false}
      infinite
    >
      <div className="h-80 w-full">
        <Image
          src={"https://source.unsplash.com/random/?coffeshop"}
          alt="Hero Image"
          fill
          loading="lazy"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="h-80 w-full">
        <Image
          src={"https://source.unsplash.com/random/?coffe"}
          alt="Hero Image"
          fill
          loading="lazy"
          className="object-cover h-full w-full"
        />
      </div>
    </Carousel>
  );
}

export default HeroCarousel;
