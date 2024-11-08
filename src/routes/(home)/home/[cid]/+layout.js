export const ssr = false

export async function load({ parent, params: { cid } }) {
  const { c} = await parent()  
  const cItem = c.find(i => i.id == cid)
    return {
      cItem,
      articles: [
        {id: 1, name: '创始成终'}
      ]
    }
}