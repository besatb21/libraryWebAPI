const BASE_URL = "http://localhost:5006/";

export const AUTHOR_LIST_URL = BASE_URL + 'api/author/';

export const BOOK_LIST_URL = BASE_URL + 'api/book/';
export const BOOK_LIST_ADMIN_ROLE = BOOK_LIST_URL + 'admin/';
export const BOOK_LIST_OF_AUTHOR = BOOK_LIST_URL + 'author/'

export const BOOK_COVER = BOOK_LIST_URL + 'image-file/';

export const CATEGORY_LIST_URL = BASE_URL + 'api/category/';

export const CATEGORY_BOOK_LIST_URL = BASE_URL + 'api/bookcategory/'
export const CATEGORY_LIST_OF_BOOK = CATEGORY_BOOK_LIST_URL+'book/'

export const USER_URL = BASE_URL + 'api/user/';

export const AUTHENTICATION = BASE_URL + 'api/login/';

export const AUTHOR = 'Author';