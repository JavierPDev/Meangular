# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.30.5] - 2017-07-24
### Changed
- User profile pictures now save to a user's uploads directory with unique filenames so photos can always be cached.

## [0.30.4] - 2017-07-14
### Fixed
- Update node version in `package.json` for new security update.

## [0.30.3] - 2017-07-12
### Added
- Added comment unit tests.
- Added Comment e2e tests.

## [0.30.2] - 2017-07-03
### Fixed
- [#30](https://github.com/JavierPDev/Meangular/issues/30) Admin user search working again.

## [0.30.1] - 2017-06-27
### Fixed
- Searchbox input gets filled with current searchterm when manually navigating to page (ie. entering url with query params into browser location bar and hitting enter or clicking an external link).

## [0.30.0] - 2017-06-26
### Added
- Add custom preloading strategy for routes.
- [#29](https://github.com/JavierPDev/Meangular/issues/29) Blog module now preloads.

## [0.29.1] - 2017-06-23
### Added
- Loading icon displayed during profile pic upload.
- Comments now have front end validation.

## [0.29.0] - 2017-06-20
### Added
- [#28](https://github.com/JavierPDev/Meangular/issues/28) Custom http service used so that slim loading bar is displayed during requests.

### Removed
- Slim loading bar is no longer activated by route changes.

## [0.28.1] - 2017-06-20
### Changed
- Update `.travis.yml` to use all tests.
- Improve e2e tests for use with CI server

## [0.28.0] - 2017-06-19
### Changed
- Update angular packages.
- Update ng2-bootstrap to ngx-bootstrap

## [0.27.1] - 2017-06-15
### Changed
- Comment is hidden while editing instead of acting as view of old comment.
- Change permission for editing/deleting comment.

## [0.27.0] - 2017-06-14
### Added
- Page structure is visible while Angular loads.

### Changed
- `PaginatedSearchListComponent` and components that use it no longer have set URLs. Instead the router navigates to the current page but with set query parameters.
- Changed old protected members to private for `PaginatedSearchListComponent`.

## [0.26.2] - 2017-06-13
### Changed
- Update meta description.
- Comments are deleted when a blog entry is deleted.
- Use authorization middleware for comment edit and delete

### Added
- Comment h3 added.

## [0.26.1] - 2017-06-12
### Changed
- Demo web site changed from meangular.herokuapp.com to meangular.com
- Serve css from `/client/dist` folder.
- Prefix database names with 'meangular-'.
- Set env variable for production npm script.

## [0.26.0] - 2017-06-09
### Added
- Comments added to blog, frontend and backend.

### Changed
- Blog entry CRUD operations all use slugs rather than ObjectIDs.

## [0.25.1] - 2017-06-06
### Changed
- PaginatedLists now pass the fields they should be sorted by into the PaginatedListComponent.

## [0.25.0] - 2017-06-05
### Added
- Admin section for users was added.

## [0.24.0] - 2017-06-02
### Changed
- Refactor paginated lists. Instead of each having its own implementation, change to composing using a base paginated-search-list component that uses transclusion/projection to display content.

## [0.23.5] - 2017-05-31
### Fixed
- Fix typescript compile errors in test specs. They only pop up in new builds so are likely due to a package update.

## [0.23.4] - 2017-05-31
### Changed
- Blog edit and create views' cancel buttons now go back to the previous page rather than always going to the blog list.

## [0.23.3] - 2017-05-30
### Added
- Added admin blog list unit and e2e tests.

### Fixed
- Fixed failing blog view unit test.

## [0.23.2] - 2017-05-25
### Changed
- If user not admin or author of blog entry then blog edit displays unauthorized alert instead of edit form. Used to display unauthorized alert after form submission.

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
