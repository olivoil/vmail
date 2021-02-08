<script setup lang="ts">
import { computed, ref } from "vue";
import useSwrv from "swrv";
import { format, isBefore } from "date-fns";
import useSwrvState from "@/logics/use-swrv-state";
// import useEmailSelection from "@/logics/use-email-selection";
import type { Email } from "~/types";

// const emailSelection = useEmailSelection();

const { data: emails, error, isValidating } = useSwrv<Email[]>(
	() => `${import.meta.env.VITE_APP_API_BASE_URL}/emails`,
	async (key) => {
		const res = await fetch(key);
		const data = await res.json();

		return data.map((d: any) => ({
			...d,
			sentAt: new Date(d.sentAt),
		}));
	}
);

const { state, STATES } = useSwrvState(emails, error, isValidating);

const selectedScreen = ref<"inbox" | "archive">("inbox");

const sortedEmails = computed<Email[]>(() => {
	if (!emails.value) return [] as Email[];

	return emails.value.sort((e1: Email, e2: Email) => {
		return isBefore(e1.sentAt, e2.sentAt) ? 1 : -1;
	});
});

const filteredEmails = computed<Email[]>(() => {
	if (selectedScreen.value === "archive") {
		return sortedEmails.value.filter((e) => e.archived);
	}

	return sortedEmails.value.filter((e) => !e.archived);
});

const name = (from: string) => from.split("<");
</script>

<template>
	<div v-if="[STATES.PENDING].includes(state)" class="w-full">Loading...</div>
	<div
		v-if="
			[STATES.SUCCESS, STATES.VALIDATING, STATES.STALE_IF_ERROR].includes(state)
		"
		class="w-full"
	>
		<ul class="divide-y divide-gray-200">
			<li v-for="email in filteredEmails" :key="email.id">
				<div class="flex items-center px-4 py-4 sm:px-6">
					<div class="flex items-center flex-1 min-w-0">
						<div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
							<div>
								<p class="text-sm font-medium text-indigo-600 truncate">
									{{ email.from.value[0].name }}
								</p>
								<p class="flex items-center mt-2 text-sm text-gray-500">
									<carbon-email
										class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									/>
									<span class="truncate">{{
										email.from.value[0].address
									}}</span>
								</p>
							</div>
							<div class="hidden md:block">
								<div>
									<p class="text-sm text-gray-900">
										Sent at
										<time :datetime="format(email.sentAt, 'yyyy-MM-dd')">{{
											format(email.sentAt, "MMM do yyyy")
										}}</time>
									</p>
									<p class="flex items-center mt-2 text-sm text-gray-500">
										{{ email.subject }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						<carbon-chevron-right class="w-5 h-5 text-gray-400" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
