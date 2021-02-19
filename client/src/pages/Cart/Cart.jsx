import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Cart.css";
import CartBox from "./CartBox/CartBox";
import { useHistory } from "react-router-dom";
import { addCartItem, updateHostingItem } from "../../Redux/Cart/cart-action";
import FormattedText from "../../hooks/FormattedText";

const Cart = ({
  hostingPack,
  translation,
  updateHostingPack,
  cartItems,
  addCartItem,
}) => {
  const [billingBox, setBillingBox] = useState("");
  const [dedicatedIp, setDedicatedIp] = useState(false);
  const [description, setDescription] = useState("");
  const [SSL, setSSL] = useState("FREE");
  const [hostingExtra, setHostingExtra] = useState({});

  const onBillingCycleChange = (value) => {
    setBillingBox(value);
  };

  let history = useHistory();

  const handleCart = () => {
    if (Object.keys(hostingPack).length) {
      if (hostingPack.SSL === "PAID") {
        const item = {
          id: 53,
          Package_Name_English: "SSL - GlobalSign & Wildcard",
          Price: hostingExtra.SSL_Premium_Price,
        };

        addCartItem(item);
      }
      if (hostingPack.DedicatedIp) {
        const item = {
          id: 55,
          Package_Name_English: "Dedicated IP address",
          Price: hostingExtra.Dedicated_IP_Price,
        };

        addCartItem(item);
      }
    }
    history.push("/checkout");
  };

  useEffect(() => {
    if (billingBox) {
      if (billingBox === 0) {
        updateHostingPack({ id: "Billing_Year", value: 3 });
      } else if (billingBox === 1) {
        updateHostingPack({ id: "Billing_Year", value: 2 });
      } else if (billingBox === 2) {
        updateHostingPack({ id: "Billing_Year", value: 1 });
      }
      updateHostingPack({ id: "SSL", value: SSL });
    updateHostingPack({ id: "DedicatedIp", value: dedicatedIp });
    } 
    
  }, [billingBox, SSL, dedicatedIp]);

  const replaceLineBreak = (search, current) => {
    const substring = new RegExp(search, "gi");
    const result = current.replace(substring, `<br />`);
    return result;
  };

  useEffect(() => {
    const searchTerm = "\n";
    console.log("hostingPack: ", hostingPack);
    if (Object.keys(hostingPack).length) {
      setDescription(
        parse(
          replaceLineBreak(searchTerm, hostingPack[`Features_${translation}`])
        )
      );
    }
  }, [hostingPack, translation]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/web-hosting`)
      .then((res) => res.json())
      .then((data) => setHostingExtra(data));
  }, []);

  return (
    <>
      <Header blackBack={true} />
      <div className="container cart-page">
        {cartItems.length ? (
          <>
            {" "}
            <h1>{translation === 'Hebrew' ? 'הגדר את חבילת אירוח האתרים' : 'Configure Web Hosting Package'}</h1>
            <div className="row">
              <div className="col-md-8 col-lg-8 billing-years">
                <h3>{translation === 'Hebrew' ? 'בחר מחזור חיוב' : 'Choose Billing Cycle'}</h3>
                <div className="row billing-cycle">
                  <CartBox
                    price={cartItems[0].Three_Year_Package_Price}
                    year={3}
                    value={0}
                    billingChange={onBillingCycleChange}
                    billingBox={billingBox}
                  />
                  <CartBox
                    price={cartItems[0].Two_Year_Package_Price}
                    year={2}
                    value={1}
                    billingChange={onBillingCycleChange}
                    billingBox={billingBox}
                  />
                  <CartBox
                    price={cartItems[0].Price}
                    year={1}
                    value={2}
                    billingChange={onBillingCycleChange}
                    billingBox={billingBox}
                  />
                </div>
              </div>
              {hostingPack ? (
                <div className="col-md-3 col-lg-3 offset-md-1 offset-lg-1 hosting-pack">
                  <h3 className="text-center">
                    <FormattedText objectName={hostingPack} extension="Package_Name" />
                  </h3>
                  <ul>{description}</ul>
                  <button onClick={handleCart}>{ translation === 'Hebrew' ? 'לְהַמשִׁיך' : 'Continue'}</button>
                </div>
              ) : null}
            </div>
            <div className="row">
              <div className="col-md-8 col-lg-8 configure-package">
                {Object.keys(hostingExtra).length ? (
                  <>
                    {" "}
                    <h3>{ translation === 'Hebrew' ? 'הגדר את החבילה' : 'Configure Package'}</h3>
                    <div className="configure-box">
                      <p className="ip-para">
                      { translation === 'Hebrew' ? 'האם ברצונך להוסיף כתובת IP ייעודית?' : 'Would you like to add a Dedicated IP address?'}
                      </p>
                      <div
                        className={`dedicated-ip ${
                          dedicatedIp ? "active" : ""
                        }`}
                        onClick={() => setDedicatedIp(!dedicatedIp)}
                      >
                        <h2>
                          <div
                            className={`check-box ${
                              dedicatedIp ? "active" : ""
                            }`}
                          >
                            {dedicatedIp ? (
                              <i
                                className="fas fa-check"
                                style={{ color: "#fff" }}
                              ></i>
                            ) : null}
                          </div>
                          YES!
                        </h2>
                        <p>
                        { translation === 'Hebrew' ? 'מומלץ למשלוח דוא"ל הטוב ביותר' : 'Recommended for best Email Delivery'} $
                          {hostingExtra.Dedicated_IP_Price} USD
                        </p>
                      </div>
                      <p className="ssl-para">
                      { translation === 'Hebrew' ? 'תצורת אישורי SSL (https)' : 'SSL Certificates Configuration (https)'}
                      </p>
                      <div className="ssl-select">
                        <div className="row">
                          <div className="col-md-6">
                            <div
                              className={`ssl-box ${
                                SSL === "FREE" ? "active" : ""
                              }`}
                              onClick={() => setSSL("FREE")}
                            >
                              <h2>
                                <div
                                  className={`radio-box ${
                                    SSL === "FREE" ? "active" : ""
                                  }`}
                                ></div>
                                { translation === 'Hebrew' ? 'בואו להצפין SSL אוטומטי - לכל הדומיינים / תת-דומיינים - בחינם!' : 'Let\'s Encrypt Auto SSL - For All Domains/Sub-Domains - FREE!'}
                                
                              </h2>
                              <p className="align-items-end">$0.00 USD</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              className={`ssl-box ${
                                SSL === "PAID" ? "active" : ""
                              }`}
                              onClick={() => setSSL("PAID")}
                            >
                              <h2>
                                <div
                                  className={`radio-box ${
                                    SSL === "PAID" ? "active" : ""
                                  }`}
                                ></div>
                                { translation === 'Hebrew' ? 'בואו להצפין SSL אוטומטי + GlobalSign Wildcard SSL (הטוב ביותר לאתרי מסחר אלקטרוני / עסקי)' : 'Let\'s Encrypt Auto SSL + GlobalSign Wildcard SSL (Best For eCommerce/Business Websites)'}
                                
                              </h2>
                              <p>${hostingExtra.SSL_Premium_Price} USD</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </>
                ) : null}
              </div>
            </div>{" "}
          </>
        ) : (
          <h1 className="text-center" style={{marginBottom: '600px'}}>
            { translation === 'Hebrew' ? 'העגלה שלך ריקה.' : 'Your Cart is Empty.'}
            </h1>
        )}
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ cart, pages }) => ({
  cartItems: cart.cart,
  hostingPack: cart.hostingPack,
  translation: pages.translation,
});

const mapDisPatchToProps = (dispatch) => ({
  updateHostingPack: (item) => dispatch(updateHostingItem(item)),
  addCartItem: (item) => dispatch(addCartItem(item)),
});

export default connect(mapStateToProps, mapDisPatchToProps)(Cart);
