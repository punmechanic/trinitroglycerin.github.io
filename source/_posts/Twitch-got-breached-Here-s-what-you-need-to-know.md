---
title: Twitch got breached.
subtitle: Here's what you need to know.
date: 2021-10-06 11:00:00
tags:
- security
- incidents
- psa
---

**TL:DR**: Change your password and enable 2FA. Passwords have not been released to the public (yet?), but they are stored in a format that makes them difficult to guess.

There is no reason to expect that users will have, or will be, exposed to viruses by the original leakers, but it is possible the leaked code may cause vulnerabilities to be found and exploited. Be vigilant.

For the love of God, please don’t use this as an excuse to harass individuals working at Twitch. Compromises can happen to anyone, especially if perpetrated by ideologically motivated individuals with a lot of knowledge. Twitch definitely has improvements to be done with regards to moderation/preventing hate raids, but incidents like this are always super stressful particularly for those trying to put out the fire.

## Intro
Keep in mind the following before continuing on:
* This is a developing situation, with Twitch themselves unaware of the scope of the impact. Comments in this post are informed guesses based on what is present in the info dump from the breach.
* I am not affiliated with Twitch.
* This is a post by Dan the individual, not Dan the information security employee of \<gaming company\>. Do not take this as a security advisory from my employer.

I woke up this morning to the information that Twitch had been breached. Not just one database on Twitch, but all of it. In this article I’m going to focus on what **you as a Twitch user or streamer need to know**. There will be some technical detail later on. Here’s the executive summary:
* The leaked content was titled “twitch leak part one”. The dump in total is 130Gb.
* The leak contains what appears to be most of the code that makes Twitch work, with a **significant** amount of intellectual property.
* No usernames, passwords or phone numbers were in this leak, but I’ve heard rumors floating around that there is a part two, which will contain some more user information.
* Included in the leak were revenue sheets of streamers with payouts from Twitch sources to those streamers from 2019, 2020 and 2021.

The leak of the code itself is not particularly damaging if you’re a streamer. If the code were the sole content of the dump, then I would say there isn’t much to worry. However, the fact that there are revenue sheets, which almost certainly were not stored with the code that was leaked, and the fact that there are rumors of passwords being breached as well, makes it a bit more concerning.

## Malware (Viruses)
There’s no inclination that the individuals who breached Twitch and released this information were able to, or are able to, expose users to malware. The dump contains a lot of privileged information and intellectual property, but having access to confidential documents and being able to distribute code to Twitch users are two different things.

## Emails and passwords
The dump includes a service called Passport, which is Twitch’s primary authentication service from my reckoning. This stores usernames, passwords, phone numbers, dates of birth and email addresses among a few other things.

Any account that has been logged in to since March 22nd, 2015, has their password protected using bcrypt. This is a secure way of protecting passwords that is difficult to break. **You should still change your password for Twitch**. No protection is perfect, and bcrypt can be broken — it’ll just take a lot of attempts to do so. If you have re-used that password anywhere else, you should go and change those too.

Because e-mails are stored with passwords, if passwords are leaked, it’s likely email addresses will too. The individuals who breached Twitch have indicated that their reasons are ideological, and so it’s unlikely they will leak information that will directly harm users, but I’m not an oracle and, if you’re a big streamer, you probably don’t want to take the chance that it won’t be released.

## Phone numbers and multi-factor authentication (MFA)
Phone numbers are stored by Twitch if you have enabled multi-factor authentication with Twitch in any form, even if you use the Authy app or something similar. This is because Twitch requires your phone number to serve as a back-up in case you lose the MFA application.

Unfortunately, phone numbers are stored with your username, password and email. Any dump that includes passwords and usernames will have had access to phone numbers. It is possible, should a credential dump be released, that the phone numbers of associated users may be released too.

Despite Twitch requiring your phone number to enable MFA, now would be a really good time to enable MFA on Twitch, as well as any other website that offers it. MFA is a really good last line of defense if someone does guess your password. If you are going to enable MFA, avoid SMS MFA and use app-based MFA if you have a smart phone.

## Payment Information
No payment information for users (i.e PayPal account information, tax identification numbers, social security etc) are stored with emails and passwords — it’s all in a separate database. That does not mean that it won’t get leaked, but if the attackers only had access to the authentication database, they might not have access to whichever one stores payment information.

## Revenue Sheet
Of more interest is the revenue sheet. This was almost certainly not stored with the rest of the code that was leaked. The revenue sheet appears to be a the dump of a database, although during the time I was looking at the code I was not able to ascertain the code that “backed” that database. This would seem to imply that the individuals who leaked the database had access to more than just whatever code was available, and knew where to look to retrieve that information.

## Conclusion
Most of the impact of the data leaked today is the loss of confidential intellectual property for Twitch, as well as the loss of private information for some Twitch streamers.

The individuals who published the leak have indicated that their reasons are ideological, and that they wish to “foster more disruption and competition in the online video streaming space”. It’s unclear whether that ideology extends to directly harming the privacy of users by releasing the user information.

Until and unless the attackers release the information they claim to have, the main advice I would have to any streamers right now would be to change their password — especially if they have used it in multiple places — and to enable multi-factor authentication.

Other companies should take this as a cautionary tale as to why they should not require phone numbers for two-factor authentication, and limit any personal information collected to the bare minimum, as any and all personal information collected may be released and harm users.