"use client";

import Image from "next/image";

export default function Logo() {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <Image
        src="/logo.png"
        alt="Logo"
        width={70}
        height={70}
        priority
        style={{
          width: "70px",
          height: "70px",
          objectFit: "contain"
        }}
      />

    </div>

  );

}