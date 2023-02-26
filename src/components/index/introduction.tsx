import React, { useEffect, useState } from "react";

// App
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

// Types
import { Block } from "@/assets/types";
import { RootState } from "@/store/rootReducer";
import {
  CodeComponent,
  ImageComponent,
  LinkComponent,
  ParagraphComponent,
} from "../../assets/react-markdown-renderers";

const Introduction = () => {
  const [intro, setIntro] = useState<Block>(null);
  const [currentInterest, setCurrentInterest] = useState<Block>(null);

  const app = useSelector((state: RootState) => state.app);

  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setIntro(
        app.blocks.find(
          (block: Block) => block.attributes.Area === "introduction"
        )
      );
      setCurrentInterest(
        app.blocks.find(
          (block: Block) => block.attributes.Area === "current_interest"
        )
      );
    }
  }, [app.blocks]);

  return !intro || !currentInterest ? (
    <></>
  ) : (
    <div id="introduction" className="container-md">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 personal text-center mb-4">
          <img
            className="mb-4"
            src="/img/avatar.png"
            alt=""
            width="210"
            height="210"
          />
          <h2>Ossi Pesonen</h2>
          <p className="text-muted">Currently interested in, and learning:</p>
          <ul className="interest-list mt-4 mb-4">
            {currentInterest.attributes.Content.split(", ").map(
              (interest: string) => (
                <li key={interest}>{interest}</li>
              )
            )}
          </ul>
          <div className="row text-center">
            <div className="col-6">
              <h3 className="text-secondary">15+</h3>
              <p>Years of experience</p>
            </div>
            <div className="col-6">
              <h3 className="text-secondary">500+</h3>
              <p>Worked projects</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 introduction-content">
          <ReactMarkdown
            transformImageUri={(uri) => process.env.NEXT_PUBLIC_API_URL + uri}
            className="text-center text-md-left"
          >
            {intro.attributes.Content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
