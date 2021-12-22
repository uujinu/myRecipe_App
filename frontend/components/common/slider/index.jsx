import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderComp({ children }) {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
