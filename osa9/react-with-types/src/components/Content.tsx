import { CoursePart } from "../types";

import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((p) => (
        <div key={p.name}>
          <Part part={p} /><br></br>
        </div>
      ))}
    </div>
  );
};

export default Content;