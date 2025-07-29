const prefix = '[auth]';

export class CompleteGithubSignIn {
  static type = `${prefix} complete-github-sign-in`;
  constructor(readonly jwt: string) { }
}

export class SignedIn {
  static type = `${prefix} signed-in`;
}
