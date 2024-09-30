import Carousel from "../components/Carousel/carousel";
import Header from "../components/Header/header";
import About from "../Home/About/about";
import Comment from "../Home/Comment/comment";
import WhySection from "../Home/features/WhySection ";
import Footer from "../Home/footer/footer";
import PrProduct from "../Home/PrProduct/pr";

import Event from "../Home/Voucher/voucher";

function Home() {
  return (
    <>
      <Header />
      <Carousel numberOfSlide={1} autoplay={true} />
      <WhySection />
      <About />
      <PrProduct />
      <Event />
      <Comment />
      <Footer />
    </>
  );
}

export default Home;
