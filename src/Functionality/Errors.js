// The exception type for "Index" view
export class IndexViewException {
	constructor(message, exception_type)
	{
		this.message = message;
		this.name = exception_type;
	}
	// Make the exception convert to a pretty string when used as a string
	// (e.g., by the error console)
	toString()
	{
		return `${this.name}: "${this.message}"`;
	}
}

// The exception type for "Info" view
export class InfoViewException {
	constructor(message, exception_type)
	{
		this.message = message;
		this.name = exception_type;
	}
	// Make the exception convert to a pretty string when used as a string
	// (e.g., by the error console)
	toString()
	{
		return `${this.name}: "${this.message}"`;
	}
}

// Function modifies the "SetError" function and automatically sets "show_error" state back to ""  after a specified period of time
export function NewError (error, SetError, SetErrorHeader, SetErrorTimeout, err_timeout)
{
	console.error(error)

	const error_message = error.message
	const error_header  = error.name
	const TTL = 5000
	clearInterval(err_timeout)  // resets any existing "show_error" state that hasn't already timed out to ""

	// changes error message to specified error
	SetError(error_message) // error message
	SetErrorHeader(error_header) // error heading

	SetErrorTimeout(
		// resets back to "" after specified time
		setTimeout(() => SetError(''), TTL)
	)
}
