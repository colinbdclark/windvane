Windvane
========

Windvane is library for building motion-influenced sound installations written by Colin Clark.
It builds on top of Flocking, Bergson, Sam Fisher, and other lower-level libraries.

Windvane provides a collection of Infusion components that may be useful when setting up a two-window Electron app, one window for the motion tracker and one for audio playback. It also includes components for configuring multi-camera motion trackers and model relays for motion data.

Using Windvane
--------------

Windvane provides an incomplete set of dependencies; it's assumed that you will include the relevant web-based dependencies (such as Sam Fisher) directly in your application's package.json file to ensure that they are conveniently located at top level in <code>node_modules</code>.
