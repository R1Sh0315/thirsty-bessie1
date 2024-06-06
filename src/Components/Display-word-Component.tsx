import React, { useEffect, useState } from "react";

const DisplayWordsComponent: React.FC<{ words: string[] }> = ({ words }) => {

  const [toDisplay, setDisplay] = useState<string>("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let displayInterval: NodeJS.Timeout;

    const displayWord = () => {
      if (charIndex <= words[wordIndex].length) {
        console.log(words[wordIndex].slice(0, charIndex));
        setDisplay(words[wordIndex].slice(0, charIndex));
        charIndex++;
      } else {
        console.log('removing init')
        clearInterval(displayInterval);
        setTimeout(removeWord, 1000);
        // displayInterval = setInterval(removeWord, 1000);

      }
    };

    const removeWord = () => {
      if (charIndex >= 0) {
        console.log(words[wordIndex].slice(0, charIndex))
        setDisplay(words[wordIndex].slice(0, charIndex));
        charIndex--;
      } else {
        // Move to the next word
        console.log('move to next word')
        wordIndex = (wordIndex + 1) % words.length;
        // Reset charIndex to the beginning of the next word
        charIndex = 0;
        // Start displaying the next word
        displayInterval = setInterval(displayWord, 1000);
      }
    };

    // Start displaying the first word
    displayInterval = setInterval(displayWord, 1000);

    // Cleanup function
    return () => clearInterval(displayInterval);
  }, []);

  return (
    <div className="display-container">
      {toDisplay}
    </div>
  );
};

export default DisplayWordsComponent;
