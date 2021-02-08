import { ref, Ref, watchEffect } from "vue";

enum STATES {
	IDLE = "IDLE",
	VALIDATING = "VALIDATING",
	PENDING = "PENDING",
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	STALE_IF_ERROR = "STALE_IF_ERROR",
}

export function useSwrvState<Data>(data: Ref<Data | undefined>, error: Ref<Error | undefined>, isValidating: Ref<boolean>) {
	const state = ref(STATES.IDLE);

	watchEffect(() => {
		if (data.value && isValidating.value) {
			state.value = STATES.VALIDATING;
			return;
		}
		if (data.value && error.value) {
			state.value = STATES.STALE_IF_ERROR;
			return;
		}
		if (data.value === undefined && !error.value) {
			state.value = STATES.PENDING;
			return;
		}
		if (data.value && !error.value) {
			state.value = STATES.SUCCESS;
			return;
		}
		if (data.value === undefined && error) {
			state.value = STATES.ERROR;
			return;
		}
	});

	return {
		state,
		STATES,
	};
}

export default useSwrvState;