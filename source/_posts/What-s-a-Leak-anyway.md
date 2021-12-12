---
title: What's a Leak anyway?
date: 2021-06-05 11:00:00
tags:
- riot
- security
---

[tweet]: https://twitter.com/riotdanhonks/status/1411717226441412611

I posted [this tweet][tweet] the other day and it got a lot of attention, primarily because it was retweeted by a few high-profile individuals within the League and League-adjacent Twittersphere. There was a bit of confusion about what a leak is — and what the difference between a leak and a teaser is. Let me explain in this post.

TL:DR at the bottom.

Disclaimer: I **do not** work on leak investigations professionally. I work as an engineer in our security team, so I have been present when leak investigations have taken place and have sometimes seen post-mortems of leaks. This will be a good primer, but you’d really want to consult someone more experienced for a complete view.

I also want to be clear that this is going to focus **solely on leaks regarding unreleased content**. There are a lot of parallels between that and whistle blowing, but whistle blowing is a fundamentally different thing and I am not about to advise anyone on how to address whistle blowing nor do I think that anyone should be trying to prevent it.

## Who cares about leaks? Leaks are fun for players.

RiotJennisaur explained why leaks are bad pretty well:

> This. Leaks are devastating to us because it robs our opportunity to present new products to players in a curated way.

