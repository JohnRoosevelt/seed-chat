import { redirect } from '@sveltejs/kit';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { loginEmailPassword } from '$lib';

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

function getRedirectTo(url) {
  return url.searchParams.get('redirectTo') ?? '/'
}

export async function load({ route, url, params }) {
  const form = await superValidate(zod(schema));
  return { form, redirectTo: getRedirectTo(url) };
}

export const actions = {
  async login({ cookies, url, request, params }) {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // message(form, 'Form posted successfully!');
    const { email, password } = form.data
    const { statusCode, errorCode, error, userId } = await loginEmailPassword(email, password)
    console.log({ form, statusCode, errorCode, error, userId })

    if (statusCode !== 200) {
      return message(form, { error, errorCode }, { status: statusCode });
      // return actionResult('failure', { form }, statusCode);
    }
    const user = btoa(JSON.stringify({ id: userId }));
    cookies.set('jwt', user, { path: '/' });
    throw redirect(303, getRedirectTo(url));
  },
};
