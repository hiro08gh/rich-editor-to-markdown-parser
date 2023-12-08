import { client } from './libs';
import parsed from '../../../src';

export const revalidate = 0;

async function getData() {
  const res = await client.get({
    endpoint: 'richeditor',
    contentId: 'sl42csamx',
  });

  return res.content;
}

export default async function Home() {
  const data = await getData();
  const markdown = parsed(data);

  return <main className="main">{markdown}</main>;
}
