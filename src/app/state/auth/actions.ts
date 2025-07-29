const prefix = '[auth]';

export class CredentialSignIn {
  static type = `${prefix} credential sign in`;

  constructor(readonly email: string, readonly password: string) {
  }
}

export class CompleteGithubSignIn {
  static type = `${prefix} complete-github-sign-in`;

  constructor(readonly jwt: string) {
  }
}

export class SignedIn {
  static type = `${prefix} signed-in`;
}

export class SignedOut {
  static type = `${prefix} signed-out`;
}
