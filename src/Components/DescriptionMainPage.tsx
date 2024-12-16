import React from "react";
import { Link } from "react-router-dom";
type Item = {
  id: number;
  title: string;
  description: string[];
};

function DescriptionMainPage({
  items,
  activeCard,
}: {
  activeCard: number;
  items: Item[];
}) {
  return (
    <div className="flex justify-center mt-4">
      <div className=" bg-opacity-100 backdrop-blur-3xl  rounded-lg shadow-md p-4 mt-4 w-1/3 text-black z-10">
        <h3 className="text-3xl font-bold">Izaberite željenu stavku:</h3>
        <ul className="mt-2">
          {items
            .find((item) => item.id === activeCard)
            ?.description.map((desc, index) => {
              const splitDesc = desc.split(" ").join("").toLocaleLowerCase();

              return (
                <li key={index} className="mt-3 font-bold text-2xl">
                  {index + 1}.{" "}
                  <Link
                    to={`/${splitDesc}`}
                    key={splitDesc}
                    className=" text-black hover:text-white"
                    style={{ textDecoration: "none" }}
                  >
                    {desc}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default DescriptionMainPage;
