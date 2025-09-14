import React from "react";
import { useSelector } from "react-redux";
import { Employment, Tag } from "@/assets/types";
import { RootState } from "@/store/rootReducer";
import IconCaretUp from "../../assets/icons/i-caret-up";
import { PortableText } from "@portabletext/react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Resume = () => {
  const app = useSelector((state: RootState) => state.app);

  return (
    <div id="resume" className="section-container">
      <div className="container-md">
        <div className="row">
          <div className="col-12 col-md-8">
            <div id="resume">
              <h2 className="section-title">
                <IconCaretUp /> Resume
              </h2>
              <h3>Where I&apos;ve Worked</h3>
              <p className="text-muted mb-4">
                A list of my current and former jobs in the tech industry with descriptions.
              </p>
              <div id="employers" className="mt-4 mt-md-0">
                {!app.employments ? (
                  <></>
                ) : (
                  app.employments.map((employment: Employment) => {
                    const startDate = new Date(employment.startDate);
                    const startDateString =
                      months[startDate.getMonth()] +
                      " " +
                      startDate.getFullYear();
                    let endDateString;

                    if (employment.endDate !== null) {
                      const endDate = new Date(employment.endDate);
                      endDateString =
                        months[endDate.getMonth()] +
                        " " +
                        endDate.getFullYear();
                    } else {
                      endDateString = "Present";
                    }

                    return (
                      <article className="employer" key={employment._id}>
                        <h4>
                          <span className="job-title">
                            {employment.jobTitle}
                          </span>{" "}
                          -{" "}
                          <span className="employer">
                            {employment.employer}
                          </span>
                        </h4>
                        <p className="job-timespan">
                          <time>
                            {startDateString} - {endDateString}
                          </time>
                        </p>
                        <div className="job-description">
                          <PortableText value={employment.jobDescription} />
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-xs-4 mt-md-0">
            <h4 className="section-title">
              <IconCaretUp /> What I&apos;ve Worked With
            </h4>
            <p className="text-gray mb-4">
              Below I&apos;ll list of some of the frameworks, tools,
              applications, platforms, concepts, notable designs, libraries and
              languages I&apos;ve worked with over the years.
            </p>
            {!app.tags ? (
              <></>
            ) : (
              <ul className="tags">
                {app.tags.map((tag: Tag) => (
                  <li className="tag" key={tag._id}>
                    {tag.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
