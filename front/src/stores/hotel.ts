import type { Hotel } from '$src/lib/stubs/hotel/v1beta/hotel';
import { writable } from 'svelte/store';
import { toJson, type IHotel } from '../lib/helper/hotelDto';

const xor = (cond: boolean, asc: boolean) => {
	if ((cond && !asc) || (!cond && asc)) {
		return true;
	} else {
		return false;
	}
};

const createHotelStore = () => {
	const hotelStore = writable<IHotel[]>([]);

	return {
		...hotelStore,
		sortByDate: (asc = true) =>
			hotelStore.update((ts) =>
				ts.sort((a, b) =>
					xor(a.fields[0].value < b.fields[0].value, asc) ? 1 : -1
				)
			),
		sortByName: (asc = true) =>
			hotelStore.update((ts) =>
				ts.sort((a, b) =>
					xor(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase(), asc) ? 1 : -1
				)
			),
		remove: (hotelName: string) => {
			hotelStore.update((ts) => ts.filter(({ name }) => name !== hotelName));
		},
		add: (hotel: Hotel) => {
			hotelStore.update((ts) => [toJson(hotel), ...ts]);
		},
		updateOne: (hotel: Hotel) => {
			hotelStore.update((ts) => {
				const hotelIndex = ts.findIndex(({ name }) => name === hotel.name);

				if (hotelIndex === -1) return ts;

				ts.splice(hotelIndex, 1, toJson(hotel));

				return ts;
			});
		}
	};
};

export const hotelStore = createHotelStore();
export const relativeDate = writable(true);
export const searchTerm = writable('');
