import { redirect, fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { registerEmailPassword } from '$lib';

export const ssr = false
// Define outside the load function so the adapter can be cached
const schema = z.object({
	email: z.string().email(),
  password: z.string().min(7, '密码不能少于7位').max(12),
  confirm: z.string().min(7, '密码不能少于7位').max(12),
})
.refine((data) => data.password == data.confirm, {
  message: "密码不一致",
  path: ["confirm"]
});

export const load = (async () => {
  const form = await superValidate(zod(schema));
  return { form };
});

export const actions = {
	async login ({ cookies, url, request }) {
		const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

		message(form, 'Form posted successfully!');
    const {email, password} = form.data
    const {statusCode, errorCode, error} = await registerEmailPassword(email, password)
    console.log({email, password, statusCode, errorCode, error})

    return message(form, {statusCode, text: statusCode === 200 ? '确认邮件已经发送成功！关闭此页面后，在邮箱中点击确认链接进行下一步。': `${errorCode}: ${error}`}, { status: statusCode })

    // const user = btoa(JSON.stringify({name: 'test', id: '1000001'}));
		// cookies.set('jwt', user, { path: '/' });
		// throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	},
};
