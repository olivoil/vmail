<script setup lang="ts">
import { useHead } from "@vueuse/head";

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be renedered correctly in the html results with vite-ssg
useHead({
	title: "Vitesse",
	meta: [{ name: "description", content: "Opinionated Vite Starter Template" }],
});
</script>

<template>
	<main class="fixed inset-0 w-screen h-screen overflow-hidden">
		<router-view />
	</main>
</template>
