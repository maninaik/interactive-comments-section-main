export default function timeSince(dateISO) {
	const now = new Date().getTime();

	const difference = now - new Date(dateISO).getTime();
	console.log(difference);
	let timeSince = '';
	let seconds = (difference / 1000).toFixed(0);
	let minutes = (difference / (1000 * 60)).toFixed(0);
	let hours = (difference / (1000 * 60 * 60)).toFixed(0);
	let days = (difference / (1000 * 60 * 60 * 24)).toFixed(0);
	let weeks = (difference / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
	let months = (difference / (1000 * 60 * 60 * 24 * 30)).toFixed(0);
	let years = (difference / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(0);

	if (seconds < 60) {
		timeSince = `${seconds} seconds ago`;
	} else if (minutes < 60) {
		timeSince = `${minutes} minutes ago`;
	} else if (hours < 24) {
		timeSince = `${hours} hours ago`;
	} else if (days < 7) {
		timeSince = `${days} days ago`;
	} else if (weeks < 4) {
		timeSince = `${weeks} weeks ago`;
	} else if (months < 12) {
		timeSince = `${months} months ago`;
	} else {
		timeSince = `${years} years ago`;
	}
	return timeSince;
}
