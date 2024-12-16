// SpinnerTest.tsx
import React from "react";
import Spinner from "react-bootstrap/Spinner";

type SpinnerAnimation = "border" | "grow";

interface SpinnerTestProps {
  animation?: SpinnerAnimation; // Opcioni prop
  size?: "sm"; // Opcioni prop za veličinu
}

const SpinnerTest: React.FC<SpinnerTestProps> = ({
  animation = "border",
  size,
}) => {
  return (
    <Spinner animation={animation} role="status" size={size}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default SpinnerTest;
