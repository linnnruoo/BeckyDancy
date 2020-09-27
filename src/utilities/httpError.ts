import { Response, Request, NextFunction } from 'express'

interface HTTPError {
  status: number
  message: string
}

class NotFoundError extends Error {
  public status: number = 404
  public message: string = 'Resource not found!'

  constructor(message: string) {
    super(message)
    this.message = message
  }
}

class ConflictError extends Error {
  public status: number = 409
  public message: string = 'Conflicting resources'

  constructor(message: string) {
    super(message)
    this.message = message
  }
}

const errorHandlingMiddleware = (
  err: HTTPError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { status, message } = err
  if (typeof status !== 'number') {
    status = 500
    message = 'Internal server error'
  }
  res.status(status).json({
    status,
    message,
  })
}

export { NotFoundError, ConflictError, errorHandlingMiddleware }
