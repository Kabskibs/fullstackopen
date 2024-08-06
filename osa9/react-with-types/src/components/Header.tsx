import { Headers } from "../types";

const Header = (props: Headers) => {
  return <h1>{props.name}</h1>;
};

export default Header;