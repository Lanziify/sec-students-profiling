import React from "react";
import LoginForm from "../components/LoginForm";
import juna from "../assets/juna.jpg";
import jenny from "../assets/jenny.jpg";
import { MdEmail, MdFacebook, MdPhone } from "react-icons/md";

const Hero = () => {
  const developers = [
    {
      imgsrc: juna,
      name: "Juna B. Otakan",
      email: "Junaotakan090799@gmail.com",
      phone: "09811544587",
      facebookId: "facebook.com/Junaotakan07",
      facebook: "https://www.facebook.com/Junaotakan07",
    },
    {
      imgsrc: jenny,
      name: "Jenny Rose P. Mercader",
      email: "jenny08@gmail.com",
      phone: "09514548419",
      facebookId: "facebook.com/blackroya.j.mercader",
      facebook: "https://www.facebook.com/blackroya.j.mercader",
    },
  ];
  return (
    <div>
      <div id="home" className="flex h-screen">
        <LoginForm />
      </div>
      <div
        id="about"
        className="flex h-screen items-center justify-center bg-gray-900"
      >
        <div className="max-w-7xl p-4 text-white">
          <div className="text-4xl font-bold">About Us</div>
          <p>
            We are a team of web developers who specialize in creating websites
            for schools. Our focus is on designing user-friendly platforms that
            help schools manage student information. We aim to provide schools
            with effective online solutions that enhance communication and
            efficiency in administrative tasks.
          </p>
        </div>
      </div>
      <div id="contact" className="flex h-screen items-center justify-center">
        <div className="grid max-w-7xl grid-cols-2 gap-4 p-4">
          <div className="col-span-full text-center text-4xl font-bold">
            Contact Us
          </div>
          {developers.map((dev, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border rounded-lg p-4 max-sm:col-span-full"
            >
              <div className="flex items-center gap-4 rounded-md">
                <img
                  src={dev.imgsrc}
                  alt="developer"
                  placeholder="blur"
                  className="aspect-square max-w-[6rem] rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold">{dev.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <MdEmail size={16} />
                    {dev.email}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MdFacebook size={16} />
                    {dev.facebookId}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <MdPhone size={16} />
                    {dev.phone}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-white"
              >
                <a href={dev.facebook} target="_blank">
                  Follow
                </a>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
