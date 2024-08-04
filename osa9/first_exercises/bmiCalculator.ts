interface Values {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if (args.length > 4) throw new Error('Too many arguments!');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('You must provide values as numbers')
  }
}

const calculateBmi = (height: number, weight: number) => {
  const heightToM: number = height / 100;
  const bmi: number = weight / (heightToM * heightToM);
  if (bmi < 18.5) {
    console.log("Underweight");
  } else if (bmi > 18.5 && bmi < 24.9) {
    console.log("Normal (healthy weight)");
  } else if (bmi > 24.9) {
    console.log("Overweight");
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  calculateBmi(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage)
}

export {};
