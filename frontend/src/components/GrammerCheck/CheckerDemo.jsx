import React, { useState } from "react";
import Styles from "./checkerDemo.module.css";
import nouns from "./database/nouns";
import firstPersonVerbs from "./database/firstPersonVerbs";
import secondPersonVerbs from "./database/secondPersonVerbs";
import spokenVerbs from "./database/spokenVerbs";
import singlishToUnicode from "./singlishToUnicode";

function CheckerDemo() {
  const [singlishText, setSinglishText] = useState(""); // Singlish text
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Singlish conversion
  const handleSinglishInputChange = (event) => {
    const newValue = event.target.value;
    const newConvertedText = singlishToUnicode(newValue);

    setSinglishText(newConvertedText);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGrammarCheck = () => {
    if (!inputText.trim()) {
      // Don't proceed if there's no input text
      alert("Please enter a input text!");
      setOutputText("");
      return;
    }

    const sentences = inputText.split(/[.?,]/);
    let correctedParagraph = "";

    sentences.forEach((sentence, index, array) => {
      const words = sentence.trim().split(" ");
      const nounWords = [];
      const verbWords = [];

      words.forEach((word) => {
        // Check if the word is in nouns.js and add it to nounWords
        if (
          nouns.find(
            (noun) => noun.form.singular === word || noun.form.plural === word
          )
        ) {
          nounWords.push(word);
        }

        // Check if the word is in spokenVerbs.js and add it to verbWords
        if (
          spokenVerbs.find(
            (verb) => verb.nonPast === word || verb.past === word
          )
        ) {
          verbWords.push(word);
        }
      });

      // Initialize with the original sentence
      let correctedSentence = sentence;

      if (nounWords.length > 0 && verbWords.length > 0) {
        const mostRecentNoun = nounWords[nounWords.length - 1];
        const mostRecentVerb = verbWords[verbWords.length - 1];

        if (words.indexOf(mostRecentNoun) < words.indexOf(mostRecentVerb)) {
          const nounRecord = nouns.find(
            (noun) =>
              noun.form.singular === mostRecentNoun ||
              noun.form.plural === mostRecentNoun
          );
          const verbRecord = spokenVerbs.find(
            (verb) =>
              verb.nonPast === mostRecentVerb || verb.past === mostRecentVerb
          );

          if (nounRecord && verbRecord) {
            const { perspective, form } = nounRecord;
            const nounPerspective = perspective;
            const nounForm =
              form.singular === mostRecentNoun ? "singular" : "plural";

            const verbBase = verbRecord.base;

            const tense =
              verbRecord.nonPast === mostRecentVerb ? "nonPast" : "past";

            let newVerb = "";
            if (nounPerspective === "firstPerson") {
              const verbTable = firstPersonVerbs.find(
                (verb) => verb.base === verbBase
              );
              if (tense === "nonPast") {
                newVerb = verbTable.nonPast[nounForm];
              } else if (tense === "past") {
                newVerb = verbTable.past[nounForm];
              }
            } else if (nounPerspective === "secondPerson") {
              const verbTable = secondPersonVerbs.find(
                (verb) => verb.base === verbBase
              );
              if (tense === "nonPast") {
                newVerb = verbTable.nonPast[nounForm];
              } else if (tense === "past") {
                newVerb = verbTable.past[nounForm];
              }
            }

            // Replace the verbWord with the corrected verb form
            correctedSentence = sentence.replace(mostRecentVerb, newVerb);

            // Replace "ද" with "?" in the last sentence
            if (correctedSentence.endsWith("ද")) {
              correctedParagraph += correctedSentence + "?";
            }
          }
        }
      }
      if (!correctedSentence.endsWith("ද")) {
        correctedParagraph +=
          index === array.length - 1
            ? correctedSentence
            : correctedSentence + ".";
      }
    });

    setOutputText(correctedParagraph);
  };

  return (
    <div className={Styles.gcContainer}>
      <br />
      <br />
      <div className={Styles.sinInputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Singlish වලින් ලියන්න..."
          onChange={handleSinglishInputChange}
        />
      </div>
      <div className={Styles.inputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter Sinhala paragraph here..."
          value={singlishText}
          onChange={handleInputChange}
        />
      </div>
      <button className={Styles.checkBtn} onClick={handleGrammarCheck}>
        Check Grammar
      </button>
      <div className={Styles.outputBox}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Corrected Paragraph"
          value={outputText}
        />
      </div>
    </div>
  );
}

export default CheckerDemo;
