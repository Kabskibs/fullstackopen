export interface Headers {
  name: string;
}

export interface CoursesPart {
  name: string;
  exerciseCount: number;
}

export interface Courses {
  parts: CoursesPart[];
}

export interface Totals {
  total: number;
}