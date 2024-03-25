export interface AuthDto {
  username: string
  password: string
  fingerprint?: string
}

export interface RefreshTokenDto {
  refreshToken: string
  fingerprint?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
