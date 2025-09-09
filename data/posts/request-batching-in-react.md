I was recently working on a React application that needed to call an API to check if the user had permissions to perform different actions within the app. Components would check different permissions by calling this API and it was up to them to render an error or alternate state in case the user lacked the required permissions.

I noticed that this approach resulted in many calls being made in quick succession (although for different permissions) and I wanted to improve that by reducing the number of times this API was called. I then started thinking about how to implement a mechanism to debounce queries in a way that at the end of the waiting period (let’s say 10ms) it would collapse all the queries, make a single batch call and return the responses without the components knowing about it.

The API already supported a batch version (taking a list of permissions) so it was a frontend only effort.

A few years ago I worked on a API that used [Hystrix](https://github.com/Netflix/Hystrix), it was a Java library that provided many things including [Request Collapsing](https://github.com/Netflix/Hystrix/wiki/How-it-Works#request-collapsing), so I went on a quest to find a Javascript equivalent, I was really trying not to reinvent the wheel if possible.

And I found it! It’s [dataloader](https://github.com/graphql/dataloader):

> a generic utility to be used as part of your application’s data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching.

## Contents

* * *

## Dataloader Usage

Basically, you define your `Dataloader`:

```
const fetcher = async (requests) => {
 // this function takes an array of collapsed requests makes a batch call and return an array of responses
};

const loader = new Dataloader(fetcher);
```

And then use its promise-based API to load one (or more items):

```
const data = await loader.load(request);
```

By default, individual requests that occur within a single frame of execution will be collapsed. However, that is configurable, and can easily be changed to instead collapse all requests that happen within a time window.

```
const loader = new DataLoader(fetcher, {
  batchScheduleFn: callback => setTimeout(callback, 100)
})
```

Also, it’s possible to limit the number of requests that are collapsed together by using the `maxBatchSize` option.

## React-query integration

The application also used [react-query](https://react-query.tanstack.com/), to manage the API calls, so the challenge was to integrate the two. Luckily they play really well together, as you can see it in this [demo](https://codesandbox.io/s/react-query-dataloader-lgosp).

All that needed to be done was to use the loader as the react-query fetcher function:

```
const { data } = useQuery(
    getKey(request),
    () => loader.load(request)
  );
```

And that’s it! The loader will do all the heavy lifting to collapse the calls, making it completely transparent to consumers.

* * *

Thanks for reading. I hope you learned something new today. Take care and I’ll see you next time.
