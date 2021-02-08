import { reactive } from "vue";
import { Email } from "~/types";

let emails = reactive<Set<Email>>(new Set());

export function useEmailSelection() {
	function toggle(email: Email) {
		if (emails.has(email)) {
			emails.delete(email);
		} else {
			emails.add(email);
		}
	}

	function clear() {
		emails.clear();
	}

	function addMultiple(newEmails: Email[]) {
		newEmails.forEach((email) => {
			emails.add(email);
		});
	}

	function forSelected(fn: (email: Email) => Promise<any>) {
		return [...emails].map((email) => {
			fn(email);

			return fetch(`http://localhost:3000/emails/${email.id}`, {
				method: "PUT",
				body: JSON.stringify(email),
			});
		});
	}

	function markRead() {
		return forSelected(async (e) => (e.read = true));
	}

	function markUnread() {
		forSelected(async (e) => (e.read = false));
	}

	function archive() {
		const done = forSelected(async (e) => (e.archived = true));
		clear();
		return done;
	}

	return {
		emails,
		toggle,
		clear,
		addMultiple,
		markRead,
		markUnread,
		archive,
	};
}

export default useEmailSelection;
