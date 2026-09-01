import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Tooltip from "@mui/material/Tooltip";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to top" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={handleClick}
          aria-label="scroll back to top"
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 30 },
            right: { xs: 20, sm: 30 },
            zIndex: 1000,
            boxShadow: "0 8px 24px 0 rgba(56, 189, 248, 0.4)",
            "&:hover": {
              transform: "translateY(-3px)",
            },
            transition: "transform 0.2s ease",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTop;
