import React, { Fragment, useEffect, useState } from "react";
import { useUserContext } from "../Context/user";
import { useNavigate } from "react-router-dom";
import { items } from "../../helper";
import { verifyToken } from "../../ApiCalls";
import Card from "./Card";
import DescriptionMainPage from "./DescriptionMainPage";

function MainPage() {
  const { user } = useUserContext();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAndRedirect = async () => {
      const token = localStorage.getItem("Token/TruckTrackingSystem");
      const tok = await verifyToken(token!);
      if (!tok) {
        navigate("/login");
      } else {
        setLoading(false);
        navigate("/");
      }
    };

    verifyAndRedirect();
  }, [navigate]);

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  if (loading) {
    return;
  }

  return (
    <Fragment>
      <div className="flex justify-around items-center pt-20">
        {items.map((item) => (
          <div className="flex items-center mb-8" key={item.id}>
            <Card
              title={item.title}
              className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer min-h-[80px] min-w-[120px] border border-transparent ${
                activeCard === item.id
                  ? "bg-transparent text-white backdrop-blur-md border-white shadow-lg"
                  : "bg-white text-black"
              }`}
              isActive={activeCard === item.id}
              onClick={() => handleCardClick(item.id)}
            />
          </div>
        ))}
      </div>

      {activeCard !== null && (
        <DescriptionMainPage items={items} activeCard={activeCard} />
      )}
    </Fragment>
  );
}

export default MainPage;
