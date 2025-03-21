import React from "react";
import { Check } from "lucide-react";

const About = () => {
  const about = [
    {
      id: 1,
      label: (
        <>
          Get matched with AI expert in
          <br />
          minutes.
        </>
      ),
    },
    {
      id: 2,
      label: (
        <>
          Dedicated 24/7 customer
          <br />
          service team for your queries.
        </>
      ),
    },
    {
      id: 3,
      label: (
        <>
          Enjoy a simple, easy-to-use
          <br />
          matching experience.
        </>
      ),
    },
    {
      id: 4,
      label: (
        <>
          Get quality work done quickly
          <br />
          and within budget.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col  justify-center items-center ">
      <div className=" -mt-6  text-white  py-8 rounded-lg ">
        <div className="space-y-6">
          <div className="text-start">
            <h1 className="text-3xl proxima-bold mb-4">
              What & Why <span className="text-blue-500">Quid AI</span>
            </h1>
            <p className="text-lg leading-relaxed">
              We offer a platform with top AI
              <br />
              Experts. Work with the best talent
              <br />
              worldwide on our secure, flexible,
              <br />
              and seamless platform.
            </p>
          </div>

          <div className="space-y-4  md:text-base lg:text-lg xl:text-xl">
            {about.map((item) => (
              <div key={item.id} className="flex items-start text-start gap-6">
                <Check
                  size={28}
                  strokeWidth={4}
                  className="text-orange-400 flex-shrink-0 mt-1"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
