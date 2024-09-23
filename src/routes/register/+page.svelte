<script>
	import { superForm } from "sveltekit-superforms";

	export let data;

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form);
	let showPassword = false;
	function toggleShowPassword() {
		showPassword = !showPassword;
	}
</script>

{#snippet passwordInput(col = 'password')}
<div>
	<label
		for={col}
		class="block text-sm font-medium leading-6 text-gray-900">{col==='password' ? '密码': '确认密码'}</label
	>
	<div class="relative mt-2 rounded-md shadow-sm">
		<input
			type={showPassword ? "text" : "password"}
			name={col}
			id={col}
			class={`block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${$errors[col] ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"}`}
			placeholder={col==='password' ? '请输入密码': '请确认密码'}
			aria-invalid={$errors[col] ? "true" : undefined}
			bind:value={$form[col]}
			{...$constraints[col]}
		/>

		<div
			class="pointer-events-none absolute z-9 inset-y-0 right-0 flex items-center gap-x-2 pr-3"
		>
			<button type="button" class="pointer-events-auto" onclick={toggleShowPassword}>
				<span
					class={showPassword
						? "i-carbon-view-filled"
						: "i-carbon-view-off-filled"}
					text-blue-500
					h-5
					w-5
				></span>
			</button>
			{#if $errors[col]}
				<span i-icons-sigh text-red-500 h-5 w-5></span>
			{/if}
		</div>
	</div>
	{#if $errors[col]}
		<p class="mt-2 text-sm text-red-500" id="password-error">
			{$errors[col]}
		</p>
	{/if}
</div>
{/snippet}

<article
	w-screen
	h-screen
	flex
	flex-col
	justify-center
	items-center
	class="bg-surface-50/15-900/15 bg-mesh-primary/40-x4-y0-success-400/20-x100-y95-error/40-x0-y100"
	bg-red
>
	<header flex items-center gap-x-2>
		<span i-icons-logo h-10 w-10 ></span>
		<span text-gradient-tertiary-warning-error>一棵树，栽在溪水旁</span>
	</header>
	
	<form
		method="POST"
		action="?/login"
		use:enhance
		mt-10
		flex
		flex-col
		gap-y-3
		w-xs
	>
		<div>
			<label
				for="email"
				class="block text-sm font-medium leading-6 text-gray-900">
				邮箱
			</label>

			<div class="relative mt-2 rounded-md shadow-sm">
				<input
					type="email"
					name="email"
					id="email"
					class={`block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${$errors.email ? "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" : "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"}`}
					placeholder="you@example.com"
					aria-invalid={$errors.email ? "true" : undefined}
					bind:value={$form.email}
					{...$constraints.email}
				/>

				{#if $errors.email}
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
					>
						<span i-icons-sigh text-red-500 h-5 w-5></span>
					</div>
				{/if}
			</div>

			{#if $errors.email}
				<p class="mt-2 text-sm text-red-500" id="email-error">
					{$errors.email}
				</p>
			{/if}
		</div>

		{@render passwordInput()}
		{@render passwordInput('confirm')}

		<button btn-primary>注册并登录</button>
	</form>

	<a mt-10 href="/login" text-sm text-primary-600>
		已有账号？去登录
	</a>
</article>
