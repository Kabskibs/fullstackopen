interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
