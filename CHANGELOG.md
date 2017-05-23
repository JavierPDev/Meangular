# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.23.1] - 2017-05-23
### Fixed
- Fixed admin route auth guard for admin blog list.

## [0.23.0] - 2017-05-16
### Added
- Added admin section for blogs.

## [0.22.0] - 2017-05-09
### Added
- Added profile picture uploading feature.
- Add unit and e2e tests for searchbox.
- Add jasmine matchers.

## [0.21.0] - 2017-05-01
### Added
- Added full-text search to blog model using title field.
- Added searchbox component to core module.
- Blog list shows search term and user name used when filtering down results.

## [0.20.0] - 2017-04-24
### Added
- Added vscode configs for debugging with vscode.

### Changed
- Updated readme with seed and livereload info.
- Normalize `package.json` scripts to use 'prod' instead of 'production' and update Procfile and readme with it.

## [0.19.1] - 2017-04-21
### Fixed
- Livereload now working with Angular setup.

### Changed
- Move mocha file to root and delete unneeded `tests` directory.

## [0.19.0] - 2017-04-17
### Added
- Added database seeding functionality for npm scripts using `npm run seed`.

## [0.18.1] - 2017-04-14
### Fixed
- Fix `UserModule` import resulting in `AuthService`'s injection of separate instances across lazy loaded modules rather than one shared singleton.

## [0.18.0] - 2017-04-12
### Added
- Dynamic DOM document title added along with updated unit and e2e tests.

### Changed
- Change ActivatedRoute instance identifier to `_route`.

## [0.17.1] - 2017-04-10
### Changed
- Give pollyfill scripts their own bundle.
- Use `/client/src/index.html` as index template instead of Mean Stack JS's `/server/layout/index.html` and switch production build to use output hashing.

## [0.17.0] - 2017-04-07
### Added
- Travis CI support added.

### Changed
- #16 Make blog module lazy loaded.

## [0.16.0] - 2017-04-06
### Added
- Front-end linting added to `npm test`.

### Changed
- #15 Refactor blog routes to follow Angular convention of using modules for all feature module route configurations.

## [0.15.0] - 2017-04-04
### Added
- #14 Front-end linting support added.
- Blog e2e tests added for CanDeactivate guard.

### Changed
- Update code to pass front-end linting.

## [0.14.0] - 2017-03-30
### Added
- ng cli tool aliased to ng in npm scripts (ie. Use `npm run ng`)

### Changed
- #13 Update all angular packages to 4.0.0 (except cli which is 1.0.0) and make
necessary changes so everything works and all tests pass.

### Fixed
- Use get('field') method instead of controls['field'] for user template forms.

### Removed
- yarn.lock no longer needed.
