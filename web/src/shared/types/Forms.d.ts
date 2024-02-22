export type LoginFormValuesType = {
  email: string;
  password: string;
};

export type RegisterFormValuesType = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string | null;
};

export type PreparedRegisterFormValuesType = Omit<RegisterFormValuesType, "confirmPassword">;

export type AddUpdateFileFormType = {
  files: Array<File>;
}

