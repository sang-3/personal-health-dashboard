export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthFieldErrors = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",.<>/?`~]).+$/;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;

export function validateEmail(email: string) {
  const value = email.trim();

  if (!value) {
    return "이메일을 입력해주세요.";
  }

  if (!EMAIL_REGEX.test(value)) {
    return "올바른 이메일 형식을 입력해주세요.";
  }

  return "";
}

export function validatePassword(password: string) {
  if (!password) {
    return "비밀번호를 입력해주세요.";
  }

  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하여야 합니다.`;
  }

  if (!PASSWORD_REGEX.test(password)) {
    return "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
  }

  return "";
}

export function validateName(name: string) {
  const value = name.trim();

  if (!value) {
    return "이름을 입력해주세요.";
  }

  if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
    return `이름은 ${NAME_MIN_LENGTH}자 이상 ${NAME_MAX_LENGTH}자 이하여야 합니다.`;
  }

  return "";
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
) {
  if (!confirmPassword) {
    return "비밀번호 확인을 입력해주세요.";
  }

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return "";
}

export function validateLoginForm(values: LoginFormValues): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  return errors;
}

export function validateSignupForm(values: SignupFormValues): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    values.password,
    values.confirmPassword,
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
}

export function hasAuthErrors(errors: AuthFieldErrors) {
  return Object.values(errors).some(Boolean);
}
