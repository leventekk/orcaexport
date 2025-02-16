export function formatDate(date: Date) {
	const formatter = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	const parts = formatter.formatToParts(date);

	return ["year", "month", "day", "hour", "minute"].reduce((acc, type) => {
		const part = parts.find((part) => part.type === type);

		if (!part) {
			return acc;
		}

		return acc + part.value;
	}, "");
}

