<script setup lang="ts">
	const errorStore = useErrorsStore()

	onErrorCaptured((error) => {
		errorStore.setError({ error })
	})

	onMounted(async () => {
		useAuthStore().trackAuthChanges()
	})
</script>

<template>
	<AuthLayout>
		<AppErrorPage v-if="errorStore.activeError" />
		<RouterView v-slot="{ Component, route }">
			<Suspense v-if="Component" :timeout="0">
				<Component :is="Component" :key="route.name"></Component>
				<template #fallback>
					<span> Loading... </span>
				</template>
			</Suspense>
		</RouterView>
	</AuthLayout>
</template>
