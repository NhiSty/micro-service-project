import { browser } from '$app/environment';
import { username } from '$src/stores/user';
import { get } from 'svelte/store';
import { EventType, type UsageResponse } from '../stubs/hotel/v1beta/hotel';
import { showInfoToast } from './notification';

export enum UsageEvent {
	hover = 'hover'
}

export const sendUsage = (eventType: EventType, hotelName: string) =>
	fetch('/hotel/usage', {
		method: 'post',
		body: JSON.stringify({
			username: get(username),
			hotelName,
			eventType
		})
	});

export const connectToUsageStream = () => {
	const sse = new EventSource('/hotel/usage');
	sse.onmessage = (msg) => {
		try {
			const data: UsageResponse = JSON.parse(msg.data);
			if (browser && data.username !== get(username)) {
				switch (data.eventType) {
					case EventType.CLICK:
						showInfoToast(`<strong>${data.username}</strong> is on the ${data.hotelName} hotel.`);
						break;
					case EventType.CREATE:
						showInfoToast(`<strong>${data.username}</strong> is creating a hotel.`);
						break;
					case EventType.UPDATE:
						showInfoToast(`<strong>${data.username}</strong> is updating the ${data.hotelName} hotel.`);
						break;
					case EventType.DELETE:
						showInfoToast(`<strong>${data.username}</strong> is deleting the ${data.hotelName} hotel.`);
						break;
				}
			}
		} catch (error) {
			console.error(error);
		}
	};
};
