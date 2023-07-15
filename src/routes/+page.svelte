<script>
// @ts-nocheck
	export let data;
	
	var places = ['All', ...new Set(data.users.map(user => user.Place))];
	var bloodGroups = ['All', ...new Set(data.users.map(user => user.BloodGroup))];
	
	/**
	 * @type {import('./+page.server.js').User[]}
	 */
	var users = [];
	
	/**
	 * @param {string} phoneNumber
	 */
	function handlePhoneCall(phoneNumber) {
		phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
		window.open(`tel:${phoneNumber}`);
	}
	
	/**
	 * @param {string} phoneNumber
	 */
	function handleWhatsappMessage(phoneNumber) {
		phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
		window.open(`https://wa.me/${phoneNumber}`);
	}
	
	
	let currentPlace = 'All';
	let currentBloodGroup = 'All';
	
	/**
	 * @param {string} place
	 */
	function handlePlaceChange(place) {
		currentPlace = place;
	}
	
	/**
	 * @param {string} bloodGroup
	 */
	function handleBloodGroupChange(bloodGroup) {
		currentBloodGroup = bloodGroup;
	}
	
	
	// Filter users based on currentPlace and currentBloodGroup
	$: {
		users = data.users.filter(user => {
			if (currentPlace === 'Place') currentPlace = 'All';	
			if (currentBloodGroup === 'Group') currentBloodGroup = 'All';

			if (currentPlace === 'All' && currentBloodGroup === 'All') return true;
			if (currentPlace === 'All' && currentBloodGroup !== 'All') return user.BloodGroup === currentBloodGroup;
			if (currentPlace !== 'All' && currentBloodGroup === 'All') return user.Place === currentPlace;
			return user.Place === currentPlace && user.BloodGroup === currentBloodGroup;
		});	
	}
	
</script>

<div class="container w-full mx-auto max-w-lg p-10 space-y-4 font-mono">
	<h1 class="text-3xl text-center">Blood Donation List</h1>

	<div>
		<div class="flex flex-row justify-evenly">
			<select class="select select-bordered" on:change={e => handlePlaceChange(e.target?.value ?? 'All')}>
				<option disabled selected>Place</option>
				{#each places as place}
					<option value={place}>{place}</option>
				{/each}
			</select>
			<select class="select select-bordered" on:change={e => handleBloodGroupChange(e.target?.value ?? 'All')}>
				<option disabled selected>Group</option>
				{#each bloodGroups as bloodGroup}
					<option value={bloodGroup}>{bloodGroup}</option>
				{/each}
			</select>
		</div>
	</div>

	{#each users as user}
		<div class="card bg-neutral p-4">
			<div class="flex flex-row">
				<div class="flex-auto">
					<div class="font-bold text-xl">{user.Name}</div>
					<div class="text-sm italic">{user.Unit} Unit</div>
					<div class="text-sm italic">{user.Place}</div>
				</div>
				<div class="bg-primary text-center m-auto rounded-full p-2">
					<div class="text-sm italic text-white">{user.BloodGroup}</div>
				</div>
			</div>
			<div class="divider" />

			<div class="flex flex-row justify-evenly">
				<button class="btn" on:click={() => handleWhatsappMessage(user.PhoneNumber)}>
					<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
						><style>
							svg {
								fill: #ffffff;
							}
						</style><path
							d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.5-222 222 0 39.1 10.2 77.3 29.5 111L0 480l117.7-30.9c32.4 17.7 58.9 27 105.1 27h.1c122.3 0 224.1-99.5 224.1-222 0-59.3-25.2-115-57.1-157zm-157 341.5c-33.2 0-55.7-8.9-94-25.7l-5.7-4-59.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-53.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.5 19.2 130.4 54.1 34.8 34.9 55.2 81.2 55.1 130.5 0 101.8-84.9 184.5-185.5 184.5zm101.2-138.2c-5.5-2.8-32.8-15.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.5 21.8-3.2 3.7-5.5 4.2-12 1.4-32.5-15.3-54-29.1-75.5-55-5.7-9.8 5.7-9.1 15.3-30.3 1.8-3.7.9-5.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-5.9-.2-10.5-.2-3.7 0-9.7 1.4-14.8 5.9-5.1 5.5-19.4 19-19.4 45.3 0 27.3 19.9 53.7 22.5 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 15.5 55.5 13.9 10.7-1.5 32.8-13.4 37.4-25.4 4.5-13 4.5-24.1 3.2-25.4-1.3-2.5-5-3.9-10.5-5.5z"
						/></svg
					>
					Message
				</button>
				<button class="btn" on:click={() => handlePhoneCall(user.PhoneNumber)}>
					<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
						><style>
							svg {
								fill: #ffffff;
							}
						</style><path
							d="M154.9 24.5c-7.7-18.5-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 45 0 54C0 311.4 200.5 512 448 512c18 0 33.8-12.1 38.5-29.5l24-88c5.3-19.4-4.5-39.7-23.2-47.4l-95-40c-15.3-5.8-35.2-2.1-45.3 11.5L304.7 358C234.3 334.7 177.3 277.7 144 207.3L193.3 157c13.7-11.2 18.4-30 11.5-45.3l-40-95z"
						/></svg
					>
					Contact
				</button>
			</div>
		</div>
	{/each}
</div>
