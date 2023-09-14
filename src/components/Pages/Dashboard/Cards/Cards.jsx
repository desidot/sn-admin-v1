import React from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

const Cards = ({
  className,
  value,
  title,
  backgroundColor,
  icon: Icon,
  color,
  iconColor,
  link,
}) => {
  const navigate = useNavigate();
  const handleGoToLink = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <div
        className="card-component flex-fill"
        style={{ cursor: link && "pointer" }}
        onClick={() => handleGoToLink()}
      >
        <div
          className="card-component-inner"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="card-details">
              <p style={{ color: color }}>{title}</p>

              <h3 style={{ color: color }}>{value}</h3>
            </div>
            <div
              className={`card-icon ${className}`}
              style={{ color: iconColor }}
            >
              <Icon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
