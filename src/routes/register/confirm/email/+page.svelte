<script>
import { confirmRegisterEmail } from '$lib';
  // /register/confirm/email?token=1a1ecdba2cb0805a6b7c14e19609629e9f38c5cec5f62fdbb8fa492e9afc995c020dac96f98caf418a569518525e58d73fc8acbe602f6ccaa725c5bd7f439fb0&tokenId=66f11c9e6f36d570da93f8c2
  let token = $state()
  let tokenId = $state()
  let loading = $state(true)
  $effect(async () => {
    const params = new URLSearchParams(window.location.search);
    token = params.get("token");
    tokenId = params.get("tokenId");
    if (!token || !tokenId) {
      throw new Error(
        "You can only call resetPassword() if the user followed a confirmation email link",
      );
    }
    const rz = await confirmRegisterEmail({ token, tokenId });
    console.log({rz})
    loading = false
  });
</script>

<div w-screen h-screen flex-cc>
  {#if loading}
    <span>loading</span>
  {/if}
</div>
