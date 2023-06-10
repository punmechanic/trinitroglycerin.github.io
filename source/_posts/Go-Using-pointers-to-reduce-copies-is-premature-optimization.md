---
title: 'Go: Using pointers to reduce copies is premature optimization'
date: 2023-06-09 22:35:12
tags: golang
---

An oft-repeated question on the [/r/golang][golang-sub] subreddit is "when should I use pointers instead of passing a value?". This question was asked [this evening][0] by [/u/TheMadMan001][1]. Whenever this question gets asked, there are a few positions that people in the comments tend to take, and the most common one I see by a wide margin is that "You should use pointers when you're dealing with large values, because then Go doesn't have to copy the value onto the stack":

[0]: https://www.reddit.com/r/golang
[1]: https://np.reddit.com/r/golang/comments/143zq8n/need_help_understanding_why_and_where_to_use/
[4]: https://www.reddit.com/user/TheMadMan001

> One point that was left out from previous posts was the when.
> If you’re dealing with small or negligible amounts of data then it doesn’t matter too much. The business logic and programmers preferences will drive when a pointer is used or not.
> However when you have to deal with extremely large variables, in terms of memory size, then passing by pointer will often be required.

[/u/germanyhasnosun][2]<sup>\[[source][3]\]</sup>

[2]: https://www.reddit.com/user/germanyhasnosun
[3]: https://np.reddit.com/r/golang/comments/143zq8n/need_help_understanding_why_and_where_to_use/jndlx6p/

Another similar comment that implied that at least one of the reasons to use pointers was to reduce copying (emphasis mine):

> One concept in Go is that variables are passed by value.
> IMO to understand how/when to use pointers, it’s important to understand how data is passed.
> **Pointers can have a benefit when you have structs containing lots of data.** Like database operations.
> The only way to mutate a variable that you pass to a function is by passing a pointer. By default, the pass-by-value means that changes you make are on the copy you’re working on. Thus, they are not reflected in the calling function.

[/u/anon221911][5]<sup>\[[source][6]\]</sup>

[5]: https://www.reddit.com/user/anon221911
[6]: https://www.reddit.com/r/golang/comments/143zq8n/need_help_understanding_why_and_where_to_use/jncwyq0/

Suppose we have a structure that is quite large, and we want to pass it to a function to perform some work on it.

```golang
type LargeStruct struct {
	Numbers [10]uint64
}

func DoWork(LargeStruct)
```

If I invoke `DoWork` in Go 1.20, 80 bytes will be copied to the stack, because LargeStruct is 80 bytes in size. If I instead altered DoWork to accept a pointer, then only 8 bytes would be copied. You would be forgiven for thinking that copying a lower number of bytes is always strictly better - copying sounds like wasted effort, after all. But it's more complicated than this due to how modern computers work.

Modern computers are fast. Wicked fast. A good chunk of the speed of modern computers is thanks to the way that they handle dealing with data. When a programmer instructs a CPU to perform some work via a program, ultimately that program boils down to performing operations on CPU registers. Registers are very small - a 64 bit computer will have registers that are 64 bits size, in most cases (some may be slightly larger). So, how does a computer deal with a struct that is 80 bytes?

A naive understanding of computers might lead you to believe that a CPU reads 64 bytes, and, after it's done with those 64, it reads the remaining 16 bytes. This would be tremendously slow. Your RAM is very quick, but compared to the speed a CPU operates at, it's orders of magnitude slower. What actually happens is that a CPU will read data from RAM into one of its caches - L1, L2, or L3 - one cache line at a time. The registers will be populated from these cache lines. This process is invisible to the programmer, but taking advantage of it can result in very large performance increases, because when a CPU looks for a value to store in a register, it will first check the L1 cache, then the L2, then the L3 and it will then go and check DRAM. Each one of these jumps (**Cache Misses**) incurs significant overhead and has a drastic negative impact on application performance.

