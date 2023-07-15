import { hotelStore } from '$src/stores/hotel';
import { toast } from '@zerodevx/svelte-toast';
import { showInfoToast } from './notification';

export const connectToHotelStream = () => {
	const sse = new EventSource('/hotel');
	sse.onmessage = (msg) => {
		try {
			const data = JSON.parse(msg.data);
			switch (data.eventType) {
				case 'create':
					hotelStore.add(data.hotel);
					showInfoToast(`Hotel <strong>${data.hotel.name}</strong> created.`);
					break;
				case 'update':
					hotelStore.updateOne(data.hotel);
					showInfoToast(`Hotel <strong>${data.hotel.name}</strong> updated.`);
					break;
				case 'delete':
					hotelStore.remove(data.hotel.name);
					showInfoToast(`Hotel <strong>${data.hotel.name}</strong> deleted.`);
					break;
			}
		} catch (error) {
			console.error(error);
		}
	};
};
