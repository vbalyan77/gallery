# gallery

1 : clone repo
2 : insert your mongo connection uri
3 : use serve script
4 : use postman collection for work with gallery

**\*\*\***ENDPOINTS**\*\*\***
POST    /register/                      => {userName, email, password}
POST    /login/                         => {emailOrUsername, password}
POST    /gallery/load-photos/           => {}
GET     /gallery/get-photos             => {maxCount, ownerId}
DELETE  /gallery/delete-photo/          => {photoId}
PUT     /gallery/change-album-title/    => {albumId, new_album_name}
GET     /gallery/get-albums             => {maxCount, ownerId}
DELETE  /gallery/delete-album/          => {albumId}

**\*\*\***SCRIPTS**\*\*\***
start - for build js files
serve - for build ts files
build - for compile project
