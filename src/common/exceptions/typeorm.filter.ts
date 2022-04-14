import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from "typeorm";
import { Request, Response } from "express";

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { url } = request;
    const { message } = exception;

    let status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;

    if (exception.constructor === EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    }

    const errorResponse = {
      status: status,
      code: exception.code,
      path: url,
      timestamp: new Date().toISOString(),
      message: message
    }

    response.status(status).json(errorResponse);
  }
}