import React, { useEffect, useState } from "react";

// App
import { useSelector } from "react-redux";

// Types
import { Block } from "@/assets/types";
import { RootState } from "@/store/rootReducer";
import { PortableText } from "@portabletext/react";

const Introduction = () => {
  const [intro, setIntro] = useState<Block>(null);

  const app = useSelector((state: RootState) => state.app);

  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setIntro(
        app.blocks.find(
          (block: Block) => block.area === "introduction"
        )
      );
    }
  }, [app.blocks]);

  return !intro ? (
    <></>
  ) : (
    <div id="introduction">
      <div className="container-sm">
        <div className="row align-items-center">
          <div className="col-12 introduction-content mb-8">
            <PortableText value={intro.content} />
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
