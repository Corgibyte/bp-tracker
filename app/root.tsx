import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwindStyles from './styles/tailwind.css';
import sharedStyles from './styles/shared.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: sharedStyles },
  { rel: 'stylesheet', href: tailwindStyles },
];

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-slate-800 text-white'>
        <div className='ml-1 md:ml-2 lg:ml-3 w-96 bg-slate-700 '>
          <div className='bg-slate-900 py-2 drop-shadow-lg saturate-150'>
            <h1 className='text-2xl font-semibold text-orange-500 ml-2'>
              <Link to='/' prefetch='intent'>
                BP
              </Link>
            </h1>
          </div>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
