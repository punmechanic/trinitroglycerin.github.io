---
title: IP bans don't work. Here's why.
date: 2022-05-31 10:20:16
tags:
- security
---

Anyone who has played online video games may know of the fabled IP ban: The ban so powerful it's only used as a last, final resort against the most disruptive of players. The truth is, though, IP bans don't actually work very well. To understand why, we need to understand how IP addresses and what something called NAT, or Network Address Translation, is. It'll be really easy, I promise.

## What's an IP address?

The Oxford Dictionary defines an IP address as:

> a unique string of characters that identifies each computer using the Internet Protocol to communicate over a network.

And this is.. sort of accurate. There are two kinds of IP addresses that exist today - IPv4, and IPv6. For the purposes of this article, we'll only talk about IPv4, because that's what most of the internet uses, and it's what most people know as being an IP address. An IPv4 address looks like this:

    192.168.0.1

Each of those dots refers to a byte. IPv4 addresses are made up of four bytes; each byte adds up to 255, and so that means you have 255 * 255 * 255 * 255 (`2^32-1`) or 4,294,967,295 unique IPv4 addresses. 4.2 billion sounds like a big number, but there's a small catch - we actually exhausted our entire IPv4 address supply some 15 years ago. There are no unique IP addresses anymore. We've used them all up.

You need an IP address to connect to the internet - it's what websites like this one use to identify what computer to "talk" to. So, if we used all of our IP addresses, then how are you able to be on the internet right now?

## What is NAT?

The answer to this was NAT, or Network Address Translation. I want to keep this article relatively light on technical details, so I'll do my best to explain it taking that into account.

Your computer, your phone, and your Xbox or playstation are connected to your router. This forms a network. Your router acts like the brain of this network, and it gives each device on your network a unique IP address. This IP address only exists on _your_ network†.

Your router is physically connected, by Ethernet cable, to a group of other routers, usually within your university campus, or in a box at the end of your street. There's another router in this machine, a bit like a super router, which assigns addresses to each router within this network. Usually, this Super Router gives your router a _public_ IP address†† - that's the one you see on utility websites like [whatismyip.com](https://whatismyip.com), and it's the IP address that other computers see when you connect to them.

This means that, depending on your network setup, and where you live, the public IP address you have is almost certainly _shared among multiple devices_. It could just be shared among all devices on your wifi network at home; if you're on a university campus, _all of the computers on the campus_ might share the same IP address, because they might all connect to the same router. **Because of NAT, your IP address does not uniquely identify your computer**.

Because we can assign a single IP address to multiple devices, we can massively reduce the number of IP addresses required to allow every internet-connected device to function. This has a nice side-effect of protecting your average person from trivial malware attacks.

<small>
† If you try to run Minecraft or some other peer-to-peer game and give your friend the ip address `192.168.0.1`, this is why your friend cannot connect to your server; the 192.168.0.1 address (and others like it) are used by your router.

†† There may be many more layers of routers connecting to routers depending on your personal setup, the building youre in, the ISP you have, and so on. The important thing is that your computer has an IP address that may be shared by many devices.
</small>

## What does this mean for IP bans?

Because your IP address does not reliably identify your computer, the upshot of this should be pretty clear; IP addresses cannot be used to identify _who_ someone is precisely. An IP ban on an individual might ban a whole lot of innocent people, too! This alone is reason enough to eliminate IP bans as punishment. But there are other factors too..

* IP addresses are assigned using something called DHCP. The exact details aren't important, but what you need to know is that IP addresses _usually_ do not last forever. Instead, they are _leased_ for a period of time, and once that lease expires, you are given a new IP address.
* It's really easy to change this lease. Usually, power-cycling your router will give you a new IP address.
* It's not so common in the West, but PC bangs are a big cultural piece in places like Korea. IP bans would make PC bangs unusable if enforced.
