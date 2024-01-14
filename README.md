# Trone

Minimal kanban-esque tool

Many features of trello, planka, et al can be very useful for many users, but I find them distracting and overwhelming for my basic use cases. As such, I've set out to build an absolutely minimal kanban tool. The list of non-features should help explain my use case

Non-features

- Multiple users and user management tools
- Labels and other advanced organization tools
- Stopwatches or time management tools

Likely non-features

- Cross-device syncing
- Card-level todo lists

While I understand many users might depend on these advanced features, I generally view them as complications. Of these complications, only card-level todos immediately seem to compensate for the weight of their visual and semantic clutter.

Cross-device syncing as well is an obviously useful feature, but it comes with it's own drawbacks. Without cross-device syncing, all data related to a user's projects can simply be persisted in the browser (I'm currently planning on using IndexedDB) and the application can be served as a simple static page. Cross-device syncing requires some method of persisting a user's data outside of their own browser. Furthermore, this requires some concept of authentication, whereas without cross-device syncing the existance of the data on the user's computer is sufficient for authentication. This has the potential of becoming a slippery slope towards adding multi-user support, at which point simplicity is necessarily lost from the application. If cross-device syncing is ever implemented, it will be optional
