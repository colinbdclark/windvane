Windvane
========

Windvane is a library written by Colin Clark for building motion-influenced sound installations.
It builds on top of Flocking, Bergson, Sam Fisher, and other lower-level creative software libraries.

Windvane provides a collection of Infusion components that support an Electron app with two windows: one window for the motion tracker and one for audio playback. It also includes components that automatically configure multi-camera motion trackers and model relays for this motion data.

Using Windvane
--------------

Windvane provides an incomplete set of dependencies; it's assumed that you will include the relevant web-based dependencies (such as Sam Fisher and Flocking) directly in your application's package.json file to ensure that they are appropriately located at top level in <code>node_modules</code>.
