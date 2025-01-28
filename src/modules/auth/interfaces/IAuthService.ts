export interface IAuthService {
  executeCreateLogin(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }>;

  executeRefreshToken(refresh_token: string): Promise<{
    access_token: string;
    refresh_token: string;
  }>;
}
