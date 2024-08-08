interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ArgsValues {
  daysArray: number[],
  target: number
}

const parseArguments = (args: string[]): ArgsValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  const target: number = Number(args[2]);
  const daysArray: number[] = (args.map(Number)).slice(3);
  if (!isNaN(target) && !daysArray.includes(NaN)) {
    return {
      daysArray,
      target
    };
  } else {
    throw new Error('All values must be numbers');
  }
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const daysTotal: number = hours.length;
  const totalHours: number = hours.reduce((a, c) => a + c, 0);
  const trainingDays: number[] = hours.filter((a) => a > 0);
  const averageTime: number = totalHours / daysTotal;
  let success: boolean = false;
  if (averageTime > target) {
    success = true;
  }
  let rating: number = 1;
  if (averageTime >= 1 && averageTime <= 2) {
    rating = 2;
  } else if (averageTime > 2) {
    rating = 3;
  }
  let message: string = "";
  if (rating === 1) {
    message = "This didn't work out...";
  } else if (rating === 2) {
    message = "Almost there!";
  } else if (rating === 3) {
    message = "There we go!";
  }
  return {
    periodLength: Number(daysTotal),
    trainingDays: Number(trainingDays.length),
    success: Boolean(success),
    rating: Number(rating),
    ratingDescription: String(message),
    target: Number(target),
    average: Number(averageTime)
  };
};

try {
  const { daysArray, target } = parseArguments(process.argv);
  console.log(calculateExercises(daysArray, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened. ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { };
