import React, { useState } from "react";

function Banner() {
  const [slides, setSlides] = useState([
    { slide_name: "Slide 1", slide_image: "slide1.jpg" },
    { slide_name: "Slide 2", slide_image: "slide2.jpg" },
    { slide_name: "Slide 3", slide_image: "slide3.jpg" },
    { slide_name: "Slide 4", slide_image: "slide4.jpg" },
  ]);
  return (
    <div className="container" id="slider">
      <div className="col-md-12">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              className="active"
              data-target="#myCarousel"
              data-slide-to="0"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner">
            {/* Render slides dynamically */}
            {/* Assuming you have an array of slides containing slide_image URLs */}
            {slides.map((slide, index) => (
              <div key={index} className={index === 0 ? "item active" : "item"}>
                <img
                  src={`/slides_images/${slide.slide_image}`}
                  alt={slide.slide_name}
                />
              </div>
            ))}
          </div>
          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
