import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component {
    render() {
        let currentYear = new Date().getFullYear();
        return (
            <React.Fragment>
                <footer className="footer-section pt-100 pb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="footer-area">
                                    <div className="footer-heading">
                                        <h3>About Us</h3>
                                    </div>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra</p>

                                    <ul className="footer-social">
                                        <li>
                                            <Link href="#">
                                                <a className="bg-3955bc">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a className="bg-1da1f2">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a className="bg-004dff">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a className="bg-0273af">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="footer-item-area">
                                    <div className="footer-heading">
                                        <h3>Important Links</h3>
                                    </div>

                                    <ul className="footer-quick-links">
                                        <li>
                                            <Link href="#">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Project</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Services</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Team</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Contact</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>    
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="footer-item-area">
                                    <div className="footer-heading">
                                        <h3>Featured Service</h3>
                                    </div>

                                    <ul className="footer-quick-links">
                                        <li>
                                            <Link href="#">
                                                <a>Lorem</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Lorem</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Lorem</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Lorem</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>Lorem</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>    
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="mb-30">
                                    <div className="footer-heading">
                                        <h3>Contact</h3>
                                    </div>

                                    <div className="footer-info-contact">
                                        <i className="flaticon-call-answer"></i>
                                        <h3>Phone</h3>
                                        <span>(123) 456-7890</span>
                                    </div>

                                    <div className="footer-info-contact">
                                        <i className="flaticon-envelope"></i>
                                        <h3>Email</h3>
                                        <span>hello@eaxmple.com</span>
                                    </div>

                                    <div className="footer-info-contact">
                                        <i className="flaticon-placeholder-filled-point"></i>
                                        <h3>Address</h3>
                                        <span>123 street name, city, country</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shape Images */}
                    <div className="default-animation">
                        <div className="shape-img1">
                            <img src={require("../../images/shape/12.svg")} alt="image" />
                        </div>
                        <div className="shape-img2">
                            <img src={require("../../images/shape/13.svg")} alt="image" />
                        </div>
                        <div className="shape-img3">
                            <img src={require("../../images/shape/14.png")} alt="image" />
                        </div>
                        <div className="shape-img4">
                            <img src={require("../../images/shape/15.png")} alt="image" />
                        </div>
                        <div className="shape-img5">
                            <img src={require("../../images/shape/2.png")} alt="image" />
                        </div>
                    </div> 
                </footer>

                {/* Copyright footer */}
                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <p>
                                    © {currentYear}. All Rights Reserved by
                                </p>
                            </div>

                            <div className="col-lg-6">
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <a>Terms & Conditions</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Footer;