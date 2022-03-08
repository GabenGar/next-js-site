# Dates

The dates are consumed as ISO strings between db/server/client.
Only the `dates` module can interact with them as `Date` objects.
Mostly because `date-fns` requires `Date` for most of its functions.

Unix timestamps is not an option since they lack the timezone info. And also because server and client react desync on hydration.
