/* eslint-disable react/no-unescaped-entities */
import "./about.scss";

function About() {
  return (
    <div className="About-container">
      <div className="About-row">
        {/* Cột trái trống */}
        <div className="About-column-left">
          <div className="left-side">
            <img src="/picture/pic1.png" alt="" />
          </div>
        </div>

        {/* Cột phải với sản phẩm */}
        <div className="About-column-right">
          <div className="right-side">
            <h2>OUR STORY</h2>
            <h2>About us</h2>

            <h3>Kyiv LuxeBouquets</h3>
            <p>
              We are a modern local floral studio, which specializes in the
              design and delivery of unique bouquets. We have the best florists
              who carefully select each look, our studio cooperates directly
              with farms for growing different flowers, so we always have fresh
              flowers, which are collected by our florists in exquisite
              bouquets. We have a collection of fresh bouquets, collections of
              dried bouquets, house plants, as well as fragrant candles from
              luxury brands to create the perfect atmosphere. Make someone's day
              amazing by sending flowers, plants and gifts the same or next day.
              Ordering flowers online has never been easier.
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
