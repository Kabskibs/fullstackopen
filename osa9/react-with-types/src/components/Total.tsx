import { Totals } from "../types";

const Total = (props: Totals) => {
  return <p>Number of exercises {props.total}</p>
}

export default Total;