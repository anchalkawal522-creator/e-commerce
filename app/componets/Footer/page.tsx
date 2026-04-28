"use client";
import { FcGoogle } from "react-icons/fc";
import { FaCcStripe } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { CiGift } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";



import { footerData } from "../../data/footer";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
            <div className="flogo">
          <div className="logo-box">
  <img src="/images/logo.svg" alt="" />
</div>
          <p>{footerData.brand.description}</p>

          <h4>Accepted Payments</h4>
          <div className="payments">
          <FcGoogle /><FaCcStripe /><FaCcVisa /><FaAmazon /><FaCcAmazonPay /><FaInstagramSquare /><FaFacebook />
            </div>
          </div>
    

          <FooterColumn title="Department" data={footerData.departments} />
          <FooterColumn title="About Us" data={footerData.about} />
          <FooterColumn title="Services" data={footerData.services} />
          <FooterColumn title="Help" data={footerData.help} />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p><FaMessage />Become Seller</p>
        <p><CiGift />Gift Cards</p>
        <p><IoIosHelpCircleOutline />Help Center</p>
        <p>Terms of Service</p>
        <p>Privacy & Policy</p>
        <p>© 2025 Shopcart</p>
      </div>
    </footer>
  );
}

/* Reusable Column */
function FooterColumn({ title, data }: any) {
  return (
    <div className="footer-col">
      <h3>{title}</h3>
      {data.map((item: string, index: number) => (
        <p key={item + index}>{item}</p>
      ))}
    </div>
  );
}