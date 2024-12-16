import React from "react";
import { CardProps } from "../../Interface";

function Card({ title, className, onClick }: CardProps) {
  return (
    <div className={className} onClick={onClick}>
      <h2 className="text-2xl font-bold text-center ">{title}</h2>
    </div>
  );
}

export default Card;
