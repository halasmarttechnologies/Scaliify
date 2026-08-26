import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200) {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(payload);
}

export function sendError(res: Response, error: string, statusCode = 400, errors?: Record<string, string[]>) {
  const payload: ApiResponse = {
    success: false,
    error,
    errors,
  };
  return res.status(statusCode).json(payload);
}
