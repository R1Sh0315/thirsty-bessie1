import React, { useEffect, useRef, useState } from "react";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearchingOutlined";
import LabelShadowComponent from "./Label-Shadow";
import DisplayWordsComponent from "./Display-word-Component";
// import resume from '../utility/files/18JAN24.pdf'

import jsonData from "../Json/my.json";
import NoteComponent from "./Note-component";

interface IACard {
  isDark: boolean;
}

const AboutCardComponent: React.FC<IACard> = ({ isDark }) => {
  const [toDisplay, setDisplay] = useState("");
  const wordsRef = useRef(["Developer.", "Creater.", "Designer."]); // Ref to maintain array reference

  const words = ["Developer", "Creater", "Designer"];

  useEffect(() => {
    function wordList(wordArr: string[]): void {
      let idx = 0;

      function displayWord(): void {
        setDisplay(wordArr[idx]);
        idx = (idx + 1) % wordArr.length;
        setTimeout(displayWord, 5000);
      }

      displayWord();
    }

    wordList(wordsRef.current); // Access words array from ref
  }, []);

  const handleDownload = () => {
    const resumePath = `${process.env.PUBLIC_URL}/rishikesh-resume.pdf`;
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "rishiekshResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.open(resumePath, "_blank");
  };

  return (
    <div className="about-card-container">
      <div className="about-card-title">
        <LabelShadowComponent isDark={isDark} label={"About"} />
      </div>
      <div className={`about-me ${isDark ? "am-dark" : "am-light"}`}>
        I'm <span className="ac-name"> Rishikesh Bhalekar </span> a web &
        applications Developer
        {/* <DisplayWordsComponent words={words} /> */}
      </div>
      <div className="about-card-detail-container">
        <NoteComponent
          isDark={isDark}
          description="I'm a professional web designer, My motive is to build the best web
        design with all my years of experience and efforts."
        />
      </div>

      <div className="about-in-detail">
        <div className="row-1">
          <div className="person-degree">
            <SchoolIcon className="acc-icon" />
            <strong> Degree :</strong> B.E Mechanical
          </div>
          <div className="person-mail">
            <MailOutlineIcon className="acc-icon" />
            <strong>Email :</strong>rishikeshbhalekar6@gmail.com
          </div>
        </div>
        <div className="row-2">
          <div className="person-age">
            <PersonOutlineIcon className="acc-icon" />
            <strong> Age : </strong> 26
          </div>
          <div className="person-location">
            <LocationSearchingIcon className="acc-icon" />
            <strong> Location :</strong> Pune, India. 410506
          </div>
        </div>
      </div>

      <div onClick={handleDownload} className="download-resume">
        Download CV
      </div>
    </div>
  );
};

export default AboutCardComponent;
