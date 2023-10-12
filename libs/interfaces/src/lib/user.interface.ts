export enum UserRole {
  Teacher = 'teacher',
  Student = 'student',
}

export enum PurchaseState {
  Started = 'started',
  WaitingForPayment = 'waitingForPayment',
  Purchased = 'purchased',
  Canceled = 'canceled',
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
}

export interface IUserCourses {
  _id?: string;
  courseId: string;
  purchaseState: PurchaseState;
}
