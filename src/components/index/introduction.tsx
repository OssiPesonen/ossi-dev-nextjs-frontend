import React, { useEffect, useState } from "react";

// App
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

// Types
import { Block } from "@/assets/types";
import { RootState } from "@/store/rootReducer";

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
    <div id="introduction">
      <div className="container-sm">
        <div className="row align-items-center">
          <div className="col-12 introduction-content text-center mb-8">
            <ReactMarkdown className="text-center text-md-left">
              {intro.attributes.Content}
            </ReactMarkdown>
          </div>
          <div className="col-12 personal text-center mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default Introduction;
