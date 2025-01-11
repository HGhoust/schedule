<template>
	<div class="wr w-full absolute z-50 top-0 h-screen" :class="themeStore.theme">
		<aside class="aside flex flex-col absolute right-0 h-screen w-96 py-5 px-5">
			<button class="btn size-7" @click="quitAside()">
				<svg
					class="size-6"
					:class="themeStore.theme"
					fill="#000000"
					viewBox="-102.4 -102.4 1228.80 1228.80"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#000000"
					stroke-width="0.01024"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"
						></path>
					</g>
				</svg>
			</button>
			<div class="ml-5 pt-5 flex-1">
				<button
					class="flex gap-2 items-center w-full h-8 cursor-pointer"
					@click="viewMenuToggle()"
				>
					<span class="size-7">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								<path
									:class="themeStore.theme"
									d="M4 6H20M4 12H20M4 18H20"
									stroke="#000000"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</g>
						</svg>
					</span>
					<span class="text-base">Тема</span>
				</button>
				<ul
					class="list pt-3 ml-5 flex flex-col gap-3"
					:class="{ open: viewMenu }"
				>
					<li>
						<button
							@click="themeStore.selectDarkTheme()"
							class="size-7 flex items-center gap-2 border-b-2 pb-6 pt-4 px-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="40"
								height="40"
								viewBox="0 0 50 50"
								style="background: none"
								:class="themeStore.theme"
							>
								<path
									d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.888672 9.890625 A 1.0001 1.0001 0 0 0 10.193359 11.607422 L 14.392578 15.806641 A 1.0001 1.0001 0 1 0 15.806641 14.392578 L 11.607422 10.193359 A 1.0001 1.0001 0 0 0 10.888672 9.890625 z M 39.080078 9.890625 A 1.0001 1.0001 0 0 0 38.392578 10.193359 L 34.193359 14.392578 A 1.0001 1.0001 0 1 0 35.607422 15.806641 L 39.806641 11.607422 A 1.0001 1.0001 0 0 0 39.080078 9.890625 z M 25 15 A 1.0001 1.0001 0 0 0 24.591797 15.082031 C 19.260044 15.307579 15 19.611572 15 25 C 15 30.533333 19.466667 35 25 35 C 30.533333 35 35 30.533333 35 25 C 35 19.612238 30.740979 15.308576 25.410156 15.082031 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.466667 17 33 20.533333 33 25 C 33 29.466667 29.466667 33 25 33 C 20.533333 33 17 29.466667 17 25 C 17 20.533333 20.533333 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.080078 33.890625 A 1.0001 1.0001 0 0 0 14.392578 34.193359 L 10.193359 38.392578 A 1.0001 1.0001 0 1 0 11.607422 39.806641 L 15.806641 35.607422 A 1.0001 1.0001 0 0 0 15.080078 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.193359 35.607422 L 38.392578 39.806641 A 1.0001 1.0001 0 1 0 39.806641 38.392578 L 35.607422 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"
								></path>
							</svg>
							<span>Темная тема</span>
						</button>
					</li>
					<li>
						<button
							@click="themeStore.selectLightTheme()"
							class="size-7 flex items-center gap-2 border-b-2 pb-6 pt-3 px-2"
						>
							<svg
								width="40"
								height="40"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.4335 13.9335C20.1286 13.9773 19.817 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 7.18303 13.0227 6.87136 13.0665 6.56653C9.91893 7.0192 7.5 9.72711 7.5 13C7.5 16.5898 10.4101 19.5 14 19.5C17.2729 19.5 19.9808 17.0811 20.4335 13.9335Z"
									:class="themeStore.theme"
								/>
							</svg>
							<span>Светлая тема</span>
						</button>
					</li>
				</ul>
			</div>

			<button
				class="btn w-full h-8 flex gap-2 items-center"
				@click="userSignOut()"
			>
				<svg
					class="size-7"
					:class="themeStore.theme"
					viewBox="0 0 24 24"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					fill="#000000"
					transform="rotate(180)"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<title>entrance_line</title>
						<g
							id="页面-1"
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
						>
							<g
								id="System"
								transform="translate(-672.000000, -96.000000)"
								fill-rule="nonzero"
							>
								<g
									id="entrance_line"
									transform="translate(672.000000, 96.000000)"
								>
									<path
										d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
										id="MingCute"
										fill-rule="nonzero"
									></path>
									<path
										:class="themeStore.theme"
										d="M12,3 C12.5523,3 13,3.44772 13,4 C13,4.51283143 12.613973,4.93550653 12.1166239,4.9932722 L12,5 L7,5 C6.48716857,5 6.06449347,5.38604429 6.0067278,5.88337975 L6,6 L6,18 C6,18.51285 6.38604429,18.9355092 6.88337975,18.9932725 L7,19 L11.5,19 C12.0523,19 12.5,19.4477 12.5,20 C12.5,20.51285 12.113973,20.9355092 11.6166239,20.9932725 L11.5,21 L7,21 C5.40232321,21 4.09633941,19.7511226 4.00509271,18.1762773 L4,18 L4,6 C4,4.40232321 5.24892392,3.09633941 6.82372764,3.00509271 L7,3 L12,3 Z M17.707,8.46447 L20.5355,11.2929 C20.926,11.6834 20.926,12.3166 20.5355,12.7071 L17.707,15.5355 C17.3165,15.9261 16.6834,15.9261 16.2928,15.5355 C15.9023,15.145 15.9023,14.5118 16.2928,14.1213 L17.4142,13 L12,13 C11.4477,13 11,12.5523 11,12 C11,11.4477 11.4477,11 12,11 L17.4142,11 L16.2928,9.87868 C15.9023,9.48816 15.9023,8.85499 16.2928,8.46447 C16.6834,8.07394 17.3165,8.07394 17.707,8.46447 Z"
										id="形状"
										fill="#000000"
									></path>
								</g>
							</g>
						</g>
					</g>
				</svg>
				<span class="text-base">Выйти из аккаунта</span>
			</button>
		</aside>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'
import { getAuth, signOut } from 'firebase/auth'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const themeStore = useThemeStore()
const viewMenu = ref<boolean>(false)
const aside = ref(inject('aside'))

const viewMenuToggle = (): boolean => (viewMenu.value = !viewMenu.value)
const quitAside = (): boolean => (aside.value = false)
const userSignOut = async (): Promise<void> => {
	await signOut(getAuth())
	router.push('/Auth')
}
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.wr
	background-color: rgba(231,230,230,0.7)

.light
	stroke: variables.$textDarkBlue

.light
	.aside
		background-color: variables.$bgWhite

.dark
	stroke: variables.$bgWhite
	fill: variables.$bgWhite

.dark
	.aside
		background-color: variables.$bgDarkBlue

button
	width: fit-content

.list
	max-height: 0
	overflow: hidden
	transition: max-height 0.3s ease, opacity 0.3s ease
	opacity: 0

	&.open
		max-height: fit-content
		opacity: 1
</style>
