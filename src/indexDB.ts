import { DB_NAME, STORE_NAME } from "./constants";

interface BaseProps {
	email: string;
	password: string;
}

export const openDB = () => {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: "email" });
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};

export const validateUser = async ({ email, password }: BaseProps) => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const getRequest = store.get(email);

		getRequest.onsuccess = () => {
			if (getRequest.result && getRequest.result.password === password) {
				resolve("Login successful");
			} else {
				reject("Invalid credentials");
			}
		};
		getRequest.onerror = () => reject(getRequest.error);
	});
};

export const addUser = async ({ email, password }: BaseProps) => {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		const getRequest = store.get(email);

		getRequest.onsuccess = () => {
			if (getRequest.result) {
				reject("Email already exists");
			} else {
				store.add({ email, password });

				resolve("User registered successfully");
			}
		};
		getRequest.onerror = () => reject(getRequest.error);
	});
};
