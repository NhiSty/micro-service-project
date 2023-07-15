<script lang="ts">
	import { enhance } from '$app/forms';
	import { sendUsage } from '$src/lib/service/usage';
	import { EventType, Field } from '$src/lib/stubs/hotel/v1beta/hotel';
	import modal from '$src/stores/modal';
	import { relativeDate } from '$src/stores/hotel';
	import Time from 'svelte-time';
	import type { IHotel } from '../../helper/hotelDto';
	import NewField from './NewField.svelte';
	import RemoveField from './RemoveField.svelte';

	export let hotel: IHotel;

	const handleNewField = () => {
		sendUsage(EventType.UPDATE, hotel.name);
		modal.open(NewField as any, { hotel });
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card w-full h-[calc(100vh-8rem)] lg:min-h-[50rem] lg:w-96 bg-base-100 shadow-xl mx-2 my-1"
	on:click|capture={() => sendUsage(EventType.CLICK, hotel.name)}
>
	<div class="card-body justify-between h-full">
		<h2 class="card-title justify-between">
			<span class="text-3xl underline underline-offset-8">
				{hotel.name}
			</span>
			<div class="badge badge-secondary">
				<Time format="H:mm · D MMM YY" timestamp={hotel.dueDate} relative={$relativeDate} />
			</div>
		</h2>

		<div class="stats stats-vertical shadow pb-2 text-xl overflow-y-auto h-full">
			{#each hotel.fields as { name, value } (name)}
				<div class="flex justify-between items-center pr-2">
					<div class="stat">
						<div class="stat-desc">{name}</div>
						<div class="stat-title">{value}</div>
					</div>
					<RemoveField {hotel} fieldToRemove={name} />
				</div>
			{:else}
				<div class="stat">
					<div class="stat-title">No field</div>
				</div>
			{/each}
			<button class="btn btn-primary w-fit place-self-center text-sm" on:click={handleNewField}
				>New Field</button
			>
		</div>

		<div class="card-actions justify-end">
			<form action="/hotel?/deleteHotel" method="POST" use:enhance>
				<input value={hotel.name} name="name" hidden />
				<button class="btn btn-warning text-base" on:click={() => sendUsage(EventType.DELETE, hotel.name)}
					>Remove</button
				>
			</form>
		</div>
	</div>
</div>
