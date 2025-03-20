export const config = {
  runtime: 'edge',
};

const proxyTo : Record<string, string> = {
  "scientific-alliance": "scientific-alliance"
};

const errResp = new Response(null, { status: 500 });

export default async function handler(request: Request) : Promise<Response> {
  const url : URL = new URL(request.url);
  const from : string | null = url.hostname.split(".wd.")[0];
  if (from == null)
    return errResp;

  const to : string | null = proxyTo[from];
  if (to == null)
    return errResp;

  let forwardedRequest = new Request(`http://${to}.wikidot.com${url.pathname}`, request);
  console.log(forwardedRequest)

  return await fetch(forwardedRequest);
}