Explaining all of the intricacies of a CPU in this post would take a long time and would be repeating ground that others [have tread much better than I could](https://teivah.medium.com/go-and-cpu-caches-af5d32cc5592), but what matters for the current topic is the idea of _locality_. When a CPU reads data from RAM into one of its caches, it will read as many cache lines as required into its cache in order to retrieve the data its looking for. This means attempting to retrieve `LargeStruct` on a 64 bit PC will (probably) result in the CPU reading 128 bytes - 80 bytes of those will be the value of `LargeStruct`, and the rest will be values that are around it. Values that are closer to each other in physical memory have _spatial_ locality, and will likely be available in at least one of the CPUs caches at the same time. If the values are close to each other in physical memory, then there's a better chance that those values will be on either the same or neighbouring cache lines when a value is read into one of the CPU's caches, which decreases the likelihood of a cache miss and thus decreases the amount of expensive "jumps" the CPU has to make to find the value it's looking for.

So! How does this relate to putting a pointer vs a struct as a function parameter?

When a pointer is passed to a function, what will be read into the cache of the processor is (probably) the memory address of the value that the processor needs to work on, and not the _actual_ value. When the processor attempts to do some work on the value, it first has to go and find wherever the value that the address is pointing to is located. In some trivial examples, the value and the address could have spatial or temporal locality - for example, the following code is likely going to have the address of the pointer and the value in the same cache line:

```golang
func multiplyInPlace(val *uint, multipler uint)

func main() {
  a := 2
  multiplyInPlace(&a, 2)
}
```

However, the more levels of indirection you have, the less likely this is to be true, and the more likely it is that a CPU having to deference a pointer (I'm simplifying - a computer doesn't know what a pointer _is_) will result in a cache miss, and thus a significant performance hit. However, were one to pass the values directly, rather than using a pointer, it's possible that the values would be spatially or temporally local to all of the other arguments passed to the function, thus reducing the chance of a cache miss and increasing performance. Of course, this copy has a cost too. What's the right answer then? When is a value "big enough" to justify the cost of dereferencing an address and causing a cache miss? When is a value small enough that you should not bother with a pointer?

There is no real general rule. **The answer is "It Depends"**. And for applications that are HTTP servers, it _probably_ is all bikeshedding anyway - most of the time spent in _most_ web servers is spent idling waiting for I/O. So, what would my sage advice be?

My advice would be that you do not use pointers for their perceived performance characteristics. As I have labored to attempt to make clear in this article, any perceived performance benefits of using a pointer can easily be undone by the nature of how memory is organized within a CPU, and using a pointer _can_ make it harder to follow the flow of data in a program. On the other hand, never using pointers makes some very useful patterns, such as the ones present in `json.Encoder`, impossible.

Pointers are a tool to indicate that you are referring to a value somewhere else. This can be a useful tool for:

* Pools - Pointers can help you return a reference to a shared object that is protected by a mutex for which there can only be a limited number of copies
* Mutation - Pointers are useful when you want a function to mutate a value that it received (this includes methods).
* Optional values - While I prefer using the `val, ok := DoThing()` pattern, one can easily use a pointer to indicate the absence of a value by returning `nil`.

This is not an exhaustive list: The point (heh) is that pointers have clearly defined semantics on what they enable you to do. If you need to mutate a value you don't own, or indicate absence of a value, or loan a value out, returning or accepting a pointer is a great idea because it communicates to the consumer of your code that they might not necessarily be in complete control of the value backed by that pointer.

You __shouldn't__ reach for a pointer (or indeed __avoid__ using pointers) because of some handwavy notion that one might be somewhat faster than the other. You should use the construct that makes the most sense to express your intent in code. After you've written your code and have verified it works, that is the point where you might want to consider profiling your code and identifying if copying a large value, because you didn't use a pointer, is actually causing your code to slow down appreciably. 

If you take nothing else away from this article, remember the following mantra as a way to guide you on what the order of operations should be when authoring code.

**Make It Work, Make It Beautiful, Make It Fast**.

