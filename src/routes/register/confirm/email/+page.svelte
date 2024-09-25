<script>
  import {  goto  } from "$app/navigation";
  import { confirmRegisterEmail } from "$lib";
  // /register/confirm/email?token=1a1ecdba2cb0805a6b7c14e19609629e9f38c5cec5f62fdbb8fa492e9afc995c020dac96f98caf418a569518525e58d73fc8acbe602f6ccaa725c5bd7f439fb0&tokenId=66f11c9e6f36d570da93f8c2
  let token = $state();
  let tokenId = $state();
  let loading = $state(true);
  let isSuccess = $state(false);
  let errorInfo = $state();
  $effect(async () => {
    const params = new URLSearchParams(window.location.search);
    token = params.get("token");
    tokenId = params.get("tokenId");
    if (!token || !tokenId) {
      throw new Error(
        "You can only call resetPassword() if the user followed a confirmation email link",
      );
    }
    const { statusCode, errorCode, error } = await confirmRegisterEmail({
      token,
      tokenId,
    });
    console.log({ statusCode, errorCode, error });
    isSuccess = statusCode === 200;
    errorInfo = `${errorCode}, ${error}! 5秒后自动返回注册界面`;
    if (errorInfo) {
      setTimeout(() => {
        goto('/register')
      }, 5000);
    }
    loading = false;
  });
</script>

<div w-screen h-screen flex-cc>
  {#if loading}
    <span>loading</span>
  {:else if isSuccess}
    <a href="/login" text-sm text-primary-600> 邮箱确认成功，去登录 </a>
  {:else}
    <a href="/register" text-3 text-red-600 p-5>{errorInfo}</a>
  {/if}
</div>
