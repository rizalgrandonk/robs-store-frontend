import Image from "next/image";
import Carousel from "react-multi-carousel";

const featuredMenu = [
  {
    id: "1",
    name: "Americano",
    image: "https://source.unsplash.com/random/?americano",
    sales: 1300,
    price: 14000,
  },
  {
    id: "2",
    name: "Latte",
    image: "https://source.unsplash.com/random/?latte",
    sales: 2700,
    price: 18000,
  },
];

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
      {featuredMenu.map((menu) => (
        <div
          key={menu.id}
          className="w-full flex flex-col justify-center items-center py-4"
        >
          <div className="w-48 h-60 rounded-xl relative overflow-hidden mb-5">
            <Image
              src={menu.image}
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
          <p className="mb-1 text-gray-800">
            {`${menu.sales / 1000}`.split(".").join(",") + " RB Terjual"}
          </p>
          <p className="text-2xl text-secondary">
            {"Rp " + menu.price.toLocaleString("id-ID")}
          </p>
        </div>
      ))}
    </Carousel>
  );
}

export default MenuCarousel;
