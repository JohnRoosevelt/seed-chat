<script>
  import Avatar from "$lib/avatar.svelte";

	const { data } = $props();
	let { user } = data;
</script>

<article h-full bg-gray-100 space-y-4>
	<a href="#/" w-full bg-white flex flex-col px-6 pt-16 pb-6>
		<div flex class="justify-between items-center" space-x-4>
			<Avatar {user} size=12 />
			<div flex flex-col flex-1>
				<div text-3xl>{user.name}</div>
				<div text-gray>ID: {user.id}</div>
			</div>
		</div>
	</a>

	<a href="#/" w-full flex-bc bg-white px-6 py-4>
		<div flex-cc space-x-4>
			<span i-carbon-connect-target rotate-90 text-red600 text-2xl></span>
			<div>下载安装</div>
		</div>
		<div i-carbon-chevron-right text-2xl text-gray font-bold></div>
	</a>

	<div w-full flex-col space-y-1px>
		<a href="#/" w-full flex-bc bg-white px-6 py-4>
			<div flex-cc space-x-4>
				<span i-carbon-phone text-blue600 text-2xl></span>
				<div>反馈建议</div>
			</div>
			<div i-carbon-chevron-right text-2xl text-gray font-bold ></div>
		</a>
		<a href="/public/about" w-full flex-bc bg-white px-6 py-4>
			<div flex-cc space-x-4>
				<span i-carbon-bee-bat text-green600 text-2xl></span>
				<div>免责声明</div>
			</div>
			<div i-carbon-chevron-right text-2xl text-gray font-bold ></div>
		</a>
		<a href="#/" w-full flex-bc bg-white px-6 py-4>
			<div flex-cc space-x-4>
				<span i-carbon-car text-orange300 text-2xl ></span>
				<div>传送门</div>
			</div>
			<div i-carbon-chevron-right text-2xl text-gray font-bold></div>
		</a>
	</div>

	<!-- <div w-full flex-col space-y-1px>
		<a href="#/" w-full flex-bc bg-white px-6 py-4>
			<div flex-cc space-x-4>
				<span i-carbon-phone text-blue600 text-2xl></span>
				<div>反馈建议</div>
			</div>
			<div i-carbon-chevron-right text-2xl text-gray font-bold ></div>
		</a>
	</div> -->

	<!-- <form method="POST" action="/logout" w-full flex-cc bg-white px-6 py-4>
		<button disabled text-primary>切换账号</button>
	</form> -->

	<form method="POST" action="/logout" w-full flex-cc bg-white px-6 py-4>
		<button text-primary>退出</button>
	</form>
</article>
