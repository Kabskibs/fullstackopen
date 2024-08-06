import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discrimination union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b><br></br>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b><br></br>
          project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b><br></br>
          <i>{part.description}</i><br></br>
          {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b><br></br>
          <i>{part.description}</i><br></br>
          required skills: {part.requirements.join(', ')}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;