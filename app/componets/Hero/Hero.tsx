"use client";

import Image from "next/image";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      
      <div className="hero-left">
        <h1>
          Shopping And <br />
          Department Store.
        </h1>

        <p>
          Shopping is a bit of a relaxing hobby for me, which
          is sometimes troubling for the bank balance.
        </p>

        <button className="btn">Learn More</button>
      </div>


    </section>
  );
}