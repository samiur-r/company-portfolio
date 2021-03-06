import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createGlobalStyle } from "styled-components";
import {
  updateColors,
  updateFont,
  updatePagesData,
  updateTranslation,
} from "./Redux/Pages/pages-action";
import Custom from "./pages/Custom/Custom";
import Blog from "./components/Blog/Blog";
import SinglePost from "./components/SinglePost/SinglePost";
import Whatsapp from "./components/Whatsapp/Whatsapp";
import PopUp from "./components/PopUp/PopUp";
import Domain from "./pages/Domain/Domain";
import Checkout from "./pages/Checkout/Checkout";
import Cart from "./pages/Cart/Cart";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import { updatePopupStatus } from "./Redux/Popup/popup-action";

function App({
  updatePagesData,
  translation,
  updateTranslation,
  popupStatus,
  updatePopupStatus,
  updateColors,
  colors,
  font,
  updateFont,
}) {
  const [popModelShow, setPopModelShow] = useState(false);
  const [popUpDatails, setPopUpDatails] = useState({});
  const [rtlSetup, setRtlSetup] = useState({ dir: "ltr" });

  useEffect(() => {
    if (!translation) {
      fetch(
        "https://geolocation-db.com/json/09068b10-55fe-11eb-8939-299a0c3ab5e5"
      )
        .then((res) => res.json())
        .then((data) => {
          if (data["country_name"] === "Israel") {
            updateTranslation("Hebrew");
          } else {
            updateTranslation("English");
          }
        });
    }
  }, []);

  useEffect(() => {
    const dataFetching = () =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/pages`)
        .then((res) => res.json())
        .then((data) => {
          updatePagesData(data);
        });
    dataFetching();

    return () => {
      dataFetching();
    };
  });

  useEffect(() => {
    if (!colors) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/colors`)
        .then((res) => res.json())
        .then((data) => updateColors(data));
    }
  }, []);

  useEffect(() => {
    if (!font) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/font`)
        .then((res) => res.json())
        .then((data) => updateFont(data));
    }
  }, []);

  useEffect(() => {
    if (translation === "Hebrew") {
      setRtlSetup({ dir: "rtl" });
    } else {
      setRtlSetup({ dir: "ltr" });
    }
  }, [translation]);

  useEffect(() => {
    if (!popupStatus) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/popup`)
        .then((res) => res.json())
        .then((data) => {
          setPopUpDatails(data);
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(popUpDatails).length && !popupStatus) {
      setTimeout(() => {
        setPopModelShow(true);
        updatePopupStatus();
      }, popUpDatails.Interval * 1000);
    }
  }, [popUpDatails]);

  const onClose = () => {
    setPopModelShow(false);
  };

  const GlobalStyles = createGlobalStyle`
  @import url('${font?.Font_Family_Link}');
  body {
    font-family: '${font?.Font_Family_Name}', sans-serif;
  }
  h1, h2, h3, h4, h5, h6{
    font-family: '${font?.Font_Family_Name}', sans-serif;
}
.button-text-1,
.button-text-2,
.button-text-3{
  font-family: '${font?.Font_Family_Name}', sans-serif;

}

.header .header-menu .nav .nav-item .nav-link{
  font-family: '${font?.Font_Family_Name}', sans-serif;

}

.product-info-box .nav .nav-item .nav-link{
  font-family: '${font?.Font_Family_Name}', sans-serif;

}

.font-family-primary {
  font-family: '${font?.Font_Family_Name}', sans-serif;
  
}

.font-family-secondary, .font-family-playfair {
  font-family: '${font?.Font_Family_Name}', sans-serif;
  
}

.font-family-tertiary {
  font-family: '${font?.Font_Family_Name}', sans-serif;
}



`;

  const GlobalStylesHebrew = createGlobalStyle`
@import url('${font?.Hebrew_Font_Family_Link}');
body {
  font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;
}
h1, h2, h3, h4, h5, h6{
  font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;
}
.button-text-1,
.button-text-2,
.button-text-3{
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;

}

.header .header-menu .nav .nav-item .nav-link{
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;

}

.product-info-box .nav .nav-item .nav-link{
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;

}

.font-family-primary {
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;

}

.font-family-secondary, .font-family-playfair {
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;

}

.font-family-tertiary {
font-family: '${font?.Hebrew_Font_Family_Name}', sans-serif;
}
`;

  return (
    <div
      className={`hero ${translation === "Hebrew" ? "rtl-style" : ""}`}
      {...rtlSetup}
    >
      {
        translation === 'Hebrew' ?
        <GlobalStylesHebrew /> : <GlobalStyles />
      }
      {translation && colors && font ? (
        <Switch>
          <Route path="/" exact component={Custom} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/blog/:slug" component={SinglePost} />
          <Route path="/domain" exact component={Domain} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/:id" component={Custom} />
        </Switch>
      ) : (
        <Spinner />
      )}

      {popModelShow ? <PopUp item={popUpDatails} onClose={onClose} /> : null}
      <Whatsapp />
    </div>
  );
}

const mapStateToProps = ({ pages, popup }) => ({
  translation: pages.translation,
  colors: pages.colors,
  font: pages.font,
  popupStatus: popup.popupStatus,
});

const mapDispatchToProps = (dispatch) => ({
  updatePagesData: (data) => dispatch(updatePagesData(data)),
  updateTranslation: (language) => dispatch(updateTranslation(language)),
  updatePopupStatus: () => dispatch(updatePopupStatus()),
  updateColors: (colors) => dispatch(updateColors(colors)),
  updateFont: (fonts) => dispatch(updateFont(fonts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
