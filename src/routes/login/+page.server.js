import { redirect, fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const ssr = false
// Define outside the load function so the adapter can be cached
const schema = z.object({
	email: z.string().email(),
  password: z.string().min(7, '密码不能少于7位').max(12),
	// password: z.string().min(8),
  // confirm: z.string().min(8)
})
// .refine((data) => data.password == data.confirm, {
//   message: "Passwords didn't match",
//   path: ["confirm"]
// });

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

    const user = btoa(JSON.stringify({name: 'test', id: '1000001'}));
		cookies.set('jwt', user, { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	},
};
