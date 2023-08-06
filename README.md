## MyUnsplash
- It's my first time to know that css column properties. 
- Next js revalidate the cache doesn't work for me and for other people [here](https://github.com/vercel/next.js/discussions/42290)
- So I tried to convert to client component and use the old useEffect but it says I can't use it because it contain async.
- I tried to use SWR but I did misunderstood the usage of the hook. useSwr('url', fetcher) but it turned out the usr is just a key that it can be used as url with the default fetcher implementation. 
- unfortunately the same error still hunted me I discoverd that I had async children hidden somewhere. Misguided by next js error shame on you
- Now I manually validate the cache on mutation, it's just easy. Also I should add periodic revalidation. Sorry no realtime update here.
- The realtime update could be achived [from supabase blog](https://supabase.com/blog/fetching-and-caching-supabase-data-in-next-js-server-components#realtime) but until vercel fix next js I will stay still.


## Cat Wiki
- It's the perfect example of Static Side rendering. The only dynamic aspect is the top searched cat breads.
- I can achive this with with key value store and to presist it I can store it to pocketbase 
- The Boundary for errors and Loading is something that need more researching.