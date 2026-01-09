"use client"; // idk what this does but the console warnings want me to set this because of my use of use()

import { StrictMode } from 'react';
import useSWR from 'swr';
import './community.css';
import PageNotFound from '../404/404';
import { BackendUri, ShowcaseType } from '../../Utility/utilityConstants';
import PageInternalError from '../500/500';
import PageBadRequest from '../400/400';
import NavigationBar from '../NavBar/nav-bar';
import { DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';

// Import font awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

const BlurpleSparklesIcon = "https://zebby.is-from.space/r/BlurpleSparkles.png";



// THE BELOW IS JUST SO I HAVE TYPINGS

/**
 * @typedef {Object} DiscordGuild
 * @property {String} name Name of the Discord Community
 * @property {?String} description Description for the Discord Community, if set
 * @property {?String} icon_hash Hash for the Discord Community's icon, if set
 * @property {?String} banner_hash Hash for the Discord Community's Banner, if set
 * @property {Number} approx_total_members Approximate total number of Members in the Discord Community
 * @property {?String} invite_code A Discord invite code pointing to this Discord Community, if set
 * @property {import('discord-api-types/v10').GuildNSFWLevel} nsfw_level Age restriction level for the Discord Community - set by either Discord's T&S or the Server's Owner
 * @private
 */

/**
 * @typedef {Object} ShowcasedAnnouncement
 * @property {String} timestamp ISO timestamp of when this announcement was made
 * @property {String} content Text-based message content for this announcement. May be an empty string if no content was written by the User.
 * @property {import('discord-api-types/v10').APIAttachment[]} attachments Any rich media attachments for this announcement. Will be an empty Array if none was attached.
 * @property {import('discord-api-types/v10').APIPoll|undefined} poll A Poll, if made with the announcement
 * @private
 */

/**
 * @typedef {Object} ShowcasedEvent
 * @property {String} event_name Name of the Scheduled Event
 * @property {?String} event_description Description for the Scheduled Event, if set
 * @property {String} scheduled_start_time ISO timestamp for when this Event is scheduled to start
 * @property {import('discord-api-types/v10').GuildScheduledEventEntityType} event_type Type of the Scheduled Event
 * @property {?String} external_location If Scheduled Event is an external type, a User-set string denoting the Event's location. Otherwise, null.
 * @property {?String} cover_image Hash for the cover image for this Event, if set
 * @property {String} showcase_type The type of showcase this Event was used to be showcased onto HomeCord
 * @private
 */

/**
 * @typedef {Object} MessageAuthor
 * @property {String} user_id Discord User ID of the Author
 * @property {String} display_name The Author's Display Name, if set. If not, their Username is provided instead. (Username is denoted with an `@` prefix)
 * @property {?String} avatar_hash Hash for the Author's profile avatar, if set.
 * @private
 */

/**
 * @typedef {Object} ShowcasedMessage
 * @property {String} timestamp ISO timestamp of when this message was made
 * @property {String} content Text-based message content for this message. May be an empty string if no content was written by the User.
 * @property {import('discord-api-types/v10').APIAttachment[]} attachments Any rich media attachments for this message. Will be an empty Array if none was attached.
 * @property {import('discord-api-types/v10').APIPoll|undefined} poll A Poll, if made with the message
 * @property {?MessageAuthor} author The message author's profile details. ONLY included if the author has allowed it in their HomeCord privacy settings!
 * @property {String} showcase_type The type of showcase this Message was used to be showcased onto HomeCord
 * @private
 */

/**
 * @typedef {Object} ShowcasedThread
 * @property {String} thread_name Name of the Thread
 * @property {'FORUM_THREAD'|'TEXT_THREAD'|'NEWS_THREAD'} thread_type Type of Thread (based off its parent Channel)
 * @property {String} showcase_type The type of showcase this Thread was used to be showcased onto HomeCord
 * @private
 */

/**
 * @typedef {Object} HomecordCommunity
 * @property {Boolean} is_homecord_enabled Is HomeCord enabled for the Discord Community in question? If false, NO OTHER DATA is provided in this object
 * @property {DiscordGuild} discord_guild Basic information about the Discord Community
 * @property {Array} showcased_channels Currently unused, so will always be an empty Array
 * @property {Array<ShowcasedAnnouncement>} showcased_announcements Announcements showcased from the Community
 * @property {Array<ShowcasedEvent>} showcased_events Scheduled Events showcased from the Community
 * @property {Array<ShowcasedMessage>} showcased_messages Noteworthy Messages showcased from the Community
 * @property {Array<ShowcasedThread>} showcased_threads Active Threads showcased from the Community
 * @private
 */



export default function ProcessCommunity({ guild_id }) {
  // Grab passed Discord Guild ID
  let guildId = guild_id;

  
  // Check against HomeCord Backend, using SWR so my frontend isn't spamming the everloving daylights out of my backend with React re-renders :S
  const { data, error } = useSWR(`${BackendUri}community?guild_id=${guildId}`, input => fetch(input, { method: 'GET' }).then(res => res.status === 200 ? res.json() : res.status));

  // Handle errors
  if ( error ) return <><p>An error occurred: {error.message}</p></>;
  // Loading screen
  if ( !data ) return <><p>Loading...</p></>;
  
  // Data fetched!
  // Handle HTTP Statuses
  if ( data === 404 ) {
    return <PageNotFound />;
  }
  else if ( data === 500 ) {
    return <PageInternalError />;
  }
  else if ( data === 400 ) {
    return <PageBadRequest />;
  }
  else {
    // ******* Handle HTTP 200 (OK)
    // Pass into new variable PURELY so I can has typings :3

    /** @type {HomecordCommunity} */
    let communityData = JSON.parse(data);

    if ( !communityData.is_homecord_enabled ) {
      return <PageNotFound />;
    }


    // Ok, NOW we know for certain HomeCord is enabled for this Discord Guild, so let's display its page!
    let discordGuildIcon = communityData.discord_guild.icon_hash != null ? <img src={`https://cdn.discordapp.com/icons/${guildId}/${communityData.discord_guild.icon_hash}.png`} id="guild-icon" /> : null;
    let discordGuildBanner = communityData.discord_guild.banner_hash != null ? <img src={`https://cdn.discordapp.com/banners/${guildId}/${communityData.discord_guild.banner_hash}.png?size=1024`} id="guild-banner" /> : null;

    let scheduledEvents = [];
    communityData.showcased_events.forEach(item => {
      scheduledEvents.push(
        <div className={item.showcase_type === ShowcaseType.Feature ? "event-item featured" : "event-item"}>
          {item.showcase_type === ShowcaseType.Feature ? <FontAwesomeIcon icon="fa-solid fa-bolt" size="lg" style={{color: "#5865F2",}} /> : <FontAwesomeIcon icon="fa-regular fa-calendar" size="lg" />}
          <p className="event-name">{item.event_name}</p>
          {/* <p className="event-description">{item.event_description ?? ""}</p> */}
          <p className="event-start-time">Scheduled start: {new Date(item.scheduled_start_time).toLocaleDateString()} at {new Date(item.scheduled_start_time).toLocaleTimeString()}</p>
          <p className="">{item.external_location != null ? `Location: ${item.external_location}` : ""}</p>
        </div>
      );
    });

    let announcements = [];
    communityData.showcased_announcements.forEach(item => {
      announcements.push(
        <div className="announcement-item">
          <FontAwesomeIcon icon="fa-solid fa-bullhorn" size="lg" />
          <p className="announcement-timestamp">{new Date(item.timestamp).toLocaleDateString()}</p>
          <p className="announcement-content">{item.content}</p>
          {/* TODO: Handle Attachments & Polls */}
        </div>
      );
    });

    let threads = [];
    communityData.showcased_threads.forEach(item => {
      threads.push(
        <div className={item.showcase_type === ShowcaseType.Feature ? "thread-item featured" : "thread-item"}>
          {/* TODO: Thread icons for Thread type */}
          {item.showcase_type === ShowcaseType.Feature ? <FontAwesomeIcon icon="fa-solid fa-bolt" size="lg" style={{color: "#5865F2",}} /> : <FontAwesomeIcon icon="fa-solid fa-message" size="lg" />}
          <p className="thread-name">{item.thread_name}</p>
        </div>
      );
    });

    let messages = [];
    communityData.showcased_messages.forEach(item => {
      let authorAvatar = item.author?.avatar_hash != null ? `https://cdn.discordapp.com/avatars/${item.author.user_id}/${item.author.avatar_hash}.png` : `https://cdn.discordapp.com/embed/avatars/${(item.author.user_id >> 22) % 6}.png`;
      
      messages.push(
        <div className={item.showcase_type === ShowcaseType.Feature ? "message-item featured" : "message-item"}>
          {/* TODO: Handle Attachments, Polls */}
          <DiscordMessage
            avatar={item.author != null ? authorAvatar : "blue"}
            author={item.author != null ? item.author.display_name : "Anonymous User"}
            /* roleIcon={item.showcase_type === ShowcaseType.Feature ? BlurpleSparklesIcon : undefined}
            roleName={item.showcase_type === ShowcaseType.Feature ? "Featured Message" : undefined} */
            timestamp={new Date(item.timestamp).toLocaleDateString()}
          >
            {item.content}
          </DiscordMessage>
        </div>
      );
    });


    // If respective arrays have no content, display a "no <thing> found" message instead
    if ( scheduledEvents.length === 0 ) {
      scheduledEvents.push(
        <div className="event-item">
          <p className="empty-item">No upcoming scheduled events found.</p>
        </div>
      );
    }

    if ( announcements.length === 0 ) {
      announcements.push(
        <div className="announcement-item">
          <p className="empty-item">No recent announcements found.</p>
        </div>
      );
    }

    if ( threads.length === 0 ) {
      threads.push(
        <div className="thread-item">
          <p className="empty-item">No recently active threads found.</p>
        </div>
      );
    }

    if ( messages.length === 0 ) {
      messages.push(
        <div className="message-item">
          <p className="empty-item">No recently showcased messages found.</p>
        </div>
      );
    }

    // For rendering showcased messages correctly depending on browser's theme
    let prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    let messagesSection = prefersLightTheme ? <DiscordMessages noBackground lightTheme>{messages}</DiscordMessages> : <DiscordMessages noBackground>{messages}</DiscordMessages>;

    return (
      <>
        <NavigationBar />
        <div className="discord-guild">
          {discordGuildBanner}
          {discordGuildIcon}
          <h1 id="guild-name">{communityData.discord_guild.name}</h1>
          <p id="guild-description">{communityData.discord_guild.description ?? ""}</p>
          <p id="guild-members"><FontAwesomeIcon icon="fa-solid fa-people-group" size="lg" /> <span id="guild-member-count">{communityData.discord_guild.approx_total_members}</span> Members</p>
          <button className='button' id="guild-invite"><a href={`https://discord.gg/${communityData.discord_guild.invite_code}`}>Join Server</a></button>
        </div>
        <br />
        <div className="two-columns">
          <div className="scheduled-events section one-column">
            <h3 id="events-heading" className='grid-heading'>Upcoming Scheduled Events</h3>
            {scheduledEvents}
          </div>
          <div className="threads section one-column">
            <h3 id="threads-heading" className='grid-heading'>Active Threads</h3>
            {threads}
          </div>
        </div>
        <br />
        <div className="announcements section one-column">
          <h3 id="announcements-heading" className='grid-heading'>Recent Announcements</h3>
          {announcements}
        </div>
        <br />
        <div className="messages section one-column">
          <h3 id="messages-heading" className='grid-heading'>Noteworthy Recent Messages</h3>
          {messagesSection}
        </div>
        <hr />
      </>
    );
  }
}
