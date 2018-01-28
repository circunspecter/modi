# Changelog

The poject follows [Semantic Versioning](http://semver.org/spec/v2.0.0.html), and this log's format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2018-01-29

### Added

Modi:
- Modal: allow custom "namespace" for events. Default: "modal". Template's listeners and events mustn't include the namespace.
- Dom: added "isElement" function.
- Testing with [Mocha](https://github.com/mochajs/mocha), [Chai](https://github.com/chaijs/chai) and [jsdom](https://github.com/jsdom/jsdom).
- Test coverage with [Istanbul](https://github.com/istanbuljs).

### Changed

Modi:
- Modal#addListener: the "element" parameter becomes optional and moves to the last place. Default: first modal's element.
- Modal#dispatchEvent: the "element" parameter becomes optional and moves to the last place. Default: the target element specified on the instance's listeners collection.
- Modal#create: event selector search will be launched from every parent element.
- Templates: remove the namespace references from listeners and events.
- Templates#events: dispatcher property now accepts "instance" (the first template element) or any element name present in the template.
- Current version info added to the dist headers.

Docs:
- Update documentation. Previous release accessible from menu.

### Fixed

Modi:
- Modal#element: removed the search within "document.body" to avoid the possibility of access elements from another modal when multiple instances are present.
- Modal#remove: clean the listeners references collection.
- Dom: functions now checks if provided element is valid.
- Fix source maps.

## [1.1.0] - 2018-01-23

### Added

Modi:
- Template: added "build" function to allow partial replacements.
- Dom: added "getSiblings" function for picking an element's siblings.

### Changed

Modi:
- Removed the lateral paddings for overlay element. Applied to default and actions template.

## [1.0.1] - 2018-01-22

### Changed

Docs:
- Font size reduced on code blocks.

### Fixed

Modi:
- Modal: initialization can be skipped during instantiation.
- Modal#remove:
  - Trigger hide before deletion to properly reset flags.
  - Fix the reference to the modal's container.
  - Clean the references to the modal elements.
- Modal#relocate: run only when visible.

Docs:
- Prevent the scrollbars overlapping upper layers in some browsers.

## 1.0.0 - 2017-11-18

First release.

[2.0.0]: https://github.com/circunspecter/modi/compare/1.1.0...2.0.0
[1.1.0]: https://github.com/circunspecter/modi/compare/1.0.1...1.1.0
[1.0.1]: https://github.com/circunspecter/modi/compare/1.0.0...1.0.1
