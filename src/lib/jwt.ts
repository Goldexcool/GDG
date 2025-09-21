import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets are required');
}

export interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

// Generate access token (15 minutes)
export function generateAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(
    payload as jwt.JwtPayload,
    JWT_SECRET as jwt.Secret,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    } as jwt.SignOptions
  );
}

// Generate refresh token (7 days)
export function generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(
    payload as jwt.JwtPayload,
    JWT_REFRESH_SECRET as jwt.Secret,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    } as jwt.SignOptions
  );
}

// Verify access token
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

// Get token from cookies (for server-side)
export async function getTokenFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value || null;
  } catch (error) {
    console.error('Error getting token from cookies:', error);
    return null;
  }
}

// Get refresh token from cookies (for server-side)
export async function getRefreshTokenFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('refreshToken')?.value || null;
  } catch (error) {
    console.error('Error getting refresh token from cookies:', error);
    return null;
  }
}

// Verify current user from token
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  
  return verifyAccessToken(token);
}

// Token expiration times in milliseconds
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 days
};
