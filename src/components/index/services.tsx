import React, { useEffect, useState } from "react";

// App
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

// Types
import IconCaretUp from "../../assets/icons/i-caret-up";
import IconBrowser from "../../assets/icons/i-browser";
import IconLaptopCode from "../../assets/icons/i-laptop-code";
import { Block } from "@/assets/types";
import { RootState } from "@/store/rootReducer";
import IconMobile from "@/assets/icons/i-moblie";
import IconConsulting from "@/assets/icons/i-consulting";

const Services = () => {
  const [blockDescription, setBlockDescription] = useState<Block>(null);

  const app = useSelector((state: RootState) => state.app);

  // Grab blocks
  useEffect(() => {
    if (app.blocks) {
      setBlockDescription(
        app.blocks.find((block: Block) => block.attributes.Area === "services")
      );
    }
  }, [app.blocks]);

  const serviceList: Record<string, React.ReactElement> = {
    "Software Development": <IconLaptopCode />,
    "UI/UX Design": <IconBrowser />,
    "Mobile development": <IconMobile />,
  };

  return !blockDescription ? (
    <></>
  ) : (
    <div id="services" className="section-container">
      <div className="container-md">
        <h2 className="section-title">
          <IconCaretUp /> Services
        </h2>
        <h3>What I Do</h3>
        <ReactMarkdown className="text-gray">
          {blockDescription.attributes.Content}
        </ReactMarkdown>
        <div id="service-boxes">
          <div className="row">
            {Object.keys(serviceList).map((serviceTitle: string) => (
              <div className="col-sm-6" key={serviceTitle}>
                <div className="inner">
                  {serviceList[serviceTitle]}
                  <h4>{serviceTitle}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
