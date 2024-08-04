const calculateBmi = (height: number, weight: number) => {
  const heightToM: number = height / 100;
  const bmi: number = weight / (heightToM * heightToM);
  if (bmi < 18.5) {
    console.log("Underweight (unhealthy weight)");
  } else if (bmi > 18.5 && bmi < 24.9) {
    console.log("Normal (healthy weight)");
  } else if (bmi > 24.9) {
    console.log("Overweight (unhealthy weight)");
  }
}

calculateBmi(180, 74);
