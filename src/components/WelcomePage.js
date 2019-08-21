import React from "react";
import {withRouter} from "react-router-dom";
import ImageGallery from "react-image-gallery";

export const WelcomePage = () => {

const images = [
    {
      original: "https://i.imgur.com/Al7KczE.png"
    }
  ];

    return (
      <div className="card-blank">
        <div className="p-fluid">
        <center>
          <div className="p-col-12">
          <ImageGallery items={images} />
          </div>
        </center>
        </div>
	  </div>
    );
};

export default withRouter(WelcomePage);