(Source: https://twitter.com/RiotJennisaur/status/1411776829199851521)

A leak prevents a game developer from showing players the to-be-released content in the light they want to see it. Perhaps the content isn’t finished or is missing valuable context. There’s also usually a lot of work that goes into a teaser — it’s not usually a case of showing a skin, but there may be cinematics, artwork, promotional material, events, and so on — and something being leaked takes the surprise away from players.

It also makes developers feel very… deflated.. when something they’ve worked on and intended as a surprise is released in all of its glory before it’s even finished.

I’ve never met someone who worked at a games company who was happy or even ambivalent about a piece of content being leaked too early. It’s always a disappointing feeling because not only can you not show the content in the intended light, you also feel the air of betrayed trust — that someone who works at the company with you disclosed content that you worked on before it was ready to be shown.

## Leaks are not intentional marketing tools
There’s a few dictionary definitions of a leak — I’m not going to post those here. You could just use a dictionary. Here’s my criteria for what makes something a leak:
* Information is disclosed without the consent of the owner of the information
* The disclosure can be accidental **or**
* The disclosure is intentional by either one or many actors with the intent of furthering their own interests at the expense of the owner of the information

In plain English:

### Information is disclosed without the consent of the owner of the information

Let’s say that Riot comes up with a new look for an existing champion. There’s an implicit understanding at Riot that this new look is private information and should not be disclosed to anyone outside of Riot — and that being able to see the new look before players is a perk of the job.

Suppose that that new appearance gets disclosed **without the knowledge** or prior authorization of the skins or marketing teams. That would be a leak.

### The disclosure can be accidental

Sometimes, disclosures can happen as a result of security vulnerabilities — This is where my team would come in. In particular, it’s not uncommon for campaign pieces (i.e, very fancy blog posts) to be placed in a draft section on a public facing website a few hours before they are released, but marked as hidden, so that theoretically they don’t show up to players.

If, however, there is a bug and hidden posts still show up in certain API calls, astute individuals might be able to data-mine hidden content from that website and post it **before** the intended release date and — tadah — You have a leak.

### Or the disclosure is intentional by either one or many actors with the intent of furthering their own interests at the expense of the owner of the information

Someone leaks something because they were only thinking about their own interests and either did not consider or actively disregarded those of the owner of the information. This doesn’t necessary need to be malicious.

There have been times where I’ve seen unreleased content get shared, in confidence, to an employee’s best friend, who would absolutely never tell the world ever and.. well, you can see where this is going. The friend shares it with a friend who shares with a friend and suddenly the whole world knows.

There **are** also incidents where someone intentionally disseminates information with the full understanding that this might harm the company’s interests in an effort to promote their own — For example, a streamer who comes across information that any reasonable person would understand to be confidential and/or a leak, but makes a big piece out of it or uses it to advertise their own stream or YouTube channel.

This is usually not the primary source of a leak (imagine betting your job on the success of a YouTube channel), but usually someone who discovers leaked material through a friend of a friend or through a security vulnerability or some other means and takes advantage of the disclosure for their own gain.

## What’s the difference between a leak and a teaser?

Having enumerated what a leak is — accidental disclosure, against the interests of the company, at the furtherance of someones own interests — you could say that a teaser is the exact opposite.

In my mind, a teaser:
* Is an intentional, thought-out release of information designed to drive hype
* Usually involves multiple teams and is, essentially, a marketing campaign
* Almost always comes in the form of an easter egg or short piece of content from a source directly associated with the company

For example, a teaser might be a picture of Sylas’ chains in a dev blog article, or the big marketing campaign around Jhin when he was first released. Perhaps it could be an intentional piece of art left up in an official video released through the social media accounts of a company as an easter egg.

The core thing that connects all of these is that they are usually come from content that is **clearly identifiable** as being an intentional release of information from a source that is directly associated with the company. Any company that is going to be releasing content — especially paid for content — is going to want to make sure that potential customers see that content in a curated way and in the best possible light.

If you’re seeing grainy screenshots from some corner of the internet sourced from your Dad who works at Nintendo, then it’s probably a leak, and not a teaser. Teasers are very deliberate.

## How do you stop people leaking? What does it say that there are so many leaks?

This is a long blog post already, but this one came up a lot. Going to quickly summarize my views on this one, since it’s getting late here.

**You can’t stop leaks through enforcement means**. Leaking happens for many reasons, including, but not limited to:
* Dissatisfaction with the company/coworkers
* A desire to gain notoriety
* A desire to share their own excitement about the content with a supposedly trusted friend or set of friends

In general, enforcement to prevent leaks is going to be more like a lock on your door at night. It might stop crimes of opportunity — such as someone stealing something from you while you step out of the house because you locked the door — but it’s not going stop someone who is truly motivated to leak something for their own reasons. No amount of threats of punitive action is going to scare someone who believes they will never get caught in the first place or simply doesn’t fear the consequences.

Preventing leaks, then, mostly comes down to two things:
* Cultivating a culture of collective ownership (Is that buzz-wordy enough for you, Twitter?)
* Restricting access to sensitive information.

Cultivating a culture of collective ownership is, in my experience, the best case scenario — a situation in which everyone is given access to sensitive material and it is expressed to them that we are all responsible for making sure that something is delivered to players without being leaked. This enables employees to feel trusted with a secret and also gives them the motivation to want to keep the secret safe — because they feel like they have a part to play in it.

I’ve also heard of some instances of companies offering cash bonuses to employees if something releases without being leaked, not sure how effective those are, though.

Unfortunately, as a company grows, it becomes harder and harder to rely on trust — it’s much easier for a small start-up to keep everything under-wraps than it is a 5000 strong company, and that’s why you see large companies leaking like a sieve despite having the budget for a strong security team.

Restricting access to sensitive information feels pretty bad — not being able to share cool stuff with your colleagues sucks. This is what companies tend to reach for when it’s not really possible to rely on trust all the time. This doesn’t necessarily mean the company is hiring the wrong people, which is a sentiment I saw frequently too — People are complicated and have their own agenda, and every person is one bad day away from causing a lot of damage to a corporation. You can absolutely hire people and trust them to perform a certain set of responsibilities and not trust them with all of the confidential information at the company.

## Conclusion

I hope this helps explain the difference between leaks and teasers. In short:
* Teasers are complex marketing campaigns and the unifying thread is that they are usually identifiable as an intended release of information from a company and are usually promoted on the company’s main social media/press release channels.
* Leaks are unintended releases of information showing a product or piece of information in either an unfinished or damaging light; they usually come from unclear sources (to the viewer, anyway) and are not usually identifiable as being an intentional publication.
