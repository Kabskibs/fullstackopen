import { Courses } from "../types";

const Content = (props: Courses) => {
  return (
    <div>
      {props.parts.map((p) => (
        <div>{p.name} {p.exerciseCount}</div>
      ))}
    </div>
  );
};

export default Content;