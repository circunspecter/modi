# Changelog

The poject follows [Semantic Versioning](http://semver.org/spec/v2.0.0.html), and this log's format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

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

[1.0.1]: https://github.com/circunspecter/modi/compare/v1.0.0...v1.0.1
