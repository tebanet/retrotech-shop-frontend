export function validate(schema, objectToValidate) {
	const result = schema.validate(objectToValidate, {
		abortEarly: false,
	});

	const errors = {};

	if (result.error) {
		result.error.details.forEach((err) => {
			const inputName = err.context.key;
			const message = err.message;
			errors[inputName] = message;
		});
		return [false, errors];
	}

	return [true, {}];
}
