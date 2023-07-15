<script lang="ts">
	import { enhance } from '$app/forms';
	import type { IHotel } from '../../helper/hotelDto';

	export let hotel: IHotel;
	export let fieldToRemove = '';
</script>

<form
	method="post"
	action="/hotel?/removeHotel"
	use:enhance={({ data }) => {
		data.append('hotelName', hotel.name);
		data.append('fieldName', fieldToRemove);
	}}
>
	<button class="btn btn-xs btn-circle btn-warning">-</button>
</form>
