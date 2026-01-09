"use client"; // idk what this does but the console warnings want me to set this because of my use of use()

import { StrictMode, Suspense } from 'react';
import { useParams } from 'react-router';
import PageNotFound from '../404/404';
import ProcessCommunity from './processCommunity';

const DiscordSnowflakeIdRegEx = new RegExp(/(\d{17,20})/);



export default function Community() {
  // Grab passed Discord Guild ID AND VALIDATE that it is a Discord Guild ID
  let params = useParams();
  let guildId = params.guildId;

  if ( !DiscordSnowflakeIdRegEx.test(guildId) ) {
    return <PageNotFound />;
  }

  
  // Check against HomeCord Backend, and catch errors so React doesn't try SPAMMING MY BACKEND WITH RETRIES
  return <>
    <StrictMode>
      <Suspense fallback={<><p>Still loading...</p></>}>
        <ProcessCommunity guild_id={guildId} />
      </Suspense>
    </StrictMode>
  </>;
}
