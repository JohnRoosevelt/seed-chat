import mammoth from 'mammoth';

export const ssr = false

export async function load({ parent, params: { cid, aid } }) {
  // console.log(arguments)
  const { articles } = await parent() 
  const article = articles.find(i => i.id == aid)
  const url = 'https://pub-42fa17a0d06841f295980294e061513c.r2.dev/media/%E5%88%9B%E5%A7%8B%E6%88%90%E7%BB%88.docx'
  const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    return {html, article}
}