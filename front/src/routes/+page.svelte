<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { searchTerm, hotelStore } from '$stores/hotel';
	import type { IHotel } from '$lib/helper/hotelDto';
	import Hotel from '$lib/component/hotel/Hotel.svelte';
	import FuzzySearch from 'fuzzy-search';
	import modal from '$stores/modal';
	import NewHotel from '$lib/component/hotel/NewHotel.svelte';
	import { connectToHotelStream } from '$lib/service/hotel';
	import { connectToUsageStream } from '$lib/service/usage';

	export let data: PageData;

	onMount(() => {
		if (browser) {
			hotelStore.set(data.hotels);

			connectToHotelStream();
			connectToUsageStream();
		}
	});

	let hotels: IHotel[];
	$: searcher = new FuzzySearch($hotelStore, ['name', 'fields.name'], {
		caseSensitive: false
	});
	$: if ($searchTerm) {
		hotels = searcher.search($searchTerm);
	} else {
		hotels = $hotelStore;
	}

	const handleCreateHotel = () => modal.open(NewHotel as any);
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex w-full flex-wrap items-center justify-center p-4 overflow-x-auto">
	{#each hotels as hotel (hotel.name)}
		<Hotel {hotel} />
	{:else}
		<div class="card w-96 h-36 bg-base-100 shadow-x">
			<div class="card-body items-center text-center">
				<h2 class="card-title">No Hotel.</h2>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={handleCreateHotel}>Create Hotel</button>
				</div>
			</div>
		</div>
	{/each}
</div>
