import React from "react";

function Advantages() {
  return (
    <div id="advantages">
      <div className="container">
        <div className="same-height-row">
          <div className="col-sm-4">
            <div className="box same-height">
              <div className="icon">
                <i className="fa fa-heart"></i>
              </div>
              <h3>
                <a href="#">Best Offers</a>
              </h3>
              <p>
                Shop Produce online at Farmers Connect Farmers and get lots of
                great deals!
              </p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="box same-height">
              <div className="icon">
                <i className="fa fa-tag"></i>
              </div>
              <h3>
                <a href="#">Best Prices</a>
              </h3>
              <p>Shop what you love at a price you'll love even more.</p>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="box same-height">
              <div className="icon">
                <i className="fa fa-thumbs-up"></i>
              </div>
              <h3>
                <a href="#">100% Healthy</a>
              </h3>
              <p>
                Each Produce is raised with care and attention, ensuring
                superior health and taste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advantages;
